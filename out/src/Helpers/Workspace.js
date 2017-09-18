'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Workspace {
    constructor(vscode) {
        this.vscode = null;
        this.workspacePath = null;
        this.vscode = vscode;
    }
    verify() {
        var workspace = this.vscode.workspace.workspaceFolders;
        if (workspace === undefined) {
            this.showError(Workspace.errorWorkspaceFile);
            return false;
        }
        this.workspacePath = this.vscode.workspace.workspaceFolders[0].uri.path;
        return this.workspacePath;
    }
    getExtensionPath(publisherName) {
        return this.vscode.extensions.getExtension(publisherName).extensionPath;
    }
    openUrl(url) {
        this.vscode.commands.executeCommand('vscode.open', this.vscode.Uri.parse(url));
    }
    getCurrentFile() {
        return this.vscode.window.activeTextEditor.document.fileName;
    }
    createOutputChannel(outputChannel) {
        return this.vscode.window.createOutputChannel(outputChannel);
    }
    showError(errorMessage) {
        this.vscode.window.showErrorMessage(errorMessage);
    }
    showMessage(message) {
        this.vscode.window.showInformationMessage(message);
    }
}
Workspace.errorWorkspaceFile = 'Your file doesn\'t has workspace';
exports.Workspace = Workspace;
//# sourceMappingURL=Workspace.js.map