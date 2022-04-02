import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import {AboutUsComponent} from './about-us/about-us.component';

const routes: Routes = [];

@NgModule({
  
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin-login', component: LoginAdminComponent },
    { path: 'user-login', component: LoginUserComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent }
   
  ]),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
