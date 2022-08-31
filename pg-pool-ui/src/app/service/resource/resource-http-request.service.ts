import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import ResourceModel from '../../shared/interface/ResourceModel'
@Injectable({
  providedIn: 'root'
})
export class ResourceHttpRequestService {

  constructor(private http: HttpClient) { 

  }

  getAllResource(){
    return this.http.get<Array<ResourceModel>>('/api/resource');
  }
}
