import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'u-dashboard',
  templateUrl: './u-dashboard.component.html',
  styleUrls: ['./u-dashboard.component.css'],
})
export class UDashboardComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  // : any;
  myRequestGridData: any;
  userInfo: any;
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
      this.loadMyRequests();
    }
  }

  approvedRequests = 0;
  declinedRequests = 0;
  reworkRequests = 0;
  pendingRequests = 0;
  totalRequests = 0;
  loadMyRequests() {
    this.userService.getDocumentTypes(this.getUrl()).subscribe(
      (data: any[]) => {
        if (data) {
          this.myRequestGridData = data.filter(
            (a) => a.user.prn === this.load_data.prn
          );
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

  getUrl(): string {
    return this.sharedvar.backend_url + '/requests';
  }

  reload() {
    window.location.reload();
  }
  logout() {
    this.load_data.reset();
  }
}
