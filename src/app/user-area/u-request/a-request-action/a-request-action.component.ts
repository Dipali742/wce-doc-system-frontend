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
    this.userInfo = this.dialogData.userInfo;
    this.docType = this.dialogData.data;
    this.createRequestForm = FormGroup;
    this.addComment = FormGroup;
    console.log("I'm dialog data : ", this.docType);
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
    });
  }
  onChange(event: any) {
    this.files = <Array<File>>event.target.files;
    // this.file = event.target.files[0];
  }

  getUrl(): string {
    return this.sharedvar.backend_url + '/requests';
  }

  OnEdit() {
    console.log(this.file);
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
          this.dialogRef.close();
        } else {
        }
        // console.log(data);
      },
      (err: any) => {}
    );
  }

  OnCancel() {
    this.dialogRef.close();
  }
}
