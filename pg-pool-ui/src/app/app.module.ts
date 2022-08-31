import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportedExcelComponent } from './imported-excel/imported-excel.component';
import { HttpClientModule} from '@angular/common/http';
import { ResourceListComponent } from './resource-list/resource-list.component';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    ImportedExcelComponent,
    ResourceListComponent,
    NavbarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
