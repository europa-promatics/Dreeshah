import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment';
declare var $
@Component({
  selector: 'app-photographer-detail',
  templateUrl: './photographer-detail.component.html',
  styleUrls: ['./photographer-detail.component.scss']
})
export class PhotographerDetailComponent implements OnInit {
  id: any;
  photoUrl: string;
  userData: any;
  serviceDetails: any;
  packageDetails: any;
  handler: any;
  price: number;
  totalprice: number;
  payment: string;
  payment_intentent: any;
  packageData: any;
  startDate
  endDate: any;
  form: FormGroup;
  constructor(private routr:Router,private toastr:ToastrService,private service:CustomerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    this.loadStripe()
    console.log("photographer id is============>",this.id);
    this.photoUrl=environment.profileUrl
    this.getPhotographerDetails()
    this.form=new FormGroup({
      startdate:new FormControl("",Validators.required),
      endDate:new FormControl("",Validators.required)
    })
  }
  getPhotographerDetails(){
    var obj={
      user_id:this.id
    }
    this.service.PhotographersDetails(obj).subscribe(data=>{
      console.log(data);
      this.userData=data.data
      this.serviceDetails=data.data.service_details
    })
  }
  viewDetails(i){
    $("#packageDetail").modal("show")
    this.packageDetails=i
    console.log("dxsfadsfg",this.packageDetails);
    this.totalprice=this.packageDetails.price
  }
  PackageCheckOut() 
  {
    
    this.price=Math.floor(this.totalprice)
   var obj={
     amount:Math.floor(this.totalprice).toString(),
     currency:'aed'
   }
   this.service.stripeApi(obj).subscribe(data=>{
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

        await self.payPhtographer()
     }
    
   });
   
   handler.open({
    
     amount: this.price*100,
     currency:'aed'
   });
  
   const user = localStorage.getItem("userData")
     ? JSON.parse(localStorage.getItem("userData"))
     : {};
  
   // this.payQuationOrders()
 
}
buyNow(item?){
  $("#buyModal").modal("show")
  if(item){
  this.packageData=item
  console.log("reqd data is==========>",this.packageData);
  this.totalprice=this.packageData.price
  console.log("total price is=========>",this.totalprice);
  
  }
  else{
    this.totalprice=this.packageDetails.price
    console.log("total price is a =========>",this.totalprice);
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
  payPhtographer(){
    var obj={
      user_id:JSON.parse(localStorage.getItem("userData"))._id,
      photographer_id:this.userData._id,
      package_id:this.packageData?._id ? this.packageData?._id : this.packageDetails._id,
      start_date:this.form.value.startdate,
      end_date:this.form.value.endDate,
      transaction_id:this.payment_intentent,
      amount:this.totalprice
    }
    this.service.buyPhotographerPackage(obj).subscribe(data=>{
      console.log("res is ===========>",data);
      if(data.code==200){
        this.toastr.success("Package Bought Successfully")
        this.routr.navigate(["/seller-dashboard"])
      }
      else if(data.code>=400){
        this.toastr.error("Some error occured")
      }
    })
  }
  validate(){
    if(!this.form.valid){
      this.form.markAllAsTouched()
    }
    else{
      this.PackageCheckOut()
    }
  }

}
