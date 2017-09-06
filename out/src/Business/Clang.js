'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = require("../Helpers/Terminal");
class Clang {
    constructor(workspace) {
        this.workspace = null;
        this.fileConfig = null;
        this.workspace = workspace;
    }
    newConfig(workspaceAdresss, callback) {
        Terminal_1.Terminal.command("clang-format -style=llvm -dump-config > " + workspaceAdresss + "/.clang-format", function (err, data, stderr) {
            callback(err, workspaceAdresss + "/.clang-format");
        });
    }
    formatFile(fileAdress, callback) {
        if (!fileAdress) {
            fileAdress = this.workspace.getCurrentFile();
        }
        this.workspace.showMessage("Formating " + fileAdress);
        var clangFileFormat = this.workspace.workspacePath + "/.clang-format";
        Terminal_1.Terminal.command("clang-format -i -style=file " + fileAdress, function (err, data, stderr) {
            if (err) {
                Terminal_1.Terminal.command("code " + clangFileFormat, function (err0, data0, stderr0) {
                    callback(err, data);
                });
            }
            callback(err, data);
        });
    }
    clangFormat(callback) {
        var workspace = this.workspace;
        Terminal_1.Terminal.command("brew list clang-format", function (err, data, stderr) {
            if (err) {
                Terminal_1.Terminal.command("brew install clang-format", function (err, data, stderr) {
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