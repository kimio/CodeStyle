'use strict';
export class Workspace {
  private static readonly errorWorkspaceFile = 'Your file doesn\'t has workspace';
  public vscode = null;
  public workspacePath = null;
  public constructor(vscode){
    this.vscode = vscode;
  }
  public verify() {
    var workspace = this.vscode.workspace.workspaceFolders;
    if (workspace === undefined) {
      this.showError(Workspace.errorWorkspaceFile);
      return false;
    }
    this.workspacePath = this.vscode.workspace.workspaceFolders[0].uri.path;
    return this.workspacePath;
  }
  public getExtensionPath(publisherName:string):string{
    return this.vscode.extensions.getExtension(publisherName).extensionPath;
  }
  public openUrl(url:string):void{
    this.vscode.commands.executeCommand('vscode.open', this.vscode.Uri.parse(url));
  }
  public getCurrentFile():string{
    return this.vscode.window.activeTextEditor.document.fileName;
  }
  public createOutputChannel(outputChannel:string) {
    return this.vscode.window.createOutputChannel(outputChannel);
  }
  public showError(errorMessage:string) {
    this.vscode.window.showErrorMessage(errorMessage);
  }
  public showMessage(message:string) {
    this.vscode.window.showInformationMessage(message);
  }
}