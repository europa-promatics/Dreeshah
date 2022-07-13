import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../../shared/cart.service';
import { CustomerService } from '../../shared/customer.service';
import {environment} from '../../../environments/environment.prod';
declare var $;

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent implements OnInit {
  imgUrl
  profileUrl
  isLogin
  userId
  obj1
  cartDetail
  cartItemCount
  userData
  allNotifications=[];
  allUnreadNotifications: any[]=[];
  constructor(private route: ActivatedRoute, public cartService:CartService,
    private router: Router,
    public CustomerService: CustomerService,
    ) { }

ngOnInit(): void {
  this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null
  this.imgUrl=environment.profileUrl
  this.profileUrl=environment.profileUrl
  console.log('----->>>>>>>>>>>>>---------',this.userData);
  this.isLogin=localStorage.getItem("isLoggedIn")
    //this.getCatAndSubCat()
    var self= this
    // setInterval(function(){self.notifications()},10000)
    
    if(!this.isLogin && localStorage.getItem("session_data")){
      this.userId=localStorage.getItem("session_data")
    }else{
      this.userId=""
    }
   
    
    console.log('this.userId', this.userId)
    this.obj1={
      user_id:this.userId,
      
    }
    this.cartDetails();

    this.cartService.cartItemObseravle.subscribe(r=>{
      if(r){
        console.log(r,'se3ller comopont rashika ')
        this.cartDetails();
      }
    })



    $('.User-avtar').click(function(){
      $('#profile').toggle();  
      $('#notify').hide();  
    
  });
      $('.User-avtar1').click(function(){
        $('#notify').toggle();  
        $('#profile').hide();  
      
  });
 }
 logout() {
  localStorage.clear();
  // //console.log('sdfsdf=====================',JSON.parse(localStorage['organizationData']))
  this.router.navigate(['/login'])
  // localStorage.clear();
  // localStorage.removeItem('userData');
  // localStorage.removeItem('token')
  // localStorage['isLoggedIn']=false;
  // this.router.navigate(['/login']);
}
cartDetails(){
  console.log("inside cart details component",this.obj1)
  let obj={
    user_id:this.userData._id,
    //session_id:session_data.session_id

  }
  if(!this.isLogin){
    this.CustomerService.cartDetailGuest(obj).subscribe(res =>{

      
      console.log("Cart Details:",res)	
        this.cartDetail	=res.data.ProffesionalObj	
        this.cartItemCount = this.cartDetail.length	
        console.log("Length of the cart is",this.cartItemCount)
        console.log(this.cartDetail)
     
    })
    //this.ngOnInit()
  }else{ 
    this.CustomerService.cartDetail().subscribe(res =>{
        
      console.log("Cart Details:",res)	
      this.cartDetail	=res.data.ProffesionalObj		
   
      console.log("CartDetail From Header=======",this.cartDetail)	
      this.cartItemCount=this.cartDetail.length
      console.log("NO.of Items in the cart=======",this.cartItemCount)
     // this.ngOnInit()
    })
  
    
  }
  
}

dashboard(){
  if(this.userData != null){
    if(this.userData.user_type == 'professional'){
    this.router.navigate(['/seller-dashboard']);
    }else if(this.userData.user_type == 'customer'){
    this.router.navigate(['/dashboard'])
    }else if(this.userData.user_type == 'photographer'){
    this.router.navigate(['/photographerDashboard']);
    }
    }else{
    this.router.navigate(['/login'])
    }

}

myProfile(){
  if(this.userData != null){
    if(this.userData.user_type == 'professional'){
    this.router.navigate(['/seller-profile']);
    }else if(this.userData.user_type == 'customer'){
    this.router.navigate(['/myprofile'])
    }else if(this.userData.user_type == 'photographer'){
    //this.router.navigate(['/photographerDashboard']);
    }
  }else{
    this.router.navigate(['/login'])
    }

}

myBooking(){
  if(this.userData != null){
    if(this.userData.user_type == 'professional'){
    this.router.navigate(['/my-appointment-seller']);
    }else if(this.userData.user_type == 'customer'){
    this.router.navigate(['/my-appointment'])
    }else if(this.userData.user_type == 'photographer'){
    //this.router.navigate(['/photographerDashboard']);
    }
  }else{
    this.router.navigate(['/login'])
    }

}
notifications(){
  var ob={
    limit:5,
    offset:0,
    user_id:this.userData?._id
  }
  this.CustomerService.notifications(ob).subscribe(notificationsdata=>{
    console.log("notifications are=========>",notificationsdata);
    this.allNotifications=notificationsdata.getAllNotifications
    this.allUnreadNotifications=this.allNotifications.filter(data=>data.status=="unread")
  })
}
readNotifications(){
  var ob={
    limit:5,
    offset:0,
    user_id:this.userData?._id
  }
  this.CustomerService.readNotifications(ob).subscribe(notificationsdata=>{
    console.log("notifications are=========>",notificationsdata);
      })
  }
}
