import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { MatDialogModule,MatDialogRef,MatDialogTitle } from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "dialog-b",
  templateUrl: 'a-view-request.component.html'
})
export class AViewRequestComponent {
    actionType:any;
    dialogData : any;
    file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  public dialogRef: MatDialogRef<AViewRequestComponent>) {
      this.actionType = data.action;
      this.dialogData = data;
      console.log(this.dialogData);
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}