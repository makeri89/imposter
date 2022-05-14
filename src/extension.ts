import * as vscode from 'vscode';
import * as writer from './writer';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "imposter" is now active!');

	let backspace = vscode.commands.registerCommand('imposter.backspace', writer.onBackspace);

	let type = vscode.commands.registerCommand('type', writer.onType);

	let play = vscode.commands.registerCommand('imposter.start', () => {
		writer.start(context);
	});

	context.subscriptions.push(backspace, type, play);
}

export function deactivate() {}
