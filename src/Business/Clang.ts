'use strict';
import {Terminal} from '../Helpers/Terminal';
import { Workspace } from "../Helpers/Workspace";
interface callback {
    ( error: Error, result: object ) : void;
}
export class Clang {
    private workspace = null;
    private fileConfig = null;
    public constructor(workspace:Workspace){
        this.workspace = workspace;
    }
    public newConfig(workspaceAdresss:string,callback){
        Terminal.command("clang-format -style=llvm -dump-config > "+workspaceAdresss+"/.clang-format",function(err, data, stderr){
            callback(err, workspaceAdresss+"/.clang-format");
        });
    }
    public formatFile(fileAdress,callback){
        if(!fileAdress){
            fileAdress = this.workspace.getCurrentFile();
        }
        this.workspace.showMessage("Formating "+fileAdress);
        var clangFileFormat = this.workspace.workspacePath+"/.clang-format";
        Terminal.command("clang-format -i -style=file "+fileAdress,function(err, data, stderr){
            if(err){
                Terminal.command("code "+clangFileFormat,function(err0, data0, stderr0){
                    callback(err, data);
                });
            }
            callback(err, data);
        });
    }
    private clangFormat(callback){
        var workspace = this.workspace;
        Terminal.command("brew list clang-format",function(err, data, stderr){
            if(err) {
                Terminal.command("brew install clang-format",function(err, data, stderr){
                    if(err){
                        workspace.showError("Error on install clang-format");
                        callback(err,data);
                    }else{
                        callback(null,data);
                    }
                });
            }
            callback(null,data);
        }); 
    }
}