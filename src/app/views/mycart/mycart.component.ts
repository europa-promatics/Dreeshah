import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../../shared/cart.service';

declare var $;
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  updatedDataAfterCoupon: any;
  deductionPercantage: any;
  coupanProfId: any;
  previous_total: number;
  discount_value: any;
  saveForLater: any;

  constructor(public CustomerService: CustomerService, public cartService:CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    ) { }
  userId
  obj1
  obj2
  obj3
  quant1
  cartDetail=[]
  isLogin
  cartLen=0
  quant
  total=0
  items
  chargeTax
  finalTotal =0
  imgpath=environment.prodImg;
  ProdIdDetail=[]
  subTotal
  tax
  taxAndShipping =false
  totalWithoutTax1 =0
  totalWithoutTax2 =0
  amtWithoutTax =0
  coupanCode
  
  ngOnInit(){
    this.totalWithoutTax1 =0
    this.totalWithoutTax2 =0
    this.amtWithoutTax =0
    this.finalTotal =0
    this.isLogin=localStorage.getItem("isLoggedIn")
    console.log(this.isLogin)
    if(!this.isLogin && localStorage.getItem("session_data")){
      this.userId=localStorage.getItem("session_data")
    }else{
      this.userId=""
    }
   
    
    console.log('this.userId', this.userId)
    this.obj1={
     // user_id:this.userId,
      
    }
    this.cartDetails();
   
        // Remove Items From Cart
    // $('a.remove').click(function(){
    //   event.preventDefault();
    //   $( this ).parent().parent().parent().hide( 400 );
    
    // })

    // Just for testing, show all items
      // $('a.btn.continue').click(function(){
      //   $('li.items').show(400);
      // })
  }
  applyCoupan(){
    this.previous_total=this.finalTotal
    let obj={
      professional_id:this.cartDetail.map(data=>{
        return data.professional_id
      }),
      gift_card_code:this.coupanCode,
      user_email:JSON.parse(localStorage.getItem("userData")).email
    }
    this.CustomerService.applyCoupan(obj).subscribe(res=>{
      console.log("res of coupan code",res);
  
      this.updatedDataAfterCoupon=res.data
      this.coupanProfId=res.data.professional_id
      this.deductionPercantage=res.data.value
      this.finalTotal=0
    	for (var i = 0; i < this.cartDetail.length; i++) {
        this.amtWithoutTax=0
        let item = this.cartDetail[i];
        
        // if(item.ProductDetails.charge_tax == true){
          this.taxAndShipping= true
          if(item.professional_id==this.coupanProfId){
            this.subTotal = ((((item.ProductDetails.pricing.price)/100)*parseInt(this.deductionPercantage)) * item.quantity)  
            this.totalWithoutTax1 = this.subTotal
            // console.log("1..SubTotal for the product with tax",this.total)
            // console.log("1..SubTotal for the product without tax",this.totalWithoutTax1)
            this.amtWithoutTax =this.amtWithoutTax+ this.totalWithoutTax1 
            console.log("this.amtWithoutTax is========>",this.amtWithoutTax);
            this.tax = (this.chargeTax.tax_percentage/100) * this.amtWithoutTax
            this.total = this.amtWithoutTax + this.tax + this.chargeTax.shipping_charges
            this.finalTotal =this.finalTotal+ this.total
          }else{
          this.subTotal = (item.ProductDetails.pricing.price * item.quantity)  
          this.totalWithoutTax1 = this.subTotal
          console.log("1..SubTotal for the product with tax",this.total)
          console.log("1..SubTotal for the product without tax",this.totalWithoutTax1)
        // }
        // else{
        //   this.total = item.ProductDetails.pricing.price * item.quantity
        //   this.totalWithoutTax2 = this.total
         
        //   console.log("2..SubTotal for the product without tax",this.total)
        //   console.log("2..SubTotal for the product without tax",this.totalWithoutTax2)
        // }
        this.amtWithoutTax =this.amtWithoutTax+ this.totalWithoutTax1 
        console.log("this.amtWithoutTax is========>",this.amtWithoutTax);
        // this.amtWithoutTax=this.totalWithoutTax1
        this.tax = (this.chargeTax.tax_percentage/100) * this.amtWithoutTax
        this.total = this.amtWithoutTax + this.tax + this.chargeTax.shipping_charges
        this.finalTotal =Math.floor( this.total + this.finalTotal)
        this.discount_value=(this.previous_total-this.finalTotal)
        //console.log("Tax amount is ========",this.chargeTax.tax_percentage)
        //console.log("Shipping amount is ========",this.chargeTax.shipping_charges)
      }
    }
    })
   
    console.log("discount value=================",this.discount_value,this.previous_total,this.finalTotal);
    
    this.toastr.success("Congratulations!!!","You have availed the coupon successfully")
  }
  cartDetails(){
    console.log("thi.islogin",this.isLogin);
    
    let obj={
      user_id:this.userId,
      //session_id:session_data.session_id

    }
    console.log("inside cart details component",this.obj1)
    if(!this.isLogin){
      this.CustomerService.cartDetailGuest(obj).subscribe(res =>{
        
        console.log("Cart Details:",res)	
        this.cartDetail	=res.data.ProffesionalObj	
       
        this.cartLen = this.cartDetail.length	
        console.log("Length of the cart is",this.cartLen)
        console.log("cart objects are========>",this.cartDetail)	
        this.loadCart();
      })
    }else{
      this.CustomerService.cartDetail().subscribe(res =>{
        
        console.log("Cart Details:",res)	
        this.cartDetail = res.data.ProffesionalObj.filter(item=>{
          return item.save_for_later == 'no'
      })
      this.saveForLater = res.data.ProffesionalObj.filter(item=>{
          return item.save_for_later == 'yes'
      })
        console.log('this.cartDetail: ', this.cartDetail);
        console.log('this.saveForLater: ', this.saveForLater);
      
        console.log("Items in the cart>>>>.",this.cartDetail)	
        this.chargeTax = res.charges
        console.log("Charges For the Tax>>>",this.chargeTax)
        this.cartLen = this.cartDetail.length	
        console.log("Length of the cart is",this.cartLen)
        this.loadCart();
      })
    }
    
  }

  deleteItem(valu){
    // alert("working")
    console.log("for deleting item:",valu)
    this.quant1=0
    this.obj3={
      product_id:valu.product_id,
      professional_id:valu.professional_id,
      cart_id:valu.cart_id,
      quantity:this.quant1

    }
    this.CustomerService.updateCartItem(this.obj3).subscribe(res =>{
      this.toastr.success("Item Deleted")
      this.cartService.cartDataBehSub.next( 'true')
      console.log(res)
      this.ngOnInit()
      
     })

     

  }

  Updateitem(val,event){
    console.log(event.currentTarget.value)
    this.quant=event.currentTarget.value
    console.log(val)
     this.obj2={
      product_id:val.product_id,
      professional_id:val.professional_id,
      cart_id:val.cart_id,
      quantity:this.quant
     }
     if(this.quant && this.quant!=0){
     this.CustomerService.updateCartItem(this.obj2).subscribe(res =>{
      this.cartService.cartDataBehSub.next( 'true')
      console.log(res)
      this.toastr.success("Item Quantity Updated")
      this.ngOnInit()
     })
    }else if(this.quant && this.quant==0){
      this.CustomerService.updateCartItem(this.obj2).subscribe(res =>{
       this.toastr.success("Item Deleted")
       console.log(res)
       this.ngOnInit()
      })
     }
     
     
  }

  loadCart() {
		this.total = 0;
		this.items = [];
   
    const cartDetails=this.cartDetail;
		
		for (var i = 0; i < this.cartDetail.length; i++) {
			let item = this.cartDetail[i];
			
      // if(item.ProductDetails.charge_tax == true){
        this.taxAndShipping= true
        this.subTotal = (item.ProductDetails.pricing.price * item.quantity)  
        
        
        this.totalWithoutTax1 = this.subTotal
        console.log("1..SubTotal for the product with tax",this.total)
        console.log("1..SubTotal for the product without tax",this.totalWithoutTax1)
      // }
      // else{
      //   this.total = item.ProductDetails.pricing.price * item.quantity
      //   this.totalWithoutTax2 = this.total
       
      //   console.log("2..SubTotal for the product without tax",this.total)
      //   console.log("2..SubTotal for the product without tax",this.totalWithoutTax2)
      // }
      this.amtWithoutTax =this.amtWithoutTax+ this.totalWithoutTax1 
      console.log("this.amtWithoutTax is========>",this.amtWithoutTax);
      this.tax = (this.chargeTax.tax_percentage/100) * this.amtWithoutTax
      this.total = this.amtWithoutTax + this.tax + this.chargeTax.shipping_charges
      this.finalTotal = this.total
      
      
      console.log("Total amount is to be paid ========",this.finalTotal)
      //console.log("Tax amount is ========",this.chargeTax.tax_percentage)
      //console.log("Shipping amount is ========",this.chargeTax.shipping_charges)
		}
	}

  CheckOut(){
    if(this.isLogin && !(this.cartDetail.length == 0)){
      this.router.navigate([`/checkout/${this.finalTotal}`])
    }
    else if(this.cartDetail.length == 0){
      this.toastr.warning("Cart Is Empty")
    }
    else{
      this.toastr.warning("Please Login First")
    }
  }

  laterSave(value){
    console.log('cartitemid----------',value)
    var obj = {
      cartitem_id:value,
      save_for_later:'yes'
    }
    this.CustomerService.saveForLater(obj).subscribe(data=>{
      console.log(data.data)
    })
    this.ngOnInit()
  }

  moveToCart(value){
    console.log('cartitemid----------',value)
    var obj = {
      cartitem_id:value,
      save_for_later:'no'
    }
    this.CustomerService.saveForLater(obj).subscribe(data=>{
      console.log(data.data)
    })
    this.ngOnInit()
  }

}
