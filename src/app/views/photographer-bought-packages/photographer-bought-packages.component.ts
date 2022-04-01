import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
@Component({
  selector: 'app-photographer-bought-packages',
  templateUrl: './photographer-bought-packages.component.html',
  styleUrls: ['./photographer-bought-packages.component.scss']
})
export class PhotographerBoughtPackagesComponent implements OnInit {

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
        this.getPAckageList()
  }
  getPAckageList(){
    var d={
       limit:this.reqData.limit,
       offset:this.reqData.offset,
       photographer_id:JSON.parse(localStorage.getItem("userData"))._id
    }
    this.CustomerService.getPhotographerPackageBookings(d).subscribe(res =>{
      console.log(res);
      
      this.staffArr=res.data
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
    limit:this.reqData.limit,
    offset:this.reqData.offset
  }
  // console.log('ffafdfd985df9d9dfdf569df5dadfs9a9dsf',this.reqData)
  this.CustomerService.getPhotographerPackageBookings(d).subscribe(res => {
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

}
