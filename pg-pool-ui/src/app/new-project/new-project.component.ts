import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import PositionProjectRequest from '../shared/interface/PositionProjectRequest';
import ResourceModel from '../shared/interface/ResourceModel';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  // resources: Array<ResourceModel>;
  projectForm = new FormGroup({
    projectName: new FormControl(),
    projectCode: new FormControl(),
    contractStart: new FormControl(),
    contractEnd: new FormControl(),
    resourceRequest: new FormControl(),
    positionRequestForm : new FormControl(),
    amountRequestForm : new FormControl()
  });
  listPositionRequest: PositionProjectRequest[] = []
   positionList: string[] = [];
 
 
  selectedResource = "";
  constructor(private resourceHttpRequestService: ResourceHttpRequestService, private projectHttpRequestService:ProjectHttpRequestService) { 
    // this.resources = [{
    //   id: "",
    //   firstName: "",
    //   lastName: "",
    //   empEmail: "",
    //   expireDate: new Date(),
    //   hireDate: new Date(),
    //   position: "",
    //   tel: "",
    //   projects: [{
    //     projectId: "",
    //     duration: 2.5,
    //     assigned: 3.5,
    //     startDate: new Date(),
    //     endDate: new Date()

    //   }]

    // }];
    this.getAllResource()
  }

  ngOnInit(): void {
  }
  async addProject(){

    const project = {
    projectName: this.projectForm.get("projectName")?.value,
    projectCode: this.projectForm.get("projectCode")?.value,
    progress: 0.0,
    requests: this.listPositionRequest,
    memberAmount: 0,
    contractStart: this.projectForm.get("contractStart")?.value,
    contractEnd: this.projectForm.get("contractEnd")?.value
    }
    await this.projectHttpRequestService.addProject(project).subscribe(res =>{
      console.log("sucess")
    })

  }
  onChange(){

  }

  addRequest(){
    console.log(this.projectForm.get("positionRequestForm")?.value);
    this.listPositionRequest.push({
      amount: this.projectForm.get("amountRequestForm")?.value,
      positionRequest: this.projectForm.get("positionRequestForm")?.value
    });
    this.projectForm.get("positionRequestForm")?.setValue("")
    this.projectForm.get("amountRequestForm")?.setValue("")
  }
  async getAllResource() {
    await this.resourceHttpRequestService.getAllResource().subscribe(res => {
      console.log(res)
      res.forEach((val) => {
        if(!this.positionList.includes(val.position)){
          this.positionList.push(val.position)
        }
      })
      
    })
    // await this.getPosition();
  }
}
