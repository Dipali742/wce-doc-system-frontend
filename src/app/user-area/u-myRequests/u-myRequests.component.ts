import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { MY_REQUEST_GRID_COLUMNS } from '../grid-columns/my-request-grid-columns';
import { UViewRequestComponent } from './view-action/u-view-request-action.component';

@Component({
  selector: 'app-u-myRequests',
  templateUrl: './u-myRequests.component.html',
  styleUrls: ['./u-myRequests.component.css'],
})
export class UMyRequestComponent implements OnInit {
  myRequestColumns: Array<any> = [...MY_REQUEST_GRID_COLUMNS];
  myRequestGridData: any;
  userInfo: any;
  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.userInfo = this.sharedvar.userInfo;

      this.loadMyRequests();
    }
  }

  loadMyRequests() {
    this.userService.getDocumentTypes(this.getUrl()).subscribe(
      (data) => {
        if (data) {
          console.log('nishi data', this.userInfo);
          console.log('Hi sailee ', data);
          this.myRequestGridData = data.filter(
            (a: { user: { prn: any } }) => a.user.prn === this.userInfo.prn
          );
        } else {
        }

        // console.log(data);
      },
      (err) => {}
    );
  }

  getUrl(): string {
    return this.sharedvar.backend_url + '/requests';
  }
  reload() {
    window.location.reload();
  }

  defaultDialogConfig = {
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
    minHeight: '45vh',
    maxHeight: '75vh',
  };
  openDialog(actionType: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    if (actionType === 'view_attachments') {
      console.log('nishi ');
      const modalRef = this.matDialog.open(UViewRequestComponent, {
        data: {
          ComponentData: data,
          action: actionType,
        },
        ...this.defaultDialogConfig,
      });
    }
  }

  clickedOnActions(type: any, column: any, data: any, event: any): void {
    console.log('nishi', event);
    if (type === 'cellClicked' && column.colId === 'files') {
      console.log('nishi', event);
      if (event.event.target.getAttribute('id') === 'view_attachments') {
        console.log('hi');
        this.openDialog('view_attachments', data);
      }
    }
    // if(type === 'cellClicked' && column.colId === "admin_files") {
    //   console.log("nishi",event);
    //   if(event.event.target.getAttribute("id") === "file_download") {
    //     console.log("file download");

    //   }
    // }
    // if(type === 'cellClicked' && column.colId === "files") {
    //   console.log(event);
    //   if(event.event.target.getAttribute("id") === "view_attachments") {
    //     console.log("hi");
    //   }

    // }
  }
}
