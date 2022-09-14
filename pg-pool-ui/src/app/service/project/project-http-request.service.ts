import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ProjectResponseModel from 'src/app/shared/interface/ProjectResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectHttpRequestService {

  constructor(private http: HttpClient) { }

  getAllProject(){
    return this.http.get<Array<ProjectResponseModel>>('/api/project')
  }

  addProject(project: any){
    return this.http.post<any>('/api/project', project);
  }

  getProject(id:any){
    return this.http.get<any>('/api/project/' + id);
  }
}