import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BackendUrlComponent } from './backend-url';
import { SharedVariablesComponent } from './shared-variables';

@Injectable({
    providedIn:'root'
})
export class LoadUserDataComponent {
    username :any;
    password : any;
    backend_url: any;
    tokenmap : any;

    constructor(private authService:AuthService,
        private sharedvar: SharedVariablesComponent,
        private bkd: BackendUrlComponent,
        private router: Router) {

        this.backend_url = bkd.backend_url;
    }

    onRefresh() {
        var token = localStorage['InfoWCEDoc'];
        this.tokenmap = token.split(/\bstack|[ ]+/);
        this.username = this.tokenmap[1];
        this.password = this.tokenmap[2];
        console.log(this.tokenmap);
        if(this.tokenmap[0] == 2) {
            this.authService.login(this.getUrlUser()).subscribe(
                data => {
                    this.sharedvar.isAdmin = false;
                    if(data) {
                        this.sharedvar.isLoggedIn = true;
                        this.sharedvar.userInfo = data;
                        this.sharedvar.adminInfo = null;
                        this.sharedvar.isAdmin = false;
                        let token = "2 "+data.username+" "+data.password;
                        localStorage.clear();
                        localStorage.setItem('InfoWCEDoc',token);
                    }
                    else {
                    this.reset();
                    }
                },
                err => {
                    this.reset();
                }
            );
        }
        else {
            this.authService.login(this.getUrlAdmin()).subscribe(
                    data => {
                        this.sharedvar.isAdmin = false;
                        if(data) {
                            this.sharedvar.isLoggedIn = true;
                            this.sharedvar.adminInfo = data;
                            this.sharedvar.userInfo = null;
                            this.sharedvar.isAdmin = true;
                            let token = "1 "+data.username+" "+data.password;
                            localStorage.clear();
                            localStorage.setItem('InfoWCEDoc',token);
                        }
                        else {
                        this.reset();
                        }
                    },
                    err => {
                        this.reset();
                    }
                );
        }
      }
      
      reset() {
        localStorage.clear();
        this.sharedvar.isLoggedIn = false;
        this.sharedvar.userInfo = null;
        this.sharedvar.adminInfo = null;
        this.sharedvar.isAdmin = undefined;
        this.router.navigate(['/home']);
      }

      getUrlUser(): string {
        return (this.backend_url+'/users/checkStudent/'
        +this.username+'/'+this.password);
      }

      getUrlAdmin(): string {
        return (this.backend_url+'/users/checkAdmin/'
        +this.username+'/'+this.password);
      }
} 