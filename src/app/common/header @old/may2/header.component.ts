import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../../shared/customer.service';
import { CommonServiceService } from '../../../shared/common-service.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';
import { CartService } from '../../../shared/cart.service';

declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories = []
  slice_list = 1
  isLogin
  obj1
  userId
  cartDetail
  cartItemCount=0;
  userData
  cartCount =false
  cartCounting

  title = 'firstApp';
  lat
  long
  zoom
  markers
  cityname=''
  city
  
  constructor(
    private route: ActivatedRoute,public cartService:CartService,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) { }

  ngOnInit(): void {
     this.zoom=7;
    
      
     
    this.isLogin=localStorage.getItem("isLoggedIn")
    this.cartCounting =localStorage.getItem("cartCount")
    if(this.cartCounting == null){
    this.cartCount =false
     }else{
       this.cartCount =this.cartCounting
     }
  
    
    console.log("Value for the count of cart",this.cartCount)
    this.getCatAndSubCat()

    this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null

    if(!this.isLogin && localStorage.getItem("session_data")){
      this.userId=localStorage.getItem("session_data")
    }else{
      this.userId=""
    }
   
    
    console.log('this.userId', this.userId)
    this.obj1={
      user_id:this.userId,
      
    }
    if(this.cartCount){
    this.cartDetails();
    }
    this.cartService.cartItemObseravle.subscribe(r=>{
      if(r){
        console.log(r,'cartDetailscartDetailscartDetails')
        this.cartDetails();
      }
    })

    $('.moretext-s').hide();
  	$('.moreless-button-s').click(function() {
       $('.moretext-s').slideToggle();
       if ($('.moreless-button-s').text() == "View All") {
         $(this).text("View Less")
       } else {
         $(this).text("View All")
       }
     });

   



       $(function() {
          $(window).on("scroll", function() {
              if($(window).scrollTop() > 50) {
                  $(".headerr").addClass("cstm_active");
              } else {
                  //remove the background property so it comes transparent again (defined in your css)
                 $(".headerr").removeClass("cstm_active");
              }
          });
      });
      
      this.getLocation()
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.displayLocation(this.lat,this.long)
          
        }
      },
        (error) => console.log(error)
        );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  displayLocation(latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    const self = this
    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                   var  count=value.length;
                   
                    var city=value[count-3];
                  
                    self.getprofessionals(city);
                 
                
                }
                
            }
           
        });
        
      }

  getCatAndSubCat(){
    this.CustomerService.getCatAndSubCat().subscribe(data => {
      //console.log(data);
      if (data.code == 200) {
        this.categories = data.data
        
      }
    })
  }
  navigate(cat_id,sub_id) {
    this.router.navigate(['/services/', cat_id,sub_id]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  cartDetails(){
    console.log("inside cart details component",this.obj1)
    if(!this.isLogin){
      let obj={
        user_id:this.userId,
        //session_id:session_data.session_id

      }
      this.CustomerService.cartDetailGuest(obj).subscribe(res =>{
        
        //console.log("Cart Details:",res)	
        this.cartDetail	=res.data.ProffesionalObj	
      
        console.log("CartDetail From Header=======",this.cartDetail)	
        this.cartItemCount=this.cartDetail.length
        console.log("NO.of Items in the cart=======",this.cartItemCount)
        //this.ngOnInit()
      })
    }else{
      this.CustomerService.cartDetail().subscribe(res =>{
        
        console.log("Cart Details:",res)	
        this.cartDetail	=res.data.ProffesionalObj		
     
        console.log("CartDetail From Header=======",this.cartDetail)	
        this.cartItemCount=this.cartDetail.length
        console.log("NO.of Items in the cart=======",this.cartItemCount)
        //this.ngOnInit()
      })
    }
    
  }
  
  signIn(){
    // if(this.userData != null){
    // if(this.userData.user_type == 'professional'){
    // this.router.navigate(['/seller-dashboard']);
    // }else if(this.userData.user_type == 'customer'){
    // this.router.navigate(['/dashboard'])
    // }else if(this.userData.user_type == 'photographer'){
    // this.router.navigate(['/photographerDashboard']);
    // }
    // }else{
    this.router.navigate(['/login'])
    // }
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
        this.router.navigate(['/photographerDashboard']);
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


    cartfunc(){
      if(this.userData != null){
        if(this.userData.user_type == 'professional'){
        this.router.navigate(['/seller-dashboard']);
        }else if(this.userData.user_type == 'customer'){
        this.router.navigate(['/mycart'])
        }else if(this.userData.user_type == 'photographer'){
        this.router.navigate(['/photographerDashboard']);
        }
        }else{
        this.router.navigate(['/mycart'])
        }

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

  /* signIn(){
    if(this.isLogin){
      this.router.navigate(['/dashboard'])
    }else{
      this.router.navigate(['/login'])
    }
  } */
getprofessionals(cityname)
{
  
  var obj={
    city:cityname,
  }
 
  this.CustomerService.getprofessionals(obj).subscribe(data =>{
    this.markers=data.data;
    console.log('list of professionals',this.markers)
  },err=>{
    console.log('error=',err)
  })
}
markerClicked(id)
{
  this.router.navigateByUrl('/professioanl-detail/'+id)
}

}
