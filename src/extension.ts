import * as vscode from 'vscode';

let interactiveTerminal: vscode.Terminal;

function initialiseInteractiveScala() {
	if(!interactiveTerminal) {
		interactiveTerminal = vscode.window.createTerminal("Interactive Scala");
		interactiveTerminal.sendText("scala", true);
	}
	interactiveTerminal.show(false);
}

export function activate(context: vscode.ExtensionContext) {
	let executeInInteractiveScalaCommand = vscode.commands.registerCommand('extension.executeInInteractiveScala', () => {
		let activeTextEditor = vscode.window.activeTextEditor;
		if(activeTextEditor) {
			let selection = activeTextEditor.selection;
			if(!selection.isEmpty) {
				let text = activeTextEditor.document.getText(selection);
				interactiveTerminal.sendText(text, true);
			}
		}
	});
	
	context.subscriptions.push(executeInInteractiveScalaCommand);

	initialiseInteractiveScala();
}

export function deactivate() {}