import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResource'
})
export class FilterResourcePipe implements PipeTransform {

  transform(value: any, searchValue: any): any {
    if (!searchValue) return value;
    return value.filter((val: any) => {
      console.log(val);
      val.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        val.size.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    })
  }

}
