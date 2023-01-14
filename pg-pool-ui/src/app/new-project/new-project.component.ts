import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserCommunicateService } from '../service/communicate/user-communicate.service';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import PositionProjectRequest from '../shared/interface/PositionProjectRequest';
import UserModel from '../shared/interface/UserModel';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  providers: [MessageService]
})
export class NewProjectComponent implements OnInit {
  // resources: Array<ResourceModel>;
  projectForm = new FormGroup({
    projectName: new FormControl(),
    projectCode: new FormControl(),
    contractStart: new FormControl(),
    contractEnd: new FormControl(),
    resourceRequest: new FormControl(),
    positionRequestForm: new FormControl(),
    amountRequestForm: new FormControl(),
    monthRequestForm: new FormControl()
  });
  user?: any;
  subscription?: Subscription;
  listPositionRequest: PositionProjectRequest[] = []
  positionList: string[] = [];
  uploadedFiles: any[] = [];

  selectedResource = "";
  constructor(private resourceHttpRequestService: ResourceHttpRequestService, private projectHttpRequestService: ProjectHttpRequestService, private router: Router, private userCommunacate: UserCommunicateService, private jwtService: JwtDecodeService, private messageService: MessageService) {
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
    this.projectForm.get("amountRequestForm")?.setValue("1")
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
    // this.subscription = this.userCommunacate.userId$.subscribe(x =>{this.user = x})
    // console.log(this.user)
  }

  ngOnInit(): void {
  }
  async addProject() {

    const project = {
      projectName: this.projectForm.get("projectName")?.value,
      projectCode: this.projectForm.get("projectCode")?.value,
      progress: 0.0,
      requests: this.listPositionRequest,
      memberAmount: 0,
      contractStart: this.projectForm.get("contractStart")?.value,
      contractEnd: this.projectForm.get("contractEnd")?.value,
      projectOwner: this.user.id,
      isHistory: false
    }
    await this.projectHttpRequestService.addProject(project).subscribe(res => {
      console.log("sucess")
      this.router.navigate(['/project'])
        .then(() => {
          window.location.reload();
        });
    })

  }
  onUpload(event: any) {
    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Import Success'});
    // console.log("upload")
    if(this.uploadedFiles.length < 1){
      if(event.files.length < 2){
        for (let file of event.files) {
          this.uploadedFiles.push(file);
          console.log("choose file")
        }
      }else{
        alert("โปรดเลือกเพียง 1 ไฟล์")
      }
      
      console.log("upload")
    }else{
        alert("โปรดเลือกเพียง 1 ไฟล์")
    }
    

    // this.messageService.add({severity:'success', summary: 'Success', detail: 'Import Success'});
   
  }
  importExcel() {
    const formData = new FormData();
    formData.append("userId", this.user.id)
    formData.append("file", this.uploadedFiles[0])
    this.projectHttpRequestService.importExcel(formData).subscribe(val => {
      console.log(val)
      this.messageService.add({severity:'success', summary: 'สำเร็จ', detail: 'นำเข้าข้อมูลสำเร็จ'});
      const myTimeout = setTimeout(this.toProject, 2000);
    },error =>{
      alert("error")
    })
  }
  addRequest() {
    console.log(this.projectForm.get("positionRequestForm")?.value);
    this.listPositionRequest.push({
      amount: this.projectForm.get("amountRequestForm")?.value,
      positionRequest: this.projectForm.get("positionRequestForm")?.value,
      dateWithin: this.projectForm.get("monthRequestForm")?.value
    });
    this.projectForm.get("positionRequestForm")?.setValue("")
    this.projectForm.get("amountRequestForm")?.setValue("1")
  }
  async getAllResource() {
    await this.resourceHttpRequestService.getAllResource().subscribe(res => {
      console.log(res)
      res.forEach((val) => {
        if (!this.positionList.includes(val.position)) {
          this.positionList.push(val.position)
        }
      })

    })
    // await this.getPosition();
  }
  toProject(){
    this.router.navigate(['/project'])
      .then(() => {
        window.location.reload();
      });
  }
  
}
