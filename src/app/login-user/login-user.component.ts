import { Component, OnInit, ViewChild } from '@angular/core';
    
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { BackendUrlComponent } from '../common/backend-url';
import { SharedVariablesComponent } from '../common/shared-variables';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoadUserDataComponent } from '../common/load-user-data';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  loginForm: any;
  hide = true;
  errorMessage = '';
  isLoginFailed = false;
  backend_url='';
  userData: any;

  constructor(private app:AppComponent,
    private route: ActivatedRoute,
    private load_data: LoadUserDataComponent,
    private router: Router,private fb: FormBuilder,
    private authService: AuthService,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent) { 
      
    this.loginForm=FormGroup;
    this.backend_url=bkd.backend_url;
  }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })

    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      if(this.sharedvar.isLoggedIn && this.sharedvar.isAdmin) {
        this.router.navigate(['/user/dashboard']);
      }
    }
  }

  Onsubmit() {
    console.log("FormData : ",this.loginForm.value);
    this.authService.login(this.getUrl()).subscribe(
      data => {
        this.sharedvar.isAdmin = false;
        if(data) {
          this.isLoginFailed = false;
          this.sharedvar.isLoggedIn = true;
          this.userData = data;
          this.sharedvar.userInfo = data;
          
          let token = "2 "+this.userData.username+" "+this.userData.password;
          localStorage.clear();
          localStorage.setItem('InfoWCEDoc',token);
          this.router.navigate(['/user/dashboard']);
          localStorage.setItem("WCEDOCReload","yes");
        }
        else {
          this.isLoginFailed = true;
          this.errorMessage = 'Invalid username/password';
          this.sharedvar.isLoggedIn = false;
          // this.router.navigate(['/user/dashboard']);
        }
        console.log(data);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  getUrl(): string {
    return (this.sharedvar.backend_url+'/users/checkStudent/'
    +this.loginForm.value.username+'/'+this.loginForm.value.password);
  }
  reload() {
    window.location.reload();
  }
}


