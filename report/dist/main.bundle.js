webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".report{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-color: #292b2e;\n}\nbody,html{\n    background-color: #292b2e;\n}\nul{\n    margin-bottom: 30px;\n    padding-right: 50px;\n}\npre{\n    margin: auto;\n}\nli{\n    list-style-type: none;\n}\nh1{\n    font-size: 13px;\n    font-weight: lighter;\n}\nh2{\n    font-size: 15px;\n    font-weight: lighter;\n}\n.itemTitleReport{\n    background-color: #191b14;\n    color: #fff;\n    font-family: Verdana, Geneva, Tahoma, sans-serif;\n    padding: 10px;\n}\n.reportCategory{\n    cursor: pointer;\n    background-color: #191b1473;\n    color: #fff;\n    font-family: Verdana, Geneva, Tahoma, sans-serif;\n    padding: 10px;\n}\n.castle{\n    z-index: 1;\n    width: 100%;\n    text-align: center;\n    position: absolute;\n    top: 136px;\n}\n.heroAndBug, img{\n    z-index: 2;\n}\n.castle img{\n    z-index: 1;\n    height: 350px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"report\">\n    <!-- <div *ngFor=\"let functionClassMoreThanLimit of data.functionClassMoreThanLimit\">\n      {{functionClassMoreThanLimit.plusFunction}}\n    </div> -->\n    <div #backgroundElement>\n        <div class=\"heroAndBug\">\n          <img src=\"{{hero}}\" #heroElement>\n          <img src=\"{{bug}}\" #bugElement>\n        </div>\n        <div class=\"castle\"><img src=\"{{castle}}\" #castleElement></div>\n    </div>\n    <ul>\n      <div class=\"reportCategory\" *ngIf=\"data.conditionFunctionClassMoreThanLimit[0]\">\n        Complexibility\n      </div>\n      <div style=\"display: none\">\n          <li *ngFor=\"let conditionFunctionClassMoreThanLimit of data.conditionFunctionClassMoreThanLimit\">\n              <div class=\"itemTitleReport\">{{conditionFunctionClassMoreThanLimit.functionName}}</div>\n              <pre lang=\"{{conditionFunctionClassMoreThanLimit.initialLine}}\"><code class=\"language-objectivec line-numbers\">\n                  {{conditionFunctionClassMoreThanLimit.content}}\n                  </code></pre>\n            </li>\n      </div>\n    </ul>\n    <ul>\n      <div class=\"reportCategory\" *ngIf=\"data.functionClassMoreThanLimit[0]\">\n        Functions in Class\n      </div>\n      <div style=\"display: none\">\n          <li *ngFor=\"let functionClassMoreThanLimit of data.functionClassMoreThanLimit\">\n              <div class=\"itemTitleReport\">{{functionClassMoreThanLimit.class}} \n                <h1>remove {{functionClassMoreThanLimit.plusFunction}} function(s)</h1></div>\n            </li>\n      </div>\n    </ul>\n    <ul> \n      <div class=\"reportCategory\" *ngIf=\"data.functionLineMoreThanLimit[0]\">\n        Lines in Functions\n      </div>\n      <div style=\"display: none\">\n          <li *ngFor=\"let functionLineMoreThanLimit of data.functionLineMoreThanLimit\">\n              <div class=\"itemTitleReport\">{{functionLineMoreThanLimit.class}}\n                <h1>remove {{functionLineMoreThanLimit.plusLine}} line(s)</h1>\n                <h2>{{functionLineMoreThanLimit.functionName}}</h2></div>\n              <pre lang=\"{{functionLineMoreThanLimit.initialLine}}\"><code class=\"language-objectivec line-numbers\">\n                  {{functionLineMoreThanLimit.content}}\n                  </code></pre>\n            </li>\n      </div>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(http, renderer) {
        this.http = http;
        this.numberBugThatCanFly = [3];
        this.title = ' - Code Review';
        this.data = {};
        this.bug = '';
        this.castle = '';
        this.hero = '';
        this.bug_width = '';
        this.renderer = null;
        this.renderer = renderer;
        this.getCodeReviewData();
    }
    AppComponent.prototype.getCodeReviewData = function () {
        var _this = this;
        var codeReviewData = this.http.get('./assets/codeReviewData.json').map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.data = data;
            _this.getTemplate();
            _this.getBug();
            _this.getHero();
            _this.getCastle();
            _this.setActionCategory();
        });
        window.setTimeout(Prism.highlightAll, 9);
        return codeReviewData;
    };
    AppComponent.prototype.getTemplate = function () {
        this.setBackground();
        Konami(function () { window.location.href = 'http://goo.gl/9HBmWc'; });
    };
    AppComponent.prototype.getBug = function () {
        if (this.data.template.bug) {
            var bugNumber = Math.floor(Math.random() * 5);
            this.bug = './assets/bug_' + bugNumber + '.gif';
            this.setBugStyle(bugNumber);
        }
    };
    AppComponent.prototype.getHero = function () {
        if (this.data.template.hero) {
            this.hero = './assets/hero_' + this.data.template.hero.type + '.gif';
            this.heroElement.nativeElement.style.marginRight = this.data.template.hero.position + "px";
        }
    };
    AppComponent.prototype.getCastle = function () {
        if (this.data.template.castle) {
            this.castle = './assets/castle.gif';
            this.setCastle();
        }
    };
    AppComponent.prototype.setActionCategory = function () {
        this.renderer.listen('document', 'click', function (evt) {
            if (evt.target.className == "reportCategory") {
                var display = evt.target.parentNode.children[1].style.display;
                evt.target.parentNode.children[1].style.display = (display == 'none') ? '' : 'none';
                var items = evt.target.parentNode.children[1].children;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].children[1]) {
                        items[i].children[1].dataset.start = parseInt(items[i].children[1].lang);
                    }
                }
            }
            window.setTimeout(Prism.highlightAll, 9);
        });
    };
    //Style Setting
    /**
     * Background
     */
    AppComponent.prototype.setBackground = function () {
        var style = this.backgroundElement.nativeElement.style;
        style.textAlign = "center";
        style.minWidth = "600px";
        style.backgroundImage = "url('./assets/background.gif')";
        style.textAlign = "center";
        style.minWidth = "600px";
        style.backgroundColor = "white";
        style.backgroundPositionX = "center";
        style.backgroundSize = "cover";
        style.height = "200px";
        style.paddingTop = "250px";
        style.backgroundPositionY = "bottom";
        style.paddingBottom = "20px";
        style.marginBottom = "50px";
    };
    /**
     * Bug Style position
     * @param bugNumber bug number
     */
    AppComponent.prototype.setBugStyle = function (bugNumber) {
        this.bugElement.nativeElement.height = 150;
        if (this.numberBugThatCanFly.indexOf(bugNumber) != -1) {
            this.bugElement.nativeElement.style.marginBottom = "60px";
            this.bugElement.nativeElement.height = 100;
        }
        this.bugElement.nativeElement.style.marginLeft = this.data.template.bug.position + "px";
    };
    /**
     * Castle
     */
    AppComponent.prototype.setCastle = function () {
        this.castleElement.nativeElement.height = 320;
        this.castleElement.nativeElement.style.marginLeft = this.data.template.castle.position + "px";
    };
    return AppComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('bugElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "bugElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('castleElement'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _b || Object)
], AppComponent.prototype, "castleElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('heroElement'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _c || Object)
], AppComponent.prototype, "heroElement", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('backgroundElement'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]) === "function" && _d || Object)
], AppComponent.prototype, "backgroundElement", void 0);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Renderer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Z" /* Renderer */]) === "function" && _f || Object])
], AppComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map