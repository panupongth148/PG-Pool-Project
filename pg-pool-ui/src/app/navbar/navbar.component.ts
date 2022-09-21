import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [{
    label:'File',
    icon:'pi pi-fw pi-file',
},
{
    label:'Resource',
    icon:'pi pi-fw pi-pencil',
    routerLink: "/resource"
},
{
    label:'Users',
    icon:'pi pi-fw pi-user',
},
{
    label:'Events',
    icon:'pi pi-fw pi-calendar',
},
{
    label:'Quit',
    icon:'pi pi-fw pi-power-off'
}];

  constructor() { 

 
  }

  ngOnInit() {
    this.items = [
      {
          label:'Project',
          icon:'pi pi-fw pi-file',
          routerLink: "/project"
      },
      {
        label:'Dashboard',
        icon:'pi pi-fw pi-power-off',
        routerLink: "dashboard"
    },
      {
          label:'Resource',
          icon:'pi pi-fw pi-pencil',
          routerLink: "/resource"
      },
      {
          label:'Users',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'New',
                  icon:'pi pi-fw pi-user-plus',

              },
              {
                  label:'Delete',
                  icon:'pi pi-fw pi-user-minus',

              },
              {
                  label:'Search',
                  icon:'pi pi-fw pi-users',
                  items:[
                  {
                      label:'Filter',
                      icon:'pi pi-fw pi-filter',
                      items:[
                          {
                              label:'Print',
                              icon:'pi pi-fw pi-print'
                          }
                      ]
                  },
                  {
                      icon:'pi pi-fw pi-bars',
                      label:'List'
                  }
                  ]
              }
          ]
      },
      {
          label:'Events',
          icon:'pi pi-fw pi-calendar',
          items:[
              {
                  label:'Edit',
                  icon:'pi pi-fw pi-pencil',
                  items:[
                  {
                      label:'Save',
                      icon:'pi pi-fw pi-calendar-plus'
                  },
                  {
                      label:'Delete',
                      icon:'pi pi-fw pi-calendar-minus'
                  },

                  ]
              },
              {
                  label:'Archieve',
                  icon:'pi pi-fw pi-calendar-times',
                  items:[
                  {
                      label:'Remove',
                      icon:'pi pi-fw pi-calendar-minus'
                  }
                  ]
              }
          ]
      },
      {
          label:'Quit',
          icon:'pi pi-fw pi-power-off'
      }
  ];
  }

}
