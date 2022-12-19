import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin:any
  constructor(private authService:AuthService){
    const token = localStorage.getItem('PG_Pool_token');
    this.isLogin = !!token;
    

  }
  title = 'pg-pool-ui';
  
}
