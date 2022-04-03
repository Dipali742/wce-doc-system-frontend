import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AAllUsersComponent } from './admin-area/a-all-users/a-all-users.component';
import { ALogsComponent } from './admin-area/a-logs/a-logs.component';
import { ARequestComponent } from './admin-area/a-request/a-request.component';
import { ADashboardComponent } from './admin-area/a-dashboard/a-dashboard.component';
import { AdminMainComponent } from './admin-area/admin-main/admin-main.component';
import { UserMainComponent } from './user-area/user-main/user-main.component';
import { UDashboardComponent } from './user-area/u-dashboard/u-dashboard.component';
import { UDocumentsComponent } from './user-area/u-documents/u-documents.component';
import { URequestComponent } from './user-area/u-request/u-request.component';
import { UProfileComponent } from './user-area/u-profile/u-profile.component';
import { AProfileComponent } from './admin-area/a-profile/a-profile.component';
import { ADocumentTypesComponent } from './admin-area/a-document-types/a-document-types.component';
import { MyMaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    LoginUserComponent,
    AAllUsersComponent,
    ALogsComponent,
    ARequestComponent,
    ADashboardComponent,
    AdminMainComponent,
    UserMainComponent,
    UDashboardComponent,
    UDocumentsComponent,
    URequestComponent,
    UProfileComponent,
    AProfileComponent,
    ADocumentTypesComponent,
    HomeComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
