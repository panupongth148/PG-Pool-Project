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
    this.getUser()
    

  }

  requestEachAmount: any[] = [{ label: "Programmer", amount: 0 }, { label: "Programmer Specialist 1", amount: 0 }, { label: "Programmer Specialist 2", amount: 0 }]
  resourceForRender: any[] = []
  requestResource?: any[]
  finalRequestResource?: any[]
  projects?: any[]
  user?: any;
  constructor(private projectHttpRequestService: ProjectHttpRequestService, private resourceHttpRequestService: ResourceHttpRequestService, private jwtService:JwtDecodeService) {

  }
  getUser() {
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
      this.getAllResource()
    }
  }

  async getAllResource() {
    console.log(this.user.id)
    await this.projectHttpRequestService.getAllProjectByUserId(this.user.id).subscribe(res => {
      console.log(res)
      this.projects = res
      this.getPositionRequest()
    })
    // await this.getPosition();
  }
  getPositionRequest() {
    this.projectHttpRequestService.getProjectRequsts().subscribe((val) => {
      console.log(val)
      this.requestResource = val
      const d = new Date();
      let month = d.getMonth();

      let temp = this.requestResource.map(a => { return { ...a } })
      let back = this.requestResource.splice(0, month)

      this.finalRequestResource = temp.splice(month, temp.length - 1)

      Array.prototype.push.apply(this.finalRequestResource, back);

      this.finalRequestResource.forEach((val: any, indexFirst: any) => {
        if (val.requestMonthDetail.length > 0) {
          const haveProject: any[] = [];
          this.resourceForRender?.push({
            month: val.month,
            requestDetail: []
          })
          val.requestMonthDetail.forEach((val2: any) => {
            // console.log(val2)
            if (val2.requestPositionModel.positionRequest == "Programmer") {
              this.requestEachAmount[0].amount += val2.requestPositionModel.amount
            }
            if (val2.requestPositionModel.positionRequest == "Programmer Specialist 1") {
              this.requestEachAmount[1].amount += val2.requestPositionModel.amount
            }
            if (val2.requestPositionModel.positionRequest == "Programmer Specialist 2") {
              this.requestEachAmount[2].amount += val2.requestPositionModel.amount
            }
            if (!haveProject.includes(val2.project.projectCode)) {

              haveProject.push(val2.project.projectCode)
              this.resourceForRender[indexFirst].requestDetail.push({
                projectCode: val2.project.projectCode,
                projectName: val2.project.projectName,
                requests: [val2.requestPositionModel]
              })

            } else {

              this.resourceForRender?.forEach((valRequest: any, index: any) => {

                valRequest.requestDetail.forEach((detail: any, index2: any) => {

                  if (detail.projectCode == val2.project.projectCode) {

                    this.resourceForRender[index].requestDetail[index2].requests.push(val2.requestPositionModel)

                  }
                })


              })
            }

          })

        } else {
          this.resourceForRender?.push({
            month: val.month,
            requestDetail: []
          })
        }

      })

      // console.log(this.months)
      console.log(this.requestEachAmount)

    })
  }
}


