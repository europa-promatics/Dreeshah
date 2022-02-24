import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-seller-project-listing-page',
  templateUrl: './seller-project-listing-page.component.html',
  styleUrls: ['./seller-project-listing-page.component.scss']
})
export class SellerProjectListingPageComponent implements OnInit {
  listArr = []
  imgUrl
  reqData
  length=0;
 
  constructor(
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.reqData = {}
    this.reqData.offset = 0
    this.reqData.limit = 10
    this.getProjList()
    this.imgUrl = environment.projImg
  }
  getProjList() {
    var d = {
      limit: this.reqData.limit,
      offset:this.reqData.offset
    }

    this.CustomerService.getProfessionalProjects(d).subscribe(res => {
      console.log('res of proj listing', res)
      this.listArr = res.data
     // this.length=res.data.length
      this.length=res.total_counts
    })
  }
  getPageSizeOptions() {
    return [10, 20, 30];
  }
  paginationOptionChange(evt) {
    console.log(evt)
    this.reqData.offset = (evt.pageIndex * evt.pageSize)
    this.reqData.limit = evt.pageSize
    let d = {
      limit_val: this.reqData.limit,
      offset_val: this.reqData.offset
    }
    // console.log('ffafdfd985df9d9dfdf569df5dadfs9a9dsf',this.reqData)
    this.CustomerService.getProfessionalProjects(d).subscribe(res => {
      this.listArr = res.result
      this.length=res.total_counts

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
