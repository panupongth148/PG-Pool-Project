import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ): any {
    let months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]
    
    // console.log(typeof value)
    let date = new Date(value)
    let year;
    if(date.getFullYear() > 2500){
      year = date.getFullYear();
    }else{
      year = date.getFullYear()+543
    }
    // console.log(date.getFullYear())
    return date.getDate() + " " + months[date.getMonth()] + " "+ year;
  }

}
