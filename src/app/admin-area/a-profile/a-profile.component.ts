import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';

@Component({
  selector: 'app-a-profile',
  templateUrl: './a-profile.component.html',
  styleUrls: ['./a-profile.component.css'],
})
export class AProfileComponent implements OnInit {
  adminInfo: any;
  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent
  ) {}

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.adminInfo = this.sharedvar.adminInfo;
      console.log('heyyy', this.adminInfo);
    }
  }
  reload() {
    window.location.reload();
  }
}
