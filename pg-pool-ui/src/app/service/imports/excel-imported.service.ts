import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelImportedService {

  constructor(private http: HttpClient) { }


  sendFileExcel(formData: FormData) : Observable<any>{ 
    return this.http.post('api/employee/upload', formData);
  }
}
