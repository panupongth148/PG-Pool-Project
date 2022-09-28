import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportedExcelComponent } from './imported-excel/imported-excel.component';
import { HttpClientModule} from '@angular/common/http';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewResourceComponent } from './new-resource/new-resource.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectBoxComponent } from './project-list/project-box/project-box.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { FileUploadModule } from "primeng/fileupload";
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartResourceComponent } from './chart-resource/chart-resource.component';
import { CalendarResourceComponent } from './calendar-resource/calendar-resource.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [
    AppComponent,
    ImportedExcelComponent,
    ResourceListComponent,
    NavbarComponent,
    HomepageComponent,
    NewResourceComponent,
    ProjectListComponent,
    ProjectBoxComponent,
    NewProjectComponent,
    ResourceDetailComponent,
    ProjectDetailComponent,
    DashboardProjectsComponent,
    ChartResourceComponent,
    CalendarResourceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FileUploadModule,
    NgChartsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    DropdownModule,
    BrowserAnimationsModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
