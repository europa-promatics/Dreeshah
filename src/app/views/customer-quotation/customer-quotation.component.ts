import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-customer-quotation',
  templateUrl: './customer-quotation.component.html',
  styleUrls: ['./customer-quotation.component.scss']
})
export class CustomerQuotationComponent implements OnInit {

  offset = 0
  limit = 10
  allQuotations = []
  pendingList = []
  progressList = []
  rejectedList = []
  approvedList = []
  closedList = []
  completedList = []
  allLen =0
  pendingLen =0
  progressLen =0
  rejectLen =0
  approvedLen =0
  modifhyLen=0
  closedLen =0
  completedLen =0
  modifyQuotations=[]
  constructor(
    public CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {

    this.sellerQuotations();
    this.pendingQuotations();
    this.progressQuotations();
    this.rejectedQuotations();
    this.approvedQuotations();
    this.closedQuotations();
    this.completedQuotations();
    this.modifyQuotation();
  }

  sellerQuotations() {
    var obj = {
      limit : "50",
      offset:"0",
      status:"all",
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerQuotation(obj).subscribe(async data => {
      console.log("Reponse of the allquotation is===>>>>>",data);
      if (data.code == 200) {
        this.allQuotations = data.result
        this.allLen = data.count
        console.log("Response of the quotation is===>>>>>",this.allQuotations);
        //this.quotationCount = data.count
      }
    })
  }
  modifyQuotation() {
    var obj = {
      limit : "10",
      offset:"0",
      status:"modified",
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerQuotation(obj).subscribe(async data => {
      console.log("Reponse of the quotation is===>>>>>",data);
      if (data.code == 200) {
        this.modifyQuotations = data.result
        this.modifhyLen = data.count
        console.log("Response of the quotation is===>>>>>",this.modifyQuotations);
        //this.quotationCount = data.count
      }
    })
  }


  pendingQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status:"pending",
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerPendingQuotation(obj).subscribe(async data => {
      console.log("Reponse of the Pending quotation is===>>>>>",data);
      if (data.code == 200) {
        this.pendingList = data.result
        this.pendingLen = data.count
        console.log("Response of the Pending quotation is===>>>>>",this.pendingList);
        //this.quotationCount = data.count
      }
    })
  }

  progressQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status: 'inprogress',
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerProgressQuotation(obj).subscribe(async data => {
      console.log("Response of the In Progress quotation is===>>>>>",data);
      if (data.code == 200) {
        this.progressList = data.result
        this.progressLen =data.count
        console.log("Response of the In Progress quotation is===>>>>>",this.progressList);
      }
    })
  }

  rejectedQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status: 'rejected',
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerRejectQuotation(obj).subscribe(async data => {
      console.log("Response of the Rejected quotation is===>>>>>",data);
      if (data.code == 200) {
        this.rejectedList = data.result
        this.rejectLen =data.count
        console.log("Response of the Rejected quotation is===>>>>>",this.rejectedList);
      }
    })
  }
  approvedQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status: 'approved',
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerApprovedQuotation(obj).subscribe(async data => {
      console.log("Response of the Approved quotation is===>>>>>",data);
      if (data.code == 200) {
        this.approvedList = data.result
        this.approvedLen =data.count
        console.log("Response of the Approved quotation is===>>>>>",this.approvedList);
      }
    })
  }

  completedQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status: 'completed',
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerCompletedQuotation(obj).subscribe(async data => {
      console.log("Response of the Rejected quotation is===>>>>>",data);
      if (data.code == 200) {
        this.completedList = data.result
        this.completedLen =data.count
        console.log("Response of the Completed quotation is===>>>>>",this.completedList);
      }
    })
  }

  closedQuotations() {
    var obj = {
      limit : "10",
      offset:"0",
      status: 'closed',
      search :"",
      filter : ""
    }
    console.log("obj===", obj)
    this.CustomerService.customerClosedQuotation(obj).subscribe(async data => {
      console.log("Response of the Rejected quotation is===>>>>>",data);
      if (data.code == 200) {
        this.closedList = data.result
        this.closedLen =data.count
        console.log("Response of the Closed quotation is===>>>>>",this.closedList);
      }
    })
  }


  filterByServiceName(value,statusQuo) {

    if(value){
    console.log("uuuuuu===", value)
    //this.service_name = value
    var obj={
      search : value,
      filter : "service_name",
      limit :10,
      offset :0,
      status: statusQuo,
    }
    this.CustomerService.customerQuotation(obj).subscribe(res => {
        console.log("Result of the search====>>>",res)
        if (res.code == '200' || res.code == 200) {
          this.allQuotations = res.result
          this.allLen = res.count
          this.pendingLen = res.count
        this.progressLen = res.count
        this.rejectLen = res.count
        this.closedLen = res.count
        this.completedLen = res.count
        this. approvedLen = res.count
        this.modifhyLen=res.count
        
        }
        else{
          this.allLen = 0
        }
    },(err)=> {
        this.allLen = 0
        this.pendingLen = 0
        this.progressLen = 0
        this.rejectLen = 0
        this.closedLen = 0
        this.completedLen = 0
        this. approvedLen = 0
        this.modifhyLen=0
        console.log("Error occured>>>>><<<<<<<",err)
      
    })
    //this.getServiceListing()
    }else{
      this.ngOnInit()
  }
  }

}
