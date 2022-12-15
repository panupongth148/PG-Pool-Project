import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import UserModel from '../shared/interface/UserModel';
import jwt_decode from "jwt-decode";
import { UserCommunicateService } from '../service/communicate/user-communicate.service';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit{
    user?: UserModel;
    items: MenuItem[] = []
    constructor(private router: Router, private userComservice: UserCommunicateService, private jwtService:JwtDecodeService, private elementRef: ElementRef) {


    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor ='#004CFF';
            this.elementRef.nativeElement.ownerDocument
            .body.style.color ='#FFFFFF';
    }
    ngOnInit() {
        this.items = [
            {
                label: 'Project',
                icon: 'pi pi-fw pi-file',
                routerLink: "/project"
            },
            {
                label: 'Resource',
                icon: 'pi pi-fw pi-pencil',
                routerLink: "/resource"
            },
            {
                label: 'Request',
                icon: 'pi pi-fw pi-arrow-right',
                routerLink: "/request"
            },
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
    logout(){
        localStorage.removeItem("PG_Pool_token")
        this.router.navigate(['/login'])
        .then(() => {
            window.location.reload();
        });
    }
}
