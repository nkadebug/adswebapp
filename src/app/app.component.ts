import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adswebapp';
  version = '2021.07.08.a';
  constructor() {
    console.log({version:this.version,title:this.title});
    if (localStorage.appVersion != this.version) {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.appVersion = this.version;
    }
  }
}
