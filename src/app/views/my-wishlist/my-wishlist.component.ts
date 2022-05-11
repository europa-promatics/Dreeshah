import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr'
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { valueToRelative } from '@amcharts/amcharts4/.internal/core/utils/Utils';


declare var $;
@Component({
	selector: 'app-my-wishlist',
	templateUrl: './my-wishlist.component.html',
	styleUrls: ['./my-wishlist.component.scss']
})
export class MyWishlistComponent implements OnInit {
	obj5: { wishlist_type: any; product_id: any };
	obj6: {};
	obj7: { wishlist_type: any; professional_id: any; };
	wishlistDetailall: any;
	wishListallLength: any;
	wishlistDetailPro: any;
	wishListProLength: any;
	wishlistDetailServive: any;
	wishListSerLength: any;
	wishlistDetailProduct: any;
	wishListproductLength: any;


	// ngOnInit(): void {
	// 	this.allData();
	// }


	wishlist_type: any
	professional
	profobj
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
	imgpath = environment.prodImg;
	wishListLength = 0
	image_base_url = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"
	wishlistDetailallp: any;
  productImagePath = "https://developers.promaticstechnologies.com/dreeshah_apis/public/SellerProductImages/";


	constructor(public CustomerService: CustomerService,
		private toastr: ToastrService,) { }

	ngOnInit(): void {
		this.AllWishListDetail()
		this.ProfessionalWishListDetail()
		this.servicesWishListDetail()
		this.productsWishListDetail()

		this.isLogin = localStorage.getItem("isLoggedIn")

		if (!this.isLogin && localStorage.getItem("session_data")) {
			this.userId = localStorage.getItem("session_data")
		} else {
			this.userId = ""
		}

		console.log('this.userId', this.userId)
		this.obj1 = {
			user_id: this.userId,

		}

	}
	// this.wishListDetail();

	// 	$(document).ready(function(){

	// 		var quantitiy=0;
	// 		$('.quantity-right-plus').click(function(e){

	// 			// Stop acting like a button
	// 			e.preventDefault();
	// 			// Get the field name
	// 			var quantity = parseInt($('#quantity').val());

	// 			// If is not undefined

	// 			$('#quantity').val(quantity + 1);


	// 			// Increment

	// 		});

	// 		$('.quantity-left-minus').click(function(e){
	// 			// Stop acting like a button
	// 			e.preventDefault();
	// 			// Get the field name
	// 			var quantity = parseInt($('#quantity').val());

	// 			// If is not undefined

	// 			// Increment
	// 			if(quantity>0){
	// 				$('#quantity').val(quantity - 1);
	// 			}
	// 		});

	// 	});
	// }

	AllWishListDetail() {
		console.log("inside wishlist details component", this.obj1)
		if (this.isLogin == "false") {
			console.log("In if")
			this.CustomerService.wishlistDetailGuest().subscribe(res => {

				// console.log("Wishlist Details guest:", res)
				this.wishlistDetailall = res.data
				// console.log(this.wishlistDetailall)

			})
		} else {
			console.log("In elss")
			this.CustomerService.wishlistDetail().subscribe(res => {

				// console.log("Wishlist Details:", res)
				this.wishlistDetailall = res.data
				this.wishListallLength = this.wishlistDetailall.length

				console.log("all wishlist detail data=======", this.wishlistDetailall)

			})
		}
	}

	removeAllWishListItem(prod_id, prof_id) {
		console.log("value of product id ", prod_id)
		console.log("value of prof id", prof_id)

		this.obj2 = {
			product_id: prod_id,
			professional_id: prof_id,
		}

		this.CustomerService.addRemoveWishlistData(this.obj2).subscribe(res => {
			console.log("Wishlist Item Deleted:", res)
			this.toastr.success("Item Removed From Wishlist")
			// this.ngOnInit();
			this.AllWishListDetail()
		})
	}


	ProfessionalWishListDetail() {
		//console.log("inside wishlist details component",this.obj1)
		const profParaObj = {
			wishlist_type: 'professional',
		};
		if (this.isLogin == "false") {
			this.CustomerService.wishlistDetailGuest().subscribe(res => {

				// console.log("Wishlist Details:", res)
				this.wishlistDetailPro = res.data

				// console.log(this.wishlistDetail)

			})
		} else {
			this.CustomerService.wishlistParamDetail(profParaObj).subscribe(res => {

				// console.log("Wishlist Details:", res)
				this.wishlistDetailPro = res.data
				this.wishListProLength = this.wishlistDetailPro.length

				// console.log("Professional wishlist detail data=======", this.wishlistDetailPro)

			})
		}
	}


	productsWishListDetail() {
		//console.log("inside wishlist details component",this.obj1)
		const prodParaObj = {
			wishlist_type: 'product',
		};
		if (this.isLogin == "false") {
			this.CustomerService.wishlistDetailGuest().subscribe(res => {

				console.log("Wishlist Details:", res)
				this.wishlistDetailProduct = res.data

				console.log(this.wishlistDetail)

			})
		} else {
			this.CustomerService.wishlistParamDetail(prodParaObj).subscribe(res => {

				console.log("Wishlist Details:", res)
				this.wishlistDetailProduct = res.data
				this.wishListproductLength = this.wishlistDetailProduct.length

				console.log("Product wishlist detail data=======", this.wishlistDetailProduct)

			})
		}
	}

	removePorductWishListItem(val) {
		this.obj5 = {
			wishlist_type: 'product',
			product_id: val,

		}
		this.CustomerService.addRemoveWishlistData(this.obj5).subscribe(res => {
			console.log("Wishlist Item Deleted:", res)
			this.toastr.success("Item Removed From Wishlist")
			this.ngOnInit();
		})

	}

	servicesWishListDetail() {
		//console.log("inside wishlist details component",this.obj1)
		const serParaObj = {
			wishlist_type: 'service',
		};
		if (this.isLogin == "false") {
			this.CustomerService.wishlistDetailGuest().subscribe(res => {

				console.log("Wishlist Details:", res)
				this.wishlistDetailServive = res.data

				console.log(this.wishlistDetail)

			})
		} else {
			this.CustomerService.wishlistParamDetail(serParaObj).subscribe(res => {

				console.log("Wishlist Details:", res)
				this.wishlistDetailServive = res.data
				this.wishListSerLength = this.wishlistDetailServive.length

				console.log("Service wishlist detail data=======", this.wishlistDetailServive)

			})
		}
	}






	removeServiWishListItem(val) {
		this.obj6 = {
			wishlist_type: 'service',
			service_id: val.service_id,
		}
		this.CustomerService.addRemoveWishlistData(this.obj6).subscribe(res => {
			console.log("Wishlist Item Deleted:", res)
			this.toastr.success("Item Removed From Wishlist")
			this.ngOnInit();
		})

	}
}

			// removeProfWishListItem(val) {
			// 	this.obj7 = {
			// 		wishlist_type: val.wishlist_id,
			// 		professional_id: val.professional_id,
			// 	}
			// 	this.CustomerService.addRemoveWishlistData(this.obj7).subscribe(res => {
			// 		console.log("Wishlist Item Deleted:", res)
			// 		this.toastr.success("Item Removed From Wishlist")
			// 		this.ngOnInit();
			// 	})

			// }


			// 	addToCart(value) {
			// 		console.log("Value of the product for wishlist=======: ", value);
			// 		const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
			// 		console.log('user dsata is here =========', user)
			// 		this.userId = user;
			// 		this.isLogin = localStorage.getItem("isLoggedIn")
			// 		this.quanty = 1
			// 		this.productId = value.product_id;
			// 		this.profId = value.professional_id;

			// 		/* if( !this.isLogin ){
			// 			console.log("this is workingg")
			// 			if((localStorage.getItem("session_data"))){
			// 				this.userId = localStorage.getItem("session_data");
			// 				console.log("this is workingg", this.user_id)
			// 			}else{
			// 				this.userId = "";
			// 			}


			// 		}else{
			// 			const user = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
			// 			console.log('user dsata is here =========',user)
			// 			if(user){
			// 				this.userId = user;
			// 			}

			// 		} */
			// 		//console.log(this.quantity)
			// 		this.obj3 = {
			// 			user_id: this.userId,
			// 			product_id: this.productId,
			// 			professional_id: this.profId,
			// 			quantity: this.quanty
			// 		}
			// 		this.CustomerService.addToCart(this.obj3).subscribe(res => {
			// 			this.toastr.success("Product Added to the cart Successfully")
			// 			if (res.session_id && !this.isLogin) {
			// 				localStorage.setItem("session_data", res.session_id)
			// 				localStorage.setItem("cart_id", res.data.cart_id)
			// 			}
			// 			console.log(res)
			// 			this.removeWishListItemAfterAdd(this.productId)

			// 		})


			// 	}




			// 	removeWishListItemAfterAdd(val) {
			// 		console.log(">>>>", val)

			// 		// this.obj4={
			// 		// 	product_id:val
			// 		// }
			// 		this.obj4 = {
			// 			product_id: val,
			// 			professional_id: val.professional_id
			// 		}

			// 		this.CustomerService.addRemoveWishlistData(this.obj4).subscribe(res => {
			// 			console.log("Wishlist Item Deleted:", res)
			// 			this.ngOnInit();
			// 		})

			// 	}

			// }


