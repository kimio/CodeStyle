import { Component, ElementRef, ViewChild, Renderer} from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import 'rxjs/add/operator/map'

declare var Prism: any;
declare var Konami: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private numberBugThatCanFly = [3];

  @ViewChild('bugElement') bugElement: ElementRef;
  @ViewChild('castleElement') castleElement: ElementRef;
  @ViewChild('heroElement') heroElement: ElementRef;
  @ViewChild('backgroundElement') backgroundElement: ElementRef;
  
  title = ' - Code Review';
  data:any = {};
  bug:string='';
  castle:string='';
  hero:string='';
  bug_width:string='';
  renderer:Renderer=null;

  constructor(private http: Http, renderer: Renderer) {
    this.renderer = renderer;
    this.getCodeReviewData();
  }

  private getCodeReviewData() {
    let codeReviewData = this.http.get('./assets/codeReviewData.json').map((res: Response) => res.json())
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
 
  private getTemplate(){
    this.setBackground();
    Konami(function() { window.location.href='http://goo.gl/9HBmWc';});
  }
  private getBug(){
    if(this.data.template.bug) {
      let bugNumber = Math.floor(Math.random() * 5);
      this.bug = './assets/bug_'+ bugNumber +'.gif';
      this.setBugStyle(bugNumber);
    }
  }
  private getHero(){
    if(this.data.template.hero) {
      this.hero = './assets/hero_'+ this.data.template.hero.type +'.gif';
      this.heroElement.nativeElement.style.marginRight = this.data.template.hero.position+"px";
    }
  }
  private getCastle(){
    if(this.data.template.castle) {
      this.castle = './assets/castle.gif';
      this.setCastle();
    }
  }

  private setActionCategory(){
    this.renderer.listen('document','click', (evt) => {
      if(evt.target.className=="reportCategory"){
        let display = evt.target.parentNode.children[1].style.display;
        evt.target.parentNode.children[1].style.display = (display=='none')?'':'none';
        var items = evt.target.parentNode.children[1].children;
        for(var i=0;i<items.length;i++){
          if(items[i].children[1]){
            items[i].children[1].dataset.start=parseInt(items[i].children[1].lang);
          }
        }
      }
      window.setTimeout(Prism.highlightAll, 9);
    })
  }
  //Style Setting

  /**
   * Background
   */
  private setBackground() {
    var style = this.backgroundElement.nativeElement.style;
    style.textAlign = "center";
    style.minWidth = "600px";
    style.backgroundImage = "url('./assets/background.gif')";
    style.textAlign= "center";
    style.minWidth= "600px";
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
  private setBugStyle(bugNumber:number){
    this.bugElement.nativeElement.height=150;
    if(this.numberBugThatCanFly.indexOf(bugNumber)!=-1){
      this.bugElement.nativeElement.style.marginBottom="60px";
      this.bugElement.nativeElement.height=100;
    }
    this.bugElement.nativeElement.style.marginLeft = this.data.template.bug.position+"px";
  }
  /**
   * Castle
   */ 
  private setCastle() {
    this.castleElement.nativeElement.height = 320;
    this.castleElement.nativeElement.style.marginLeft = this.data.template.castle.position+"px";
  }
}
