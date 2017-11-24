"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/operator/map");
let AppComponent = class AppComponent {
    constructor(http, renderer) {
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
    getCodeReviewData() {
        let codeReviewData = this.http.get('./assets/codeReviewData.json').map((res) => res.json())
            .subscribe(data => {
            this.data = data;
            this.getTemplate();
            this.getBug();
            this.getHero();
            this.getCastle();
            this.setActionCategory();
        });
        window.setTimeout(Prism.highlightAll, 9);
        return codeReviewData;
    }
    getTemplate() {
        this.setBackground();
        Konami(function () { window.location.href = 'http://goo.gl/9HBmWc'; });
    }
    getBug() {
        if (this.data.template.bug) {
            let bugNumber = Math.floor(Math.random() * 5);
            this.bug = './assets/bug_' + bugNumber + '.gif';
            this.setBugStyle(bugNumber);
        }
    }
    getHero() {
        if (this.data.template.hero) {
            this.hero = './assets/hero_' + this.data.template.hero.type + '.gif';
            this.heroElement.nativeElement.style.marginRight = this.data.template.hero.position + "px";
        }
    }
    getCastle() {
        if (this.data.template.castle) {
            this.castle = './assets/castle.gif';
            this.setCastle();
        }
    }
    setActionCategory() {
        this.renderer.listen('document', 'click', (evt) => {
            if (evt.target.className == "reportCategory") {
                let display = evt.target.parentNode.children[1].style.display;
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
    }
    //Style Setting
    /**
     * Background
     */
    setBackground() {
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
    }
    /**
     * Bug Style position
     * @param bugNumber bug number
     */
    setBugStyle(bugNumber) {
        this.bugElement.nativeElement.height = 150;
        if (this.numberBugThatCanFly.indexOf(bugNumber) != -1) {
            this.bugElement.nativeElement.style.marginBottom = "60px";
            this.bugElement.nativeElement.height = 100;
        }
        this.bugElement.nativeElement.style.marginLeft = this.data.template.bug.position + "px";
    }
    /**
     * Castle
     */
    setCastle() {
        this.castleElement.nativeElement.height = 320;
        this.castleElement.nativeElement.style.marginLeft = this.data.template.castle.position + "px";
    }
};
__decorate([
    core_1.ViewChild('bugElement')
], AppComponent.prototype, "bugElement", void 0);
__decorate([
    core_1.ViewChild('castleElement')
], AppComponent.prototype, "castleElement", void 0);
__decorate([
    core_1.ViewChild('heroElement')
], AppComponent.prototype, "heroElement", void 0);
__decorate([
    core_1.ViewChild('backgroundElement')
], AppComponent.prototype, "backgroundElement", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map