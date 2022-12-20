import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserCommunicateService } from '../service/communicate/user-communicate.service';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';
import UserModel from '../shared/interface/UserModel';

@Component({
  selector: 'app-pre-nav',
  templateUrl: './pre-nav.component.html',
  styleUrls: ['./pre-nav.component.scss']
})
export class PreNavComponent implements OnInit {

  user?: UserModel;
  items: MenuItem[] = []
  userItem: MenuItem[] = []
  constructor(private router: Router, private userComservice: UserCommunicateService, private jwtService: JwtDecodeService, private elementRef: ElementRef) {


  }
  ngAfterViewInit() {
    // this.elementRef.nativeElement.ownerDocument
    //     .body.style.backgroundColor ='#004CFF';
    //     this.elementRef.nativeElement.ownerDocument
    //     .body.style.color ='#FFFFFF';
  }
  ngOnInit() {
    this.userItem = [
      {
        label: 'ออกจากระบบ',
        command: e => this.logout()

      },]
    this.items = [
      // {
      //   label: 'โครงการ',
      //   icon: 'pi pi-fw pi-file',
      //   routerLink: "/project"
      // },
      // {
      //   label: 'ทรัพยากรบุคคล',
      //   icon: 'pi pi-fw pi-pencil',
      //   routerLink: "/resource"
      // },
      // {
      //   label: 'คำร้องขอ',
      //   icon: 'pi pi-fw pi-arrow-right',
      //   routerLink: "/request"
      // },
    ];
    this.authChange();
  }

  toRegister() {
    this.router.navigate(['/register'])
      .then(() => {
        window.location.reload();
      });
  }
  toLogin() {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }
  authChange() {
    const token = localStorage.getItem("PG_Pool_token")
    if (token) {
      const tokenInfo = this.jwtService.getDecodedAccessToken(token); // decode token
      const expireDate = tokenInfo.exp; // get token expiration dateTime
      // console.log(tokenInfo); // show decoded token object in console
      this.user = {
        id: tokenInfo.id,
        username: tokenInfo.username,
        email: tokenInfo.email
      }
      this.userComservice.getUser(this.user);
    }
  }
  logout() {
    console.log("logout")
    localStorage.removeItem("PG_Pool_token")
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }
}
