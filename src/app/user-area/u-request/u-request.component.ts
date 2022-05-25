import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { MY_REQUEST_GRID_COLUMNS } from '../grid-columns/my-request-grid-columns';

@Component({
  selector: 'app-u-request',
  templateUrl: './u-request.component.html',
  styleUrls: ['./u-request.component.css']
})
export class URequestComponent implements OnInit {

  myRequestColumns: Array<any> = [...MY_REQUEST_GRID_COLUMNS];
  myRequestGridData: any

  constructor( private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,) {
   
   }

  ngOnInit(): void {
    // this.reload();
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
  }

  getUrl(): string {
    return (this.sharedvar.backend_url + '/requests');
  }
  reload() {
    window.location.reload();
  }
}
