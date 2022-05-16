import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { DOCUMENT_TYPE_GRID_COLUMNS } from '../grid-columns/document-types-grid-columns';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ADocumentActionComponent } from './a-document-action/a-document-action.component';
@Component({
  selector: 'app-a-document-types',
  templateUrl: './a-document-types.component.html',
  styleUrls: ['./a-document-types.component.css']
})
export class ADocumentTypesComponent implements OnInit {

  addDocTypeForm: any;
  ApprovalFromVar = [
    "admin",
    "scholarship"
  ]
  constructor(private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private fb: FormBuilder,
    private userService: UserService,
    private matDialog: MatDialog) {
    this.addDocTypeForm = FormGroup;
  }

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }

    this.loadAllDocumentTypes();
    this.addDocTypeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      sendTo: new FormControl('', [Validators.required]),
      requiredDoc: new FormControl(''),
    })

  }
  documentTypesGridColumns: Array<any> = [...DOCUMENT_TYPE_GRID_COLUMNS];
  documentTypesGridData: any
  onTabChange(event: { index: number; }) {
    if (event.index === 0) {
      this.loadAllDocumentTypes();
    }
  }
  loadAllDocumentTypes() {
    this.userService.getDocumentTypes(this.getUrl()).subscribe(
      data => {
        if (data) {
          this.documentTypesGridData = data;
          console.log("Hi doc types", this.documentTypesGridData);
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
    return (this.sharedvar.backend_url + '/documents');
  }

  reload() {
    window.location.reload();
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  documentTypes = [
    { name: 'Identity card' },
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.documentTypes.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(docType: any): void {
    const index = this.documentTypes.indexOf(docType);

    if (index >= 0) {
      this.documentTypes.splice(index, 1);
    }
  }
  docTypes: string[] = [];

  resetForm() {
    this.addDocTypeForm.reset();
    this.documentTypes = [
      { name: 'Identity card' },
    ];
  }
  onSubmit() {

    this.documentTypes.forEach(element => {
      this.docTypes.push(element.name);
    });
    this.addDocTypeForm.value.requiredDoc = this.docTypes;
    console.log(this.addDocTypeForm.value)
    this.userService.addDocumentTypes(this.getUrl(), this.addDocTypeForm.value).subscribe(
      data => {
        if (data) {

        }
        else {
        }
        console.log(data);
        this.resetForm();
      },
      err => {
      }
    );
  }

  openDialog(actionType: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    if (actionType === "edit_action") {
      const modalRef = this.matDialog.open(ADocumentActionComponent, {
        data: {
          ComponentData: data,
          action: actionType
        },
        ...this.defaultDialogConfig
      });

      modalRef.afterClosed().subscribe(
        result => {
          this.loadAllDocumentTypes();
        }
      )
    }
    else {
      const modalRef = this.matDialog.open(ADocumentActionComponent, {
        data: {
          ComponentData: data,
          action: actionType
        },
        ...this.defaultDialogConfigDel
      });

      modalRef.afterClosed().subscribe(
        result => {
          this.loadAllDocumentTypes();
        }
      )
    }


  }

  defaultDialogConfig = {
    width: "50vw",
    minWidth: "50vw",
    maxWidth: "50vw",
    minHeight: "45vh",
    maxHeight: "75vh"
  }

  defaultDialogConfigDel = {
    width: "50vw",
    minWidth: "50vw",
    maxWidth: "50vw",
    minHeight: "30vh",
    maxHeight: "30vh"
  }

  clickedOnActions(type: any, column: any, data: any, event: any): void {
    if (type === 'cellClicked' && column.colId === "actions") {
      console.log(event);
      if (event.event.target.getAttribute("id") === "edit_action") {
        console.log("hi");
        this.openDialog("edit_action", data);
      }
      if (event.event.target.getAttribute("id") === "delete_action") {
        console.log("approve");
        this.openDialog("delete_action", data);
      }
    }
    // if(type === 'cellClicked' && column.colId === "files") {
    //   console.log(event);
    //   if(event.event.target.getAttribute("id") === "view_attachments") {
    //     console.log("hi");
    //   }

    // }
  }
}
