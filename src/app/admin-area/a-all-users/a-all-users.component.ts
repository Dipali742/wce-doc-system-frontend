import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { STUDENT_GRID_COLUMNS } from '../grid-columns/student-data-grid-columns';
import * as XLSX from 'xlsx';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AUpdateStudentActionComponent } from './a-update-student-action/a-update-student-action.component';
@Component({
  selector: 'app-a-all-users',
  templateUrl: './a-all-users.component.html',
  styleUrls: ['./a-all-users.component.css'],
})
export class AAllUsersComponent implements OnInit {
  studentDataGridColumns: Array<any> = [...STUDENT_GRID_COLUMNS];
  studentDataGridData: any = [];
  backendUrl = '';
  addStudentForm: any;
  coursesVar = ['UG', 'PG'];
  branchVar = [
    'Computer Science and Engineering',
    'Information Technology',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Electronics Engineering',
    'Civil Engineering',
  ];
  yearVar = [1, 2, 3, 4];
  files: Array<File> = [];

  constructor(
    private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar: SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {
    this.backendUrl = bkd.backend_url;
    this.addStudentForm = FormGroup;
  }

  ngOnInit(): void {
    // this.reload();
    if (localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
    this.loadStudentData();
    this.addStudentForm = this.fb.group({
      prn: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
    });
  }

  onTabChange(event: { index: number }) {
    //if(event.index ===1) {
    this.loadStudentData();
    this.successAlert = false;
    //}
  }
  openDialog(actionType: string, data: any) {
    const dialogConfig = new MatDialogConfig();
    if (actionType === 'edit_action') {
      // const modalRef = this.matDialog.open(ADocumentActionComponent, {
      //   data: {
      //     ComponentData: data,
      //     action: actionType,
      //   },
      //   ...this.defaultDialogConfig,
      // });
      // modalRef.afterClosed().subscribe((result) => {
      //   this.loadStudentData();
      // });
    } else {
      const modalRef = this.matDialog.open(AUpdateStudentActionComponent, {
        data: {
          ComponentData: data,
          action: actionType,
        },
        ...this.defaultDialogConfigDel,
      });

      modalRef.afterClosed().subscribe((result: any) => {
        this.loadStudentData();
      });
    }
  }

  defaultDialogConfig = {
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
    minHeight: '45vh',
    maxHeight: '75vh',
  };

  defaultDialogConfigDel = {
    width: '50vw',
    minWidth: '50vw',
    maxWidth: '50vw',
    minHeight: '30vh',
    maxHeight: '30vh',
  };
  clickedOnActions(type: any, column: any, data: any, event: any): void {
    if (type === 'cellClicked' && column.colId === 'actions') {
      console.log(event);
      if (event.event.target.getAttribute('id') === 'edit_action') {
        console.log('hi');
        this.openDialog('edit_action', data);
      }
      if (event.event.target.getAttribute('id') === 'delete_action') {
        console.log('approve');
        this.openDialog('delete_action', data);
      }
    }
    // if(type === 'cellClicked' && column.colId === "files") {
    //   console.log(event);
    //   if(event.event.target.getAttribute("id") === "view_attachments") {
    //     console.log("hi");
    //   }

    // }
  }
  successAlert: Boolean = false;
  loadStudentData() {
    this.userService.getStudentData(this.getUrl()).subscribe(
      (data) => {
        if (data) {
          this.studentDataGridData = data.filter(
            (a: { role: string }) => a.role === 'student'
          );
          console.log('Hi', this.studentDataGridData);
        } else {
        }
        // console.log(data);
      },
      (err) => {}
    );
  }

  getUrl(): string {
    return this.sharedvar.backend_url + '/users';
  }

  onChange(event: any) {
    this.files = <Array<File>>event.target.files;
    // this.file = event.target.files[0];
  }

  reload() {
    window.location.reload();
  }

  errorFailed: Boolean = false;
  Onsubmit() {
    console.log('FormData : ', this.addStudentForm.value);
    const studentData = {
      prn: this.addStudentForm.value.prn.toUpperCase(),
      fname: this.addStudentForm.value.fname,
      lname: this.addStudentForm.value.lname,
      email: this.addStudentForm.value.email.toLowerCase(),
      phone: this.addStudentForm.value.phone,
      course: this.addStudentForm.value.course,
      branch: this.addStudentForm.value.branch,
      year: this.addStudentForm.value.year,
      password: '12345',
      username: this.addStudentForm.value.prn,
      role: 'student',
      documents: [],
      documents_issued: 0,
    };
    this.addStudent(studentData);
  }

  addStudent(studentData: {
    prn: any;
    fname: any;
    lname: any;
    email: any;
    phone: any;
    course: any;
    branch: any;
    year: any;
    password: string;
    username: any;
    role: string;
    documents: never[];
    documents_issued: number;
  }) {
    this.userService.addStudent(this.getUrl(), studentData).subscribe(
      (data) => {
        if (data) {
        } else {
        }
        console.log(data);
        this.successAlert = true;
        this.files = [];
        this.loadStudentData();
        this.Onreset();
      },
      (err) => {
        this.errorFailed = true;
        this.successAlert = false;
      }
    );
  }

  checkPRN() {
    if (
      this.studentDataGridData.find((a: { prn: any }) => {
        if (this.addStudentForm.value.prn && a.prn) {
          a.prn.toUpperCase() === this.addStudentForm.value.prn.toUpperCase();
        }
      })
    )
      return true;
    return false;
  }

  checkValid() {
    if (
      this.addStudentForm.value.prn &&
      this.addStudentForm.value.fname &&
      this.addStudentForm.value.lname &&
      this.addStudentForm.value.email &&
      this.addStudentForm.value.phone &&
      this.addStudentForm.value.course &&
      this.addStudentForm.value.branch &&
      this.addStudentForm.value.year &&
      this.addStudentForm.value.prn
    )
      return false;
    return true;
  }
  Onreset() {
    this.addStudentForm.reset();
  }
  OnsubmitExcel() {
    console.log(this.files);
    const selectedFile = this.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);

    fileReader.onload = (event) => {
      console.log(event);
      let binaryData = event.target ? event.target.result : null;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data);
        data.forEach((a: any) => {
          (a['password'] = '12345'),
            (a['username'] = a['prn']),
            (a['role'] = 'student'),
            (a['documents'] = []),
            (a['documents_issued'] = 0);
          console.log('hi', a);

          if (
            this.studentDataGridData.find((b: { prn: any }) => {
              console.log(a.prn, ' ', b.prn);
              a.prn === b.prn;
            })
          ) {
            this.failedStudents(a);
          } else {
            this.addStudent(a);
          }
        });
      });
    };
  }
  failedStudents(a: any) {
    const worksheet1 = XLSX.utils.json_to_sheet(a);
    const workbook1 = {
      Sheets: {
        data: worksheet1,
      },
      SheetNames: ['data'],
    };
    const excelBuffer = XLSX.write(workbook1, {
      bookType: 'xlsx',
      type: 'array',
    });
    console.log('HDGFHG', excelBuffer);
  }
}
