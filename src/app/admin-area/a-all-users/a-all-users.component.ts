import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';
import { UserService } from 'src/app/_services/user.service';
import { STUDENT_GRID_COLUMNS } from '../grid-columns/student-data-grid-columns';    
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-a-all-users',
  templateUrl: './a-all-users.component.html',
  styleUrls: ['./a-all-users.component.css']
})
export class AAllUsersComponent implements OnInit {

  studentDataGridColumns: Array<any> = [...STUDENT_GRID_COLUMNS];
  studentDataGridData: any = [];
  backendUrl = "";
  addStudentForm : any;
  coursesVar = [
    "UG",
    "PG"
  ];
  branchVar = [
    "Computer Science and Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Civil Engineering"
  ];
  yearVar = [
    1,
    2,
    3,
    4
  ]

  constructor( private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent,
    private userService: UserService,
    private fb: FormBuilder) {
    this.backendUrl = bkd.backend_url;
    this.addStudentForm = FormGroup;
   }

  ngOnInit(): void {
    // this.reload();
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
    this.loadStudentData();
    this.addStudentForm = this.fb.group({
      prn : new FormControl('', [Validators.required]),
      fname : new FormControl('', [Validators.required]),
      lname : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required]),
      phone : new FormControl('', [Validators.required]),
      course : new FormControl('', [Validators.required]),
      branch : new FormControl('', [Validators.required]),
      year : new FormControl('', [Validators.required])
    })
  }

  onTabChange(event: { index: number; }) {
    //if(event.index ===1) {
      this.loadStudentData();
   //}  
  }

  loadStudentData() {
    this.userService.getStudentData(this.getUrl()).subscribe(
      data => {
        if(data) {
          this.studentDataGridData = data.filter((a: { role: string; }) => a.role === 'student');
          console.log("Hi",this.studentDataGridData);
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
    return (this.sharedvar.backend_url+'/users');
  }

  reload() {
    window.location.reload();
  }

  Onsubmit() {
    console.log("FormData : ",this.addStudentForm.value);
    const studentData = {
      "prn" : this.addStudentForm.value.prn,
      "fname" : this.addStudentForm.value.fname,
      "lname" :this.addStudentForm.value.lname,
      "email" : this.addStudentForm.value.email,
      "phone" : this.addStudentForm.value.phone,
      "course" : this.addStudentForm.value.course,
      "branch" : this.addStudentForm.value.branch,
      "year" : this.addStudentForm.value.year,
      "password" : "12345",
      "username" : this.addStudentForm.value.prn,
      "role" : "student",
      "documents":[],
      "documents_issued":0
    };

    this.userService.addStudent(this.getUrl(), studentData).subscribe(
      data => {
        if(data) {
          
        }
        else {
        }
        console.log(data);
      },
      err => {
      }
    );
  }

  Onreset() {
    this.addStudentForm.reset();
  }
}
