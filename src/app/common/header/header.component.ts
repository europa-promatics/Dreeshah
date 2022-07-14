import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonServiceService } from '../../shared/common-service.service';
import { ToastrService } from 'ngx-toastr'
// import { Observable, Subscription } from 'rxjs';
import { CartService } from '../../shared/cart.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
  searchData: any;
  search:boolean | any=''
  event: any;
  filterValue: string;
  
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  productSearchData: any;
  serviceSearchData: any;
  professionalSearchData: any;
  productSearchData1: any;
  indexx: any;
  index: any;
  stringText: any;
  productIndex: any;
  serviceIndex: any;
  device_id
  addDeviceId: any;
  textt: any;
  searchHistory: any;
  search_history_id: any;
  allClearSearchData: any[];
  allSearchDataID: any=[];
  catalogueSearchData: any;
  catalogueSearchData1: any;
  profileUrl: any = environment.profileUrl
  
  constructor(
    private route: ActivatedRoute,public cartService:CartService,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) { 

    if(localStorage.getItem("_session")){
      this.device_id = localStorage.getItem("_session")
    }else{

      const id = Date.now()

      localStorage.setItem("_session",id.toString())
    }

  }

  ngOnInit(): void {
    this.search=''
    this.getHistoryData()

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


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

    console.log(this.userData );
    
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
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
        console.log( this.categories)
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




// 14-June-2022-----------------------------------------------------------------------------------

selectSerachValue(event){
  console.log("ssssssss eventtttt>>>>>>",event);
  
  console.log("selectSerachValue>>>>>>>>>>>>",event.target.textContent);
  this.stringText=event.target.textContent
  this.search=this.stringText.trim()

  console.log("trim kiya hua string ki value>>>>>>>>",this.search);
  


  this.productIndex = this.productSearchData.findIndex(x => x.product_title === this.search);
  console.log('product device id index>>>>>>>>>>>>>>>>',this.productIndex);
  // localStorage.setItem("product device_id",this.productSearchData[this.productIndex]?._id)

  this.serviceIndex = this.serviceSearchData.findIndex(x => x.service_name === this.search);
  console.log('Service device id index>>>>>>>>>>>>>>>>',this.serviceIndex);
  // localStorage.setItem("service device_id",this.serviceSearchData[this.serviceIndex]?._id)
  
}


applyFilter(filterValue) {
  console.log("type in search input field>>>>>>>", this.search);
  console.log("searching filterValue>>>>>>>>>>>>",filterValue);
  console.log("searching filter value fulllll>>>>>>>>>>>>",filterValue.target.value);

  this.search=filterValue.target.value
  console.log("search time value fatch>>>>>>",this.search);
  
  var obj={
    search:this.search
  }
  this.CustomerService.searchInHomeScreenn(obj).subscribe(res => {
    console.log("response of home search>>>>>>>>>>>>>>",res);

    this.catalogueSearchData=res.SearchUserCatalogue
    console.log("this.catalogueSearchData>>>>>",this.catalogueSearchData)
    
    this.productSearchData=res.SearchInProfessionalProduct
    console.log(" this.productSearchData>>>>>>", this.productSearchData);

    this.serviceSearchData=res.SearchInProfessionalService
    console.log("this.serviceSearchData>>>>>>>>>",this.serviceSearchData);
    
    this.professionalSearchData=res.professionalSearch
    console.log("this.professionalSearchData>>>>>>>>>>>",this.professionalSearchData);



    this.productIndex = this.productSearchData.findIndex(x => x.product_title === this.search);
    console.log('product device id index>>>>>>>>>>>>>>>>',this.productIndex);
    // localStorage.setItem("productdevice_id",this.productSearchData[this.productIndex]?._id)

    this.serviceIndex = this.serviceSearchData.findIndex(x => x.service_name === this.search);
    console.log('Service device id index>>>>>>>>>>>>>>>>',this.serviceIndex);
    // localStorage.setItem("servicedevice_id",this.serviceSearchData[this.serviceIndex]?._id)
    
    if(this.productSearchData[this.productIndex]?._id){
      this.device_id = this.productSearchData[this.productIndex]?._id
    }else if(this.serviceSearchData[this.serviceIndex]?._id){
      this.device_id = this.serviceSearchData[this.serviceIndex]?._id
    }
    
    
  })

}


  homeSearch() {
      var obj={
        text:this.search,
        device_id:this.device_id
      }
      this.CustomerService.addUserSearchdata(obj).subscribe(res => {
        console.log("response of user add data  search>>>>>>>>>>>>>>",res);
        this.addDeviceId= res.data.data.device_id
        console.log("this.addDeviceId>>>>>>",this.addDeviceId);
        this.router.navigate([`/search-results/${obj.text}`])
        this.ngOnInit()
      })

   

  }


  // get history search data---------------------------------------------
  getHistoryData(){
    var obj={
      device_id:this.device_id
    }
    this.CustomerService.getHomeSeacrhData(obj).subscribe(res => {
      console.log("getttttttttttttttttttt data  search>>>>>>>>>>>>>>",res);
      this.searchHistory=res.data
      console.log(" this.searchHistory>>>>",this.searchHistory);

      
    })
  }


  // History search data Delete---------------------------------------

  searchHistoryDelete(_id){
    console.log("searchHistoryDelete id >>>>>>",_id);
    this.search_history_id=_id
    
    var obj={
      user_search_id:this.search_history_id
    }
    this.CustomerService.deleteHistoryDataOfSearch(obj).subscribe((res:any) => {
      console.log("response of search history data>>>>>>>>>>",res)
      this.ngOnInit()

    })
    
  }



// clear all history data -------------------------
  clearAllData(event){
    console.log("clear data event>>>",event);
    
    var obj={
      device_id:this.device_id,
      user_search_id:this.searchHistory
    }
    this.CustomerService.getHomeSeacrhData(obj).subscribe(res => {
      console.log("getttttttttttttttttttt data  search>>>>>>>>>>>>>>",res);
      this.searchHistory=res.data
      console.log(" this.searchHistory>>>>",this.searchHistory);
    })

    this.CustomerService.deleteHistoryDataOfSearch(obj).subscribe((res:any) => {
      console.log("response of clear all search  history data>>>>>>>>>>",res)
      this.ngOnInit()

    })

  }







}





