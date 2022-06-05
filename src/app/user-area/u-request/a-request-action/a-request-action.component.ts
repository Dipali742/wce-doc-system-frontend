import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

import {
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'dialog--request-b',
  templateUrl: 'a-request-action.component.html',
})
export class ARequestActionComponent {
  actionType: any;
  dialogData: any;
  actionsDataColumns: any;
  actionsData: any;
  createRequestForm: any;
  file: File;
  userInfo: any;
  docType: any;
  files: Array<File> = [];
  addComment: any;
  submitEnable: false;
  DocumentsUploaded = [
    {
      name: '',
      path: '',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private load_data: LoadUserDataComponent,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ARequestActionComponent>,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent
  ) {
    this.actionType = data.action;
    this.dialogData = data.ComponentData;

    if (this.actionType === 'rework_request') {
      this.userInfo = this.dialogData.user;
      this.docType = this.dialogData.document_type;
    } else {
      this.userInfo = this.dialogData.userInfo;
      this.docType = this.dialogData.data;
    }
    this.createRequestForm = FormGroup;
    this.addComment = FormGroup;
    console.log("I'm dialog data : ", this.dialogData);
  }

  ngOnInit() {
    this.addComment = this.fb.group({
      comment: new FormControl('', [Validators.required]),
    });

    this.createRequestForm = this.fb.group({
      prn: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      approvalFrom: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      filename: new FormControl('', [Validators.required]),
    });

    // var i: number;
    // for (i = 0; i < this.dialogData.document_type.requiredDoc.length; i++) {
    //  console.log(
    //    this.dialogData.ComponentData.document_type.requiredDoc[i],
    //    ' ',
    //    this.dialogData.ComponentData.files[i]
    //  );

    //if (this.dialogData.ComponentData.files[i].length != 0) {
    // this.DocumentsUploaded.push({
    //   name: this.dialogData.ComponentData.document_type.requiredDoc[0],
    //   path: '',
    // });
    //  } else {
    //  }
    // }
    // console.log('sdfsfdfh', this.DocumentsUploaded);
  }
  onChange(event: any) {
    console.log('sailee ki amanat : ', event.target.files[0]);
    this.files.push(event.target.files[0]);

    // this.file = event.target.files[0];
  }

  errorFailed: Boolean = false;
  errorMessage = '';
  successAlert: Boolean = false;
  successMessage = '';
  checkvalid() {
    // console.log('checkvalid');
    if (this.docType.requiredDoc.length !== 0) {
      if (
        this.addComment.value.comment !== '' &&
        (this.files.length === this.docType.requiredDoc.length ||
          this.files.length > this.docType.requiredDoc.length)
      ) {
        return false;
      }
      return true;
    } else {
      //console.log(this.addComment.value.comment);
      if (this.addComment.value.comment !== '') {
        return false;
      }
      return true;
    }
  }
  getUrl(): string {
    return this.sharedvar.backend_url + '/requests';
  }

  OnEdit() {
    console.log(this.files);

    if (this.actionType === 'rework_request') {
      const formData: any = new FormData();
      const files: Array<File> = this.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i], files[i]['name']);
      }
      formData.append('status', 'pending');
      formData.append('comments', this.addComment.value.comment);
      console.log(this.addComment.value.comment);
      this.userService
        .updateDocumentType(this.getUrlForUpdate(), formData)
        .subscribe(
          (data: any) => {
            if (data) {
              this.successAlert = true;
            } else {
            }
            // console.log(data);
          },
          (err: any) => {
            this.errorFailed = true;
          }
        );
    } else {
      const formData: any = new FormData();
      const files: Array<File> = this.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i], files[i]['name']);
      }
      formData.append('user', this.userInfo._id);
      formData.append('document_type', this.docType._id);
      formData.append('requiredValidations', 'scholarship');
      formData.append('comments', this.addComment.value.comment);
      console.log(this.addComment.value.comment);
      this.userService.addRequest(this.getUrl(), formData).subscribe(
        (data: any) => {
          if (data) {
            this.successAlert = true;
          } else {
          }
          // console.log(data);
        },
        (err: any) => {
          this.errorFailed = true;
        }
      );
    }
    setTimeout(() => {
      this.dialogRef.close(), 5000;
    });
  }

  getUrlForUpdate() {
    return (
      this.sharedvar.backend_url +
      '/requests/updateRequest/' +
      this.dialogData._id
    );
  }
  OnCancel() {
    this.dialogRef.close();
  }
}
