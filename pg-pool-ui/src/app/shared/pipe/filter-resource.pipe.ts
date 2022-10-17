import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResource'
})
export class FilterResourcePipe implements PipeTransform {

  transform(value: any, searchValue: any): any {


    if (!searchValue) {
      // console.log("in non search text")
      // console.log(value)
      return value;
    }
    const result = value.filter((val: any) => {
      if (searchValue.indexOf(" ") > -1) {
        searchValue = searchValue.replace(/\s/g, '');
      }
      // console.log(searchValue)

      return (val.prefix.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || val.firstName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        val.lastName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) || (val.firstName.toLowerCase() + val.lastName.toLowerCase()).indexOf(searchValue.toLowerCase()) > -1
        || (val.prefix.toLowerCase() + val.firstName.toLowerCase() + val.lastName.toLowerCase()).indexOf(searchValue.toLowerCase()) > -1
    })
    // console.log(result)
    return result
  }

}
