import { Component, OnInit } from '@angular/core';
import { ProjectHttpRequestService } from '../service/project/project-http-request.service';

@Component({
  selector: 'app-assign-resource',
  templateUrl: './assign-resource.component.html',
  styleUrls: ['./assign-resource.component.scss']
})
export class AssignResourceComponent implements OnInit {

  constructor(private projectHttpRequestService:ProjectHttpRequestService) { }

  ngOnInit(): void {
    this.getProjectHaveRequest()
  }

  getProjectHaveRequest(){
    this.projectHttpRequestService.getProjectHaveRequest().subscribe(res => {
      console.log(res)
  })
  }

}
