import path = require("path");
import * as vscode from "vscode";

let typeFromFile = false;
let fileContents: string[];

export const advanceWritePoint = () => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('No active editor');
    return;
  }

  const { line, character } = editor.selection.active;

  if (line >= fileContents.length) {
    disableWriter();
  }

  editor.edit(p => {
    p.insert(editor.selection.active, fileContents[line][character]);
  });
};

export const onType = ({ text}: { text: string}) => {
  if (typeFromFile) {
    advanceWritePoint();
  } else {
    vscode.commands.executeCommand('default:type', { text });
  }
};

export const start = (context: vscode.ExtensionContext) => {
  const root = vscode.workspace.rootPath;
  if (!root) {
    return;
  }
  const filePath = path.join(root, 'ip-data');
  vscode.window.showInputBox({
    prompt: "Which file do you want use from the data folder?",
    placeHolder: "Type in the name of the file"
  }).then(name => {
    try {
      const uri = vscode.Uri.parse(`${filePath}/${name}`);
      vscode.workspace.openTextDocument(uri).then(doc => {
        fileContents = doc.getText().split('\n');
        fileContents = fileContents.map(line => line += '\n');
      });
    } catch (e) {
      vscode.window.showErrorMessage('No file found!');
    }
  });
  typeFromFile = true;
};

export const disableWriter = () => {
  setTimeout(() => {
    typeFromFile = false;
  }, 3000);
};

