import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()
@Component({
  selector: 'a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css'],
})
export class ADashboardComponent {
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
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
  }
  
  ngAfterViewInit() {
    // console.log("hi ",this.sidenav);
    if(this.sidenav) {
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
    }
    else {setTimeout(()=>{
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
      });},3000);
    }

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
  reload() {
    window.location.reload();
  }
  logout() {
    this.load_data.reset();
  }
}
