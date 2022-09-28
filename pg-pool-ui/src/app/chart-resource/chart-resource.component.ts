import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { ResourceHttpRequestService } from '../service/resource/resource-http-request.service';
import ChartModel from '../shared/interface/MonthResource';
import mountResourceEnd from '../shared/interface/MonthResourceEnd';
import ResourceModel from '../shared/interface/ResourceModel';
@Component({
  selector: 'app-chart-resource',
  templateUrl: './chart-resource.component.html',
  styleUrls: ['./chart-resource.component.scss']
})
export class ChartResourceComponent implements OnInit {

  @Input() chartDetail?: mountResourceEnd[];
  public lineChartData?: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  constructor(private resourceHttpRequestService: ResourceHttpRequestService) {
    
    
  }
  
  ngOnInit(): void {
    if(this.chartDetail != undefined){
      // console.log(this.chartDetail)
      const listLabel:string[] = []
      const listCount:number[] = []
      const listEmpty:number[] = []
      this.chartDetail.forEach((val) =>{
        listLabel.push(val.label)
        listCount.push(val.count)
        listEmpty.push(val.empty)
      })
      if(this.chartDetail){
        this.lineChartData = {
          labels: listLabel
          ,
          datasets: [
            {
              data: listCount,
              label: "Assigned",
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            },
            {
              data: listEmpty,
              label: "Empty",
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgb(0, 68, 251)'
            },
    
          ]
        };
      }
      
    }
  }


}
