import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { STUDENT_GRID_COLUMNS } from '../grid-columns/student-data-grid-columns';
import { STUDENT_REQUEST_GRID_COLUMNS } from '../grid-columns/student-request-grid-columns';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AActionComponent } from './a-actions/a-actions.component';

@Component({
  selector: 'app-a-request',
  templateUrl: './a-request.component.html',
  styleUrls: ['./a-request.component.css']
})
export class ARequestComponent implements OnInit {

  studentRequestGridColumns: Array<any> = [...STUDENT_REQUEST_GRID_COLUMNS];
  studentRequestGridData: any = [];

  constructor( private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,
    private matDialog: MatDialog) {
   
   }

  ngOnInit(): void {
    // this.reload();
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }

    this.loadStudentRequests();
  }

  defaultDialogConfig = {
    width : "50vw",
    minWidth : "50vw",
    maxWidth : "50vw",
    minHeight : "45vh",
    maxHeight : "75vh"
  }

  openDialog(actionType: string,data: any) {
    const dialogConfig = new MatDialogConfig();
    if(actionType === "decline_action" || actionType === "approve_action") {
      const modalRef = this.matDialog.open(AActionComponent, {
        data : {
          ComponentData : data,
          action : actionType
        },
        ...this.defaultDialogConfig
      });
    }
  
  }

  loadStudentRequests() {
    this.userService.getStudentRequest(this.getUrl()).subscribe(
      data => {
        if(data) {
          this.studentRequestGridData = data;
          console.log("Hi",this.studentRequestGridData);
        }
        else {
          
        }
        // console.log(data);
      },
      err => {

      }
    );
  }

  getUrl(): string {
    return (this.sharedvar.backend_url+'/requests');
  }

  clickedOnActions(type: any,column:any,data:any,event:any) : void {
    if(type === 'cellClicked' && column.colId === "actions") {
      console.log(event);
      if(event.event.target.getAttribute("id") === "decline_action") {
        console.log("hi");
        this.openDialog("decline_action",data);
      }
      if(event.event.target.getAttribute("id") === "approve_action") {
        console.log("approve");
        this.openDialog("approve_action",data);
      }
    }
    // if(type === 'cellClicked' && column.colId === "files") {
    //   console.log(event);
    //   if(event.event.target.getAttribute("id") === "view_attachments") {
    //     console.log("hi");
    //   }
      
    // }
  }
  
  reload() {
    window.location.reload();
  }
}
