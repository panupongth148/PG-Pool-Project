import { Component, OnInit } from '@angular/core';
import { ExcelImportedService } from '../service/imports/excel-imported.service';

@Component({
  selector: 'app-imported-excel',
  templateUrl: './imported-excel.component.html',
  styleUrls: ['./imported-excel.component.scss']
})
export class ImportedExcelComponent implements OnInit {

  constructor(private excelImportsService: ExcelImportedService) { }

  ngOnInit(): void {
  }
  files?: any[];

  onFileChange(event: any){
    this.files = event.target.files;
    console.log(this.files);
  }
  upload(){
    const formData = new FormData()
    if(this.files){
      
    }else{
      formData.append("excelFile", this.files ?? "error")
    }
    
    this.excelImportsService.sendFileExcel(formData).subscribe(res =>{
      console.log(res)
    })
  }
}
