import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-advertisement-details',
  templateUrl: './advertisement-details.component.html',
  styleUrls: ['./advertisement-details.component.scss']
})
export class AdvertisementDetailsComponent implements OnInit {
  files: File[] = [];
  adForm:FormGroup
  adForm2: FormGroup;
  plans: any[]=[];
  package_id: any;
  price: any;
  handler: any;
  payment_intentent: any;
  totalprice: any;
  packageSelected
  fileSelected
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  constructor(private service:CustomerService ,private toastr:ToastrService,private router:Router) { }

  ngOnInit(): void {
    const reg = '[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?'
    this.adForm=new FormGroup({
      sname:new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]*")]),
      email:new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]),
      phone:new FormControl("",[Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern('^[0-9+]*')])]),
      address:new FormControl("",[Validators.required]),
      dname:new FormControl("",[Validators.required,Validators.pattern(reg)]),
    })
    this.adForm2=new FormGroup({
      title:new FormControl("",[Validators.required]),
      description:new FormControl("",[Validators.required])
    })
    this.loadStripe()
    this.getAdPlans()
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  addAdvertisement(){
    console.log("this.adForm is======>",this.adForm);
    console.log("this.adForm2 is======>",this.adForm2);
    const formData=new FormData();
    formData.append("user_id",JSON.parse(localStorage.getItem("userData"))._id)
    formData.append("client_name",this.adForm.value.sname)
    formData.append("email",this.adForm.value.email)
    formData.append("price",this.totalprice)
    formData.append("transaction_id",this.payment_intentent)
    formData.append("phone",this.adForm.value.phone,)
    formData.append("address",this.adForm.value.address)
    formData.append("domain",this.adForm.value.dname)
    formData.append("advertisement_package_id",this.package_id)
    formData.append("title",this.adForm2.value.title)
    formData.append("description",this.adForm2.value.description)
    formData.append("images",JSON.stringify(this.files))
    this.service.addAdvertisement(formData).subscribe(res=>{
      console.log("response is========>",res);
      if(res.code==201){
        this.toastr.success("Admin will respond you soon")
        this.router.navigate(["/seller-dashboard"])
      }
      else if(res.code>400){
        this.toastr.error("Some error occured")
      }
      
    })
  }
  payment(){
    var obj={
      amount:Math.floor(this.totalprice)*100,
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
        // alert('Token Created!!');

        await self.addAdvertisement()
      }
     
    });
    
    handler.open({
     
      amount: this.totalprice*100,
      currency:'aed'
    });
   
    const user = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {};
   
  }
  submit(){
    console.log(this.adForm,this.adForm2);
    
    console.log(this.package_id);
    
    if(!this.package_id){
      this.packageSelected=false
    }
   if(!this.adForm2.valid || !this.adForm.valid || !this.package_id || this.files.length==0){
     this.fileSelected=false
    this.packageSelected=false
     this.adForm.markAllAsTouched()
     this.adForm2.markAllAsTouched()
     
   }
   else{
     this.payment()
   }
    // this.UserId = user._id;
  }
  getAdPlans(){
    var ob={

    }
    this.service.getAdPlans(ob).subscribe(data=>{
      this.plans=data.data
    })
  }
  selectPackage(plan,i){
    console.log(plan);
    this.totalprice=plan.price
    this.packageSelected=true
    this.package_id=plan._id
    console.log(this.package_id);
    this.toastr.success(`${plan.title} Plan Selected` )
    
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
