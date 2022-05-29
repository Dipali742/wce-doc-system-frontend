import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { DOCUMENT_TYPE_GRID_COLUMNS_U } from '../grid-columns/document-types-grid-columns';
import { MY_REQUEST_GRID_COLUMNS } from '../grid-columns/my-request-grid-columns';
import { ARequestActionComponent } from './a-request-action/a-request-action.component';

@Component({
  selector: 'app-u-request',
  templateUrl: './u-request.component.html',
  styleUrls: ['./u-request.component.css'],
})
export class URequestComponent implements OnInit {
  myRequestColumns: Array<any> = [...MY_REQUEST_GRID_COLUMNS];
  documentTypesGridColumns: Array<any> = [...DOCUMENT_TYPE_GRID_COLUMNS_U];
  myRequestGridData: any;
  createRequestForm: any;
  documentTypesGridData: any;
  userInfo: any;
  isCreateRequest = false;

  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.createRequestForm = FormGroup;
  }
  docIdSelected: any;
  ngOnInit(): void {
    // // this.reload();
    // let docId = this.route.snapshot.params['docId'];
    // console.log("doc Id : ",docId)
    // if(docId === undefined) {

    // }
    // else {
    //   this.isCreateRequest=true;
    //   this.route.queryParams.subscribe(
    //     params => {
    //       this.docIdSelected = params['docId'];
    //     }
    //   )
    // }

    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
      this.userInfo = this.sharedvar.userInfo;
      console.log('userinfo : ', this.userInfo);
    }
    this.loadAllDocumentTypes();
    this.createRequestForm = this.fb.group({
      prn: new FormControl({ disabled: true }, [Validators.required]),
      name: new FormControl({ disabled: true }, [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      files: new FormControl(''),
      comment: new FormControl('', [Validators.required]),
    });
  }

  loadAllDocumentTypes() {
    this.userService.getDocumentTypes(this.getUrlForDocTypes()).subscribe(
      (data) => {
        if (data) {
          this.documentTypesGridData = data;
          console.log('Hi doc types', this.documentTypesGridData);
        } else {
        }
        // console.log(data);
      },
      (err) => {}
    );
  }

  getUrlForDocTypes(): string {
    return this.sharedvar.backend_url + '/documents';
  }

  getUrl(): string {
    return this.sharedvar.backend_url + '/requests';
  }
  reload() {
    window.location.reload();
  }

  clickedOnActions(type: any, column: any, data: any, event: any): void {
    if (type === 'cellClicked' && column.colId === 'actions') {
      console.log(event);
      if (event.event.target.getAttribute('id') === 'edit_action') {
        console.log('hi');
        // this.router.navigate(
        //   ['/user/newRequest'],
        //   {queryParams: {
        //     docId: data._id
        //   }}

        // )
        // setTimeout(()=>{this.reload();},2000);
        let data1 = {
          data: data,
          userInfo: this.userInfo,
        };
        this.openDialog('edit_action', data1);
      }
    }
    // if(type === 'cellClicked' && column.colId === "files") {
    //   console.log(event);
    //   if(event.event.target.getAttribute("id") === "view_attachments") {
    //     console.log("hi");
    //   }

    // }
  }
  openDialog(actionType: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    if (actionType === 'edit_action') {
      const modalRef = this.matDialog.open(ARequestActionComponent, {
        data: {
          ComponentData: data,
          action: actionType,
        },
        ...this.defaultDialogConfig,
      });

      modalRef.afterClosed().subscribe((result) => {
        this.loadAllDocumentTypes();
      });
    }
  }

  defaultDialogConfig = {
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
    minHeight: '45vh',
    maxHeight: '75vh',
  };
}
