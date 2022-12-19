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

  resourcesEmpty?: any
  resourceAssigned?: any[]
  chartData?: Array<{
    monthIndex: number,
    empty: any
    value: number,
    label: string
  }> = []
  chartMonth: any[] = [];
  selectedMonth: any;
  months: any[] = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
  public lineChartData?: ChartConfiguration<'line'>['data'];
  public lineChartDataMonth?: ChartConfiguration<'line'>['data'];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  public lineChartLegend = true;
  constructor(private resourceHttpRequestService: ResourceHttpRequestService) {


  }

  ngOnInit(): void {
    this.getResourceEmpty();


  }

  setDataInChart() {
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
    const back: any[] = []
    this.resourceHttpRequestService.getChartData().subscribe((val) => {
      console.log(val)
      this.resourceAssigned = val;
      const d = new Date();
      let month = d.getMonth();
      // console.log(month)
      for (let i = 0; i < 12; i++) {
        let extra = ""
        if (i < month) {
          extra = " (" + (new Date().getFullYear() + 544) + ")"
          back.push({
            label: this.months[i] + extra,
            value: 0,
            empty: this.resourcesEmpty.length,
            monthIndex: i
          })
        }

        else {
          this.chartData?.push({
            label: this.months[i] + extra,
            value: 0,
            empty: this.resourcesEmpty.length,
            monthIndex: i
          })
        }
      }

      Array.prototype.push.apply(this.chartData, back);
      // console.log(this.chartData)
      val.forEach((val: any) => {
        // console.log(val)
        if (val.resources.length > 0) {
          let found = this.chartData?.findIndex(element => element.monthIndex === val.month);

          if (found == undefined) {
            found = -1;
          }

          for (let i = found; i >= 0; i--) {
            // console.log("in loop")
            // console.log("value : "+val.resources.length)
            // console.log("chart value : "+this.chartData![i].value)
            this.chartData![i].value += val.resources.length
          }
          for (let i = 11; i > found; i--) {
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
      this.getChartMonth();
      this.setDataInChart();

    })
  }

  getResourceEmpty() {
    this.resourceHttpRequestService.getResourceEmpty().subscribe((res) => {
      this.resourcesEmpty = res;
      this.getChartData();
    })
  }

  getChartMonth() {
    let day;
    console.log("get chart month")
    let historyAssigned: any[] = []
    const d = new Date();
    let mon = d.getMonth();
    let front = this.resourceAssigned?.map((x) => x);
    let back = this.resourceAssigned?.map((x) => x);
    // console.log(mon)
    front = front?.slice(mon)
    back = back!.slice(0, mon)
    // console.log(front)
    // console.log(back)
    Array.prototype.push.apply(front, back);
    // console.log(front)
    this.resourceAssigned?.forEach((val: any) => {
      // console.log(val)
      let month = val.month
      let day31 = [0, 2, 4, 6, 7, 9, 11];
      let day30 = [3, 5, 8, 10];
      let chartDay = [];
      if (day30.includes(month)) {

        for (let j = 1; j < 31; j++) {
          chartDay.push({
            empty: this.resourcesEmpty.length,
            value: 0,
            label: j
          })
        }
      }
      else if (day31.includes(month)) {
        for (let i = 1; i < 32; i++) {
          chartDay.push({
            empty: this.resourcesEmpty.length,
            value: 0,
            label: i
          })
        }
      }
      else {
        for (let i = 1; i < 29; i++) {
          chartDay.push({
            empty: this.resourcesEmpty.length,
            value: 0,
            label: i
          })
        }
      }
      this.chartMonth.push({ month: month, chartData: chartDay })
      val.resources.forEach((resource: any) => {

        let date = new Date(resource.endDate)
        // console.log(date.getDate())
        // console.log(resource.endDate)
        if (!historyAssigned.includes(month)) {
          historyAssigned.push(month)
        }

        for (let k = 0; k < date.getDate(); k++) {
          this.chartMonth[month].chartData[k].value += 1
        }
        for (let i = date.getDate(); i < this.chartMonth[month].chartData.length; i++) {
          this.chartMonth[month].chartData[i].empty += 1

        }

        // this.chartMonth[month].
      })
      // val.resources.forEach((val2:any) =>{
      for (let i = 0; i < month; i++) {
        for (let j = 0; j < this.chartMonth[i].chartData.length; j++) {
          this.chartMonth[i].chartData[j].value += this.resourceAssigned![month].resources.length
        }

      }
      // for(let i = month+1;i < 12;i++){
      //   for(let j = 0;j <this.chartMonth[i].chartData.length;j++){
      //     this.chartMonth[i].chartData[j].empty += this.chartMonth[month].chartData.length
      //   }
      // }
      // })
      // this.chartMonth?.push{}
    })


    console.log(historyAssigned)
    for (let i = 0; i < historyAssigned.length; i++) {
      console.log(historyAssigned[i] + 1)
      for (let j = historyAssigned[i] + 1; j < 12; j++) {
        for (let k = 0; k < this.chartMonth[j].chartData.length; k++) {
          // console.log(this.resourceAssigned![historyAssigned[i]].resources.length)
          this.chartMonth[j].chartData[k].empty += this.resourceAssigned![historyAssigned[i]].resources.length
        }
      }
    }
    this.selectedMonth = "มกราคม"
    this.setLinePerMonth(0)
  }

  setLinePerMonth(index: any) {

    if (this.chartMonth) {
      // console.log(this.chartDetail)
      this.chartMonth
      const listLabel: string[] = []
      const listCount: number[] = []
      const listEmpty: number[] = []

      this.chartMonth[index].chartData.forEach((val: any) => {
        // console.log(val)
        listLabel.push(val.label)
        listCount.push(val.value)
        listEmpty.push(val.empty)
      })
      if (this.chartMonth) {
        this.lineChartDataMonth = {
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
  onChangeDropdown(event: any) {
    console.log(event)
    const monthIndex = (element: any) => element == event.value;

    console.log(this.months.findIndex(monthIndex));
    this.setLinePerMonth(this.months.findIndex(monthIndex))
  }
}
