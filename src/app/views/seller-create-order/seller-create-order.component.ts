import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Moment } from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-seller-create-order',
  templateUrl: './seller-create-order.component.html',
  styleUrls: ['./seller-create-order.component.scss']
})


export class SellerCreateOrderComponent implements OnInit {
  isButtonVisible = true;
  quote_id: any;
  user_type: any;
  status=[];
  user: any;
  quote_ref: any;

  issue_quote_id: any;
  cust_id: any;
  pro_id: any;
  pay_term_id: any;
  status1: any;




  form1: FormGroup;
  form2: FormGroup;
  phoneForm: FormGroup;
  fname;
  lname;
  product_id;
  professional_id;
  quantity;
  aline1;
  aline2;
  city;
  state;
  zcode;
  phone;
  namecard;
  numbercard;
  datecard;
  cvv;
  submit_button = false;
  submit_button2 = false;
  addressdetails: any;
  cardsdetails;
  latestAddress;
  streetName;
  streetNumber;
  area;
  country;
  country_ph_code;
  buildingNumber;
  buildingName;
  len: any;
  arr1 = [];
  hideNum = [];
  cardsLength;
  changedNum = [];
  price;
  addObj;
  orederObj;
  UserId;
  isLogin;
  userId;
  cartDetail;
  obj1;
  obj2;
  productObj = [];
  files = [];
  files2 = [];
  obj3;
  divHide1 = true;
  divHide2 = true;
  Items;
  qty;
  itemId;
  tokenid
  addline1;
  addline2;
  streetNum;
  buildingNum;
  pincode;
  phoneNo;
  selectedCountry: any;
  selectedState: any;
  states;
  cities;
  countries;
  countryDial;
  addType;
  professionalIdArr = [];
  productsList = [];
  landmark;
  address_type;
  checkoutData = {};
  handler:any = null;
  public today = new Date().toJSON().split("T")[0];
  feedback: any;
  constructor(public gallery: Gallery,  private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,) { 
      this.form2 = this.formBuilder.group({
        namecard: [null, Validators.compose([Validators.required])],
        numbercard: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern("^[0-9]{12}(?:[0-9]{4})?$"),
          ]),
        ],
        datecard: [null, Validators.compose([Validators.required])],
        cvv: [
          null,
          Validators.compose([Validators.required, Validators.maxLength(3)]),
        ],
      });
    }

  ngOnInit(): void {
    
    this.status1=this.route.snapshot.queryParams.status
    console.log("statusssssssssssssssssssss",this.status1)
    this.quote_id = this.route.snapshot.queryParams.quote_id
    this.quote_ref=this.route.snapshot.queryParams.quote_ref
    this.user_type =JSON.parse(localStorage.getItem('userData'))
    this.user=this.user_type.user_type
    console.log("usertype=========",this.user);
    this.Issuequotation();
    this.route.queryParams
    .subscribe(params => {
      // console.log(params,this.status);
      this.status.push(params)
    }
  );
  
  }
  Issuequotation(){
    let obj={
      quotation_id:this.quote_id, 
      user_type:this.user_type.user_type
    }
    this.CustomerService.issueQuotation(obj).subscribe(res=>{
      console.log("Response of the quotaion details>>>>",res.data)
    this.user=res.data

    this.issue_quote_id=this.user._id
    this.cust_id=this.user.customer_id
    this.pro_id=this.user.professional_id
    for(let i=0;i<this.user.payment_terms.length;i++){
      if(this.user.payment_terms[i].status=='pending'){
        this.pay_term_id=this.user.payment_terms[i]._id
        break;
      }
    }
    for(let i=0;i<this.user.payment_terms.length;i++){
      if(this.user.payment_terms[i].status=='ongoing'){
        this.feedback=this.user.payment_terms[i].feedback
        break;
      }
    }

    })

    }

    cancelOrCreateQuatationOrder1(){
      let obj={
        quotation_id:this.quote_id, 
        issue_quotation_id:this.issue_quote_id,
        status:"completed",
        customer_id:this.cust_id,
        professional_id: this.pro_id,
        payment_term_id:this.pay_term_id
             }
      //console.log("create order=========",obj)
      this.CustomerService.cancelOrCreateQuatationOrder(obj).subscribe(res=>{
        console.log("Response of the cancel order details>>>>",res)
        if(res.code==200){
          this.toastr.success('Request for Payment has been sent Successfully')
          this.router.navigate(['/dashboard'])
        }
        else if(res.code>=400){
          this.toastr.error('Some error occured')
        }
    })
    }

    cancelOrCreateQuatationOrder2(){
      let obj={
        quotation_id:this.quote_id, 
        issue_quotation_id:this.user._id,
        status:"cancelled"
             }
      this.CustomerService.cancelOrCreateQuatationOrder(obj).subscribe(res=>{
        console.log("Response of the cancel order details>>>>",res)
        if(res.code==200){
          this.toastr.success('Order Cancelled Successfully')
          this.router.navigate(['/dashboard'])
        }
        else if(res.code>=400){
          this.toastr.error('Some error occured')
        }
    })
    }
 milestone(){
   for(let i=0;i<this.user.payment_terms.length;i++){
    if(this.user.payment_terms[i].status=='pending'){
      var msg=`Pay for MileStone ${i+1}`;
      return msg;
  }
  else if(this.user.payment_terms[i].status=='ongoing'){
    var msg="wait for customer response";
    return msg;
     
  }
  }
}

 cancelQuationOrders(){
  let obj={
    quotation_order_id : this.route.snapshot.queryParams.id,
    status:"cancel"
         }
  this.CustomerService.changeStatusQuationOrders(obj).subscribe(res=>{
    console.log("Response of the cancel order details>>>>",res)
    if(res.code==200){
      this.toastr.success('Order Cancelled Successfully')
      this.router.navigate(['/dashboard'])
    }
    else if(res.code>=400){
      this.toastr.error('Some error occured')
    }
})
}
endContractQuationOrders(){
  let obj={
    quotation_order_id : this.route.snapshot.queryParams.id,
    status:"end_by_professional"
         }
  this.CustomerService.changeStatusQuationOrders(obj).subscribe(res=>{
    console.log("Response of the cancel order details>>>>",res)
    if(res.code==200){
      this.toastr.success('Contract has been ended Successfully')
      this.router.navigate(['/dashboard'])
    }
    else if(res.code>=400){
      this.toastr.error('Some error occured')
    }
})
}
markAsDoneMilestone(){
  let obj={
    quotation_order_id : this.route.snapshot.queryParams.id,
    issue_quotation_id:this.user._id,
    payment_term_id:this.pay_term_id,
    status:""
         }
  this.CustomerService.markAsDoneMilestone(obj).subscribe(res=>{
    console.log("Response of the cancel order details>>>>",res)
    if(res.code==200){
      this.toastr.success('Response has been sent Successfully')
      this.router.navigate(['/dashboard'])
    }
    else if(res.code>=400){
      this.toastr.error('Some error occured')
    }
})
}
markAsDone(){
  for(let i=0;i<this.user.payment_terms.length;i++){
   if(this.user.payment_terms[i].status=='payment_done'){
     var msg=`Mark As done Milestone ${i+1}`;
     return msg;
 }
}}

}
