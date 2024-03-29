import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import { faBell} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-assign-resource',
  templateUrl: './assign-resource.component.html',
  styleUrls: ['./assign-resource.component.scss']
})
export class AssignResourceComponent implements OnInit {

  constructor(private projectHttpRequestService: ProjectHttpRequestService, private resourceHttpRequestService: ResourceHttpRequestService) { }
  //icon
  warningIcon = faExclamationTriangle

  projectRequest?: any[]
  // request resource
  requestResource?: any[]
  finalRequestResource?: any[]
  //render
  resourceForRender: any[] = []
  requestEachAmount: any[] = [{ label: "Programmer", amount: 0 }, { label: "Programmer Specialist 1", amount: 0 }, { label: "Programmer Specialist 2", amount: 0 }]
  // month
  //months: any[] = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  months: any[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

  years: any = new Date().getFullYear()
  dataListResource?: any[] = []
  resources?: ResourceModel[]
  resourceLReq?: any[] = [];
  resourcesEmpty?: any[]
  addResourceConfirm?: any[] = []
  positionSelected: any[] = []
  startDateList: any[] = []
  endDateList: any[] = []
  durationList: any[] = []
  assignList: any[] = []
  reqAssign?: any[] = []
  projects?: any[] = []

  @Output() newItemEvent = new EventEmitter<string>();

  checkResource?: any[] = [{
    position: "Programmer",
    value: 0
  },
  {
    position: "Programmer Specialist 1",
    value: 0
  },
  {
    position: "Programmer Specialist 2",
    value: 0
  },
  ]
  emptyResource?: any[] = [{
    position: "Programmer",
    value: 0
  },
  {
    position: "Programmer Specialist 1",
    value: 0
  },
  {
    position: "Programmer Specialist 2",
    value: 0
  },
  ]

  warningResource?:any[] = []
  allRequestAmount?: number;

  ngOnInit(): void {

    this.getRequestResource()
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
      // this.resourcesEmpty = res.filter((val) => {
      //   return val.projects == null
      // })
      // this.filterResourceEmpty()
    })

  }
  filterResourceEmpty() {
    // this.projectRequest?.forEach(val => {
    //   // console.log(val)
    //   val.requests.forEach((reqestRe: any) => {
    //     this.resourcesEmpty?.forEach(resource => {
    //       // console.log(resource)
    //       // console.log(reqestRe.positionRequest)
    //       if (resource.position == reqestRe.positionRequest) {
    //         this.resourceLReq?.push({ label: resource.prefix + " " + resource.firstName + " " + resource.lastName + "     Position : " + resource.position, resource: resource })
    //         // console.log("match")
    //         // console.log(this.resourceLReq)
    //       }
    //     })

    //   })

    //   this.dataListResource?.push({ projectCode: val.projectCode, resourceL: this.resourceLReq })
    //   console.log(this.dataListResource)
    //   this.resourceLReq = []
    // })
    // console.log(this.dataListResource)
  }

  getResourceEmpty() {
    this.resourceHttpRequestService.getResourceEmpty().subscribe((res) => {
      console.log(res)
      this.resourcesEmpty = res;
      this.checkResourceWarning();
    })
  }

  addResource(projectId: any, index: any) {
    console.log(index)
    console.log(this.positionSelected[index])
    this.projects?.push({ assigned: this.assignList[index], duration: this.durationList[index], startDate: this.startDateList[index], endDate: this.endDateList[index], working: (this.assignList[index] * 100) / this.durationList[index] })
    console.log(this.projects)
    this.addResourceConfirm?.push({ resourceId: this.positionSelected[index].resource.id, projects: this.projects })
    console.log(this.addResourceConfirm)
  }


  getRequestResource() {
    this.projectHttpRequestService.getProjectRequsts().subscribe((val) => {
      // console.log(val)
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
      for (let i = 0; i < this.months.length; i++) {
        if (i < month) {
          this.months[i] = this.months[i] + " ( " + (this.years + 1 + 543) + " )"
        }
      }
      // console.log(this.months)
      this.getResourceEmpty();
    })
    // console.log(this.requestEachAmount)
    this.getAllRequestAmount();
  }

  getAllRequestAmount() {
    this.projectHttpRequestService.getRequestAllAmount().subscribe((val) => {
      // console.log(val)
      this.allRequestAmount = val
    })

  }


  checkResourceWarning() {
    // console.log(this.resourceForRender)
    this.resourceForRender.forEach((val) => {
      val.requestDetail.forEach((val2: any) => {
        val2.requests.forEach((val3: any) => {
          // console.log(val3)
          if (val3.positionRequest == "Programmer") {
            this.checkResource![0].value += val3.amount
          }
          if (val3.positionRequest == "Programmer Specialist 1") {
            this.checkResource![1].value += val3.amount
          }
          if (val3.positionRequest == "Programmer Specialist 2") {
            this.checkResource![2].value += val3.amount
          }
        })
      })
    })
    this.resourcesEmpty?.forEach(val => {
      if (val.position == "Programmer") {
        this.emptyResource![0].value += 1
      }
      if (val.position == "Programmer Specialist 1") {
        this.emptyResource![1].value += 1
      }
      if (val.position== "Programmer Specialist 2") {
        this.emptyResource![2].value += 1
      }
    })

    for(let i =0;i< 3;i++){
      if(this.emptyResource![i].value < this.checkResource![i].value){
        this.warningResource?.push(this.checkResource![i].position)
      }
    }
    // console.log(this.checkResource)
    // console.log(this.emptyResource)
    // console.log(this.warningResource)
  }
  mouseOver(){
    console.log("select icon")
  }
}
