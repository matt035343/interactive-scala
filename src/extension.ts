import * as vscode from 'vscode';

let interactiveTerminal: vscode.Terminal;

function initialiseInteractiveScala() {
	if(!interactiveTerminal) {
		interactiveTerminal = vscode.window.createTerminal("Interactive Scala");
		interactiveTerminal.sendText("scala", true);
	}
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
	
	context.subscriptions.push(executeInInteractiveScalaCommand);

	initialiseInteractiveScala();
}

export function deactivate() {}