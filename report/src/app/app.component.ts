import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ' - Code Review';
  data:any = {};
  bug:string='';
  castle:string='';
  hero:string='';

  constructor(private http: Http) {
    this.getCodeReviewData();
  }

  private getCodeReviewData() {
    return this.http.get('./assets/codeReviewData.json').map((res: Response) => res.json())
                  .subscribe(data => {
                        this.data = data;
                        this.getTemplate();
                });
  }

  private getTemplate(){
    
  }
  private getBug(){
    if(this.data.template.bug){

    }
  }
  private getHero(){
    if(this.data.template.hero){

    }
  }
  private getCastle(){
    if(this.data.template.castle){
    }
  }
}
