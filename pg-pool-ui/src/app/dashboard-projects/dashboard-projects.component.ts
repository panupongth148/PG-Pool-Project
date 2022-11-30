import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import MountResource from '../shared/interface/MonthResource';
import DiifDateModel from '../shared/interface/DiffDateModel';
import MonthModel from '../shared/interface/MonthModel';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';
import mountResourceEnd from '../shared/interface/MonthResourceEnd';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';

interface testChart {
    year: string,
    monthDetail: Array<MountResource>
}

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './dashboard-projects.component.html',
    styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
   
    ngOnInit(): void {
        
        
      }
}


