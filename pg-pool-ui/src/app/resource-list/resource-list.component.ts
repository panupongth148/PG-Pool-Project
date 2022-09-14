import { Component, OnInit } from '@angular/core';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import PositionModel from '../shared/interface/PostionDetail';
import ResourceModel from '../shared/interface/ResourceModel';


@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {
  resources: Array<ResourceModel>;
  positions: Array<PositionModel>;
  positionList = [{
    positionName: '',
    count: 0
  }]
  constructor(private resourceHttpRequestService: ResourceHttpRequestService) {
    this.resources = [{
      id: "",
      empNo: "",
      prefix: "",
      firstName: "",
      lastName: "",
      empEmail: "",
      expireDate: new Date(),
      hireDate: new Date(),
      position: "",
      tel: "",
      projects: [{
        projectCode: "",
        workingDetail: [{
          projectId: "",
          duration: 0.0,
          working: 0.0,
          assigned: 0.0,
          startDate: new Date(),
          endDate: new Date()
        }]


      }]

    }];
    this.positions = [{
      positionName: "",
      count: 2
    }]
    this.getAllResource();
  }

  ngOnInit(): void {

  }
  async getAllResource() {
    await this.resourceHttpRequestService.getAllResource().subscribe(res => {
      console.log(res)
      this.resources = res;
      this.getPosition();
    })
    // await this.getPosition();
  }

  getPosition() {

    let countIndex = 0
    this.resources.forEach((val, index) => {
      console.log(val.position)
      if (this.positionList[countIndex].positionName == val.position) {
        let objIndex = this.positionList.findIndex((obj => obj.positionName == val.position));
        this.positionList[objIndex].count = this.positionList[objIndex].count + 1


      } else {
        this.positionList.push({
          positionName: val.position,
          count: 1
        })
        countIndex++;
      }
    })
    console.log(this.positionList)
    this.positionList.splice(0, 1)
  }

}
