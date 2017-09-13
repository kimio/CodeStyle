'use strict';
import { ClangLanguageRules } from "../Clang";
export class ObjC implements ClangLanguageRules{
    maxIfsInFunctions: 10;
    maxLinesInFunction: 35;
    usingOnlyStringConstInFunction: true;
    maxFunctionInClass: 30;
    maxQuantityOfIfsInFunctions() {
        throw new Error("Method not implemented.");
    }
    maxQuantityOfLinesInFunction() {
        throw new Error("Method not implemented.");
    }
    showReportWhenNotUsingStringConst() {
        throw new Error("Method not implemented.");
    }
    maxQuantityOfFunctionInClass() {
        throw new Error("Method not implemented.");
    }

}