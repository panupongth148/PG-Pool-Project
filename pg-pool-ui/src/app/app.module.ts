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
@NgModule({
  declarations: [
    AppComponent,
    ImportedExcelComponent,
    ResourceListComponent,
    NavbarComponent,
    HomepageComponent,
    NewResourceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
