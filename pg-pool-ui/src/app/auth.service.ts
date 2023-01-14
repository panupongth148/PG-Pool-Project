import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserHttpRequestService } from './service/user/user-http-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private userHttpRequest:UserHttpRequestService) {
    console.log("use guard")
    const token = localStorage.getItem('PG_Pool_token');
    this._isLoggedIn$.next(!!token);
  }

//   login(username: string, password: string) {
//     return this.userHttpRequest.login(username, password).pipe(
//       tap((response: any) => {
//         this._isLoggedIn$.next(true);
//         localStorage.setItem('profanis_auth', response.token);
//       })
//     );
//   }
}