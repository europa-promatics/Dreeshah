import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import {environment} from '../../../environments/environment.prod';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-staff-privileges',
  templateUrl: './staff-privileges.component.html',
  styleUrls: ['./staff-privileges.component.scss']
})
export class StaffPrivilegesComponent implements OnInit {
  
  staffArr
  reqData
  length: any;
  user: any;
  constructor(
    private router:Router,
    public CustomerService: CustomerService,
    private toastr: ToastrService,  
  ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))

    this.reqData = {}
				this.reqData.offset = 0
	  		this.reqData.limit = 10
        this.getStaffList()
  }
  getStaffList(){
    var d={
       limit_val:this.reqData.limit,
       offset_val:this.reqData.offset
    }
    this.CustomerService.getProfessionalStaffList(d).subscribe(res =>{
      
      this.staffArr=res.result
      this.length=res.total_counts
      console.log('staffaraayaaaa',this.staffArr)
    })
  } 
addStaff(){
  this.router.navigate(['/sellerAddStaffPrivileges'])
}
editStaff(id){
  this.router.navigate([`/edit-staff/${id}`])
}
getPageSizeOptions() {
  return [10, 20, 30];
}
paginationOptionChange(evt) {
  console.log(evt)
  this.reqData.offset = (evt.pageIndex * evt.pageSize)
  this.reqData.limit = evt.pageSize
  let d={
    limit_val:this.reqData.limit,
    offset_val:this.reqData.offset
  }
  // console.log('ffafdfd985df9d9dfdf569df5dadfs9a9dsf',this.reqData)
  this.CustomerService.getProfessionalStaffList(d).subscribe(res => {
    this.staffArr=res.result
   
  }, err => {
    console.log(err)
    if (err.status >= 400) {
      // this.toastr.error('Internal Error', 'Error')
    } else {
      // this.toastr.error('Internet Connection Error', 'Error')
      console.log('Internet Connection Error')
    }
  })
}
fun2(i){
  console.log("iiiiiiiiii",i);
  
  localStorage.setItem("Grant privilege",JSON.stringify(i))
}
}
