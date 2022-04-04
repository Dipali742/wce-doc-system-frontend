import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendUrlComponent } from 'src/app/common/backend-url';
import { LoadUserDataComponent } from 'src/app/common/load-user-data';
import { SharedVariablesComponent } from 'src/app/common/shared-variables';

@Component({
  selector: 'app-u-help',
  templateUrl: './u-help.component.html',
  styleUrls: ['./u-help.component.css']
})
export class UHelpComponent implements OnInit {
  
  constructor( private router: Router,
    private bkd: BackendUrlComponent,
    public sharedvar:SharedVariablesComponent,
    private load_data: LoadUserDataComponent) {
   
   }

  ngOnInit(): void {
    // this.reload();
    if(localStorage['InfoWCEDoc']) {
      this.load_data.onRefresh();
    }
  }
  reload() {
    window.location.reload();
  }

}
