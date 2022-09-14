import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResourceListComponent } from './resource-list/resource-list.component'
import { HomepageComponent } from './homepage/homepage.component';
import { NewResourceComponent } from './new-resource/new-resource.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },

  {
    path: 'resource',
    component: ResourceListComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'new', // child route path
        component: NewResourceComponent, // child route component that the router renders
      },
    ],
  },
  { path: 'newresource', component: NewResourceComponent },
  { path: 'project', component: ProjectListComponent },
  {
    path: 'project/:id',
    component: ProjectDetailComponent
  },
  { path: 'project/new', component: NewProjectComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
