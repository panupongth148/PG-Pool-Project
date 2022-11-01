import { Component, OnInit } from '@angular/core';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';

@Component({
  selector: 'app-assign-resource',
  templateUrl: './assign-resource.component.html',
  styleUrls: ['./assign-resource.component.scss']
})
export class AssignResourceComponent implements OnInit {

  constructor(private projectHttpRequestService: ProjectHttpRequestService, private resourceHttpRequestService: ResourceHttpRequestService) { }
  projectRequest?: any[]
  dataListResource?: any[] = []
  resources?: ResourceModel[]
  resourceLReq?: any[] = [];
  resourcesEmpty?: ResourceModel[]
  addResourceConfirm?: any[] = []
  positionSelected: any[] = []
  startDateList:any[] = []
  endDateList:any[] = []
  durationList:any[] = []
  assignList:any[] = []
  reqAssign?: any[] = []
  projects?:any[] = []
  ngOnInit(): void {
    this.getProjectHaveRequest()
    this.getAllResource()

  }

  getProjectHaveRequest() {
    this.projectHttpRequestService.getProjectHaveRequest().subscribe(res => {
      // console.log(res)
      this.projectRequest = res


    })
  }
  async getAllResource() {
    this.resourceHttpRequestService.getAllResource().subscribe((res) => {

      this.resources = res
      this.resourcesEmpty = res.filter((val) => {
        return val.projects == null
      })
      this.filterResourceEmpty()
    })

  }
  filterResourceEmpty() {
    this.projectRequest?.forEach(val => {
      // console.log(val)
      val.requests.forEach((reqestRe: any) => {
        this.resourcesEmpty?.forEach(resource => {
          // console.log(resource)
          // console.log(reqestRe.positionRequest)
          if (resource.position == reqestRe.positionRequest) {
            this.resourceLReq?.push({ label: resource.prefix + " " + resource.firstName + " " + resource.lastName + "     Position : " + resource.position, resource: resource })
            // console.log("match")
            // console.log(this.resourceLReq)
          }
        })

      })

      this.dataListResource?.push({ projectCode: val.projectCode, resourceL: this.resourceLReq })
      console.log(this.dataListResource)
      this.resourceLReq = []
    })
    // console.log(this.dataListResource)
  }

  addResource(projectId: any, index: any) {
    console.log(index)
    console.log(this.positionSelected[index])
    this.projects?.push({assigned:this.assignList[index], duration: this.durationList[index], startDate:this.startDateList[index], endDate:this.endDateList[index], working:(this.assignList[index]*100)/this.durationList[index]})
    console.log(this.projects)
    this.addResourceConfirm?.push({resourceId: this.positionSelected[index].resource.id , projects:this.projects})
    console.log(this.addResourceConfirm)
  }
}
