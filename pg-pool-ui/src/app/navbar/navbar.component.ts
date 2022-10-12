import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
    user?: UserModel;
    items: MenuItem[] = [{
        label: 'File',
        icon: 'pi pi-fw pi-file',
    },
    {
        label: 'Resource',
        icon: 'pi pi-fw pi-pencil',
        routerLink: "/resource"
    },
    {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
    },
    {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }];

    constructor(private router: Router, private userComservice: UserCommunicateService, private jwtService:JwtDecodeService) {


    }

    ngOnInit() {
        this.items = [
            {
                label: 'Project',
                icon: 'pi pi-fw pi-file',
                routerLink: "/project"
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-power-off',
                routerLink: "dashboard"
            },
            {
                label: 'Resource',
                icon: 'pi pi-fw pi-pencil',
                routerLink: "/resource"
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
