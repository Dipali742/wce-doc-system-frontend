import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'dialog-b',
  templateUrl: 'a-actions.component.html',
})
export class AActionComponent {
  actionType: any;
  dialogData: any;
  actionsDataColumns: any;
  actionsData: any;
  addComment: any;
  approveRequestForm: any;
  file: File;
  currentStatus = 'rework';
  statuses = ['rejected', 'rework'];
  files: Array<File> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public sharedvar: SharedVariablesComponent,
    private userService: UserService,
    public dialogRef: MatDialogRef<AActionComponent>
  ) {
    this.actionType = data.action;
    this.dialogData = data;
    this.addComment = FormGroup;
    this.approveRequestForm = FormGroup;
    this.setDialogData();
    console.log(this.dialogData);
  }

  ngOnInit() {
    this.addComment = this.fb.group({
      comment: new FormControl('', [Validators.required]),
    });

    this.approveRequestForm = this.fb.group({
      comment: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
  }

  onChange(event: any) {
    this.files = <Array<File>>event.target.files;
    // this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    console.log(this.file);
  }

  setDialogData() {
    this.actionsDataColumns = [
      {
        headerName: 'Attribute Name',
        field: 'attributeNames',
        width: 350,
      },
      {
        headerName: 'value',
        field: 'attributeDescription',
        width: 350,
      },
    ];

    this.actionsData = [
      {
        attributeNames: 'Student PRN',
        attributeDescription: this.dialogData.ComponentData.user.prn,
      },
      {
        attributeNames: 'Document Type',
        attributeDescription: this.dialogData.ComponentData.document_type.name,
      },
      {
        attributeNames: 'Requested at',
        attributeDescription: this.dialogData.ComponentData.requested_at,
      },
    ];
  }

  OnDecline() {
    console.log(this.currentStatus);
    console.log('formdata request : ', this.addComment);
    console.log('formdata request2 : ', this.approveRequestForm);

    const sendDataToBackend = {
      admin_comments: this.addComment.value.comment,
      status: this.currentStatus,
    };

    console.log('back : ', sendDataToBackend);
    this.userService
      .declineRequest(this.getUrlDecline(), sendDataToBackend)
      .subscribe(
        (data) => {
          this.successAlert = true;
          if (this.currentStatus === 'rework') {
            this.successMessage = 'Request sent to rework';
          } else {
            this.successMessage = 'Request declined';
          }
          setTimeout(() => {
            this.OnCancel(), 5000;
          });
        },
        (err) => {
          this.errorFailed = true;
        }
      );
  }

  errorFailed: Boolean = false;
  errorMessage = '';
  successAlert: Boolean = false;
  successMessage = '';
  OnApprove() {
    const formData: any = new FormData();
    const files: Array<File> = this.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i]['name']);
    }
    formData.append('admin_comments', this.addComment.value.comment);
    formData.append('status', 'Approved');
    console.log(this.addComment.value.comment);

    this.userService.declineRequest(this.getUrlApprove(), formData).subscribe(
      (data) => {
        console.log(data);
        this.successAlert = true;
        this.successMessage = 'Request approved';
        setTimeout(() => {
          this.OnCancel(), 5000;
        });
      },
      (err) => {
        this.errorFailed = true;
      }
    );
  }

  getUrlApprove() {
    return (
      this.sharedvar.backend_url +
      '/requests/updateApproveStatus/' +
      this.dialogData.ComponentData._id
    );
  }

  getUrlDecline() {
    return (
      this.sharedvar.backend_url +
      '/requests/updateStatus/' +
      this.dialogData.ComponentData._id
    );
  }
  OnCancel() {
    this.dialogRef.close();
  }

  valid() {
    if (this.addComment.value.comment != '') return false;
    return true;
  }
  validApproval() {
    if (this.addComment.value.comment != '' && this.files.length != 0)
      return false;
    return true;
  }
}
