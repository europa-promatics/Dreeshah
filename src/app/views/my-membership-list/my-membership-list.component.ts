import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
declare var $
@Component({
  selector: 'app-my-membership-list',
  templateUrl: './my-membership-list.component.html',
  styleUrls: ['./my-membership-list.component.scss']
})
export class MyMembershipListComponent implements OnInit {
  plans=[];
  handler: any;
  price: number;
  payment_intentent: any;
  subscriptionData: any;
  UserId: any;
  reqdData: any;
  user: any;

  constructor(private service:CustomerService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))
    this.getMemberShips()
    this.loadStripe()
  }
  getMemberShips(){
    var obj={
      user_type:JSON.parse(localStorage.getItem("userData")).user_type
    }
    this.service.getMemberships(obj).subscribe(data=>{
      console.log(data);
      this.plans=data.data
    })
  }
  buyNowCOmplete(){
    var today=new Date()
    var tomorrow = new Date();
    var end_date=new Date(tomorrow.setDate(today.getDate()+parseInt(this.subscriptionData.duration)*28))

    console.log(new Date(end_date));
    var obj={
      user_type:JSON.parse(localStorage.getItem("userData")).user_name,
      user_id:JSON.parse(localStorage.getItem("userData"))._id,
      membership_plan_id:this.subscriptionData._id,
      transcation_id:this.payment_intentent,
      start_date:today,
      end_date:end_date
    }
    this.service.buyMemberships(obj).subscribe(res=>{
      console.log(res);
      if(res.code==200){
        this.toastr.success("Plan bought successfully")
        this.router.navigate(["/my-membership"])
      }
    })
    

  }
  buy(subscription){
    $('#buymdl').modal("show")
    this.reqdData=subscription
  }
  buyNow(){
    this.subscriptionData=this.reqdData
    this.price=parseInt(this.reqdData.price)
    var obj={
      amount:this.price * 100,
      currency:'aed'
    }
    console.log("fsdgrgrwg",obj);
    
    this.service.stripeApi(obj).subscribe(data=>{
      console.log("stripe data is=======>", data);
      this.payment_intentent=data.paymentIntent
    })
    var self=this;

    var  handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
       token: function (token: any) {
        this.tokenid=token;
        console.log(token)
         self.buyNowCOmplete()
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
}
