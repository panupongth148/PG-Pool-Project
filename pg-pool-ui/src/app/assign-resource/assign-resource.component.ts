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

  constructor(private projectHttpRequestService:ProjectHttpRequestService, private resourceHttpRequestService:ResourceHttpRequestService) { }
  projectRequest?:any[]
  dataListResource?:any[]
  resources?:ResourceModel[]
  resourceLReq?:any[]
  resourcesEmpty?:ResourceModel[]
  ngOnInit(): void {
    this.getProjectHaveRequest()
    this.getAllResource()
    
  }

  getProjectHaveRequest(){
    this.projectHttpRequestService.getProjectHaveRequest().subscribe(res => {
     console.log(res)
     this.projectRequest = res

  })
  }
  getAllResource(){
    this.resourceHttpRequestService.getAllResource().subscribe((res)=>{
      
      this.resources = res
      console.log(res)
      this.resourcesEmpty = res.filter((val)=>{
        return val.projects == null
      })
    })
    this.filterResourceEmpty()
  }
  filterResourceEmpty(){
    this.projectRequest?.forEach(val =>{
      val.projectRequest.forEach((reqestRe:any) =>{
        this.resourcesEmpty?.forEach(resource =>{
          if(resource.position == reqestRe.positionRequest){
            this.resourceLReq?.push(resource)
          }
        })
        
      })
      this.dataListResource?.push({projectCode: val.projectCode, resourceL:this.resourceLReq})
      this.resourceLReq=[]
    })
    console.log(this.dataListResource)
  }


}
