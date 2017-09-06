'use strict';
var cmd = require('node-cmd');
interface callback {
    ( error: Error ,data ,stderr ) : void;
}
export class Terminal {
  public static command(command:string,callback:callback){
    cmd.get(command,function(err, data, stderr){
      callback(err,data,stderr);
    });
  }
}