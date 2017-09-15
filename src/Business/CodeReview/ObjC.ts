'use strict';
import { ClangLanguageRules } from "../Clang";

export class ObjC implements ClangLanguageRules {
    maxLinesInFunction: number;
    maxFunctionInClass: number;
    maxConditionsInFunctions: number;
    stringContentFile: string;
    functionsInClass: any;

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
    whereIsTheClassOfFunction(functionContent: string): string {
        let classesImplementation = this.stringContentFile.match(/@implementation.*/gm);
        let functionPosition: number = this.stringContentFile.indexOf(functionContent);
        let implementationClass = "";
        classesImplementation.forEach(className => {
            if (this.stringContentFile.indexOf(className, functionPosition) == -1) {
                implementationClass = className;
            }
        });
        return implementationClass;
    }

    findFunctionsInClass(): void {
        let functionsNameInObject = this.stringContentFile.match(/[\+\-]\s*\(.*\).*/gm);
        let functionContentInObject = this.stringContentFile.match(/\{(\s*?.*?)*?^\}/gm);

        this.functionsInClass = [];
        var i = 0;
        functionContentInObject.forEach(functionContent => {
            this.functionsInClass[i] = {
                name: functionsNameInObject[i],
                content: functionContent,
                class: this.whereIsTheClassOfFunction(functionContent)
            }
            i++;
        });
    }

    isConditionsInFunctionsMoreThanLimit(): any {
        let functionClasses = [];
        let lines = this.maxLinesInFunction;
        this.functionsInClass.forEach(functionClass => {
            let conditions = functionClass.content.match(/(if).*\(|(else).*\{|case.*?\:|default.*?\:/gm);
            if (conditions) {
                if (conditions.length > lines) {
                    functionClasses.push({
                        functionName:functionClass.name,
                        class:functionClass.class,
                        content:functionClass.content,
                        lengthCondition:conditions.length,
                        plusCondition:(conditions.length - lines)
                    });
                }
            }
        });
        return functionClasses;
    }

    isFunctioLinesMoreThanLimit(): any {
        let functionClasses = [];
        let lines = this.maxLinesInFunction;
        this.functionsInClass.forEach(functionClass => {
            let currentContentLines = functionClass.content.split('\n').length - 2;
            if (currentContentLines > lines) {
                functionClasses.push({
                    functionName:functionClass.name,
                    class:functionClass.class,
                    content:functionClass.content,
                    plusLine:(currentContentLines - lines)
                });
            }
        });
        return functionClasses;
    }

    isFunctionClassMoreThanLimit(): any {
        let classesGrouped = this.groupBy(this.functionsInClass, functionClass => functionClass.class);
        let functionClasses = [];
        let lines = this.maxFunctionInClass;
        classesGrouped.forEach(functionClass => {
            if (functionClass.length > lines) {
                functionClasses.push({
                    functionName:functionClass.name,
                    class:functionClass.class,
                    content:functionClass.content,
                    plusFunction:(functionClass.length - lines)
                });
            }
        });
        return functionClasses;
    }

}