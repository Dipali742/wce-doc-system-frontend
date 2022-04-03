import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedVariablesComponent } from './secrets/shared-variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wce-doc-system';
  isLoggedIn = false;
  
  constructor(private sharedvar:SharedVariablesComponent,
    private route: ActivatedRoute, 
    private router: Router,) {
    // this.isLoggedIn = this.sharedvar.isLoggedIn;
    if(sessionStorage.getItem('InfoWCEDoc')) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.sharedvar.isLoggedIn = false;
    this.sharedvar.adminInfo = null;
    this.sharedvar.userInfo = null;
    this.sharedvar.isAdmin = undefined;
    this.router.navigate(['/home']);
    sessionStorage.clear();
    this.reload();
  }

  reload() {
    window.location.reload();
  }
}
