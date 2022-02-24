import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr'


declare var $;
@Component({
	selector: 'app-my-wishlist',
	templateUrl: './my-wishlist.component.html',
	styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {

	isLogin
	userId
	obj1
	obj2
	obj3
	obj4
	wishlistDetail
	user_id
	productId
	profId
	quanty
	imgpath=environment.prodImg;
	wishListLength =0

	constructor(public CustomerService: CustomerService,
		private toastr: ToastrService,) { }

	ngOnInit(): void {

		this.isLogin=localStorage.getItem("isLoggedIn")
    
    if(!this.isLogin && localStorage.getItem("session_data")){
      this.userId=localStorage.getItem("session_data")
    }else{
      this.userId=""
    }
   
    
    //console.log('this.userId', this.userId)
    this.obj1={
      user_id:this.userId,
      
    }
    this.wishListDetail();

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

	wishListDetail(){
		//console.log("inside wishlist details component",this.obj1)
		if(!this.isLogin){
		  this.CustomerService.wishlistDetailGuest().subscribe(res =>{
			
			console.log("Wishlist Details:",res)	
			this.wishlistDetail	=res.data	
			console.log(this.wishlistDetail)	
			
		  })
		}else{
		  this.CustomerService.wishlistDetail().subscribe(res =>{
			
			console.log("Wishlist Details:",res)	
			this.wishlistDetail	=res.data	
			this.wishListLength= this.wishlistDetail.length	
			console.log("wishlist detail data=======",this.wishlistDetail)	
			
		  })
		}
		
	  }

	  addToCart(value){
		console.log("Value of the product for wishlist=======: ",value);
		const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
		console.log('user dsata is here =========',user)
		this.userId = user;
		this.isLogin=localStorage.getItem("isLoggedIn")
		this.quanty=1
		this.productId=value.product_id;
		this.profId=value.professional_id;
		
		/* if( !this.isLogin ){
			console.log("this is workingg")
			if((localStorage.getItem("session_data"))){
				this.userId = localStorage.getItem("session_data");
				console.log("this is workingg", this.user_id)
			}else{
				this.userId = "";
			}
	
			
		}else{
			const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
			console.log('user dsata is here =========',user)
			if(user){
				this.userId = user;
			}
			
		} */
		//console.log(this.quantity)
			this.obj3={
					user_id:this.userId,
					product_id:this.productId,
					professional_id:this.profId,
					quantity:this.quanty
			}
			this.CustomerService.addToCart(this.obj3).subscribe(res =>{
			this.toastr.success("Product Added to the cart Successfully")
			if(res.session_id && !this.isLogin){
				localStorage.setItem("session_data",res.session_id)	
				localStorage.setItem("cart_id",res.data.cart_id)		
			}
			console.log(res)
			this.removeWishListItemAfterAdd(this.productId)	
			
		}) 
		
	
	  }
	

	  removeWishListItem(val){
		console.log(val)
		console.log(val.professional_id)	
		
		this.obj2={		
			product_id:val.product_id,
			professional_id:val.professional_id,
		}
		  
		this.CustomerService.addRemoveWishlistData(this.obj2).subscribe(res =>{		
			console.log("Wishlist Item Deleted:",res)
			this.toastr.success("Item Removed From Wishlist")	
			this.ngOnInit();							
		  })
	  }

	  removeWishListItemAfterAdd(val)	{
			console.log(">>>>",val)		
		
		// this.obj4={		
		// 	product_id:val
		// }
		this.obj4={		
			product_id:val,
			professional_id : val.professional_id
		}
		  
		this.CustomerService.addRemoveWishlistData(this.obj4).subscribe(res =>{		
			console.log("Wishlist Item Deleted:",res)	
			this.ngOnInit();							
		  })

			}			

}
