'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class ObjC {
    constructor() {
        this.lineNumbersSize = [];
        this.regexControl = { "\\d{": "\\d@@" };
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
    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            }
            else {
                collection.push(item);
            }
        });
        return map;
    }
    whereIsTheClassOfFunction(functionContent) {
        let classesImplementation = this.stringContentFile.match(/@implementation.*/gm);
        let functionPosition = this.stringContentFile.indexOf(functionContent);
        let implementationClass = classesImplementation[0];
        classesImplementation.forEach(className => {
            if (this.stringContentFile.indexOf(className, functionPosition) == -1) {
                implementationClass = className;
            }
        });
        return implementationClass;
    }
    removeRegexString() {
        var withoutRegex = this.stringContentFile;
        for (var key in this.regexControl) {
            withoutRegex = withoutRegex.replace(key, this.regexControl[key]);
        }
        return withoutRegex;
    }
    replaceRegexString(stringContent) {
        var withRegex = stringContent;
        for (var key in this.regexControl) {
            withRegex = withRegex.replace(this.regexControl[key], key);
        }
        return withRegex;
    }
    findFunctionsInClass() {
        var functionsNameInObject = this.stringContentFile.match(/[\+\-]\s*\(.*\).*/gm);
        let functionContentInObject = this.removeRegexString().match(/\{(\s*?.*?)*?^\}/gm);
        functionsNameInObject = functionsNameInObject.filter(function (el) {
            return (el.charAt(el.length - 1) != ";");
        });
        this.functionsInClass = [];
        var i = 0;
        functionContentInObject.forEach(functionContent => {
            functionContent = this.replaceRegexString(functionContent);
            let positionContent = this.getLineByString(functionContent);
            let positionFunctionName = this.getLineByString(functionsNameInObject[i]);
            if (positionFunctionName <= positionContent) {
                this.functionsInClass[i] = {
                    name: functionsNameInObject[i],
                    content: functionContent,
                    position: positionContent,
                    class: this.whereIsTheClassOfFunction(functionContent)
                };
                i++;
            }
        });
    }
    isConditionsInFunctionsMoreThanLimit() {
        let functionClasses = [];
        let lines = this.maxLinesInFunction;
        this.functionsInClass.forEach(functionClass => {
            let conditions = functionClass.content.match(/(if).*\(|(else).*\{|case.*?\:|default.*?\:/gm);
            if (conditions) {
                if (conditions.length > lines) {
                    functionClasses.push({
                        functionName: functionClass.name,
                        initialLine: functionClass.position,
                        class: functionClass.class,
                        content: functionClass.content,
                        lengthCondition: conditions.length,
                        plusCondition: (conditions.length - lines)
                    });
                }
            }
        });
        return functionClasses;
    }
    isFunctioLinesMoreThanLimit() {
        let functionClasses = [];
        let lines = this.maxLinesInFunction;
        this.functionsInClass.forEach(functionClass => {
            let currentContentLines = functionClass.content.split('\n').length - 2;
            if (currentContentLines > lines) {
                functionClasses.push({
                    functionName: functionClass.name,
                    class: functionClass.class,
                    initialLine: functionClass.position,
                    content: functionClass.content,
                    plusLine: (currentContentLines - lines)
                });
            }
        });
        return functionClasses;
    }
    isFunctionClassMoreThanLimit() {
        let classesGrouped = this.groupBy(this.functionsInClass, functionClass => functionClass.class);
        let functionClasses = [];
        let lines = this.maxFunctionInClass;
        classesGrouped.forEach(functionClass => {
            if (functionClass.length > lines) {
                functionClasses.push({
                    class: functionClass[0].class,
                    initialLine: functionClass.position,
                    plusFunction: (functionClass.length - lines)
                });
            }
        });
        return functionClasses;
    }
}
exports.ObjC = ObjC;
//# sourceMappingURL=ObjC.js.map