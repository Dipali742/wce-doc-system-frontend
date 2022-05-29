import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { MY_DOCUMENTS_GRID_COLUMNS } from '../grid-columns/my-documents-grid-columns';

@Component({
  selector: 'app-u-documents',
  templateUrl: './u-documents.component.html',
  styleUrls: ['./u-documents.component.css'],
})
export class UDocumentsComponent implements OnInit {
  myRequestColumns: Array<any> = [...MY_DOCUMENTS_GRID_COLUMNS];
  myRequestGridData: any;
  userInfo: any;

  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.loadMyRequests();
    }
  }

  loadMyRequests() {
    this.userService.getDocumentTypes(this.getUrl()).subscribe(
      (data: any[]) => {
        if (data) {
          console.log('nishi data', this.userInfo);
          console.log('Hi sailee ', data);
          this.myRequestGridData = data.filter(
            (a) =>
              a.user.prn === this.load_data.prn && a.admin_files.length != 0
          );
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
}
