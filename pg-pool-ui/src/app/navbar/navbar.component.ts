import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import UserModel from '../shared/interface/UserModel';
import jwt_decode from "jwt-decode";

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

    constructor(private router: Router) {


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
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',

                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus',

                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            },

                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {

                label: 'Register',
                icon: 'pi pi-fw pi-power-off'
            }
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
            const tokenInfo = this.getDecodedAccessToken(token); // decode token
            const expireDate = tokenInfo.exp; // get token expiration dateTime
            // console.log(tokenInfo); // show decoded token object in console
            this.user = {
                username: tokenInfo.username,
                email: tokenInfo.email
            }
        }
    }
    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
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
