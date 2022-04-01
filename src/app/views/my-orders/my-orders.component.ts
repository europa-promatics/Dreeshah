import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  UserId
  OrderDetails
  OrderDelivered
  OrderCancle
  OrderInprogress
  cancelOrderDetails
  reason
  orderId
  divHide1= true;
  imgpath=environment.prodImg;
  isLogin
  productId
  profId
  userId
  user_id
  obj1
  quanty=1
  limit_val=10
  offset_val=0


  constructor(public CustomerService: CustomerService,public cartService:CartService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {

    const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
    console.log(user)
    this.UserId= user._id
    console.log("User Id is =======>>>>",this.UserId)

    var obj1={
      user_id:this.UserId,
    }

    this.CustomerService.orderList(obj1).subscribe(res => {
      //console.log("Order Detail List are Response======",res)
      this.OrderDetails=res.result
      console.log("Order Detail List are Response======",this.OrderDetails)
      //this.toastr.success("Order Placed Successfull")   
    })

    

/*
    this.CustomerService.cancelOrderList().subscribe(res => {
      console.log("Cancel Order Detail List Response======",res)
      this.cancelOrderDetails=res.result
      console.log("Cancel Order Detail List Response======",this.cancelOrderDetails)
        
    })*/
    this.orderListInprogress()
    this.orderListcancle()
    this.orderListDelivered()
  }

  getId(value){
    this.divHide1=true;
    this.orderId=value[0]
    console.log("Id of Ordered Item to be Cancelled:",this.orderId)
  
  }

  cancel(){
    console.log("Item is Deleted")
    // this.divHide1 = false;
    //this.ngOnInit()
    var obj={
      order_id : this.orderId,
    //  order_status : "cancelled",
      cancel_reason : this.reason
    }

     this.CustomerService.cancelOrderItem(obj).subscribe(res => {
      console.log("Order Cancelled Response======",res)
      this.toastr.success("Order Cancelled")   
      this.ngOnInit()
    }) 

  }

  addToCart(value){
    Swal.fire({
      title: 'Are you sure?',
      text: '',
    
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }) .then((result) => {
      if (result.value) {
 
       
    console.log("Product ID : ",value);
    
    this.isLogin=localStorage.getItem("isLoggedIn")
  
    this.productId=value.order_id;
    this.profId=value.professionalData._id;
 
    if (!this.isLogin) {
      console.log("this is workingg");
      if (localStorage.getItem("session_data")) {
        this.userId = localStorage.getItem("session_data");
        console.log("this is workingg", this.user_id);
      } else {
        this.userId = "";
      }
    } else {
      const user = localStorage.getItem("userData")
        ? JSON.parse(localStorage.getItem("userData"))
        : {};
      console.log("user dsata is here =========", user);
      if (user) {
        this.userId = user;
      }
    }
    //console.log(this.quantity)
    this.obj1 = {
      user_id: this.userId,
      product_id: this.productId,
      professional_id: this.profId,
      quantity: this.quanty,
      };
      console.log('1111111111111111');
      this.CustomerService.addToCart(this.obj1).subscribe((res) => {
      this.toastr.success("Product Added to the cart  Successfully");
      this.cartService.cartDataBehSub.next("true");
      localStorage.setItem("cartCount", "true");
      console.log('1111111111111111');
      
  
    
      if (res.session_id && !this.isLogin) {
        localStorage.setItem("session_data", res.session_id);
        localStorage.setItem("cart_id", res.data.cart_id);
      }
  
      console.log(res);
      //this.ngOnInit()
      });
  
      
  
    
  }

})
  }
  ClicKFunction1(){
    //console.log("function os called====")
    
    this.divHide1=true;
  }



  orderListInprogress(){
    var obj1={
      limit : this.limit_val,
      offset : this.offset_val,
      status:'inprogress'
    }

    this.CustomerService.getOrderItem(obj1).subscribe(res => {
      //console.log("Order Detail List are Response======",res)
      this.OrderInprogress=res.data
      console.log("Order OrderInprogress List are Response======",this.OrderInprogress)
      //this.toastr.success("Order Placed Successfull")   
    })
  }
  
  orderListDelivered(){
    var obj1={
      limit : this.limit_val,
      offset : this.offset_val,
      status:'delivered'
    }

    this.CustomerService.getOrderItem(obj1).subscribe(res => {
      //console.log("Order Detail List are Response======",res)
      this.OrderDelivered=res.data
      console.log("Order Detail List are Response======",this.OrderDelivered)
      //this.toastr.success("Order Placed Successfull")   
    })
  }
  orderListcancle(){
    var obj1={
      limit : this.limit_val,
      offset : this.offset_val,
      status:'cancelled'
    }

    this.CustomerService.getOrderItem(obj1).subscribe(res => {
      //console.log("Order Detail List are Response======",res)
      this.OrderCancle=res.data
      console.log("OrderDelivered Detail List are Response======",this.OrderCancle)
      //this.toastr.success("Order Placed Successfull")   
    })
  }
 
}
