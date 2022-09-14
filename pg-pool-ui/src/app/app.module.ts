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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
