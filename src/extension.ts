import * as vscode from 'vscode';
import * as writer from './writer';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "autocoder" is now active!');

	let backspace = vscode.commands.registerCommand('autocoder.backspace', writer.onBackspace);

	let type = vscode.commands.registerCommand('type', writer.onType);

	let play = vscode.commands.registerCommand('autocoder.start', () => {
		writer.start(context);
	});

	context.subscriptions.push(backspace, type, play);
}

export function deactivate() {}
