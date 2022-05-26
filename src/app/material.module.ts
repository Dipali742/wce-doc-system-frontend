import { NgModule } from  '@angular/core';
 
import {MatButtonModule} from  '@angular/material/button';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {Bre} from '@angular/cdk/layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatGridListModule
    // BreakpointObserverModule

],
exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    
    MatSelectModule,
    MatDialogModule,
    MatChipsModule,
    MatGridListModule
    // BreakpointObserver
],
entryComponents:[MatDialogModule]
})
 
export  class  MyMaterialModule { }