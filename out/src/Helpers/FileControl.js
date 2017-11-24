'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class FileControl {
    constructor() {
        this.lineNumbersSize = [];
    }
    /**
     * Get Line of file by string value
     * @param string String value
     */
    getLineByString(string) {
        if (this.lineNumbersSize.length < 1) {
            var currentLine = 1;
            var newLineCont = 0;
            var currentFinalSize = 0;
            this.stringContentFile.split('\n').forEach(string => {
                currentFinalSize += string.length;
                this.lineNumbersSize.push({
                    line: currentLine,
                    charSize: currentFinalSize + newLineCont
                });
                newLineCont++;
                currentLine++;
            });
        }
        let stringPosition = this.stringContentFile.indexOf(string);
        var filterLinesByCharSize = this.lineNumbersSize.filter(function (el) {
            return (el.charSize <= stringPosition);
        });
        return filterLinesByCharSize[filterLinesByCharSize.length - 1].line;
    }
}
exports.FileControl = FileControl;
//# sourceMappingURL=FileControl.js.map