import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import DiifDateModel from '../shared/interface/DiffDateModel';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './dashboard-projects.component.html',
    styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
    resources: Array<ResourceModel>;
    diffDate: Array<DiifDateModel>;
    projects: Array<ProjectResponseModel>
    listCode: Array<String>
    projectsRequest: Array<ProjectResponseModel>

    ngOnInit(): void {
        this.getAllProject();
        
    }


    constructor(private resourceHttpRequestService: ResourceHttpRequestService, private projectService: ProjectHttpRequestService) {
        // Chart.register(...registerables);
        this.listCode = [""]
        this.diffDate = [{
            projectCode: "",
            month: 0,
            empNo: "",
            name: "",
            endDate: new Date(),
            projectInfo: {
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
            }

        }]

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

          this.projectsRequest = [{
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
                    duration: 0.0,
                    working: 0.0,
                    assigned: 0.0,
                    startDate: new Date(),
                    endDate: new Date()
                }]


            }]

        }];
    }

    // chart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });

    getAllResource() {
        this.resourceHttpRequestService.getAllResource().subscribe(res => {
            this.diffDate = [];
            this.listCode = [];
            // console.log(res)
            this.resources = res;
            // console.log(this.projects)
            const dateNow = new Date(Date.now());
            // const [dayNow, monthNow, yearNow] = [dateNow.getDate(), dateNow.getMonth() + 1, dateNow.getFullYear()]
            // console.log(dayNow + "-" + monthNow + "-" + yearNow)
            let resourceFilter = this.resources.filter((val) => {
                return val.projects !== null
            });
            resourceFilter.forEach((val) => {
                
                val.projects.forEach((val2) => {
                    const lastWork = val2.workingDetail[val2.workingDetail.length - 1]
                    if(!this.listCode.includes(val2.projectCode)){
                        this.listCode.push(val2.projectCode);
                    }
                    // console.log(lastWork.endDate.toString().slice(0, 10))
                    this.calDiffDay(lastWork.endDate.toString().slice(0, 10), dateNow, val2.projectCode, val.empNo, val.prefix +" "+  val.firstName + " "+ val.lastName)
                })
            })
            // console.log(this.diffDate)
            // this.getProjectsByProductCode();
            // this.getAllProject();
        })
    }

    calDiffDay(endDate: any, dateNow: any, projectCode: string, empNo:string, name:string) {
        let [yearResource, monthResource, dayResource] = endDate.split("-")
        // console.log(yearResource + " - " + monthResource + " - " + dayResource)
        // let day, month, year;
        const date1 = new Date((yearResource - 543) + "/" + monthResource + "/" + dayResource);
        const date2 = new Date(dateNow);
        // console.log("date1 : " + date1 + " vs " + "date2 : " + date2)
        // console.log(date1 > date2)
        const diffTime = Math.abs(date2.valueOf() - date1.valueOf());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // console.log(diffTime + " milliseconds");
        // console.log(diffDays + " days");
        // console.log(diffDays * 0.032855)
        if (date1 > date2) {
            let project = this.projects.filter(val =>{
                return val.projectCode == projectCode
            })
            this.diffDate.push({
                projectCode: projectCode,
                month: Math.ceil(diffDays * 0.032855),
                empNo: empNo,
                name: name,
                endDate: endDate,
                projectInfo: project[0]
            })
        }
        // if(yearResource-yearNow >= 0){
        //     monthResource += (yearResource - yearNow) *12
        //     if(monthResource - monthNow >= 0){

        //     }
        //     // this.diffDate.push({
        //     //         projectCode: projectCode,
        //     //         day: parseInt(day) - dayNow,
        //     //         month: parseInt(month) - monthNow,
        //     //         year: parseInt(year) - yearNow
        //     //     })
        // }
        // this.diffDate.push({
        //     projectCode: projectCode,
        //     day: parseInt(day) - dayNow,
        //     month: parseInt(month) - monthNow,
        //     year: parseInt(year) - yearNow
        // })
    }
    // filterResourceEnd(value){
    //    value.

    // }
    getAllProject(){
        this.projectService.getAllProject().subscribe(res =>{
            // console.log(res)
            this.projects = res
            this.getAllResource();
        })
    }

    getProjectsByProductCode(){
        this.projectService.getProjectsByProductCode(this.listCode).subscribe(res =>{
            console.log(res)
            this.projectsRequest = res
        })
    }



}


