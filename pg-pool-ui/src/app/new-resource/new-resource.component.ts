import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import AddResourceModel from '../shared/interface/AddResourceModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-resource',
  templateUrl: './new-resource.component.html',
  styleUrls: ['./new-resource.component.scss']
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
  constructor(private resourceHttpRequestService: ResourceHttpRequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    const resource = this.resourceForm.value as AddResourceModel;
    console.log(resource)
    await this.resourceHttpRequestService.AddResource(resource).subscribe(response => {
      alert("success");
    });
    this.router.navigate(['/resource'])
      .then(() => {
        window.location.reload();
      });
  }
}
