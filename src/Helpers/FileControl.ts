
'use strict';
export class FileControl {
    stringContentFile: string;
    lineNumbersSize = [];
    /**
     * Get Line of file by string value
     * @param string String value
     */
    public getLineByString(string:string):number {
        if(this.lineNumbersSize.length<1){
            var currentLine:number = 1 ;
            var newLineCont:number = 0 ;
            var currentFinalSize:number = 0 ;
            this.stringContentFile.split('\n').forEach(string => {
                currentFinalSize+=string.length;
                this.lineNumbersSize.push({
                    line:currentLine,
                    charSize:currentFinalSize+newLineCont
                });
                newLineCont++;
                currentLine++;
            });
        }
        let stringPosition: number = this.stringContentFile.indexOf(string);
        var filterLinesByCharSize = this.lineNumbersSize.filter(function (el) {
            return (el.charSize <= stringPosition);
        });
        return filterLinesByCharSize[filterLinesByCharSize.length-1].line;
    }
}