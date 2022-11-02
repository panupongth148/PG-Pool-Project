import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import ProjectResponseModel from 'src/app/shared/interface/ProjectResponseModel';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import ResourceModel from '../shared/interface/ResourceModel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  id: any;
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  project: ProjectResponseModel;
  resources: Array<ResourceModel>;
  constructor(private route: ActivatedRoute, private projectHttpRequestService: ProjectHttpRequestService, private resourceHttpRequest: ResourceHttpRequestService, private router:Router) {
    this.project = {
      id: "",
      projectName: "",
      projectCode: "",
      progress: 0.0,
      requests: [{
        amount: 0.0,
        positionRequest: ""
      }],
      memberAmount: 0,
      contractStart: new Date(),
      contractEnd: new Date(),
      projectOwner: ""
    }

    this.resources =[{
      id: "",
    empNo: "",
    prefix: "",
    firstName: "",
    lastName: "",
    empEmail: "",
    hireDate: new Date(),
    expireDate: new Date(),
    position: "",
    tel: "",
    projects: [{
        projectCode: "",
        workingDetail: [{
            duration: 0.0,
            assigned: 0.0,
            working: 0.0,
            startDate: new Date(),
            endDate : new Date()

        }]
    }]
    }]
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProject()
    
  }

  async getProject() {
    try {
      await this.projectHttpRequestService.getProject(this.id).subscribe(res => {
          this.project = res;
          // console.log(res);
          this.getResources()
        })
      
    } catch (error) {
      console.log(error)
    }

    
  }
  async getResources(){
    try {
      await this.resourceHttpRequest.getResourceByProductCode(this.project.projectCode).subscribe((res => {
        console.log(res)
        this.resources = res;
        this.loading = false
      }));
    } catch (error) {
      console.log(error)
    }
  }

  async toDetailResource(id:any){
    await this.router.navigate(['/resource/' + id], { replaceUrl: true })
      .then(() => {
        window.location.reload();
      });
  }
}
