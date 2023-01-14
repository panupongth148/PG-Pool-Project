import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserHttpRequestService } from '../service/user/user-http-request.service';
import LoginModel from '../shared/interface/LoginModel';
import LoginResponseModel from '../shared/interface/LoginResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token?:LoginResponseModel
  constructor(private userHttpRequestService:UserHttpRequestService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  onSubmit(){
    const user = this.loginForm.value as LoginModel
    this.userHttpRequestService.login(user).subscribe((val) =>{
      this.token = val;
      localStorage.setItem('PG_Pool_token', val.token);
      this.router.navigate(['/'])
            .then(() => {
                window.location.reload();
            });
    })
  }
}
