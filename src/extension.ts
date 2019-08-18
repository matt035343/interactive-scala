import * as vscode from 'vscode';

let interactiveTerminal: vscode.Terminal;
let configuration: vscode.WorkspaceConfiguration;
const defaultInterpreter: string = "scala";

function initialiseInteractiveScala() {
	let interpreter: string|undefined = configuration.get("interpreter");
	if(!interpreter) {
		interpreter = defaultInterpreter;
	}

	if(interactiveTerminal) {
		interactiveTerminal.dispose();
	}

	interactiveTerminal = vscode.window.createTerminal("Interactive Scala");
	interactiveTerminal.sendText(interpreter, true);
	interactiveTerminal.show(false);
}

function sendSelectionToTerminal(activeTextEditor: vscode.TextEditor) {
	let selection = activeTextEditor.selection;
	let text = "";
	if(selection.isEmpty) {
		let lineNumber = selection.active.line;
		let line = activeTextEditor.document.lineAt(lineNumber);
		text = line.text;
	} else {
		text = activeTextEditor.document.getText(selection);
	}
	text = text.trim();
	interactiveTerminal.sendText(text, true);
}

export function activate(context: vscode.ExtensionContext) {
	let executeInInteractiveScalaCommand = vscode.commands.registerCommand('interactiveScala.executeInInteractiveScala', () => {
		let activeTextEditor = vscode.window.activeTextEditor;
		if(activeTextEditor && activeTextEditor.document.languageId === "scala") {
			sendSelectionToTerminal(activeTextEditor);
		}
	});

	let configurationChanged = vscode.workspace.onDidChangeConfiguration(e => {
		if(e.affectsConfiguration("interactiveScala")) {
			configuration = vscode.workspace.getConfiguration("interactiveScala");
			initialiseInteractiveScala();
		}
	});

	configuration = vscode.workspace.getConfiguration("interactiveScala");
	
	context.subscriptions.push(executeInInteractiveScalaCommand);
	context.subscriptions.push(configurationChanged);

	initialiseInteractiveScala();
}

export function deactivate() {
	if(interactiveTerminal) { 
		interactiveTerminal.dispose();
	}
}