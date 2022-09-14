import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Array<ProjectResponseModel>
  constructor(private projectHttpRequestService: ProjectHttpRequestService, private router:Router) {
    this.projects = [{
      id: "",
      projectName: "",
      requests: [{
        amount: 0,
        positionRequest: ""
      }],
      memberAmount: 0,
      projectCode: "",
      progress: 0.0,
      contractStart: new Date(),
      contractEnd: new Date()
    }]
    this.getAllResource();
  }

  ngOnInit(): void {
  }
  async getAllResource() {
    await this.projectHttpRequestService.getAllProject().subscribe(res => {
      console.log(res)
      this.projects = res
    })
    // await this.getPosition();
  }

 async toDetailProject(id:any){
    await this.router.navigate(['/project/' + id], { replaceUrl: true })
      .then(() => {
        window.location.reload();
      });
  }
}
