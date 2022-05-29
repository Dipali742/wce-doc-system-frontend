import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { AActionComponent } from '../a-request/a-actions/a-actions.component';
import { AViewRequestComponent } from '../a-request/a-view-request/a-view-request.component';
import { STUDENT_REQUEST_GRID_COLUMNS } from '../grid-columns/student-request-grid-columns';

@Component({
  selector: 'app-a-logs',
  templateUrl: './a-logs.component.html',
  styleUrls: ['./a-logs.component.css'],
})
export class ALogsComponent implements OnInit {
  studentRequestGridColumns: Array<any> = [...STUDENT_REQUEST_GRID_COLUMNS];
  studentRequestGridData: any = [];

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
    }

    this.loadStudentRequests();
  }

  defaultDialogConfig = {
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
    minHeight: '45vh',
    maxHeight: '75vh',
  };

  openDialog(actionType: string, data: any) {
    // view_action
    const dialogConfig = new MatDialogConfig();
    if (actionType === 'decline_action' || actionType === 'approve_action') {
      const modalRef = this.matDialog.open(AActionComponent, {
        data: {
          ComponentData: data,
          action: actionType,
        },
        ...this.defaultDialogConfig,
      });

      modalRef.afterClosed().subscribe((result) => {
        this.loadStudentRequests();
      });
    } else {
      const modalRef = this.matDialog.open(AViewRequestComponent, {
        data: {
          ComponentData: data,
          action: actionType,
        },
        ...this.defaultDialogConfig,
      });
      modalRef.afterClosed().subscribe((result) => {
        this.loadStudentRequests();
      });
    }
  }

  loadStudentRequests() {
    this.userService.getStudentRequest(this.getUrl()).subscribe(
      (data) => {
        if (data) {
          this.studentRequestGridData = data.filter(
            (a: { status: string }) =>
              a.status === 'Approved' || a.status === 'rejected'
          );
          console.log('Hi', this.studentRequestGridData);
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

  clickedOnActions(type: any, column: any, data: any, event: any): void {
    if (type === 'cellClicked' && column.colId === 'actions') {
      console.log(event);
      if (event.event.target.getAttribute('id') === 'decline_action') {
        console.log('hi');
        this.openDialog('decline_action', data);
      } else if (event.event.target.getAttribute('id') === 'approve_action') {
        console.log('approve');
        this.openDialog('approve_action', data);
      }
    }
    if (type === 'cellClicked' && column.colId === 'files') {
      //   console.log(event);
      //   if(event.event.target.getAttribute("id") === "view_attachments") {
      //     console.log("hi");
      //   }
      if (event.event.target.getAttribute('id') === 'view_action') {
        console.log('view');
        this.openDialog('view_action', data);
      }
    }

    if (type === 'cellClicked' && column.colId === 'UserPRN') {
      if (event.event.target.getAttribute('id') === 'view_student') {
        this.openDialog('view_student', data);
      }
    }
  }

  reload() {
    window.location.reload();
  }
}
