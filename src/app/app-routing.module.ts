import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginUserComponent } from './login-user/login-user.component';
import {AboutUsComponent} from './about-us/about-us.component';
import { ADashboardComponent } from './admin-area/a-dashboard/a-dashboard.component';
import { UDashboardComponent } from './user-area/u-dashboard/u-dashboard.component';
import { UProfileComponent } from './user-area/u-profile/u-profile.component';
import { URequestComponent } from './user-area/u-request/u-request.component';
import { UDocumentsComponent } from './user-area/u-documents/u-documents.component';
import { AProfileComponent } from './admin-area/a-profile/a-profile.component';
import { AAllUsersComponent } from './admin-area/a-all-users/a-all-users.component';
import { ARequestComponent } from './admin-area/a-request/a-request.component';
import { ADocumentTypesComponent } from './admin-area/a-document-types/a-document-types.component';
import { ALogsComponent } from './admin-area/a-logs/a-logs.component';


const routes: Routes = [];

@NgModule({
  
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about-us', component: AboutUsComponent },
    
    { path: 'user/login', component: LoginUserComponent },
    { path: 'user/dashboard', component: UDashboardComponent},
    { path: 'user/profile', component: UProfileComponent},
    { path: 'user/newRequest', component: URequestComponent},
    { path: 'user/documents', component: UDocumentsComponent},
    { path : 'user/myRequests', component: URequestComponent},

    { path: 'admin/login', component: LoginAdminComponent },
    { path: 'admin/dashboard', component: ADashboardComponent},
    { path: 'admin/profile', component: AProfileComponent},
    { path: 'admin/allUsers', component: AAllUsersComponent},
    { path: 'admin/allRequests', component: ARequestComponent},
    { path: 'admin/documentTypes', component: ADocumentTypesComponent},
    { path: 'admin/userLogs', component: ALogsComponent}
  ]),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
