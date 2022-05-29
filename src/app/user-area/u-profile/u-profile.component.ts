import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';

@Component({
  selector: 'app-u-profile',
  templateUrl: './u-profile.component.html',
  styleUrls: ['./u-profile.component.css'],
})
export class UProfileComponent implements OnInit {
  userInfo: any;
  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    public load_data: LoadUserDataComponent
  ) {}

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.userInfo = this.sharedvar.userInfo;
    }
  }
  reload() {
    window.location.reload();
  }
}
