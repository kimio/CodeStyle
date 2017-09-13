'use strict';
import * as vscode from 'vscode';
import {Workspace} from './Helpers/Workspace';
import { Clang } from "./Business/Clang";
export function activate(context: vscode.ExtensionContext) {
    let workspace = new Workspace(vscode);
    let workspaceAdresss = workspace.verify();
    let disposable = vscode.commands.registerCommand('extension.config', () => {
        if(workspaceAdresss){
            var clang = new Clang(workspace);
            clang.newConfig(workspaceAdresss,function(error,result){
                if(!error){
                    workspace.showMessage("Created new configuration "+result);
                }
            });   
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.format', () => {
        if(workspaceAdresss){
            var clang = new Clang(workspace);
            clang.formatFile(null,function(error,result){
                if(error){
                    workspace.showError(error.message);
                }else{
                    workspace.showMessage("Formated!");
                }
            });
        }
    });
    context.subscriptions.push(disposable);
    disposable = vscode.commands.registerCommand('extension.code_review_objc', () => {
        if(workspaceAdresss){
            var clang = new Clang(workspace);
            clang.codeReview();
        }
    });
    context.subscriptions.push(disposable);
}
export function deactivate() {
}