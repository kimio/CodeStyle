'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = require("../Helpers/Terminal");
var fs = require('fs');
class Clang {
    constructor(workspace) {
        this.workspace = null;
        this.fileConfig = null;
        this.clangFormatFile = "/.clang-format";
        this.workspace = workspace;
    }
    newConfig(workspaceAdresss, callback) {
        Terminal_1.Terminal.command("clang-format -style=llvm -dump-config > " + workspaceAdresss + this.clangFormatFile, (err, data, stderr) => {
            callback(err, workspaceAdresss + this.clangFormatFile);
        });
    }
    codeReview() {
        let keyAndValueClanfFormat = this.getClangFormatFile();
        if (keyAndValueClanfFormat) {
        }
    }
    getClangFormatFile() {
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
    formatFile(fileAdress, callback) {
        if (!fileAdress) {
            fileAdress = this.workspace.getCurrentFile();
        }
        this.workspace.showMessage("Formating " + fileAdress);
        var clangFileFormat = this.workspace.workspacePath + this.clangFormatFile;
        Terminal_1.Terminal.command("clang-format -i -style=file " + fileAdress, (err, data, stderr) => {
            if (err) {
                Terminal_1.Terminal.command("code " + clangFileFormat, (err0, data0, stderr0) => {
                    callback(err, data);
                });
            }
            callback(err, data);
        });
    }
    clangFormat(callback) {
        var workspace = this.workspace;
        Terminal_1.Terminal.command("brew list clang-format", (err, data, stderr) => {
            if (err) {
                Terminal_1.Terminal.command("brew install clang-format", (err, data, stderr) => {
                    if (err) {
                        workspace.showError("Error on install clang-format");
                        callback(err, data);
                    }
                    else {
                        callback(null, data);
                    }
                });
            }
            callback(null, data);
        });
    }
}
exports.Clang = Clang;
//# sourceMappingURL=Clang.js.map