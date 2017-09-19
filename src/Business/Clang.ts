'use strict';
import { Terminal } from '../Helpers/Terminal';
import { Workspace } from "../Helpers/Workspace";
import { ObjC } from "./CodeReview/ObjC";
var fs = require('fs');
interface Callback {
  (error: Error, result: object): void;
}
export interface ClangLanguageRules {
    stringContentFile: string;
    functionsInClass: any;
    maxLinesInFunction: number;
    maxFunctionInClass: number;
    maxConditionsInFunctions: number;

    findFunctionsInClass(): void;
    whereIsTheClassOfFunction(functionContent: string): string;
    isConditionsInFunctionsMoreThanLimit(): any;
    isFunctioLinesMoreThanLimit(): any;
    isFunctionClassMoreThanLimit(): any;
}
export class Clang {
    private workspace = null;
    private fileConfig = null;
    private readonly clangFormatFile = "/.clang-format";
    private readonly reportHtml = "/report/dist/";
    private readonly codeReviewData = "codeReviewData.json";

    public constructor(workspace: Workspace) {
        this.workspace = workspace;
    }
    /**
     * Create new clang config file
     * @param workspaceAdresss 
     * @param Callback 
     */
    public newConfig(workspaceAdresss: string, Callback) {
        var clangFile = workspaceAdresss + this.clangFormatFile;
        Terminal.command("clang-format -style=llvm -dump-config > " + clangFile, (err, data, stderr) => {
            Terminal.command("echo '\n\n\n#maxLinesInFunction: \n#maxFunctionInClass:\n#maxConditionsInFunctions:' >> "+clangFile, (err, data, stderr) => {
                Callback(err, clangFile);
            });
        });
    }

    /**
     * Code Review based on clang format file
     */
    public codeReview(): void {
        let keyAndValueClanfFormat = this.getClangFormatFile();
        if (keyAndValueClanfFormat) {
            let languageRule: any = null;
            switch (keyAndValueClanfFormat.Language) {
                case "ObjC":
                    languageRule = new ObjC();
                    break;
            }
            if (languageRule) {
                languageRule = this.setupCodeReviewVars(languageRule,keyAndValueClanfFormat);
                languageRule.stringContentFile = fs.readFileSync(this.workspace.getCurrentFile()).toString();
                languageRule.findFunctionsInClass();
                this.doReport({
                    functionLineMoreThanLimit:languageRule.isFunctioLinesMoreThanLimit(),
                    functionClassMoreThanLimit:languageRule.isFunctionClassMoreThanLimit(),
                    conditionFunctionClassMoreThanLimit:languageRule.isConditionsInFunctionsMoreThanLimit()
                });
            } else {
                this.workspace.showError("Language not found :( - Please open the .clang-format and update Language value");
            }
        }
    }
    private setupCodeReviewVars(languageRule:any,keyAndValueClanfFormat:any):any{
        languageRule.maxLinesInFunction = parseInt(keyAndValueClanfFormat.maxLinesInFunction.toString());
        languageRule.maxFunctionInClass = parseInt(keyAndValueClanfFormat.maxFunctionInClass.toString());
        languageRule.maxConditionsInFunctions = parseInt(keyAndValueClanfFormat.maxConditionsInFunctions.toString());
        return languageRule;
    }

    private doReport(codeReviewData:any): void {
        this.workspace.showMessage("Openning report...");
        var path = this.workspace.getExtensionPath('felipeKimio.codestyle')+this.reportHtml;
        let jsonCodeReviewData = JSON.stringify(codeReviewData);

          this.createReportFile(path+"assets/",jsonCodeReviewData,(error,data)=>{
            if(error){
                this.workspace.showError("Error on create report file - "+error.message);
            }else{
                Terminal.command("open "+path+"/index.html", (err, data, stderr) => {
                });
            }
          });
    }

    private createReportFile(currentPath:string,jsonData:string,Callback){
      fs.writeFile(currentPath+this.codeReviewData, jsonData, (err,data) => {
        Callback(err,data);
      });
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
                        keyAndValueClanfFormat[keyAndValue[0].trim().replace("#","")] = keyAndValue[1].trim();
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