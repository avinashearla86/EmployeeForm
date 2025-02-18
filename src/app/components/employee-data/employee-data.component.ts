import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  imports: [FormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent implements OnInit{
  
  @ViewChild('empModal')empModal:ElementRef | undefined;

  employeeList : any[]=[];

  employeeObj :any = {
    
      "employeeid": 0,
      "firstName": "",
      "lastName": "",
      "email": "",
      "contactNo": "",
      "city": "",
      "address": ""
    

  }
   http = inject(HttpClient)
  openModel(){
    if(this.empModal){
      this.empModal.nativeElement.style.display='block'
    }


  }
  closeModel(){
    if(this.empModal){
      this.empModal.nativeElement.style.display='none'
    }

  }
  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(){
    this.http.get("https://localhost:7157/api/EmployeeMaster").subscribe((res:any)=>{
      this.employeeList=res;
    })
  }

  onsave(){
    this.http.post("https://localhost:7157/api/EmployeeMaster",this.employeeObj).subscribe((res:any)=>{
      this.getAllItems();
      this.closeModel();
    })
  }

  onEdit(data : any){
    this.openModel();
    this.employeeObj=data;
    
  }
  onDelete(data : any){
    const isdel =confirm("are you want to delete")
    if(isdel){
      this.http.delete("https://localhost:7157/api/EmployeeMaster/"+data.employeeid).subscribe((res:any)=>{
        this.getAllItems();
    
    
    })
  }
    
  }

  onUpdate(){
    this.http.put("https://localhost:7157/api/EmployeeMaster/"+this.employeeObj.employeeid,this.employeeObj).subscribe((res:any)=>{
      this.getAllItems();
      this.closeModel();
    })

  }

}
