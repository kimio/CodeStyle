'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class ObjC {
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
        let implementationClass = "";
        classesImplementation.forEach(className => {
            if (this.stringContentFile.indexOf(className, functionPosition) == -1) {
                implementationClass = className;
            }
        });
        return implementationClass;
    }
    findFunctionsInClass() {
        let functionsNameInObject = this.stringContentFile.match(/[\+\-]\s*\(.*\).*/gm);
        let functionContentInObject = this.stringContentFile.match(/\{(\s*?.*?)*?^\}/gm);
        this.functionsInClass = [];
        var i = 0;
        functionContentInObject.forEach(functionContent => {
            this.functionsInClass[i] = {
                name: functionsNameInObject[i],
                content: functionContent,
                class: this.whereIsTheClassOfFunction(functionContent)
            };
            i++;
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
            if ((functionClass.content.split('\n').length - 2) > lines) {
                functionClasses.push(functionClass);
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
                functionClasses.push(functionClass);
            }
        });
        return functionClasses;
    }
}
exports.ObjC = ObjC;
//# sourceMappingURL=ObjC.js.map