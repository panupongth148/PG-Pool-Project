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
  getAllProjectByUserId(id: string){
    return this.http.get<Array<ProjectResponseModel>>('/api/project/findbyownerid/'+id)
  }
  addProject(project: any){
    return this.http.post<any>('/api/project', project);
  }

  getProject(id:any){
    return this.http.get<any>('/api/project/' + id);
  }
  getProjectByProductCode(id : any){
    return this.http.get<any>('/api/project/findbypc/'+ id);
  }

  getProjectsByProductCode(idList : any[]){
    console.log("many");
    return this.http.post<Array<any>>('/api/project/findmanybypc', idList);
  }

  importExcel(excelFile:any){
    console.log("import")
    return this.http.post('/api/project/upload', excelFile)
  }
// not sure
  getProjectHaveRequest(){
    return this.http.get<Array<any>>("api/project/haverequest");
  }

  getProjectRequsts(){
    return this.http.get<Array<any>>("api/project/getrequest");
  }

  getRequestAllAmount(){
    return this.http.get<any>("api/project/allamount");
  }
  
  deleteProjectById(id:any){
    return this.http.delete<any>("api/project/"+id)
  }
}
