import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'u-dashboard',
  templateUrl: './u-dashboard.component.html',
  styleUrls: ['./u-dashboard.component.css'],
})
export class UDashboardComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  // : any;

  constructor(private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private observer: BreakpointObserver) {
      // this.sidenav = MatSidenav;
    }
 ngOnInit(): void {
    // this.reload();
    if(localStorage['WCEDOCReload']) {
      localStorage.removeItem('WCEDOCReload');
      this.reload();  
    }
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
  }
  
  
  reload() {
    window.location.reload();
  }
  logout() {
    this.load_data.reset();
  }
}
