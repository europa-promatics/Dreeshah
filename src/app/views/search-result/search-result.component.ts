import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { Options } from 'ng5-slider';
import * as moment from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  limit_val = 10
  offset_val = 0
  length
  quantityIncrese = 0
  itemcollect: number=0
  style_slider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    
    navSpeed: 700,
    margin: 10,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      }
    },
  }
  reqData: any;
  count: any;
  // config: { itemsPerPage: number; currentPage: number};
  prodData: any=[];
  imgpath=environment.prodImg;
  options: Options = {
   floor: 0,
   ceil: 100
 };
 colorname = ''
 s = ''
  service_count: any;
  services_list: any;
  services_list_all: any;
  searchFilters: any;
  image_path: string;
  colorcodes = ''
  interiorCatalogue: any;

  imgpath1=environment.homeImg;
  exteriorCatalogue: any;
  quoRef: number;
  profIdQuo: any;
  selected_service: any;
  serviceNameQuo: any;
  serviceIdQuo: any;
  salesRepres: string;
  quotationForm: any;
  quotationNum: number;
  customerName: any;
  proffIdAppoint: any;
  IdS: any;
  serviceName: any;
  requestID: number;
  appName: string;
  id: string;
  search_id: string;
  search: any;
  productSearchData: any;
  productSearchData1: any;
  serviceSearchData: any;
  professionalSearchData: any;
  productIndex: any;
  serviceIndex: any;
  device_id: any;
  serviceSearchData1: any;
  professionalSearchData1: any;
  catalogueSearchData: any;
  catalogueSearchData1: any;
  imgpathh=environment.homeImg;
  catalogueInterior: any;
  catalogueExterior: any;
  addDeviceId: any;
  isLogin: any;
   sizeu = ''
  userId: any;
  productId: any;
  detail: any;
  user_id: any;
  obj1;

  constructor(
    public CustomerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    
    this.search_id = this.route.snapshot.paramMap.get('searchText')
    console.log("this.search resrgtyhhhhtyghtyh",this.search_id);

    this.getAllsearchData()
    

    this.productData()
    this.getAllServiceList()
    this.image_path = environment.image_path + "ProfessionalServices/"

    this.getcatogory();
    this.getSubcatogory();

    $('.click').click(function () {
      if ($('span').hasClass("fa-star")) {
        $('.click').removeClass('active')
        setTimeout(function () {
          $('.click').removeClass('active-2')
        }, 30)
        $('.click').removeClass('active-3')
        setTimeout(function () {
          $('span').removeClass('fa-star')
          $('span').addClass('fa-star-o')
        }, 15)
      } else {
        $('.click').addClass('active')
        $('.click').addClass('active-2')
        setTimeout(function () {
          $('span').addClass('fa-star')
          $('span').removeClass('fa-star-o')
        }, 150)
        setTimeout(function () {
          $('.click').addClass('active-3')
        }, 150)
        $('.info').addClass('info-tog')
        setTimeout(function () {
          $('.info').removeClass('info-tog')
        }, 1000)
      }
    })
  }



  // 15-June-2022------------------------------------------------------------------------------

  // product data starts here ---------------

  productData(){
    this.reqData = {} 
	  this.reqData.offset = 0
    this.reqData.limit = 10
	  this.length
    var list={
      limit:this.reqData.limit,
      offset:this.reqData.offset
    }
    this.CustomerService.productList(list).subscribe(res =>{
      console.log("product response data>>>>>>>>>>",res)
      this.prodData=res.products;
      this.count=res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
      // this.config = {
      //   itemsPerPage: 10,
      //   currentPage: 1,
      // };
    })
  }

  // product data ends here -----------------



  // service data starts here----------------------------

  getAllServiceList() {
    var obj={
      limit:100,
       offset:0
    }

    this.CustomerService.getAllServiceLists(obj).subscribe(async data => {
      console.log("Response of all the service listing>>>>>", data);
      this.services_list_all = data.result
      this.services_list = data.result.length
      console.log("service length????>>>>>>>>>>>>>.",this.services_list);
      
      console.log("this.services_list>>>>>",this.services_list_all);
      


      // if (data.code == 200) {
      //   this.services_list_all = data.result
        
      //   this.length = data.main_count
      // }
    })
  }


  quotation(service) {
    this.quoRef = moment().unix()
    console.log("Quotation Reference>>>>>", this.quoRef)
    console.log("ID of the professional to be sent ==>>>>>", service)
    this.profIdQuo = service.professional_id
    console.log("Service response>>>>", service)
    console.log("ID OF the SERVICE>>>>>>", service.id)
    console.log("name===", service.service_name)
    this.selected_service = service
    this.serviceNameQuo = service.service_name
    this.serviceIdQuo = service._id
    console.log( this.serviceIdQuo,' this.serviceIdQuo');
    
    this.salesRepres = service.professional_id.first_name + ' ' + service.professional_id.last_name
    console.log("ID OF the SERVICE>>>>>>", this.serviceIdQuo)
    console.log("name===", this.serviceNameQuo)
    console.log('this.salesRepres+++++++++++++',this.salesRepres); 
    
    $('#QuotationForm').modal('show');
    this.quotationForm.controls['service_name'].setValue(service.service_name)
    this.quotationForm.controls['sales_representative'].setValue(this.salesRepres)
    this.quotationForm.controls['quotation_ref'].setValue(this.quoRef)
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>", this.quotationNum)
    this.quotationNumber()
  }
  quotationNumber() {
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>", this.quotationNum)
  }

  idOfService(val) {
    console.log("Customer Data>>>>>", this.customerName)
    console.log("Data of the service for appointment is>>>>>>", val)
    console.log("Professional Id for the appointment>>", val.professional_id)
    this.proffIdAppoint = val.professional_id
    this.IdS = val._id
    this.serviceName = val.service_name
    console.log("Value of the id is>>>>", this.IdS)
    console.log("Name of the service", this.serviceName)
    this.requestID = moment().unix()
    this.appName = this.customerName.first_name + ' ' + this.customerName.last_name
  }

  CalledChatRoom(data){
    console.log("Rashika",data);
   
    let professional = {
      _id :  data.professional_id,
      first_name : data.professionalData[0].first_name,
      user_type : data.professionalData[0].user_type,
      profile_image : data.professionalData[0].profile_image,
      email : data.professionalData[0].email,
    }

    
      localStorage.setItem('PROFESSIONAL_DATA',JSON.stringify(professional));
      this.router.navigate([`/mychat/${professional._id}`])
    // else{
    //   this.toastr.error("Somthing bed happen")
    // }
   
  }

  
  

  // service data ends here----------------------------



  // catalogue starts here-------------------------------------

  getcatogory() {
    let obj = {
      type: "interior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.interiorCatalogue=res.records
        console.log(this.interiorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }

  getSubcatogory() {
    let obj = {
      type: "exterior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.exteriorCatalogue=res.records
        console.log(this.exteriorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }

  // catalogue ends here-------------------------------------



  // get Serach data value----------------------------------------------------

getAllsearchData(){
  var obj={
    search:this.search_id
  }
  this.CustomerService.searchInHomeScreenn(obj).subscribe(res => {
    console.log("response of home search>>>>>>>>>>>>>>",res);

    this.catalogueSearchData=res.SearchUserCatalogue
    console.log("this.catalogueSearchData>>>>>",this.catalogueSearchData)
    this.catalogueSearchData1=res.SearchUserCatalogue.length
    console.log("this.catalogueSearchData>>>>>",this.catalogueSearchData1)
    this.catalogueInterior=res.SearchUserCatalogue[0]?.catalogue_category
    console.log("this.catalogueInterior>>>>>>",this.catalogueInterior);
    this.catalogueExterior=res.SearchUserCatalogue[0]?.catalogue_category
    console.log("this.catalogueExterior>>>>>>>",this.catalogueExterior);
    

    
    this.productSearchData=res.SearchInProfessionalProduct
    console.log(" this.productSearchData>>>>>>", this.productSearchData);


    this.productSearchData1=res.SearchInProfessionalProduct.length
    console.log("length of product>>>>>>",this.productSearchData1);
    
    

    this.serviceSearchData=res.SearchInProfessionalService
    console.log("this.serviceSearchData>>>>>>>>>",this.serviceSearchData);

    this.serviceSearchData1=res.SearchInProfessionalService.length
    console.log("length of serviceSearchData>>>>>>>>>",this.serviceSearchData1);
    

    this.professionalSearchData=res.professionalSearch
    console.log("this.professionalSearchData>>>>>>>>>>>",this.professionalSearchData);

    this.professionalSearchData1=res.professionalSearch.length
    console.log("length of professionalSearchData>>>>>>>>>",this.professionalSearchData1);



    
    
  })

}





// -------------------------------


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
///////////////////////////////////////////
addToCart(value) {
  this.itemcollect=this.itemcollect+1
 this.quantityIncrese = this.quantityIncrese+1;
 let cartcount = localStorage.getItem("cartCount");
 localStorage.setItem("productid",value);
 console.log("Product ID : ", value,);

 this.isLogin = localStorage.getItem("isLoggedIn");
 console.log("ISLOGIN value is>>>>>", this.isLogin);
 this.userId=localStorage.getItem("session_data")
 if((localStorage.getItem("session_data"))&& !this.isLogin ){
   var session_data = JSON.parse(localStorage.getItem("session_data"))
   // this.userId=localStorage.getItem("session_data")
   this.userId=session_data.session_id
 }else{
   this.userId=""
 }
 this.productId =  this.prodData.filter((res)=>{
   return res._id==value
 });
   this.detail=this.productId[0] 
 
 
 // this.profId = this.detail.professional_id;
 console.log('this.detail: ', this.detail);

 if (!this.isLogin) {
   console.log("this is workingg");
   if (localStorage.getItem("session_data")) {
     this.userId = localStorage.getItem("session_data");
     console.log("this is workingg", this.user_id);
   } else {
     this.userId = "";
   }

   var session_data = JSON.parse(localStorage.getItem("session_data"))
   this.userId=localStorage.getItem("session_data")
   this.userId=session_data?.session_id
 } else {
   const user = localStorage.getItem("userData")
     ? JSON.parse(localStorage.getItem("userData"))
     : {};
   console.log("user dsata is here =========", user);
   if (user) {
     this.userId = user;
   }
 }


 if (!(this.isLogin)) {
   this.router.navigate(['login'])
   this.toastr.error("Please Login First");
   return false;
 }
 if (!(this.userId['user_type'] == "customer")) {
   this.toastr.warning("Please Login as a customer");
   return false;
 }
 // if (!(this.quantityIncrese > 0)) {
 //   this.toastr.error("Please add minimum 1 product quantity");
 //   return false;
 // }
 // if (cartcount) {
 //   this.toastr.warning("Product already added in cart");
 //   return false;
 // }

 if (this.s && this.colorname) {
   this.obj1 = {
     user_id: this.userId._id,
     product_id: this.productId,

     quantity: this.quantityIncrese,
     color_name: this.colorname,
     color_code: this.colorcodes,
     size: this.s,
     size_unit: this.sizeu
   };
   console.log("this.obj1 is===========>", this.obj1);

   this.CustomerService.addToCart(this.obj1).subscribe((res) => {
     this.toastr.success("Product Added to the cart Successfully");
     this.cartService.cartDataBehSub.next("true");
     localStorage.setItem("cartCount", "true");


     if (res.session_id && !this.isLogin) {
       localStorage.setItem("session_data", res.session_id);
       localStorage.setItem("cart_id", res.data.cart_id);
     }

     console.log(res);
     //this.ngOnInit()
   });
 }
 else {
   this.obj1 = {
     user_id: this.userId,
     product_id: value,
     // professional_id: this.profId._id,
     quantity: this.quantityIncrese,
     // color_name:this.colorname,
     // color_code:this.colorcodes,
     // size:this.s,
     // size_unit:this.sizeu
   };
   console.log("this.obj1 is===========>", this.obj1);

   this.CustomerService.addToCart(this.obj1).subscribe((res) => {
     this.toastr.success(`${this.itemcollect} Product Added to the cart Successfully`);
     this.cartService.cartDataBehSub.next("true");
     localStorage.setItem("cartCount", "true");


     if (res.session_id && !this.isLogin) {
       localStorage.setItem("session_data", res.session_id);
       localStorage.setItem("cart_id", res.data.cart_id);
     }

     console.log(res);
     //this.ngOnInit()
   });
 }


}



}
