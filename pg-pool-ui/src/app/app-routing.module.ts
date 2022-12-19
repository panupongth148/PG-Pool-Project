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
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AssignResourceComponent } from './assign-resource/assign-resource.component';
import { AuthAuthenticatedGuard } from './auth-authenticated.guard';

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
    canActivate: [AuthAuthenticatedGuard]
  },
  { path: 'newresource', component: NewResourceComponent,
  canActivate: [AuthAuthenticatedGuard] },
  { path: 'project', component: ProjectListComponent,
  canActivate: [AuthAuthenticatedGuard] },
  {
    path: 'project/:id',
    component: ProjectDetailComponent
  },
  { path: 'new/project', component: NewProjectComponent,
  canActivate: [AuthAuthenticatedGuard] },
  { path: 'resource/:id', component: ResourceDetailComponent},
  { path: 'dashboard', component: DashboardProjectsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'request', component: AssignResourceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
