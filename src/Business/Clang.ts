'use strict';
import { Terminal } from '../Helpers/Terminal';
import { Workspace } from "../Helpers/Workspace";
var fs = require('fs');
interface Callback {
    (error: Error, result: object): void;
}
export interface ClangLanguageRules {
    maxIfsInFunctions:10;
    maxLinesInFunction:35;
    usingOnlyStringConstInFunction:true;
    maxFunctionInClass:30;

    maxQuantityOfIfsInFunctions();
    maxQuantityOfLinesInFunction();
    showReportWhenNotUsingStringConst();
    maxQuantityOfFunctionInClass();
}
export class Clang {
    private workspace = null;
    private fileConfig = null;
    private readonly clangFormatFile = "/.clang-format";
    public constructor(workspace: Workspace) {
        this.workspace = workspace;
    }
    public newConfig(workspaceAdresss: string, Callback) {
        Terminal.command("clang-format -style=llvm -dump-config > " + workspaceAdresss + this.clangFormatFile, (err, data, stderr) => {
            Callback(err, workspaceAdresss + this.clangFormatFile);
        });
    }
    public codeReview(): void {
        let keyAndValueClanfFormat = this.getClangFormatFile();
        if (keyAndValueClanfFormat) {

        }
    }
    private getClangFormatFile(): any {
        let workspaceAdresss = this.workspace.verify();
        if (workspaceAdresss) {
            let dataClangFormat = fs.readFileSync(workspaceAdresss + this.clangFormatFile);
            if (dataClangFormat) {
                let stringClangFormat = dataClangFormat.toString();
                let arrayClangFormat = stringClangFormat.split('\n');
                var keyAndValueClanfFormat = {};
                arrayClangFormat.forEach(element => {
                    let keyAndValue = element.split(':');
                    if (keyAndValue[1]) {
                        keyAndValueClanfFormat[keyAndValue[0].trim()] = keyAndValue[1].trim();
                    }
                });
                return keyAndValueClanfFormat;
            }
            this.workspace.showError("clang-format file not found");
            return false;
        }
        this.workspace.showError("Workspace not found");
        return false;
    }
    public formatFile(fileAdress, callback) {
        if (!fileAdress) {
            fileAdress = this.workspace.getCurrentFile();
        }
        this.workspace.showMessage("Formating " + fileAdress);
        var clangFileFormat = this.workspace.workspacePath + this.clangFormatFile;
        Terminal.command("clang-format -i -style=file " + fileAdress, (err, data, stderr) => {
            if (err) {
                Terminal.command("code " + clangFileFormat, (err0, data0, stderr0) => {
                    callback(err, data);
                });
            }
            callback(err, data);
        });
    }
    private clangFormat(callback) {
        var workspace = this.workspace;
        Terminal.command("brew list clang-format", (err, data, stderr) => {
            if (err) {
                Terminal.command("brew install clang-format", (err, data, stderr) => {
                    if (err) {
                        workspace.showError("Error on install clang-format");
                        callback(err, data);
                    } else {
                        callback(null, data);
                    }
                });
            }
            callback(null, data);
        });
    }
}