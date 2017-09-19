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

  constructor(private http: Http) {
    this.getCodeReviewData();
  }

  private getCodeReviewData() {
    console.log('ois');
    return this.http.get('./assets/codeReviewData.json').map((res: Response) => res.json())
                  .subscribe(data => {
                        this.data = data;
                });
  }
}
