import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { MatDialogModule,MatDialogTitle } from '@angular/material/dialog';
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
    actionsDataColumns : any;
    actionsData: any;
    addComment : any;
    approveRequestForm: any;
    file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder) {
      this.actionType = data.action;
      this.dialogData = data;
      this.addComment = FormGroup
      this.approveRequestForm = FormGroup;
      this.setDialogData();
      console.log(this.dialogData);
  }

  ngOnInit() {
    this.addComment = this.fb.group({
        comment : new FormControl('', [Validators.required])
      })
    
      this.approveRequestForm = this.fb.group({
        comment : new FormControl('', [Validators.required]),
        file : new FormControl('', [Validators.required])
      })
  }

  onChange(event: any) {
    this.file = event.target.files[0];
}

// OnClick of button Upload
onUpload() {
    console.log(this.file);
    
}

  setDialogData() {
      this.actionsDataColumns = [
          {
              headerName: "Attribute Name",
              field: "attributeNames",
              width:350
          },
          {
            headerName: "value",
            field: "attributeDescription",
            width:350
           }
        ]

        this.actionsData = [
            {
                attributeNames:"Student PRN",
                attributeDescription: this.dialogData.ComponentData.user.prn
            },
            {
                attributeNames:"Document Type",
                attributeDescription: this.dialogData.ComponentData.document_type.name
            },
            {
                attributeNames:"Requested at",
                attributeDescription: this.dialogData.ComponentData.requested_at
            }
        ]
      }

  
}