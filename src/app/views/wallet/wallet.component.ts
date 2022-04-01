import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery } from '@ngx-gallery/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CustomerService } from '../../shared/customer.service'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  walletData: any;
  user_type: any;
  creditDebitwalletData: any;
  price: number;
  totalprice: number;
  payment: string;
  handler:any = null;
  amount_form: FormGroup;
  amount: any
  balance_amount=0


  constructor(public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.amount_form = new FormGroup({
      amount: new FormControl('', [Validators.required,]),
    })
    console.log("amountamount",this.amount_form);


    
    this.user_type =JSON.parse(localStorage.getItem('userData'))
    console.log("fgdfhfhgfh",this.user_type);
    

    this.transactionWalletMoneyList()
    this.loadStripe()

  }
  transactionWalletMoneyList() {
    var obj = {
      limit : 50,
      offset : 0,
      user_id :this.user_type._id
      
      }
    //console.log("obj===", obj)
  
    this.CustomerService.transactionWalletMoneyList(obj).subscribe(async data => {
     
        this.walletData = data.data
        console.log("walletData",this.walletData );
        for(let i=0;i<=this.walletData.length;i++){
          //console.log("amount only====",this.walletData[i].amount);
          
          if(this.walletData[i]?.payment_type=="credit" && this.walletData[i]?.amount!=null &&  this.walletData[i]?.amount!=undefined){
            this.balance_amount=this.balance_amount+parseInt(this.walletData[i]?.amount)
           // console.log("hkjhujgyuhgu+++++++++++++======",this.balance_amount);
            }
            else if(this.walletData[i]?.payment_type=="debit"){
              this.balance_amount=this.balance_amount-parseInt(this.walletData[i]?.amount)
             // console.log("hkjhujgyuhgu---------------======",this.balance_amount);
              }
        }
       // console.log("hkjhujgyuhgu======",this.balance_amount);
        




         })
  }
  creditDebitWalletMoney() {
    var obj = {
      currency :"aed",
      amount :this.amount,
      payment_type:"credit" ,
      user_id :this.user_type._id
      
      }
    //console.log("obj===", obj)
  
    this.CustomerService.creditDebitWalletMoney(obj).subscribe(async data => {
     
        this.creditDebitwalletData = data.data

        console.log("creditDebitwalletData",this.creditDebitwalletData );
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

  prodCheckOut() 
  {
    // if(this.feedback.value!=null || this.payment_terms[0]?.status=='pending'){
    // this.price=Math.floor((this.totalprice/100)*parseInt(this.payment))
   var obj={
    currency :"aed",
    amount :this.amount,
   }
   this.CustomerService.stripeApi(obj).subscribe(data=>{
     console.log("stripe data is=======>", data);
    //  this.payment_intentent=data.paymentIntent
   })
   var self=this;

   var  handler = (<any>window).StripeCheckout.configure({
     key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
     locale: 'auto',
      token:async function (token: any) {
       this.tokenid=token;
       console.log(token)
       alert('Token Created!!');

       await self.creditDebitWalletMoney()
     }
    
   });
   
   handler.open({
    
    currency :"aed",
    amount :this.amount,
   });
  
  
   // this.payQuationOrders()
//  }
//  else{
//    this.toastr.error("Please enter feedback first")
//  }
}
onSearchChange(searchValue: string): void {  
  console.log("sadrfsgfdhgfjhgjh",searchValue);
  this.amount=searchValue
}
}
