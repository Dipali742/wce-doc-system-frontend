import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css'],
})
export class ADashboardComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  // : any;

  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private observer: BreakpointObserver,
    private userService: UserService
  ) {
    // this.sidenav = MatSidenav;
  }
  ngOnInit(): void {
    // this.reload();
    if (localStorage['WCEDOCReload']) {
      localStorage.removeItem('WCEDOCReload');
      this.reload();
    }
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.loadAllRequests();
      this.loadAllStudents();
    }
  }

  myRequestGridData: any;
  studentsGridData: any;
  userInfo: any;
  totalRequests = 0;
  approvedRequests = 0;
  declinedRequests = 0;
  reworkRequests = 0;
  pendingRequests = 0;
  loadAllRequests() {
    this.userService.getDocumentTypes(this.getUrlRequest()).subscribe(
      (data: any[]) => {
        if (data) {
          this.myRequestGridData = data;
          this.totalRequests = this.myRequestGridData.length;
          var i: any;
          for (i = 0; i < this.myRequestGridData.length; i++) {
            console.log(this.myRequestGridData[i].status);
            if (this.myRequestGridData[i].status === 'Approved') {
              this.approvedRequests += 1;
            }
            if (this.myRequestGridData[i].status === 'rejected') {
              this.declinedRequests += 1;
            }
            if (this.myRequestGridData[i].status === 'rework') {
              this.reworkRequests += 1;
            }
            if (this.myRequestGridData[i].status === 'pending') {
              this.pendingRequests += 1;
            }
          }
        } else {
        }

        // console.log(data);
      },
      (err: any) => {}
    );
  }

  totalStudents = 0;
  firstYear = 0;
  secondYear = 0;
  thirdYear = 0;
  fourthYear = 0;

  loadAllStudents() {
    this.userService.getDocumentTypes(this.getUrlUsers()).subscribe(
      (data: any[]) => {
        if (data) {
          this.studentsGridData = data.filter(
            (a: { role: string }) => a.role === 'student'
          );
          this.totalStudents = this.studentsGridData.length;
          var i: any;
          for (i = 0; i < this.studentsGridData.length; i++) {
            console.log(this.studentsGridData[i]);
            if (this.studentsGridData[i].year === 1) {
              this.firstYear += 1;
            }
            if (this.studentsGridData[i].year === 2) {
              this.secondYear += 1;
            }
            if (this.studentsGridData[i].year === 3) {
              this.thirdYear += 1;
            }
            if (this.studentsGridData[i].year === 4) {
              this.fourthYear += 1;
            }
          }
        } else {
        }

        // console.log(data);
      },
      (err: any) => {}
    );
  }
  getUrlRequest(): string {
    return this.sharedvar.backend_url + '/requests';
  }
  getUrlUsers(): string {
    return this.sharedvar.backend_url + '/users';
  }

  reload() {
    window.location.reload();
  }
  logout() {
    this.load_data.reset();
  }
}
