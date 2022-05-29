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
import { STUDENT_REQUEST_GRID_COLUMNS } from '../../grid-columns/student-request-grid-columns';

@Component({
  selector: 'dialog-b',
  templateUrl: 'a-view-request.component.html',
})
export class AViewRequestComponent {
  actionType: any;
  dialogData: any;
  file: File;
  DocumentsUploaded = [
    {
      name: '',
      path: '',
    },
  ];
  studentRequestGridColumns: any;
  studentRequestGridData: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AViewRequestComponent>
  ) {
    this.actionType = data.action;
    this.dialogData = data;
    console.log(this.dialogData);
    this.setDialogData();
    // this.studentRequestGridData = this.dialogData.ComponentData.user;
  }

  ngOnInit() {
    var i: number;
    for (
      i = 0;
      i < this.dialogData.ComponentData.document_type.requiredDoc.length;
      i++
    ) {
      console.log(
        this.dialogData.ComponentData.document_type.requiredDoc[i],
        ' ',
        this.dialogData.ComponentData.files[i]
      );

      this.DocumentsUploaded.push({
        name: this.dialogData.ComponentData.document_type.requiredDoc[i],
        path:
          'https://wce-tracker-api.herokuapp.com/' +
          this.dialogData.ComponentData.files[i].filePath,
      });
    }
    console.log('sdfsfdfh', this.DocumentsUploaded);
  }

  setDialogData() {
    this.studentRequestGridColumns = [
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

    this.studentRequestGridData = [
      {
        attributeNames: 'Student PRN',
        attributeDescription: this.dialogData.ComponentData.user.prn,
      },
      {
        attributeNames: 'Name',
        attributeDescription:
          this.dialogData.ComponentData.user.fname +
          ' ' +
          this.dialogData.ComponentData.user.lname,
      },
      {
        attributeNames: 'Course',
        attributeDescription: this.dialogData.ComponentData.user.course,
      },
      {
        attributeNames: 'Branch',
        attributeDescription: this.dialogData.ComponentData.user.branch,
      },
      {
        attributeNames: 'Year',
        attributeDescription: this.dialogData.ComponentData.user.year,
      },
    ];
  }

  close() {
    this.dialogRef.close();
  }
}
