import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;

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
  quotationForm: FormGroup;
  phoneForm: FormGroup;
  countryDial: string;
  detail :any;
  modified='modified request'
  modifiid: any;
  formattedaddress: any;
  phone_number
  
  phone
  constructor(
    public CustomerService: CustomerService,private fb:FormBuilder,    private toastr: ToastrService,

  ) { 
    this.phoneForm = new FormGroup({
      phone: new FormControl('', [Validators.required])
    });
    this.quotationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        // Validators.email,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      // phone: new FormControl('', [
      //   Validators.required
      // ]),
      // phone_number: new FormControl('', [
      //   Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
      // ]),
      quotation_ref: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl(new Date(), [
        Validators.required,
      ]),
      // time: new FormControl(new Date(), [
      //   Validators.required,
      // ]),
      sales_representative: new FormControl('', [
        Validators.required,
      ]),
      service_name: new FormControl(''),
      location: new FormControl('', [
        Validators.required,
      ]),
      // quantity: new FormControl('', [
      //   Validators.required, Validators.pattern('^[0-9]*')
      // ]),
      expected_date: new FormControl('', [
        Validators.required,
      ]),
      estimated_budget: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]*')
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
    })
  }

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

  countryCode(evt) {
    console.log("Country Code is >>>>", evt)
    this.countryDial = '+' + evt.dialCode
    console.log("Country Code is >>>>", this.countryDial)
  }
  
  edit(data:any){
console.log(data)
const obj={
  quotation_id :data
}
this.CustomerService.customerQuotationDetail(obj).subscribe(res=>{
  console.log("Response of the quotaion detail>>>>",res)
  this.detail =res.details
  console.log("Response of the quotaion detail>>>>",this.detail)

this.quotationForm.patchValue({
  name:this.detail?.name,
  email:this.detail?.email,
  quotation_ref:this.detail?.quotation_ref,
  date:new Date(this.detail?.date ),
  expected_date:new Date(this.detail?.expected_date ),
  sales_representative:this.detail?.sales_representative,
  service_name:this.detail?.service_name,
  location:this.detail?.location,
  estimated_budget:this.detail?.estimated_budget,
  description:this.detail?.description,
})
this.phoneForm.patchValue({
  phone:this.detail?.phone_number
})
})





}
AddressChange(address: any) {
  //setting address from API to local variable
   this.formattedaddress=address.formatted_address


}
submitQutation(){
  let obj = {
    // professional_id: ,
    // professional_service_id:this.quotationForm.value.name,
    name: this.quotationForm.value.name,
    email: this.quotationForm.value.email,
    phone_number:this.phoneForm.value.phone,
    
    // quotation_ref:this.quotationForm.value.quotation_ref,
    // date:this.quotationForm.value.quotation,

    // sales_representative:this.quotationForm.value.sales_representative,
    // service_name: this.quotationForm.value.service_name,
    location: this.quotationForm.value.location,
 
    expected_date: this.quotationForm.value.expected_date,
    estimated_budget: this.quotationForm.value.estimated_budget,
    quote_id:this.detail._id,
    description: this.quotationForm.value.description,
    // country_code:this.quotationForm.value.quotation,edit
    // quotation_no:this.detail?.quotation_no,
    // subject:this.detail?.subject
    

  }
  this.CustomerService.updateQuotation(obj).subscribe((res)=>{
      console.log(res)
      this.toastr.success('Quotation Form submitted successfully', 'success')
      this.ngOnInit()
  })
 
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
  modifyrequest(id:any){
    console.log(id)
    this.modifiid=id
    const obj={
      quote_id:id,
      modified:'pending'
    }
     document.getElementById(id).innerHTML='sent'
    //  document.getElementById(id).setAttribute('disabled', 'disabled');
    this.CustomerService.updateQuotation(obj).subscribe((res)=>{
      console.log(res)
      // document.getElementById()
      // document.getElementsByClassName('a').
      this.toastr.success('Quotation Form submitted successfully', 'success')
      this.ngOnInit()
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
  deleteQuotations(id:any) {
    var obj = {
      quotation_id:id
    }
    console.log("obj===")
    this.CustomerService.customerQuotationdeletebyid(obj).subscribe(async data => {
      console.log("Response of the In Progress quotation is===>>>>>",data);
      if (data.code == 200) {
        this.progressList = data.result
        this.progressLen =data.count
        console.log("Response of the In Progress quotation is===>>>>>",this.progressList);
     
      }
    })
    this.ngOnInit()
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
