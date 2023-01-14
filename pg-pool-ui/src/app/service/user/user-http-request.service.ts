import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpRequestService {

  constructor(private http: HttpClient) { }


  registerUser(user:any){

    return this.http.post("/api/user/", user)
  }

  login(login:any){
    return this.http.post<any>("/api/user/login", login)
  }
}
