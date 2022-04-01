import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';
// import { AdminService } from 'src/app/shared/admin.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {

  related_products_slider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay:true,
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
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
}

botm_sldr_dtl: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  autoplay:true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  margin: 10,
  nav: true,
  navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
  responsive: {
    0: {
      items: 4
    },
    740: {
      items: 4
    },
  },
}

myThumbnail = "https://kampalahighschool.sc.ug/wp-content/plugins/tutor/assets/images/placeholder.jpg";
  product_img=[];
  product_img0=[];
  productslist: [];
  length
  relatedimg: [];
  orderId: any;
  userData2: any;

showZoomImg(value) {
  this.ImgSrc = value
  this.myThumbnail 
  //this.myFullresImage=this.ImgSrc
  console.log(this.ImgSrc)
}


  order_details
  product_id
  order_id
  order_item_id
  ImgSrc;
	id;
	obj;
	obj1;
	userId;
	detail;
	productId;
	profId;
	quanty = 1
	imgpath = environment.prodImg;
	InitialImg;
	cartArray = []
	user_id

	professional_id
	isLogin
	quantity
	total
	priceItem
	userData
	shareInput
// myThumbnail="https://kampalahighschool.sc.ug/wp-content/plugins/tutor/assets/images/placeholder.jpg";

// 	showZoomImg(value){
// 		this.ImgSrc=value
// 		this.myThumbnail=this.ImgSrc
// 		//this.myFullresImage=this.ImgSrc
// 		console.log(this.ImgSrc)
// 	}

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public Service: CustomerService,
    private toastr: ToastrService,
    
    ) { }

  ngOnInit() {
    // this.orderDetails()
    // this.orderlisting()
    this.order_details=JSON.parse(localStorage.getItem("orderDetails"))
    this.Service.getUserDetails().subscribe(data=>{
      this.userData2=data.data
      console.log("Full data of user is============================>",this.userData2);
      
    })
    console.log("order Data is====>",this.order_details);
    console.log("prod image is===========",this.order_details?.ProductDetail?.product_media[0])
  this.myThumbnail=this.imgpath+this.order_details?.ProductDetail?.product_media[0].name;
	// console.log(this.myThumbnail)	  	
  $(document).ready(function(){

    var quantitiy=0;
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
    
  });


}
dispatch(){
  var obj={
    status:"dispatched",
    order_item_id:this.order_details._id,
    logistic_location_id:this.userData2.logistic_location_id._id
  }
  console.log("object of order details==============",obj);
  
  this.Service.changeOrderItemStatus(obj).subscribe(res=>{
    console.log("res for status",res);
    if(res.code==200){
      this.toastr.success("Product Dispatched Successfully")
    }
    else if(res.code>400){
      this.toastr.error("Some error Occured")
    }
  })
}

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  // orderDetails() {
  //   var obj = {
  //     order_item_id: this.route.snapshot.paramMap.get('order_id')
  //   }
  //   console.log("onnnn", obj)
  //   this.AdminService.orderrlist(obj).subscribe(data => {
  //     console.log("main data for users is ====", data)
  //     this.order_details = data.data
  //     this.orderId=this.order_details.order_id.id
  //     console.log("dsfgsdg",this.orderId)
  //     this.product_img= data.data.product_id.product_media
  //     this.product_img0= data.data.product_id.product_media[0].name
  //     if (this.product_img.length) {
  //       this.myThumbnail = this.imgpath + this.product_img0
  //     }
  //     console.log(this.myThumbnail)

  //     console.log(this.InitialImg);
  //     console.log(this.detail);
  //   }, err => {
  //     console.log(err.status)
  //     if (err.status >= 404) {
  //       console.log('Some error occured')
  //     } else {
  //        this.toastr.error('Some error occured, please try again!!', 'Error')
  //       console.log('Internet Connection Error')
  //     }
  //   })
  // }


  // orderlisting(){
  
  //   var obj = {
 
  //      //  limit: this.searchFilters.limit,
  //      limit: 30,
  //       offset:  1,
        
 
  //     }
  //    console.log("onnnn", obj)
  //    this.AdminService.orderrlist(obj).subscribe(data => {
  //          console.log("main data for listing is ====", data)
  //          this.productslist = data.data
  //         // this.length = data.data.total_counts
  //          this.relatedimg =  data.data.product_id.product_media[0].name
           
  //        }, err => {
  //          console.log(err.status)
  //          if (err.status >= 404) {
  //            console.log('Some error occured')
  //          } else {
  //             this.toastr.error('Some error occured, please try again!!', 'Error')
  //            console.log('Internet Connection Error')
  //          }
  //        })
  //  }

  // addToWishlist(value) {
	// 	console.log("Product ID : ", value);

	// 	this.isLogin = localStorage.getItem("isLoggedIn")
	// 	this.productId = value;
	// 	// this.profId = this.order_details.professional_id;
	// 	const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
	// 	this.userId = user;

	// 	if (this.isLogin && this.userData.user_type == 'customer') {
	// 		this.obj1 = {
	// 			//user_id:this.userId,
	// 			product_id: this.productId,
	// 			professional_id: this.profId,
	// 			//quantity:this.quanty
	// 		}
	// 		this.AdminService.addRemoveWishlistData(this.obj1).subscribe(res => {
	// 			this.toastr.success("Product Added to the Wishlist")
	// 			if (res.session_id && !this.isLogin) {
	// 				localStorage.setItem("session_data", res.session_id)
	// 				localStorage.setItem("wishlist_id", res.data.wishlist_id)
	// 			}
	// 			console.log(res)
	// 		})
	// 	} else if (this.isLogin) {
	// 		this.toastr.warning('Please Login as a customer')
	// 	} else {
	// 		this.toastr.error('Please Login first')
	// 	}
	// }

  buyNow(val) {
		if (this.isLogin && this.userData.user_type == 'customer') {
			this.total = this.quanty * this.priceItem
			this.router.navigate([`/checkout/${this.total}/${this.quanty}/${val}`])
		} else if (this.isLogin) {
			this.toastr.warning('Please Login as a customer')
		} else {
			this.toastr.error('Please Login First')
		}

	}

}
