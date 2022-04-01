import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
declare var $ 
@Component({
  selector: 'app-customer-issue-quotation',
  templateUrl: './customer-issue-quotation.component.html',
  styleUrls: ['./customer-issue-quotation.component.scss']
})
export class CustomerIssueQuotationComponent implements OnInit {
  rejectReasonForm: FormGroup;
  quote_id
  user_type
  detail
  modify
  status=[]
 constructor(  private router: Router, private toastr: ToastrService,  private route: ActivatedRoute,private CustomerService:CustomerService,public formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.createForm() 
    this.quote_id = this.route.snapshot.paramMap.get('id')
    this.user_type =JSON.parse(localStorage.getItem('userData'))
    console.log(this.quote_id.paramKey,'hello');
    this.Issuequotation();

    this.route.queryParams
      .subscribe(params => {
        console.log(params,this.status);
        this.status.push(params)
      }
    );
  }
  createForm() {
    this.rejectReasonForm = this.formBuilder.group({
      'reject_reason': [null],
   
    });
  }
Issuequotation(){
let obj={
  quotation_id:this.quote_id, 
  user_type:this.user_type.user_type
}
this.CustomerService.issueQuotation(obj).subscribe(res=>{
  console.log("Response of the quotaion detailsssssssssssssss>>>>",res)
  this.detail =res.data
  console.log("quotationnnnnnnnnnnnnnnnnnnnn issue",this.detail)
})
}
_id
issueQuotationmodify(){
  if(this.user_type=="customer"){
 this._id=this.user_type._id
  }else{
this._id=this.detail.professional_id
  }

  let obj={
    quotation_id:this.quote_id, 
    id:this._id
  }
  this.CustomerService.issueQuotationmodify(obj).subscribe(res=>{
    console.log("Response of the quotaion detail>>>>",res)
    
    this.modify =res.data
    console.log("fdsgfdgf",this.modify)
    console.log("quotation issue",this.detail)
    this.router.navigate(['/customer-quotation']);
  })
}
quotationAction(){
 
  let obj={
    quotation_id:this.quote_id, 
    status :'approved' , 
   
  }
  this.CustomerService.quotationAction(obj).subscribe(res=>{
    console.log("Response of the quotaion detail>>>>",res)
    this.toastr.success("Quote request accepted sucessfully")
    this.router.navigate(['/customer-quotation'])


    this.modify =res.data
   //console.log("quotation issue",this.detail)
  //  this.ngOnInit()
  })
}

quotationActionReject(){
 
  let obj={
    quotation_id:this.quote_id, 
    status :'rejected' , 
    reject_reason:this.rejectReasonForm.controls.reject_reason.value
  }
  this.CustomerService.quotationAction(obj).subscribe(res=>{
    console.log("Response of the quotaion detail>>>>",res)
    this.modify =res.data
    console.log("quotation issue",this.detail)
    this.toastr.success("Quote request rejected sucessfully")
    //this.ngOnInit()
    
  })
}
fun(){
  $('#SuccessRejectModal').hide(); 
  this.router.navigate(['/customer-quotation']);   
}
}
