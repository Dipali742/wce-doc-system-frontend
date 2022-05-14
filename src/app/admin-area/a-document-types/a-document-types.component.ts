import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { DOCUMENT_TYPE_GRID_COLUMNS } from '../grid-columns/document-types-grid-columns';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-a-document-types',
  templateUrl: './a-document-types.component.html',
  styleUrls: ['./a-document-types.component.css']
})
export class ADocumentTypesComponent implements OnInit {

  addDocTypeForm : any;
  ApprovalFromVar = [
    "admin",
    "scholarship"
  ]
  constructor( private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private fb: FormBuilder,
    private userService: UserService) {
      this.addDocTypeForm = FormGroup;
   }

  ngOnInit(): void {
    // this.reload();
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
    
    this.loadAllDocumentTypes();
    this.addDocTypeForm = this.fb.group({
      name : new FormControl('', [Validators.required]),
      ApprovalFrom : new FormControl('', [Validators.required]),
      RequiredDocuments : new FormControl(''),
    })
  
  }
  documentTypesGridColumns : Array<any> = [...DOCUMENT_TYPE_GRID_COLUMNS];
  documentTypesGridData : any
  onTabChange(event: { index: number; }) {
    if(event.index ===1) {
      this.loadAllDocumentTypes();
   }  
  }
  loadAllDocumentTypes() {
    this.userService.getDocumentTypes(this.getUrl()).subscribe(
      data => {
        if(data) {
          this.documentTypesGridData = data;
          console.log("Hi doc types",this.documentTypesGridData);
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
    return (this.sharedvar.backend_url+'/documents');
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
    {name: 'Identity card'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.documentTypes.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.documentTypes.indexOf(fruit);

    if (index >= 0) {
      this.documentTypes.splice(index, 1);
    }
  }
}
