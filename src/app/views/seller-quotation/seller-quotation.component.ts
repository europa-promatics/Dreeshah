import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
@Component({
  selector: 'app-seller-quotation',
  templateUrl: './seller-quotation.component.html',
  styleUrls: ['./seller-quotation.component.scss']
})
export class SellerQuotationComponent implements OnInit {

	allQuotations = []
	pendingList = []
  progressList = []
  rejectedList = []
  modifyList =[]
  approvedList = []
  completedList = []
  closedList = []
	quotationCount = 0
  pendingCount = 0
  progressCount = 0
  rejectCount = 0
  modifyCount = 0
  closedCount = 0
  completedCount = 0
  approvedCount = 0
  image_path
  offset_val =0 
  limit_val = 10
  length

  offset = 0
  limit = 10
  constructor(public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(){
  	this.sellerQuotations();
  	this.pendingQuotations();
    this.progressQuotations();
    this.modifyQuotations();
    this.rejectedQuotations();
    this.approvedQuotations();
    this.completedQuotations();
    this.closedQuotations();

    this.image_path = environment.image_path + "ProfessionalServices/"

  }

  sellerQuotations() {
    var obj = {
      limit : this.limit_val,
      offset : this.offset_val,
      status : "all",
      search : "",
      filter : "",
    }
    console.log("obj===", obj)
   // alert("Here")
    
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Professional Quotation request====>>>>>>",data);
      if (data.code == 200) {
        this.allQuotations = data.result
        this.quotationCount = data.count
        this.length = data.count
      }

      //alert("Wooww")
    },(err)=> {
      console.log(err)
     // alert("Error")
    })
  
  }

  pendingQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'pending',
      search : "",
      filter : "",
    }
    console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("PendingQuotation Response>>>>",data);
      if (data.code == 200) {
        this.pendingList = data.result
        console.log("pending List========",this.pendingList);
        
        this.pendingCount = data.count
      }
    },(err)=> {
      this.pendingCount = 0
      console.log("Error occured>>>>><<<<<<<",err)
      
    }
    )
  }

  progressQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'inprogress',
      search : "",
      filter : "",
    }
    //console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Progress Quotation>>>>",data);
      if (data.code == 200) {
        this.progressList = data.result
        this.progressCount = data.count
      }
    },(err)=> {
      console.log(err)
      
    }
    )
  }

  rejectedQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'rejected',
      search : "",
      filter : "",
    }
    //console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Rejected Response",data);
      if (data.code == 200) {
        this.rejectedList = data.result
        this.rejectCount = data.count
      }
    },(err)=> {
      console.log(err)
      //alert("Error")
    }
    )
  }

  modifyQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'modified',
      search : "",
      filter : "",
    }
    //console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Modify Response",data);
      if (data.code == 200) {
        this.modifyList = data.result
        this.modifyCount = data.count
      }
    },(err)=> {
      console.log(err)
      
    }
    )
  }

  completedQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'completed',
      search : "",
      filter : "",
    }
   // console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Completed Response",data);
      if (data.code == 200) {
        this.completedList = data.result
        this.completedCount = data.count
      }
    },(err)=> {
      console.log(err)
    
    }
    )
  }

  approvedQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'approved',
      search : "",
      filter : "",
    }
    //console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Approved Response",data);
      if (data.code == 200) {
        this.approvedList = data.result
        this.approvedCount = data.count
      }
    },(err)=> {
      console.log(err)
      
    }
    )
  }

  closedQuotations() {
    var obj = {
      limit : 10,
      offset :0,
      status: 'closed',
      search : "",
      filter : "",
    }
    //console.log("obj===", obj)
    this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
      console.log("Closed Response",data);
      if (data.code == 200) {
        this.closedList = data.result
        this.closedCount = data.count
      }
    },(err)=> {
      console.log(err)
      
    }
    )
  }

  filterByServiceName(value,statusQuo) {
    console.log("Value for the search>>>",value)
    console.log("Value for the status>>>>",statusQuo)
    if(value){
    console.log("uuuuuu===", value)
    //this.service_name = value
    var obj={
      search : value,
      filter : "service_name",
      limit :10,
      offset :0,
      status : statusQuo
    }
    
    
    this.CustomerService.professionalQuotationSearch(obj).subscribe(res => {
        console.log("Result of the search====>>>",res)
        if (res.code == '200' || res.code == 200) {
          this.allQuotations = res.result
          this.quotationCount = res.count
          this.pendingCount = res.count
          this.progressCount = res.count
          this.rejectCount = res.count
          this.modifyCount = res.count
          this.closedCount = res.count
          this.completedCount = res.count
          this.approvedCount = res.count
        }
        else {
          console.log("In the Else condition>>>>>>>>")
          this.quotationCount = 0
          //this.allQuotations.length = 0
        }
        
    },(err)=> {
      this.quotationCount = 0
      this.pendingCount = 0
      this.progressCount = 0
      this.rejectCount = 0
      this.modifyCount = 0
      this.closedCount = 0
      this.completedCount = 0
      this.approvedCount = 0
      console.log("Error occured>>>>><<<<<<<",err)
      
    }
    )
    //this.getServiceListing()
    }else{
      this.ngOnInit()
  }
  }




   acceptQuote(dta) {
    console.log("Data of the quotation to be accepted")
    var obj = {
      // offset_val: this.offset,
      quotation_id: dta._id,
      status: 'approved',
    }
    console.log("obj===", obj)
    this.CustomerService.professionalQuotationAction(obj).subscribe(data => {
      console.log("Accepted Quotation",data);
      this.ngOnInit()
      console.log(data);
      this.toastr.success("Quote request accepted sucessfully")
    })
   }


  rejectQuote(dta) {
    console.log("Data of the quotation to be rejected>>>>>>",dta)
    var obj = {
      // offset_val: this.offset,
      quotation_id: dta._id,
      status: 'rejected',
    }
    console.log("obj===", obj)
    this.CustomerService.professionalQuotationAction(obj).subscribe(data => {
      console.log("rejected",data);
      this.ngOnInit()
      console.log(data);
      this.toastr.success("Quotation request rejected sucessfully")
    })
  }

  paginationOptionChange(evt) {
    console.log("evthrm",evt)
    this.offset_val = (evt.pageIndex * evt.pageSize)
    this.limit_val = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
  var obj={
   
    limit : this.limit_val,
      offset: this.offset_val
    
  }
  this.CustomerService.professionalQuotationRequest(obj).subscribe(async data => {
    console.log("Professional Quotation request====>>>>>>",data);
    if (data.code == 200) {
      this.allQuotations = data.result
      this.quotationCount = data.count
    }

    //alert("Wooww")
  },(err)=> {
    console.log(err)
   // alert("Error")
  })


}

}
