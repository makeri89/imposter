import * as vscode from 'vscode';
import * as writer from './writer';

export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "imposter" is now active!');

	let type = vscode.commands.registerCommand('type', writer.onType);

	let play = vscode.commands.registerCommand('imposter.start', () => {
		writer.start(context);
	});

	context.subscriptions.push(type, play);
}

export function deactivate() {}
