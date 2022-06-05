import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

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
  selector: 'dialog-b',
  templateUrl: 'a-update-student-action.component.html',
})
export class AUpdateStudentActionComponent {
  actionType: any;
  dialogData: any;
  actionsDataColumns: any;
  actionsData: any;
  addComment: any;
  documentTypeForm: any;
  file: File;
  ApprovalFromVar = ['admin', 'scholarship'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private load_data: LoadUserDataComponent,
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<AUpdateStudentActionComponent>,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent
  ) {
    this.actionType = data.action;
    this.dialogData = data.ComponentData;
    this.addComment = FormGroup;
    this.documentTypeForm = FormGroup;
    console.log('sf', this.dialogData);
  }

  ngOnInit() {
    this.documentTypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      sendTo: new FormControl('', [Validators.required]),
      requiredDoc: new FormControl(''),
    });
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.dialogData.requiredDoc.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(docType: any): void {
    const index = this.dialogData.requiredDoc.indexOf(docType);

    if (index >= 0) {
      this.dialogData.requiredDoc.splice(index, 1);
    }
  }

  Onsubmit() {
    this.dialogRef.close();
  }
  OnDelete() {
    console.log('its this stupid id dipps', this.dialogData._id);
    this.userService.deleteDocumentType(this.getUrlForDelete()).subscribe(
      (data) => {
        if (data) {
          this.dialogRef.close();
        } else {
        }
        // console.log(data);
      },
      (err) => {}
    );
  }

  getUrlForDelete(): string {
    return this.sharedvar.backend_url + '/users/' + this.dialogData._id;
  }

  getUrlForEdit(): string {
    return this.sharedvar.backend_url + '/documents/' + this.dialogData._id;
  }

  docTypes: string[] = [];
  OnEdit() {
    console.log('its this stupid id dipps', this.dialogData._id);

    this.dialogData.requiredDoc.forEach((element: string) => {
      this.docTypes.push(element);
    });
    this.documentTypeForm.value.requiredDoc = this.docTypes;
    this.userService
      .updateDocumentType(this.getUrlForEdit(), this.documentTypeForm.value)
      .subscribe(
        (data) => {
          if (data) {
            this.dialogRef.close();
          } else {
          }
          // console.log(data);
        },
        (err) => {}
      );
  }

  OncancelAction() {}
}
