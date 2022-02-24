
import { Component, OnInit } from '@angular/core';


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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create-order',
  templateUrl: './customer-create-order.component.html',
  styleUrls: ['./customer-create-order.component.scss']
})
export class CustomerCreateOrderComponent implements OnInit {
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




  form2: FormGroup;
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
  detailsSaved:boolean
  address_type;
  checkoutData = {};
  handler:any = null;
  public today = new Date().toJSON().split("T")[0];
  Array: any;
  PayQuationOrdersList: any;
  payment: any;
  totalprice: any;
  payment_intentent: any;
  payment_terms=[];
  feedback
  reqdIndex: number;
  special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth','twenty'];
  deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
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
    this.loadStripe()
    // this.QuotationDetails()
    this.feedback=new FormControl(null,Validators.required)
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
    this.totalprice=this.user.total_price
    this.payment_terms=this.user.payment_terms
    for(let i=0;i<this.user.payment_terms.length;i++){
      if(this.user.payment_terms[i].status=='pending'){
        this.payment=this.user.payment_terms[i].payment_percent
        break;
      }
    }
    for(let i=0;i<this.user.payment_terms.length;i++){
      if(this.user.payment_terms[i].status=='pending'){
        this.pay_term_id=this.user.payment_terms[i]._id
        break;
      }
    }
    console.log("sadfsetfrgewtrf",this.payment,this.pay_term_id);
    

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
      console.log("create order=========",obj)
      this.CustomerService.cancelOrCreateQuatationOrder(obj).subscribe(res=>{
        console.log("Response of the cancel order details>>>>",res)
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
    })
    }
    stringifyNumber(n) {
      if (n < 20) return this.special[n];
      if (n%10 === 0) return this.deca[Math.floor(n/10)-2] + 'ieth';
      return this.deca[Math.floor(n/10)-2] + 'y-' + this.special[n%10];
    }
    prodCheckOut() 
     {
       if(this.feedback.value!=null || this.payment_terms[0]?.status=='pending' || this.payment_terms[0]?.status=='ongoing'){
       this.price=Math.floor((this.totalprice/100)*parseInt(this.payment))
      var obj={
        amount:Math.floor((this.totalprice)*parseInt(this.payment)).toString(),
        currency:'aed'
      }
      this.CustomerService.stripeApi(obj).subscribe(data=>{
        console.log("stripe data is=======>", data);
        this.payment_intentent=data.paymentIntent
      })
      var self=this;
  
      var  handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
        locale: 'auto',
         token:async function (token: any) {
          this.tokenid=token;
          console.log(token)
          // alert('Token Created!!');

          await self.payQuationOrders()
        }
       
      });
      
      handler.open({
       
        amount: this.price*100,
        currency:'aed'
      });
     
      const user = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : {};
     
      this.UserId = user._id;
      // this.payQuationOrders()
    }
    else{
      this.toastr.error("Please enter feedback first")
    }
   }
   sendFeedback(){
    
      if(this.payment_terms[0]?.status=='payment_done'){
        var line=`Send feedback of previous milestone`
        return line
      }
      else{
        return null
      }
      
    
   }


  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          // 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI'
          key: 'ek_test_YWNjdF8xSldETTJJN0E3eWNiQ3pELFk2WkxiOTFsSnNieXVvVFZaWHRkdjVXNjdUM2Z1V3U_00jBlWEvXU',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }
  payQuationOrders(){
   {
      var obj = {
      issue_quotation_id :this.issue_quote_id,
      payment : this.payment,
      transaction_id :this.payment_intentent,
      payment_term_id :this.pay_term_id,
      quotation_order_id : this.route.snapshot.queryParams.id
      }
    
  
    this.CustomerService.payQuationOrders(obj).subscribe(async data => {
     
        this.PayQuationOrdersList = data.result

        console.log("payQuationOrders",this.PayQuationOrdersList);
        if(data.code==200){
          this.toastr.success('Payment Done Successfully')
          this.router.navigate(['/dashboard'])
        }
        else if(data.code>=400){
          this.toastr.error('Some error occured')
        }
      })
    }
  }
  saveFeedback(){
    console.log(this.feedback);
    for(let i=0;i<this.payment_terms.length;i++){
      if(this.payment_terms[i].status=='ongoing'){
        this.reqdIndex=i
      }
    }
    var obj={
      issue_quotation_id:this.issue_quote_id,
      payment_term_id:this.payment_terms[this.reqdIndex]._id,
      feedback:this.feedback.value
    }
    this.CustomerService.sendMilestoneFeedback(obj).subscribe(res=>{
      console.log(res);
      if(res.code==200){
        this.toastr.success("Feedback given successfully")
      }
    })
  }
fun(){
  for(let i=0;i<this.payment_terms.length;i++){
    if(this.payment_terms[i].status=='ongoing'){
      var line=`pay for ${this.stringifyNumber(i+1)} milestone`
      return line
    }
    else if(this.payment_terms[i].status=='pending'){
      var line=`Wait for Professional's Response`
      return line
    }
  }
  
}



  // QuotationDetails() {
  //     var obj = {
  //       limit : 10,
  //       offset : 0,
  //       status : "all",
  //       search : "",
  //       filter : "",
  //       }
  //     //console.log("obj===", obj)
    
  //     this.CustomerService.getQuationOrders(obj).subscribe(async data => {
        
  //      console.log("bfdghftrghtrh",data);
       
  
  //         console.log("QuotationDetails",this.Array);
  //       })
  //   }

}
