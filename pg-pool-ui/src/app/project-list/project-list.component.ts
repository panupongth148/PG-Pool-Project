import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Array<ProjectResponseModel>
  user?:any;
  constructor(private projectHttpRequestService: ProjectHttpRequestService, private router:Router, private jwtService:JwtDecodeService) {
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
      contractEnd: new Date(),
      projectOwner: "",
      isHistory:false
    }]
    this.getUser();
    this.getAllResource();
    
  }

  ngOnInit(): void {
  }

  getUser(){
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
        }
  }
  async getAllResource() {
    console.log(this.user.id)
    await this.projectHttpRequestService.getAllProjectByUserId(this.user.id).subscribe(res => {
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
