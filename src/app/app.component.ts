import { Component } from '@angular/core';
import { ActivatedRoute, LoadChildrenCallback, Router } from '@angular/router';
import { LoadUserDataComponent } from './common/load-user-data';
import { SharedVariablesComponent } from './common/shared-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wce-doc-system';
  isLoggedIn = false;
  
  constructor(public sharedvar:SharedVariablesComponent,
    private route: ActivatedRoute, 
    private router: Router,
    private load_data: LoadUserDataComponent) {
    // this.isLoggedIn = this.sharedvar.isLoggedIn;
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
  }

  logout() {
    this.load_data.reset();
  }

  reload() {
    window.location.reload();
  }
}
