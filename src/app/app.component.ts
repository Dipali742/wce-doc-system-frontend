import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('sidenav')
  sidenav: MatSidenav;
  title = 'wce-doc-system';
  isLoggedIn = false;
  userInfo: any;
  adminInfo: any;
  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    public load_data: LoadUserDataComponent,
    private observer: BreakpointObserver
  ) {}

  ngOnInit(): void {
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.userInfo = this.sharedvar.userInfo;
      console.log('heyyy', this.userInfo);
    }
    // this.userInfo = this.sharedvar.userInfo;
    // this.adminInfo = this.sharedvar.adminInfo;
    console.log(this.load_data.sharedvar.userInfo, this.sharedvar.userInfo);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sharedvar.isLoggedIn) {
        if (this.sidenav != undefined) {
          this.observer
            .observe(['(max-width: 800px)'])
            .pipe(delay(1), untilDestroyed(this))
            .subscribe((res) => {
              if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
                // console.log("Inif",this.sidenav);
              } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
                // console.log("inelse",this.sidenav);
              }
            });
        } else {
          setTimeout(() => {
            this.observer
              .observe(['(max-width: 800px)'])
              .pipe(delay(1), untilDestroyed(this))
              .subscribe((res) => {
                if (res.matches) {
                  this.sidenav.mode = 'over';
                  this.sidenav.close();
                  // console.log("Inif",this.sidenav);
                } else {
                  this.sidenav.mode = 'side';
                  this.sidenav.open();
                  // console.log("inelse",this.sidenav);
                }
              });
          }, 3000);
        }
        // }

        this.router.events
          .pipe(
            untilDestroyed(this),
            filter((e) => e instanceof NavigationEnd)
          )
          .subscribe(() => {
            if (this.sidenav.mode === 'over') {
              this.sidenav.close();
            }
          });
      }
    }, 3000);
  }

  reload() {
    window.location.reload();
  }
  logout() {
    this.load_data.reset();
    setTimeout(() => {
      this.reload();
    }, 1500);
  }
}
