import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import ResourceModel from '../../shared/interface/ResourceModel'
import { Observable } from 'rxjs';
import AddResourceModel from 'src/app/shared/interface/AddResourceModel';
@Injectable({
  providedIn: 'root'
})
export class ResourceHttpRequestService {

  constructor(private http: HttpClient) { 

  }

  getAllResource(){
    return this.http.get<Array<ResourceModel>>('/api/resource');
  }


  AddResource(addResource: AddResourceModel): Observable<AddResourceModel>{
    console.log(addResource)
    return this.http.post<AddResourceModel>("/api/resource", addResource);
  }

  getResourceByProductCode(id: string){
    return this.http.get<any>("api/resource/findbypc/" + id);
  }

  getResourceById(id: string){
    
    return this.http.get<any>("api/resource/"+ id);
  }
  getResourceEmpty(){
    return this.http.get<any>("api/resource/empty");
  }

  deleteResourceById(id:any){
    return this.http.delete<any>('api/resource/'+id);
  }

  getChartData(){
    return this.http.get<Array<any>>('api/resource/getchartdetail')
  }
}
