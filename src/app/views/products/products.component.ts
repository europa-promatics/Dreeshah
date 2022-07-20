import { Component, OnInit } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { CustomerService } from '../../shared/customer.service';
import { Options } from 'ng5-slider';
import { environment } from 'src/environments/environment.prod';
import { LowerCasePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/cart.service';
import { Router } from '@angular/router';
import { number } from '@amcharts/amcharts4/core';
// import * as console from 'console';
//import { privateDecrypt } from 'crypto';
declare var $
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  config:any;
  p: number = 1;
 	value: number = 50;
   reqData;
   sizeu = ''

	currentPage=10;
	currentIndex=0;
	prodData = [] ;
	length;
  colorname = '';
  colorcodes = '';
  isLogin;
  detail;
  productId;
  quantityIncrese = 0;
  data:any[]=[];
  evt;
  user_id;
  userId;
  val;
  obj;
  
  s = ''
  obj1;
	filterValue;
	getData;
	offset=0;
	limit=10;
  data1= []
  count
  imgpath=environment.prodImg;
   options: Options = {
    floor: 0,
    ceil: 1000
  };
  userData: any;
  prodData2: any[]=[];
  newwarey: any[]=[];
  newset: any[];
  newsset: Set<any>;
<<<<<<< Updated upstream
  itemcollect: number=0;
=======
>>>>>>> Stashed changes

  constructor(public CustomerService: CustomerService ,    private toastr: ToastrService
   , public cartService: CartService,private router:Router) { 
    // this.productList2()
   }

  ngOnInit(): void {

    ////////////////////////////////////////////
    this.userData =
    localStorage["userData"] != null
      ? JSON.parse(localStorage["userData"])
      : null;
    localStorage.removeItem('wishCount');
    localStorage.removeItem('cartCount');
    console.log("In the product detail componennt>>>>>");
    this.isLogin = localStorage.getItem("isLoggedIn");
<<<<<<< Updated upstream
   /////////////////////////////////////////////////////////
=======
>>>>>>> Stashed changes
   
    $(document).on('click','.showDetailsBtn', function(){
      $(this).closest('.product-info').toggleClass("show");
      console.log("class added");
    });

    this.reqData = {} 
	  this.reqData.offset = 0
    this.reqData.limit = 10
	  this.length
	 //this.dataSource = new MatTableDataSource(this.responseData);
      var list={
        limit:this.reqData.limit,
        offset:this.reqData.offset
      }

    this.CustomerService.productList(list).subscribe(res =>{
      console.log(res)
      this.prodData=res.products;
      this.prodData2=res.products
      this.count=res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.count
      };
    })
    //console.log(this.count)
   
    
    $(document).ready(function(){
      $(".showDetailsContent").hide();
      $(".showDetailsBtn").click(function(){
        //alert("click");
        $(".showDetailsContent").toggle();
      });
    });

    
    
    $(document).ready(function(){
      $("#filterContent").hide();
      $( "#filterBtn" ).click(function() {
        $("#filterContent").slideToggle(function () {
          $("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
        });
        $(this).find("i").toggleClass("fa-caret-down fa-caret-up");});
    });
     let list2 = {
      limit: 50,
      offset: 0
    }

    this.CustomerService.productList(list2).subscribe(res => {
      console.log(res)
      this.prodData2 = res.products;
<<<<<<< Updated upstream
      const data = this.prodData2.filter((val)=>val.serviceCategoryDetails)
      console.log("data",data);
      
      console.log(this.data['serviceCategoryDetails'])
      console.log(this.prodData2, "ss=========================================================>")
      // console.log("ss=========================================================>")
      // this.newwarey = this.prodData2.((res: any) => {
=======
      console.log(this.prodData2['serviceCategoryDetails']['name'])
      console.log(this.prodData2, "ss=========================================================>")
      // console.log("ss=========================================================>")
      // this.newwarey = this.prodData2.map((res: any) => {
>>>>>>> Stashed changes
      //   return { name: res.serviceCategoryDetails.name }
      // })
      console.log(this.newwarey, "ss=========================================================>")
      console.log("ss=========================================================>")
      this.newsset = new Set(this.newwarey)
      this.count = res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
      this.config = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.count
      };
    })
   
    

  }

  // productList2() {
   
  // }
  changeprice(e:any){
    console.log(e)
    this.value=e
    var obj = {
      range:this.value ,
      //limit:this.reqData.limit,
      //offset:(this.config.currentPage-1)*10
      limit:this.reqData.limit,
      offset:0
      }
      this.CustomerService.productList(obj).subscribe(res => {
        console.log('filterResponse',res)
         this.prodData=res.products;  
        })

  }

  search(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.filterValue = filterValue.trim().toLowerCase();
    var obj = {
    search: filterValue,
    //limit:this.reqData.limit,
    //offset:(this.config.currentPage-1)*10
    limit:this.reqData.limit,
    offset:0
    }
    if(obj.search){
      this.CustomerService.productList(obj).subscribe(res => {
        console.log('filterResponse',res)
        if (res) {
          this.prodData=res.products;       
        }
        })
    }else{
      this.ngOnInit();
    }
    
    }


    selectedServiceSubCategory(e: any, _id: string) {
      console.log(e)
      if (e.target.checked) {
        this.data.push(_id);
        console.log("a",e)
      }
   
      
      else {
        var ind = this.data.indexOf(_id);
        if ( ind > -1) {
          this.data1 = this.data.splice(ind, 1)
         
        
        }
        
      }
  
   
      console.log('Data is ===>', this.data);
      if(this.data != [] && this.data.length > 0 ){
     
 
      var obj = {

        category_id: this.data,
        limit:20,
        offset:0
        
        }
      this.CustomerService.productList(obj).subscribe((res) =>{
        console.log(res)
        this.prodData=res.products})
      }else {
        this.ngOnInit()

      }

    }

    sortprice(value) {
      //return this.prodData;
      //console.log(value)
      this.evt=value;
      var obj = {
        sort:'price',
        sort_by:value,
        limit:this.reqData.limit,
        offset:(this.config.currentPage-1)*10
        }
      this.val=obj.sort;
        console.log(obj)
        this.CustomerService.productList(obj).subscribe(res => {
          console.log('sortingResponse',res)
            
            this.prodData=res.products;       
           
          })
      
    }
    pageChanged(event){
      console.log(event)
      this.config.currentPage = event;
      this.p=event
      var list={
        sort:this.val,
        sort_by:this.evt,
        limit:this.reqData.limit,
        offset:(event-1)*10
      }
      
        this.CustomerService.productList(list).subscribe(res =>{
          console.log(res)
          this.prodData=res.products;
          console.log(this.prodData)
        })
    }





    //addd to cart


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





    // buyNow(val) {
    //   if (this.isLogin && this.userData.user_type == "customer" && this.quantityIncrese != 0 && this.iconbig && this.sizeselected) {
    //     let cartcount = localStorage.getItem("cartCount");
    //     console.log("Product ID : ", val);
  
    //     this.isLogin = localStorage.getItem("isLoggedIn");
    //     console.log("ISLOGIN value is>>>>>", this.isLogin);
    //     //this.userId=localStorage.getItem("session_data")
    //     // if((localStorage.getItem("session_data"))&& !this.isLogin ){
    //     // 	var session_data = JSON.parse(localStorage.getItem("session_data"))
    //     // 	// this.userId=localStorage.getItem("session_data")
    //     // 	this.userId=session_data.session_id
    //     // }else{
    //     // 	this.userId=""
    //     // }
    //     this.productId = val;
    //     this.profId = this.detail.professional_id;
  
    //     if (!this.isLogin) {
    //       console.log("this is workingg");
    //       if (localStorage.getItem("session_data")) {
    //         this.userId = localStorage.getItem("session_data");
    //         console.log("this is workingg", this.user_id);
    //       } else {
    //         this.userId = "";
    //       }
  
    //       //var session_data = JSON.parse(localStorage.getItem("session_data"))
    //       // this.userId=localStorage.getItem("session_data")
    //       // this.userId=session_data.session_id
    //     } else {
    //       const user = localStorage.getItem("userData")
    //         ? JSON.parse(localStorage.getItem("userData"))
    //         : {};
    //       console.log("user dsata is here =========", user);
    //       if (user) {
    //         this.userId = user;
    //       }
    //     }
  
  
    //     if (!(this.isLogin)) {
    //       this.toastr.error("Please Login First");
    //       return false;
    //     }
    //     if (!(this.userData.user_type == "customer")) {
    //       this.toastr.warning("Please Login as a customer");
    //       return false;
    //     }
    //     if (!(this.quantityIncrese > 0)) {
    //       this.toastr.error("Please add minimum 1 product quantity");
    //       return false;
    //     }
    //     if (cartcount) {
    //       this.toastr.warning("Product already added in cart");
    //       return false;
    //     }
  
    //     if (this.s && this.colorname) {
    //       this.obj1 = {
    //         user_id: this.userId._id,
    //         product_id: this.productId,
    //         professional_id: this.profId._id,
    //         quantity: this.quantityIncrese,
    //         color_name: this.colorname,
    //         color_code: this.colorcodes,
    //         size: this.s,
    //         size_unit: this.sizeu
    //       };
    //       console.log("this.obj1 is===========>", this.obj1);
  
    //       this.CustomerService.addToCart(this.obj1).subscribe((res) => {
    //         this.toastr.success("Product Added to the cart Successfully");
  
    //         this.cartService.cartDataBehSub.next("true");
  
    //         localStorage.setItem("cartCount", "true");
  
    //         this.router.navigate(["/mycart"])
    //         if (res.session_id && !this.isLogin) {
    //           localStorage.setItem("session_data", res.session_id);
    //           localStorage.setItem("cart_id", res.data.cart_id);
    //         }
  
    //         console.log(res);
    //         //this.ngOnInit()
    //       });
    //     }
    //     else {
    //       this.obj1 = {
    //         user_id: this.userId,
    //         product_id: this.productId,
    //         professional_id: this.profId._id,
    //         quantity: this.quantityIncrese,
    //         // color_name:this.colorname,
    //         // color_code:this.colorcodes,
    //         // size:this.s,
    //         // size_unit:this.sizeu
    //       };
    //       console.log("this.obj1 is===========>", this.obj1);
  
    //       this.CustomerService.addToCart(this.obj1).subscribe((res) => {
    //         this.toastr.success("Product Added to the cart Successfully");
    //         this.router.navigate(["/mycart"])
    //         this.cartService.cartDataBehSub.next("true");
    //         localStorage.setItem("cartCount", "true");
  
  
    //         if (res.session_id && !this.isLogin) {
    //           localStorage.setItem("session_data", res.session_id);
    //           localStorage.setItem("cart_id", res.data.cart_id);
    //         }
  
    //         console.log(res);
    //         //this.ngOnInit()
    //       });
    //     }
    //   }
    //   // else if (!this.iconbig) {
    //   //   this.toastr.error("Please Select product color");
    //   // }
    //   // else if (!this.sizeselected) {
    //   //   this.toastr.error("Please Select product size");
    //   // }
    //   else if (this.quantityIncrese == 0) {
    //     this.toastr.error("Please add minimum 1 product quantity");
    //   }
  
    //   else if (this.isLogin) {
    //     this.toastr.warning("Please Login as a customer");
    //   }
    //   else {
    //     this.toastr.error("Please Login First");
    //   }
    // }
    buynow(val) {
      if (this.isLogin && this.userData.user_type == "customer"  ) {
        this.quantityIncrese = 1
        let cartcount = localStorage.getItem("cartCount");
        console.log("Product ID : ", val);
  
        this.isLogin = localStorage.getItem("isLoggedIn");
        console.log("ISLOGIN value is>>>>>", this.isLogin);
        //this.userId=localStorage.getItem("session_data")
        // if((localStorage.getItem("session_data"))&& !this.isLogin ){
        // 	var session_data = JSON.parse(localStorage.getItem("session_data"))
        // 	// this.userId=localStorage.getItem("session_data")
        // 	this.userId=session_data.session_id
        // }else{
        // 	this.userId=""
        // }
        this.productId = val;
        // this.profId = this.detail.professional_id;
  
        if (!this.isLogin) {
          console.log("this is workingg");
          if (localStorage.getItem("session_data")) {
            this.userId = localStorage.getItem("session_data");
            console.log("this is workingg", this.user_id);
          } else {
            this.userId = "";
          }
  
          //var session_data = JSON.parse(localStorage.getItem("session_data"))
          // this.userId=localStorage.getItem("session_data")
          // this.userId=session_data.session_id
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
          this.toastr.error("Please Login First");
          return false;
        }
        if (this.userData.user_type != "customer") {
          this.toastr.warning("Please Login as a customerssssssssss");
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
            // professional_id: this.profId._id,
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
  
            this.router.navigate(["/mycart"])
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
            user_id:this.userId['_id'],
            product_id: this.productId,
            // professional_id: this.profId._id,
            quantity: this.quantityIncrese,
            // color_name:this.colorname,
            // color_code:this.colorcodes,
            // size:this.s,
            // size_unit:this.sizeu
          };
          console.log("this.obj1 is===========>", this.obj1);
  
          this.CustomerService.addToCart(this.obj1).subscribe((res) => {
            this.toastr.success("Product Added to the cart Successfully");
            this.router.navigate(["/mycart"])
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
      // else if (!this.iconbig) {
      //   this.toastr.error("Please Select product color");
      // }
      // else if (!this.sizeselected) {
      //   this.toastr.error("Please Select product size");
      // }
      // else if (this.quantityIncrese == 0) {
      //   this.toastr.error("Please add minimum 1 product quantity");
      // }
  
      else if (!(this.userId?.user_type == "customer") ){
        this.toastr.warning("Please Login as a customersss");
      }
      else {
        this.toastr.error("Please Login First");
      }
     }

}
