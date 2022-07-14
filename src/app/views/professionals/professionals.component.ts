import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'


declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {
	    userId;
	    profileUrl=environment.profileUrl
		limit_val=10
		offset_val=0
		length
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
	professionallist: any;
	productId: any;
	wishlistType: string;
	isLogin: string;
	profId: any;
	detail: any;

	
  constructor(
	public CustomerService: CustomerService,
	private toastr: ToastrService
  ) { }

  ngOnInit(): void {





	// var obj={
	// 	limit : this.limit_val,
	// 	offset : this.offset_val
	// }


	this.CustomerService.professionalList().subscribe(res =>{
		console.log("Reponse of the Professional list>>>>>>",res)
		this.professionallist=res['data']
		console.log(this.professionallist)
		this.length=res.total_counts
	})
  	
  	$('.click').click(function() {
	if ($('span').hasClass("fa-star")) {
			$('.click').removeClass('active')
		setTimeout(function() {
			$('.click').removeClass('active-2')
		}, 30)
			$('.click').removeClass('active-3')
		setTimeout(function() {
			$('span').removeClass('fa-star')
			$('span').addClass('fa-star-o')
		}, 15)
	} else {
		$('.click').addClass('active')
		$('.click').addClass('active-2')
		setTimeout(function() {
			$('span').addClass('fa-star')
			$('span').removeClass('fa-star-o')
		}, 150)
		setTimeout(function() {
			$('.click').addClass('active-3')
		}, 150)
		$('.info').addClass('info-tog')
		setTimeout(function(){
			$('.info').removeClass('info-tog')
		},1000)
	}
})

  }

  getPageSizeOptions() {
    return [1,2,3];
    }

//  paginationOptionChange(evt) {
//     console.log("evthrm",evt)
//     this.offset_val = (evt.pageIndex * evt.pageSize)
//     this.limit_val = evt.pageSize
//     console.log("Offset Value>>>",this.offset_val)
//     console.log("Limit Value>>>>",this.limit_val)
//   var obj={
   
//     limit : this.limit_val,
//     offset: this.offset_val
    
//   }
//   this.CustomerService.professionalList(obj).subscribe(res =>{
// 	console.log("Reponse of the Professional list>>>>>>",res)
	
// })


// }
addToWishlist(value) {
	console.log(value)
    const user = localStorage.getItem("userData")? JSON.parse(localStorage.getItem("userData"))
    : {}
    this.userId = user;
      this.productId = value,
        this.wishlistType = 'professional'
      var obj = {
		professional_id: this.productId,
        wishlist_type: this.wishlistType,
        user_id:this.userId['_id']
      }
      this.isLogin = localStorage.getItem("isLoggedIn");
      let wishcount = localStorage.getItem("wishCount");
   
      console.log(this.userId )
     
    //   if (wishcount) {
    //     this.toastr.warning("Product already added in wishlist");
    //     return false;
    //   }
       if (!this.isLogin) {
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


}
