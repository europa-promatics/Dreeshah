import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomerService } from "../../shared/customer.service";
import { environment } from "src/environments/environment.prod";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
declare var $;

import { OwlOptions } from "ngx-owl-carousel-o";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { CartService } from "../../shared/cart.service";
import { MatAccordion } from "@angular/material/expansion";



@Component({
  selector: "app-products-details",
  templateUrl: "./products-details.component.html",
  styleUrls: ["./products-details.component.scss"],
})
export class ProductsDetailsComponent implements OnInit {



  related_products_slider: OwlOptions = {
    loop: true,

    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    nav: true,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };

  botm_sldr_dtl: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    nav: true,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 4,
      },
      740: {
        items: 4,
      },
    },
  };

  myThumbnail =
    "https://kampalahighschool.sc.ug/wp-content/plugins/tutor/assets/images/placeholder.jpg";
  availablesize = []
  colorname = '';
  colorcodes = '';
  s = ''
  sizeu = ''
  costperpriceItem: any;
  branch_quantity = [];
  totalprice = [];
  related: any;
  reqData: {};
  length: any;
  prodData: any;
  count: any;
  config: { itemsPerPage: number; currentPage: number; totalItems: any; };
  delever: any;
  deleverd: boolean=false;

  showZoomImg(value) {
    this.ImgSrc = value;
    this.myThumbnail = this.ImgSrc;
    //this.myFullresImage=this.ImgSrc
    console.log(this.ImgSrc);
  }

  //myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";

  wishlistType;

  ImgSrc;
  id;
  obj;

  obj1;
  userId;
  detail;
  productId;
  profId;
  quanty = 1;
  imgpath = environment.prodImg;
  imgpath2 = environment.profileUrl;

  InitialImg;
  cartArray = [];
  user_id;
  product_id;
  professional_id;
  isLogin;
  quantity;
  quantityIncrese = 1;
  total;
  quantityyy = []
  priceItem;
  userData;
  shareInput;
  availablecolor = []
  iconbig: any
  sizeselected: any
  constructor(
    public CustomerService: CustomerService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { 

  }
  @ViewChild(MatAccordion) accordion: MatAccordion;
  ngOnInit(): void {
    localStorage.removeItem('wishCount');
    localStorage.removeItem('cartCount');
    console.log("In the product detail componennt>>>>>");
    this.isLogin = localStorage.getItem("isLoggedIn");

    this.userData =
      localStorage["userData"] != null
        ? JSON.parse(localStorage["userData"])
        : null;
    this.id = this.route.snapshot.paramMap.get("id");
    // alert(this.id)
    this.shareInput = `https://developers.promaticstechnologies.com/Dreeshah/#/products-details/${this.id}`;

    if (this.isLogin) {
      this.obj = {
        product_id: this.id,
      };

      this.CustomerService.getProductDetail(this.obj).subscribe((res) => {
        console.log('Product details of specific product', res);
        this.detail = res.details;
        this.priceItem = this.detail.pricing.price;
        this.availablecolor = res.details.available_color;
        this.availablesize = res.details.available_size;
        this.costperpriceItem = this.detail.pricing.costPerItem;
        this.quantityyy = res.details.quantity
        // for (var i = 0; i < this.quantityyy.length; i++) {

        //   if (this.quantityyy[i].branch_quantity) {
        //     this.branch_quantity[i] = this.quantityyy[i].branch_quantity;
        //     console.log("true ----------", this.branch_quantity[i]);
        //   }
        //   this.totalprice[i] = this.quantityIncrese * this.costperpriceItem
        // }
        console.log("Price of the item is:", this.total);
        console.log("Price of the item is:", this.total);
        if (this.detail.product_media.length) {
          this.myThumbnail = this.imgpath + this.detail.product_media[0].name;
        }
        console.log(this.myThumbnail);

        console.log(this.InitialImg);
        console.log(this.detail);

      });
    } else {
      this.obj = {
        product_id: this.id,
      };

      this.CustomerService.getProductDetailGuest(this.obj).subscribe((res) => {
        console.log(res);
        this.detail = res.details;
        this.priceItem = this.detail.pricing.price;
        this.quantityyy = res.details.quantity
        console.log("Price of the item is:", this.total);
        if (this.detail.product_media.length) {
          this.myThumbnail = this.imgpath + this.detail.product_media[0].name;
        }
        console.log(this.myThumbnail);

        console.log(this.InitialImg);
        console.log(this.detail);
      });

    }

	 //this.dataSource = new MatTableDataSource(this.responseData);
      var list={
        limit:10000,
        offset:0
      }

    this.CustomerService.productList(list).subscribe(res =>{
      console.log(res)
      this.prodData=res.products;
      this.count=res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
   
    })

  //  this.related=this.prodData
  //  console.log("ppppp=>",this.related)

    // this.myThumbnail=this.imgpath+this.InitialImg;
    // console.log(this.myThumbnail)
    /*	$(document).ready(function(){

      var quantity=0;
      $('.quantity-right-plus').click(function(e){
      	
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
      	
        // If is not undefined
      	
        $('#quantity').val(quantity + 1);

      	
        // Increment
      	
      });

      $('.quantity-left-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
      	
        // If is not undefined
      	
        // Increment
        if(quantity>0){
          $('#quantity').val(quantity - 1);
        }
      });
    	
    });*/
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  incrementchoc() {
    this.quantityIncrese = this.quantityIncrese + 1;
  }

  decrementchoc() {
    if (this.quantityIncrese >= 1) {
      this.quantityIncrese = this.quantityIncrese - 1;
    }
  }
  Viewbigicon(value, colorcode, id) {
    this.colorname = value
    console.log(this.colorname)
    this.colorcodes = colorcode
    this.iconbig = id
  }
  Viewsmallicon(value, colorcode, id) {
    this.colorname = value
    this.colorcodes = colorcode
    this.iconbig = null
    // this.iconbig=false
    console.log(this.iconbig)
  }
  Viewselectedsize(size_unit, size, id) {
    this.s = size
    console.log(this.s)
    this.sizeu = size_unit
    this.sizeselected = id
  }

  Viewsize(size_unit, size, id) {
    this.s = size
    console.log(this.s)
    this.sizeu = size_unit
    this.sizeselected = null
  }
  choose(event){
      console.log(event,"===>")
      this.delever=event.target.value
      this.deleverd=true
  }

  addToCart(value) {
    let cartcount = localStorage.getItem("cartCount");
    console.log("Product ID : ", value);

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
    this.productId = value;
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
      this.toastr.warning("Please Login as a customer");
      return false;
    }
    if (!(this.quantityIncrese > 0)) {
      this.toastr.error("Please add minimum 1 product quantity");
      return false;
    }
    if (cartcount) {
      this.toastr.warning("Product already added in cart");
      return false;
    }

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
  addToWishlist(value) {
    const user = localStorage.getItem("userData")? JSON.parse(localStorage.getItem("userData"))
    : {}
    this.userId = user;
      this.productId = value,
        this.wishlistType = 'product'
      var obj = {
        product_id: this.productId,
        wishlist_type: this.wishlistType,
        user_id:this.userId['_id']
      }
      this.isLogin = localStorage.getItem("isLoggedIn");
      let wishcount = localStorage.getItem("wishCount");
      this.profId = this.detail.professional_id;
      console.log(this.userId )
     
      if (wishcount) {
        this.toastr.warning("Product already added in wishlist");
        return false;
      }
      else if (!this.isLogin) {
        this.toastr.error("Please Login first");

      }
      else if( (this.userId['user_type'] !="customer") ){
        this.toastr.warning("Please Login as a customer");
      }
      else {
        this.CustomerService.addToWishList(obj).subscribe(data => {
          localStorage.setItem("wishCount", "true");
          this.toastr.success("Product Added to the Wishlist");
          if (data.session_id && !this.isLogin) {
            localStorage.setItem("session_data", data.session_id);
            localStorage.setItem("wishlist_id", data.data.wishlist_id);
           
          }
          
          
        })
      } 
    }

  // addToWishlist(value) {
  //   this.productId = value,
  //     this.wishlistType = 'product'
  //   var obj = {
  //     product_id: this.productId,
  //     wishlist_type: this.wishlistType
  //   }
  //   this.isLogin = localStorage.getItem("isLoggedIn");
  //   let wishcount = localStorage.getItem("wishCount");
  //   this.profId = this.detail.professional_id;
  //   const user = localStorage.getItem("userData")
  //   this.userId = user;
  //   if (wishcount) {
  //     this.toastr.warning("Product already added in wishlist");
  //     return false;
  //   }
  //   else {
  //     this.CustomerService.addToWishList(obj).subscribe(data => {
  //       localStorage.setItem("wishCount", "true");
  //       if (data.session_id && !this.isLogin) {
  //         localStorage.setItem("session_data", data.session_id);
  //         localStorage.setItem("wishlist_id", data.data.wishlist_id);
  //         this.toastr.success("Product Added to the Wishlist");
  //       }
  //       else if (this.isLogin) {
  //         this.toastr.warning("Please Login as a customer");
  //       }
  //        else {
  //         this.toastr.error("Please Login first");
  //       }
  //     })
  //   } 
  // }

  // addToWishlist(value) {
  //   let wishcount=localStorage.getItem("wishCount");
  //   console.log("Product ID : ", value);

  //   this.isLogin = localStorage.getItem("isLoggedIn");
  //   this.productId = value;
  //   this.profId = this.detail.professional_id;
  //   const user = localStorage.getItem("userData")
  //     ? JSON.parse(localStorage.getItem("userData"))
  //     : {};
  //   this.userId = user;
  //   if(wishcount){
  //     this.toastr.warning("Product already added in wishlist");
  //     return false;
  //   }
  //   if (this.isLogin && this.userData.user_type == "customer") {
  //     this.obj1 = {
  //       //user_id:this.userId,
  //       product_id: this.productId,
  //       professional_id: this.profId,
  //       //quantity:this.quanty
  //     };
  //     this.CustomerService.addRemoveWishlistData(this.obj1).subscribe((res) => {
  //       this.toastr.success("Product Added to the Wishlist");
  //       localStorage.setItem("wishCount", "true");
  //       if (res.session_id && !this.isLogin) {
  //         localStorage.setItem("session_data", res.session_id);
  //         localStorage.setItem("wishlist_id", res.data.wishlist_id);
  //       }
  //       console.log(res);
  //     });
  //   } else if (this.isLogin) {
  //     this.toastr.warning("Please Login as a customer");
  //   } else {
  //     this.toastr.error("Please Login first");
  //   }
  // }

  buyNow(val) {
    if (this.isLogin && this.userData.user_type == "customer" && this.deleverd==true && this.quantityIncrese != 0 || this.iconbig || this.sizeselected ) {
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
      this.profId = this.detail.professional_id;

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
      if (!(this.quantityIncrese > 0)) {
        this.toastr.error("Please add minimum 1 product quantity");
        return false;
      }
      if (cartcount) {
        this.toastr.warning("Product already added in cart");
        return false;
      }

      if (this.s && this.colorname) {
        this.obj1 = {
          deliverd_by:this.delever,
          user_id: this.userId._id,
          product_id: this.productId,
          professional_id: this.profId._id,
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
          deliverd_by:this.delever,
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
  //   else if (this.quantityIncrese == 0) {
  //     this.toastr.error("Please add minimum 1 product quantity");
  //   }

    else if (!(this.userId?.user_type != "customer")) {
      this.toastr.warning("Please Login as a customersss");
    }else if(!this.deleverd ){
      this.toastr.error("Please select delever type");
    }
    else {
      this.toastr.error("Please Login First");
    }

   }
  //  details(x:any){
  //   this.router.navigate([`/products-details/${x}`])
  //  }
   details(sub_id) {
    this.router.navigate(['/products-details/',sub_id]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  datatarget(i){
    console.log(i,"===>")
  }
}
