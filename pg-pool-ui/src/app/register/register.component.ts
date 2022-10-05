import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserHttpRequestService } from '../service/user/user-http-request.service';
import RegisterModel from '../shared/interface/RegisterModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userHttpRequestService:UserHttpRequestService) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  });

  onSubmit(){
    const register = this.registerForm.value as RegisterModel
    console.log(register)
    this.userHttpRequestService.registerUser(register).subscribe(val=>{
      console.log(val)
    })
  }
}
