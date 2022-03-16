const vscode = require('vscode');
const { generateDocumentationHeader, generateDocumentation, getOpenAIChoice } = require('./generateDocs');

function createStatusBarItem(command, tooltip, text) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    statusBarItem.command = command;
    statusBarItem.tooltip = tooltip;
    statusBarItem.text = text;
    statusBarItem.show();

    return statusBarItem;
}

function activate(context) {
    const generateDocumentationHeaderDisposable = vscode.commands.registerCommand('codedoc.generateDocumentationHeader', async() => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const response = await generateDocumentationHeader(selectedText);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, getOpenAIChoice(response) + '\n' + selectedText);
        });
    });

    const generateDocumentationDisposable = vscode.commands.registerCommand('codedoc.documentCode', async() => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        const response = await generateDocumentation(selectedText);

        editor.edit(editBuilder => {
            editBuilder.replace(selection, getOpenAIChoice(response));
        });
    });
    
    context.subscriptions.push(generateDocumentationHeaderDisposable);
    context.subscriptions.push(generateDocumentationDisposable);
    context.subscriptions.push(createStatusBarItem(
        'codedoc.generateDocumentationHeader', 
        'Generate Documentation Header',
        '$(notebook-open-as-text)'
    ));

    context.subscriptions.push(createStatusBarItem(
        'codedoc.documentCode', 
        'Document the selected code',
        '$(notebook-mimetype)'
    ));
}

module.exports = { activate, deactivate: () => {} };