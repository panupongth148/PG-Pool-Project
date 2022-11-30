import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { th } from 'date-fns/locale';
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

  resourcesEmpty?:any
  chartData?: Array<{
    monthIndex:number,
    empty: any
    value:number,
    label:string
  }> = []
  months: any[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  public lineChartData?: ChartConfiguration<'line'>['data'];
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  constructor(private resourceHttpRequestService: ResourceHttpRequestService) {


  }

  ngOnInit(): void {
    this.getResourceEmpty();
    
    
  }

  setDataInChart(){
    if (this.chartData) {
      // console.log(this.chartDetail)
      const listLabel: string[] = []
      const listCount: number[] = []
      const listEmpty: number[] = []
      this.chartData.forEach((val) => {
        listLabel.push(val.label)
        listCount.push(val.value)
        listEmpty.push(val.empty)
      })
      if (this.chartData) {
        this.lineChartData = {
          labels: listLabel
          ,
          datasets: [
            {
              data: listCount,
              label: "Assigned",
              fill: false,
              tension: 0.5,
              borderColor: '#FFA726',


            },
            {
              data: listEmpty,
              label: "Empty",
              fill: false,
              tension: 0.5,
              borderColor: '#42A5F5',
            },

          ]
        };
      }

    }
  }
  getChartData() {
    const back:any[] = []
    this.resourceHttpRequestService.getChartData().subscribe((val) => {
      // console.log(val)
      const d = new Date();
      let month = d.getMonth();
      // console.log(month)
      for (let i = 0; i < 12; i++) {
        let extra = ""
        if(i < month){
          extra = " (" + (new Date().getFullYear()+544) + ")"
          back.push({
            label: this.months[i]+extra,
            value: 0,
            empty: this.resourcesEmpty.length,
            monthIndex: i
          })
        }
        
        else{
          this.chartData?.push({
            label: this.months[i]+extra,
            value: 0,
            empty: this.resourcesEmpty.length,
            monthIndex: i
          })
        }
      }

      Array.prototype.push.apply(this.chartData,back);
      // console.log(this.chartData)
        val.forEach((val:any) => {
          // console.log(val)
          if(val.resources.length > 0){
            let found = this.chartData?.findIndex(element => element.monthIndex === val.month);
            
            if(found == undefined){
              found = -1;
            }
            
            for(let i = found;i >= 0;i--){
              // console.log("in loop")
              // console.log("value : "+val.resources.length)
              // console.log("chart value : "+this.chartData![i].value)
              this.chartData![i].value += val.resources.length
            }
            for(let i = 11;i > found;i--){
              this.chartData![i].empty += val.resources.length
            }
            // console.log("pass")
          }
          // console.log(val.resources.length)
          
        });
        // console.log(this.chartData)
        // this.chartData?.push{
        //   label
        // }
      this.setDataInChart()
      
    })
  }

  getResourceEmpty(){
    this.resourceHttpRequestService.getResourceEmpty().subscribe((res) =>{
      this.resourcesEmpty = res;
      this.getChartData();
    })
  }
}
