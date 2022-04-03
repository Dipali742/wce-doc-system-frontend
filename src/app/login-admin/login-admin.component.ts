import { Component, OnInit, ViewChild } from '@angular/core';
    
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { BackendUrlComponent } from '../secrets/backend-url';
import { SharedVariablesComponent } from '../secrets/shared-variables';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm: any;
  hide = true;
  errorMessage = '';
  isLoginFailed = false;
  isLoggedIn : boolean = false;
  backend_url='';
  adminData: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private bkd: BackendUrlComponent,
    private sharedvar:SharedVariablesComponent) { 

    this.loginForm=FormGroup;
    this.backend_url=bkd.backend_url;
    this.isLoggedIn = this.sharedvar.isLoggedIn;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

  Onsubmit() {
    console.log("FormData : ",this.loginForm.value);
    this.authService.login(this.getUrl()).subscribe(
      data => {
        if(data) {
          this.isLoginFailed = false;
          this.sharedvar.isLoggedIn = true;
          this.isLoggedIn = true;
          this.adminData = data;
          this.sharedvar.adminInfo = data;
          this.sharedvar.isAdmin = true;
          sessionStorage.setItem('InfoWCEDoc',this.adminData);
          this.router.navigate(['/admin-dashboard']);
        }
        else {
          this.isLoginFailed = true;
          this.errorMessage = 'Invalid username/password';
          this.sharedvar.isLoggedIn = false;
          this.isLoggedIn = false;
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
    return (this.backend_url+'/users/check/'
    +this.loginForm.value.username+'/'+this.loginForm.value.password);
  }
}

