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

@Component({
  selector: 'dialog-b',
  templateUrl: 'u-view-request.component.html',
})
export class UViewRequestComponent {
  actionType: any;
  dialogData: any;
  actionsDataColumns: any;
  actionsData: any;
  addComment: any;
  approveRequestForm: any;
  file: File;
  DocumentsUploaded = [
    {
      name: '',
      path: '',
    },
  ];

  filename: any;
  filepath: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UViewRequestComponent>
  ) {
    this.actionType = data.action;
    this.dialogData = data;
    this.addComment = FormGroup;
    this.approveRequestForm = FormGroup;
    console.log(this.dialogData);
    var e: any;
  }

  ngOnInit() {
    var i: number;
    for (i = 0; i < this.dialogData.ComponentData.files.length; i++) {
      console.log(
        this.dialogData.ComponentData.document_type.requiredDoc[i],
        ' ',
        this.dialogData.ComponentData.files[i]
      );

      if (this.dialogData.ComponentData.files[i].length != 0) {
        this.DocumentsUploaded.push({
          name: this.dialogData.ComponentData.document_type.requiredDoc[i],
          path:
            'https://wce-tracker-api.herokuapp.com/' +
            this.dialogData.ComponentData.files[i].filePath,
        });
      } else {
      }
    }
    console.log('sdfsfdfh', this.DocumentsUploaded);
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    console.log(this.file);
  }

  Onsubmit() {
    this.dialogRef.close();
  }
}
