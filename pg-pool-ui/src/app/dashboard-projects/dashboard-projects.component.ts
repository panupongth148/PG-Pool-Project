import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import MountResource from '../shared/interface/MonthResource';
import DiifDateModel from '../shared/interface/DiffDateModel';
import MonthModel from '../shared/interface/MonthModel';
import ProjectResponseModel from '../shared/interface/ProjectResponseModel';
import ResourceModel from '../shared/interface/ResourceModel';
import mountResourceEnd from '../shared/interface/MonthResourceEnd';
import { JwtDecodeService } from '../service/Jwt/jwt-decode.service';

interface testChart {
    year: string,
    monthDetail: Array<MountResource>
}

@Component({
    selector: 'app-dashboard-projects',
    templateUrl: './dashboard-projects.component.html',
    styleUrls: ['./dashboard-projects.component.scss']
})
export class DashboardProjectsComponent implements OnInit {
    resources: Array<ResourceModel>;
    diffDate: Array<DiifDateModel>;
    resouseAssign: Array<DiifDateModel>
    projects: Array<ProjectResponseModel>
    listCode: Array<String>
    projectsRequest: Array<ProjectResponseModel>
    months: Array<MonthModel>;
    selectedMonth: MonthModel;
    chartDetail: MountResource;
    chartDetailList: MountResource[];
    years: string = "2565"
    testChart: testChart
    typeChartLabel?: any
    user?:any;
    mountsResource: mountResourceEnd[];
    today: Date = new Date(Date.now());
    isGetDetailChart: boolean = false
    ngOnInit(): void {
        this.getAllProject();

    }


    constructor(private resourceHttpRequestService: ResourceHttpRequestService, private projectService: ProjectHttpRequestService, private jwtService:JwtDecodeService) {
        // Chart.register(...registerables);
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
        this.typeChartLabel = ""
        this.mountsResource = [
            {
                label: "January",
                count: 0,
                empty: 0
            },
            {
                label: "February",
                count: 0,
                empty: 0
            },
            {
                label: "March",
                count: 0,
                empty: 0
            },
            {
                label: "April",
                count: 0,
                empty: 0
            },
            {
                label: "May",
                count: 0,
                empty: 0
            },
            {
                label: "June",
                count: 0,
                empty: 0
            },
            {
                label: "July",
                count: 0,
                empty: 0
            },
            {
                label: "August",
                count: 0,
                empty: 0
            },
            {
                label: "September",
                count: 0,
                empty: 0
            },
            {
                label: "October",
                count: 0,
                empty: 0
            },
            {
                label: "November",
                count: 0,
                empty: 0
            },
            {
                label: "December",
                count: 0,
                empty: 0
            }
        ]
        this.selectedMonth = {
            name: "January",
            code: "Jan"
        }
        this.months = [{ name: "January", code: "Jan" }, { name: "February", code: "Feb" }, { name: "March", code: "Mar" }, { name: "April", code: "Apr" }, { name: "May", code: "May" }, { name: "June", code: "Jun" }
            , { name: "July", code: "Jul" }, { name: "August", code: "Aug" }, { name: "September", code: "Sep" }, { name: "October", code: "Oct" }, { name: "November", code: "Nov" }, { name: "December", code: "Dec" }]
        this.chartDetail = {
            month: this.selectedMonth.name,
            empty: {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            },
            assigned: {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            }

        }
        this.chartDetailList = [{
            month: this.selectedMonth.name,
            empty: {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            },
            assigned: {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0
            }

        }]
        this.listCode = [""]
        this.diffDate = [{
            projectCode: "",
            month: 0,
            empNo: "",
            name: "",
            startDate: new Date(),
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
                contractEnd: new Date(),
                projectOwner: ""
            }

        }]
        this.resouseAssign = [{
            projectCode: "",
            month: 0,
            empNo: "",
            name: "",
            startDate: new Date(),
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
                contractEnd: new Date(),
                projectOwner: ""
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
            contractEnd: new Date(),
             projectOwner: ""
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
            contractEnd: new Date(),
            projectOwner: ""
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
        this.testChart = {
            year: "2565",
            monthDetail: [{
                month: this.selectedMonth.name,
                empty: {
                    week1: 0,
                    week2: 0,
                    week3: 0,
                    week4: 0
                },
                assigned: {
                    week1: 0,
                    week2: 0,
                    week3: 0,
                    week4: 0
                }

            }]
        }
    }
    getAllResource() {
        this.resourceHttpRequestService.getAllResource().subscribe(res => {
            this.diffDate = [];
            this.resouseAssign = [];
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
            // console.log("resource filterd: ")
            // console.log(resourceFilter)
            resourceFilter.forEach((val) => {
                val.projects.forEach((val2) => {
                    const lastWork = val2.workingDetail[val2.workingDetail.length - 1]
                    const startWork = val2.workingDetail[0]
                    if (!this.listCode.includes(val2.projectCode)) {
                        this.listCode.push(val2.projectCode);
                    }
                    // console.log(lastWork.endDate.toString().slice(0, 10))
                    this.calDiffDay(lastWork.endDate.toString().slice(0, 10), startWork.startDate.toString().slice(0, 10), dateNow, val2.projectCode, val.empNo, val.prefix + " " + val.firstName + " " + val.lastName)
                })
            })
            this.setChartDetail();
            // console.log(this.diffDate)
            // this.getProjectsByProductCode();
            // this.getAllProject();
        })

    }

    calDiffDay(endDate: any, startDate: any, dateNow: any, projectCode: string, empNo: string, name: string) {
        let [yearResource, monthResource, dayResource] = endDate.split("-")
        // console.log(yearResource + " - " + monthResource + " - " + dayResource)
        // let day, month, year;
        console.log(yearResource)
        const date1 = new Date((yearResource - 543) + "/" + monthResource + "/" + dayResource);
        const date2 = new Date(dateNow);
        // console.log("date1 : " + date1 + " vs " + "date2 : " + date2)
        // console.log(date1 > date2)
        const diffTime = Math.abs(date2.valueOf() - date1.valueOf());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // console.log(diffTime + " milliseconds");
        // console.log(diffDays + " days");
        // console.log(diffDays * 0.032855)
        let project = this.projects.filter(val => {
            return val.projectCode == projectCode
        })
        this.resouseAssign.push({
            projectCode: projectCode,
            month: Math.ceil(diffDays * 0.032855),
            empNo: empNo,
            name: name,
            startDate: startDate,
            endDate: endDate,
            projectInfo: project[0]
        })
        if (date1 > date2) {

            this.diffDate.push({
                projectCode: projectCode,
                month: Math.ceil(diffDays * 0.032855),
                empNo: empNo,
                name: name,
                startDate: startDate,
                endDate: endDate,
                projectInfo: project[0]
            })
        }

    }
    findIndexMonth(ind:any){
        let index = 0;
        for(let i = 0;i< this.mountsResource.length;i++){
            // console.log(this.months[ind-1].name + " " + this.mountsResource[i].label)
            if(this.mountsResource[i].label.includes(this.months[ind-1].name)){
                index = i
                break;
            }
        }
        
        return index
    }
    setChartDetail() {
      
        // this.mountsResource = []
        let emptyOnly;
        emptyOnly = this.resources.filter((val) => {
            return val.projects === null
        })
        let countEmpty = emptyOnly.length
        this.mountsResource.forEach((val) => {
            val.empty = countEmpty
        })
        let mountInNewYear = [...this.mountsResource];
        this.mountsResource.splice(0, this.today.getMonth())
      
        mountInNewYear.splice(this.today.getMonth(), this.mountsResource.length)
   
        mountInNewYear.forEach(val =>{
            val.label += "("+ (this.today.getFullYear() + 544 )+ ")"
            this.mountsResource.push(val)
        })
        console.log(this.mountsResource);
        
        // console.log(this.mountsResource)
        this.resouseAssign.forEach((val) => {
            // console.log(val.endDate)
            // console.log(val.endDate.toString().includes("2565"))
            let strEndDate = val.endDate.toString()
            // console.log(this.today.getFullYear() + 544)
            // console.log(strEndDate.includes((this.today.getFullYear() + 544).toString()) )
            if (strEndDate.includes((this.today.getFullYear() + 543).toString()) || (strEndDate.includes((this.today.getFullYear() + 544).toString()) 
            && parseInt(strEndDate.charAt(5) + strEndDate.charAt(6)) < this.today.getMonth()+1) 
            ) {
                let mon = parseInt(strEndDate.charAt(5) + strEndDate.charAt(6))
                // console.log(val)
                // console.log(this.months[mon-1].name)
                let ind = this.findIndexMonth(mon-1);
                // console.log(ind)
                for (let i = 0; i <= ind; i++) {
                    this.mountsResource[i].count += 1
                }
                // console.log(this.mountsResource[mon-1])
                for (let i = ind+1; i < 12; i++) {
                    // console.log(this.mountsResource[i])
                    // console.log(i)
                    this.mountsResource[i].empty += 1
                }
                // let day = parseInt(strEndDate.charAt(8) + strEndDate.charAt(9))
                // console.log(day)
                // if(day%7 == 0){
                //     this.chartDetail.assigned.week1
                // }
            }
            // if(val.endDate.getFullYear)
        })
        // console.log(this.today.getMonth())
        // console.log(this.months[this.today.getMonth()])
        // this.mountsResource.splice(0, this.today.getMonth())
        this.isGetDetailChart = true;
        // console.log("finisish ")
        // console.log("after")

        console.log(this.mountsResource)

    }

    getAllProject() {
        this.projectService.getAllProjectByUserId(this.user.id).subscribe(res => {
            console.log(res)
            this.projects = res
            this.getAllResource();
        })
    }

    getProjectsByProductCode() {
        this.projectService.getProjectsByProductCode(this.listCode).subscribe(res => {
            console.log(res)
            this.projectsRequest = res
        })
    }



}


