import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-my-member-ship',
  templateUrl: './my-member-ship.component.html',
  styleUrls: ['./my-member-ship.component.scss']
})
export class MyMemberShipComponent implements OnInit {
  membershipDetails: any;
  details: any;
  handler: any;
  payment_intentent: any;
  price: number;
  subscriptionData: any;
  UserId: any;
  status: string;
  user: any;

  constructor(private service:CustomerService,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))
    this.getMemberShipDetails()
    this.loadStripe()
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
getMemberShipDetails(){
  var obj={
    user_id:JSON.parse(localStorage.getItem("userData"))._id,
    date:this.formatDate(new Date())
  }
  this.service.getMembershipDetails(obj).subscribe(res=>{
    console.log("memberShip data is======>",res);
    console.log("sxdgdsfgr",this.membershipDetails);
    this.details=res.data
    this.membershipDetails=res.data?.membership_plan_id
    if(res.data.status=="active"){
      this.status="Inactive"
    }else{
      this.status="Active"
    }
  })
}
 
buyNow(){
  this.price=parseInt(this.membershipDetails.price)
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
buyNowCOmplete(){
  var today=new Date()
  var tomorrow = new Date();
  var end_date=new Date(tomorrow.setMonth(today.getMonth()+parseInt(this.membershipDetails.duration)))

  console.log(new Date(end_date));
  var obj={
    user_type:"professional",
    user_id:JSON.parse(localStorage.getItem("userData"))._id,
    membership_plan_id:this.membershipDetails._id,
    transcation_id:this.payment_intentent,
    start_date:today,
    end_date:end_date
  }
  this.service.buyMemberships(obj).subscribe(res=>{
    console.log(res);
    if(res.code==200){
      this.toastr.success("Plan upgraded successfully")
    }
  })
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
  cancelPlan(){
    var ob={
    user_membership_plan_id:this.details._id,
    status:"disable"
  }
  this.service.CancelMembership(ob).subscribe(async res=>{
    console.log(res);
    if(res.code==200){
     this.toastr.success("Membership cancelled successfully")
      await this.router.navigate(["/seller-dashboard"])
    }
    
  },err=>{
    if(err.status>400){
      this.toastr.error("Some error occured")
    }
  })
  }
  changePlanStatus(){
    if(this.details.status=="active"){
    var ob={
    user_membership_plan_id:this.details._id,
    status:"inactive"
  }
  this.service.CancelMembership(ob).subscribe(res=>{
    console.log(res);
    if(res.code==200){
      this.toastr.success("Membership status changed successfully")
      this.ngOnInit()
    }
   

  },err=>{
    if(err.status>400){
      this.toastr.error("Some error occured")
    }
  })
  }else{
    var ob={
      user_membership_plan_id:this.details._id,
      status:"active"
    }
    this.service.CancelMembership(ob).subscribe(res=>{
      console.log(res);
      if(res.code==200){
        this.toastr.success("Membership status changed successfully")
        this.ngOnInit()
      }
      
 
    },err=>{
      if(err.status>400){
        this.toastr.error("Some error occured")
      }
    })
  }
}

}
