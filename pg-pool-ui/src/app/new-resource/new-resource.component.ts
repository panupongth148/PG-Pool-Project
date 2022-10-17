import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import AddResourceModel from '../shared/interface/AddResourceModel';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html',
  styleUrls: ['./new-resource.component.scss'],
  providers: [MessageService]
})
export class NewResourceComponent implements OnInit {
  prefixs: any[] = [{
    name: "Mr."
  },
  {
    name: "Miss."
  },
  {
    name: "Mrs."
  }]

  positions: any[] = [{
    name: "Programmer"
  },
  {
    name: "Programmer Specialist 1"
  },
  {
    name: "Programmer Specialist 2"
  }]
  resourceForm = new FormGroup({
    empNo: new FormControl(),
    prefix: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    tel: new FormControl(),
    empEmail: new FormControl(),
    position: new FormControl(),
    hireDate: new FormControl(),
    expireDate: new FormControl(),
    projects: new FormControl(null)
  });
  constructor(private resourceHttpRequestService: ResourceHttpRequestService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}
  async onSubmit() {
    const resource = {
      empNo: this.resourceForm.get("empNo")?.value,
      prefix: this.resourceForm.get("prefix")?.value.name,
      firstName: this.resourceForm.get("firstName")?.value,
      lastName: this.resourceForm.get("lastName")?.value,
      tel: this.resourceForm.get("tel")?.value,
      empEmail: this.resourceForm.get("empEmail")?.value,
      position: this.resourceForm.get("position")?.value.name,
      hireDate: this.resourceForm.get("hireDate")?.value,
      expireDate: this.resourceForm.get("expireDate")?.value,
      projects: null
    } as AddResourceModel;
    console.log(resource)
    await this.resourceHttpRequestService.AddResource(resource).subscribe(response => {
      
      
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Register Success'});
      const myTimeout = setTimeout(this.toResource, 2000);
      
      
    }, err =>{
      this.messageService.add({severity:'error', summary: 'Error', detail: err})
    });

  }

  toResource(){
    this.router.navigate(['/resource'])
      .then(() => {
        window.location.reload();
      });
  }
}
