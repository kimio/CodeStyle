'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const Workspace_1 = require("./Helpers/Workspace");
const Clang_1 = require("./Business/Clang");
function activate(context) {
    let workspace = new Workspace_1.Workspace(vscode);
    let workspaceAdresss = workspace.verify();
    let disposable = vscode.commands.registerCommand('extension.config', () => {
        if (workspaceAdresss) {
            var clang = new Clang_1.Clang(workspace);
            clang.newConfig(workspaceAdresss, function (error, result) {
                if (!error) {
                    workspace.showMessage("Created new configuration " + result);
                }
            });
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.format', () => {
        if (workspaceAdresss) {
            var clang = new Clang_1.Clang(workspace);
            clang.formatFile(null, function (error, result) {
                if (error) {
                    workspace.showError(error.message);
                }
                else {
                    workspace.showMessage("Formated!");
                }
            });
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.code_review_objc', () => {
        if (workspaceAdresss) {
            var clang = new Clang_1.Clang(workspace);
            clang.codeReview();
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map