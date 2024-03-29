import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
  providers: [MessageService]
})
export class ResourceDetailComponent implements OnInit {
  id: any;
  loading:any = true;
  resource: ResourceModel;
  projects: Array<ProjectResponseModel>;
  constructor(private route: ActivatedRoute, private resourceHttpRequestService: ResourceHttpRequestService, private projectHttpRequestService: ProjectHttpRequestService, private router:Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.resource = {
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
          duration: 0,
          assigned: 0,
          working: 0,
          startDate: new Date(),
          endDate: new Date(),

        }]
      }]

      


    }
    this.projects = [{
      id: "",
      projectName: "",
      projectCode: "",
      progress: 0,
      requests: [{
        amount: 0,
        positionRequest: "",
      }],
      memberAmount: 0,
      contractStart: new Date(),
      contractEnd: new Date(),
      projectOwner: "",
      isHistory: false
    }]
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getResourceById();
  }

  getResourceById() {
    try {
      this.resourceHttpRequestService.getResourceById(this.id).subscribe(res => {
        this.resource = res;
        console.log(res);
        if(res){
          console.log("have res")
          this.getProjectsByProductCode();
        }
        
      })

    } catch (error) {
      console.log(error)
    }
  }

  getProjectsByProductCode(){
    const projectCodeList = [{}];
    this.resource.projects.forEach((val) =>{
      projectCodeList.push(val.projectCode);
    })
    projectCodeList.splice(0, 1);
    // console.log(projectCodeList)
    try{
      this.projectHttpRequestService.getProjectsByProductCode(projectCodeList).subscribe((res) =>{
        console.log(res)
        this.projects = res;
        this.loading = false
      })
    }catch(err){
      console.log(err)
    }
  }
  deleteResource(id:any){
    console.log(id)
    this.confirmationService.confirm({
      message: 'ต้องการลบทรัพยากรนี้หรือไม่',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.resourceHttpRequestService.deleteResourceById(id).subscribe((val) =>{
          this.messageService.add({severity:'info', summary:'เรียบร้อย', detail: val});
          this.router.navigate(['/resource'], { replaceUrl: true })
          // const myTimeout = setTimeout(this.toResource, 2000);
        })
          
      },
      reject: (type:any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'ปฏิเสธ', detail:'คุณปฏิเสธ'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'ยกเลิกแล้ว', detail:'คุณทำการยกเลิก'});
              break;
          }
      }
  });
  }
  toResource(){
    this.router.navigate(['/resource'], { replaceUrl: true })
  }
}
