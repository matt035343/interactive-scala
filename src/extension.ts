import * as vscode from 'vscode';
import * as fs from 'fs';

let terminalDisposed: boolean = true;
let interactiveTerminal: vscode.Terminal;
let configuration: vscode.WorkspaceConfiguration;
const defaultInterpreter: string = "scala";

function initialiseInteractiveScala() {
	let interpreter: string|undefined = configuration.get("interpreter");
	let requiredFiles: Array<string>|undefined = configuration.get("requiredFiles");
	if(!interpreter) {
		interpreter = defaultInterpreter;
	}

	disposeTerminal();

	interactiveTerminal = vscode.window.createTerminal("Interactive Scala");
	interactiveTerminal.sendText(interpreter, true);
	interactiveTerminal.show(false);
	terminalDisposed = false;

	//A bit hacky, but the interpreter must have opened when following is sent.
	setTimeout(() => {
		if(requiredFiles) {
			requiredFiles.forEach(file => {
				if(fs.existsSync(file)) {
					interactiveTerminal.sendText(":require "+file, true);
				} else {
					vscode.window.showErrorMessage("Following required file was not found and is not loaded into the Scala REPL: "+file);
				}
			});
		}
	}, 2000);
}

function sendSelectionToTerminal(activeTextEditor: vscode.TextEditor) {
	if(terminalDisposed) { 
		initialiseInteractiveScala();
	}

	let selection = activeTextEditor.selection;
	let text = "";
	if(selection.isEmpty) {
		let lineNumber = selection.active.line;
		let line = activeTextEditor.document.lineAt(lineNumber);
		text = line.text;
		
		let newCursorPosition = selection.active.translate(1,0);
		activeTextEditor.selection = new vscode.Selection(newCursorPosition, newCursorPosition);
	} else {
		text = activeTextEditor.document.getText(selection);
	}

	sendToTerminal(text);
}

function sendFileToTerminal(activeTextEditor: vscode.TextEditor) {
	if(terminalDisposed) { 
		initialiseInteractiveScala();
	}

	let text = activeTextEditor.document.getText();

	sendToTerminal(text);
}

function sendToTerminal(text: string) {
	text = text.trim();
	interactiveTerminal.show(true);
	interactiveTerminal.sendText(`:paste`);
	interactiveTerminal.sendText(`${text}`);
	interactiveTerminal.sendText("\u0004");
}

function disposeTerminal() {
	if(interactiveTerminal) {
		interactiveTerminal.dispose();
	}
	terminalDisposed = true;
}

function reset() {
	disposeTerminal();
	initialiseInteractiveScala();
}

export function activate(context: vscode.ExtensionContext) {
	let executeInInteractiveScalaCommand = vscode.commands.registerCommand('interactiveScala.executeInInteractiveScala', () => {
		let activeTextEditor = vscode.window.activeTextEditor;
		if(activeTextEditor && activeTextEditor.document.languageId === "scala") {
			sendSelectionToTerminal(activeTextEditor);
		}
	});

	let executeFileInInteractiveScalaCommand = vscode.commands.registerCommand('interactiveScala.executeFileInInteractiveScala', () => {
		let activeTextEditor = vscode.window.activeTextEditor;
		if(activeTextEditor && activeTextEditor.document.languageId === "scala") {
			sendFileToTerminal(activeTextEditor);
		}
	});

	let resetInteractiveScalaCommand = vscode.commands.registerCommand('interactiveScala.resetInteractiveScala', reset);

	let configurationChanged = vscode.workspace.onDidChangeConfiguration(e => {
		if(e.affectsConfiguration("interactiveScala")) {
			configuration = vscode.workspace.getConfiguration("interactiveScala");
			initialiseInteractiveScala();
		}
	});

	let disposedTerminal = vscode.window.onDidCloseTerminal(e => {
		if(interactiveTerminal && e.processId === interactiveTerminal.processId) {
			disposeTerminal();
		}
	});

	configuration = vscode.workspace.getConfiguration("interactiveScala");
	
	context.subscriptions.push(executeInInteractiveScalaCommand);
	context.subscriptions.push(executeFileInInteractiveScalaCommand);
	context.subscriptions.push(resetInteractiveScalaCommand);
	context.subscriptions.push(configurationChanged);
	context.subscriptions.push(disposedTerminal);

	initialiseInteractiveScala();
}

export function deactivate() {
	disposeTerminal();
}