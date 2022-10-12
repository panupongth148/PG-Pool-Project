import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import UserModel from 'src/app/shared/interface/UserModel';
@Injectable({
  providedIn: 'root'
})
export class UserCommunicateService {

  constructor() { }

  private userId = new Subject<UserModel>();
  userId$ = this.userId.asObservable();

  getUser(user: UserModel) {
    this.userId.next(user);
  }
}
