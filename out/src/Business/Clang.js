'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const Terminal_1 = require("../Helpers/Terminal");
const ObjC_1 = require("./CodeReview/ObjC");
const CodeReviewReport_1 = require("./CodeReview/CodeReviewReport");
var fs = require('fs');
class Clang {
    constructor(workspace) {
        this.workspace = null;
        this.fileConfig = null;
        this.clangFormatFile = "/.clang-format";
        this.reportHtml = "/report/dist/";
        this.codeReviewData = "codeReviewData.json";
        this.workspace = workspace;
    }
    /**
     * Create new clang config file
     * @param workspaceAdresss
     * @param Callback
     */
    newConfig(workspaceAdresss, Callback) {
        var clangFile = workspaceAdresss + this.clangFormatFile;
        Terminal_1.Terminal.command("clang-format -style=llvm -dump-config > " + clangFile, (err, data, stderr) => {
            Terminal_1.Terminal.command("echo '\n\n\n#maxLinesInFunction: \n#maxFunctionInClass:\n#maxConditionsInFunctions:' >> " + clangFile, (err, data, stderr) => {
                Callback(err, clangFile);
            });
        });
    }
    /**
     * Code Review based on clang format file
     */
    codeReview() {
        let keyAndValueClanfFormat = this.getClangFormatFile();
        if (keyAndValueClanfFormat) {
            let languageRule = null;
            switch (keyAndValueClanfFormat.Language) {
                case "ObjC":
                    languageRule = new ObjC_1.ObjC();
                    break;
            }
            if (languageRule) {
                languageRule = this.setupCodeReviewVars(languageRule, keyAndValueClanfFormat);
                languageRule.stringContentFile = fs.readFileSync(this.workspace.getCurrentFile()).toString();
                languageRule.findFunctionsInClass();
                var codeReviewReport = new CodeReviewReport_1.CodeReviewReport({
                    functionLineMoreThanLimit: languageRule.isFunctioLinesMoreThanLimit(),
                    functionClassMoreThanLimit: languageRule.isFunctionClassMoreThanLimit(),
                    conditionFunctionClassMoreThanLimit: languageRule.isConditionsInFunctionsMoreThanLimit()
                });
                this.doReport(codeReviewReport.getTemplate());
            }
            else {
                this.workspace.showError("Language not found :( - Please open the .clang-format and update Language value");
            }
        }
    }
    setupCodeReviewVars(languageRule, keyAndValueClanfFormat) {
        languageRule.maxLinesInFunction = parseInt(keyAndValueClanfFormat.maxLinesInFunction.toString());
        languageRule.maxFunctionInClass = parseInt(keyAndValueClanfFormat.maxFunctionInClass.toString());
        languageRule.maxConditionsInFunctions = parseInt(keyAndValueClanfFormat.maxConditionsInFunctions.toString());
        return languageRule;
    }
    doReport(codeReviewData) {
        this.workspace.showMessage("Openning report...");
        var path = this.workspace.getExtensionPath('felipeKimio.codestyle') + this.reportHtml;
        var assetsPath = path + "assets/";
        let jsonCodeReviewData = JSON.stringify(codeReviewData);
        Terminal_1.Terminal.command("mkdir -p " + assetsPath, (err, data, stderr) => {
            this.createReportFile(assetsPath, jsonCodeReviewData, (error, data) => {
                if (error) {
                    this.workspace.showError("Error on create report file - " + error.message);
                }
                else {
                    Terminal_1.Terminal.command("open " + path + "/index.html", (err, data, stderr) => { });
                }
            });
        });
    }
    createReportFile(currentPath, jsonData, Callback) {
        fs.writeFile(currentPath + this.codeReviewData, jsonData, (err, data) => {
            Callback(err, data);
        });
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
                        keyAndValueClanfFormat[keyAndValue[0].trim().replace("#", "")] = keyAndValue[1].trim();
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