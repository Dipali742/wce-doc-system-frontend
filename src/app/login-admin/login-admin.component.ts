import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  hide = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return 'invalid';
    // return this.username.hasError('email') ? 'Not a valid email' : '';
  }
}
