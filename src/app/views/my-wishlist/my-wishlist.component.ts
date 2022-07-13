import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr'
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { valueToRelative } from '@amcharts/amcharts4/.internal/core/utils/Utils';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  moveItemsArray = [];
  // current_id: string;

  // ngOnInit(): void {
  // 	this.allData();
  // }

  groupForm;
  productWishGroups
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
  wishlistDetailallp: any;
  image_base_url = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"
  productImagePath = "https://developers.promaticstechnologies.com/dreeshah_apis/public/SellerProductImages/";
  serviceImagePath = "https://developers.promaticstechnologies.com/dreeshah_apis/public/ProfessionalServices/";
  allWishGroupsProducts;
  allWishGroupsServices;
  allWishGroupsProfessionals;
  product_1: any;
  product_2: any;
  service_1: any;
  service_2: any;
  user_1: any;
  user_2: any;

  constructor(
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder,private router:Router
  ) {
    this.groupForm = this.fb.group({
      group_name: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.moveItemsArray = []
    this.AllWishListDetail()
    // this.ProfessionalWishListDetail()



    this.isLogin = localStorage.getItem("isLoggedIn")
    this.CustomerService.getUserDetails().subscribe(res => {
      this.allWishGroupsProducts = res.data.wish_groups
    })
    this.CustomerService.getUserDetails().subscribe(res2 => {
      this.allWishGroupsProfessionals = res2.data.wish_groups
    })
    this.CustomerService.getUserDetails().subscribe(res3 => {
      this.allWishGroupsServices = res3.data.wish_groups
    })
    this.productsWishListDetail()
    this.ProfessionalWishListDetail()
    this.servicesWishListDetail()
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

    console.log("inside wishlist details component", this.isLogin)
    if (this.isLogin == "false") {
      console.log("In if")
      this.CustomerService.wishlistDetailGuest().subscribe(res => {

        // console.log("Wishlist Details guest:", res)
        this.wishlistDetailall = res.data
        // console.log(this.wishlistDetailall)

      })
    } else {
      console.log("In elss")
      // let user_id=this.isLogin._id
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
  detail(_id:any){
    console.log("done",_id)
    this.router.navigate(['products-details',_id])
  }


  ProfessionalWishListDetail() {
    // console.log("inside wishlist details component1111",this.current_id)
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

        console.log("Wishlist Details pro:", res)
        this.wishlistDetailPro = res.data
        this.wishListProLength = this.wishlistDetailPro.length

        // console.log("Professional wishlist detail data=======", this.wishlistDetailPro)
        this.allWishGroupsProfessionals
        console.log('before this.allWishGroupsProfessionals: ', this.allWishGroupsProfessionals);
        console.log('res.grouped.wishlistitems.length: ', res.grouped.wishlistitems.length);
        if (res.grouped.wishlistitems.length > 0) {
          console.log('ififififiifif')
          for (let i = 0; i < this.allWishGroupsProfessionals.length; i++) {
            let index = res.grouped.wishlistitems.findIndex(item => { return item._id == this.allWishGroupsProfessionals[i]._id })
            if (index != -1) {
              this.allWishGroupsProfessionals[i].records = res.grouped.wishlistitems[index].records
            }
          }
        }
        console.log('this.allWishGroupsProfessionals[i].records: ', this.allWishGroupsProfessionals);

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

        // console.log("Wishlist Details:", res)
        this.wishlistDetailProduct = res.data

        console.log(this.wishlistDetail)

      })
    } else {
      this.CustomerService.wishlistParamDetail(prodParaObj).subscribe(res => {

        console.log("Wishlist Details:", res)
        this.wishlistDetailProduct = res.data
        this.wishListproductLength = this.wishlistDetailProduct.length
        console.log("Product wishlist detail data=======", this.wishlistDetailProduct)

        // this.productWishGroups
        if (res.grouped.wishlistitems.length > 0) {
          for (let i = 0; i < this.allWishGroupsProducts.length; i++) {
            let index = res.grouped.wishlistitems.findIndex(item => { return item._id == this.allWishGroupsProducts[i]._id })
            if (index != -1) {
              this.allWishGroupsProducts[i].records = res.grouped.wishlistitems[index].records
            }
          }
        }
        console.log('this.allWishGroupsProducts[i].records: ', this.allWishGroupsProducts);
      })
    }
  }

  removePorductWishListItem(val) {
    this.obj5 = {
      wishlist_type: 'product',
      product_id: val,

    }
    this.CustomerService.addRemoveWishlistData(this.obj5).subscribe(res => {
      // console.log("Wishlist Item Deleted:", res)
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

        // console.log("Wishlist Details:", res)
        this.wishlistDetailServive = res.data

        console.log(this.wishlistDetail)

      })
    } else {
      this.CustomerService.wishlistParamDetail(serParaObj).subscribe(res => {

        console.log("services--------Wishlist Details:", res)
        this.wishlistDetailServive = res.data
        this.wishListSerLength = this.wishlistDetailServive.length

        if (res.grouped.wishlistitems.length > 0) {
          console.log('in ifffff')
          for (let i = 0; i < this.allWishGroupsServices.length; i++) {
            console.warn('-----------------in for---------');
            let index = res.grouped.wishlistitems.findIndex(item => { return item._id == this.allWishGroupsServices[i]._id })
            console.log('index: ', index);
            if (index != -1) {
              this.allWishGroupsServices[i].records = res.grouped.wishlistitems[index].records
            }
          }
        }
        console.log('this.allWishGroupsServices[i].records: ', this.allWishGroupsServices);
        // console.log("Service wishlist detail data=======", this.wishlistDetailServive)

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

  removeFromWishlist(id) {
    var obj = {
      wishlistitems_id: id
    }
    this.CustomerService.removeWishlistData(obj).subscribe(res => {
      if (res.code == 200 || res.code == '200') {
        this.toastr.success('Item Removed From Wishlist')
        this.ngOnInit();
      }
    })
  }

  createNewGroup() {
    if (!this.groupForm.valid) {
      return
    } else {
      console.log('group form-------------', this.groupForm.value)
      this.CustomerService.createNewGroup(this.groupForm.value).subscribe(data => {
        console.log('------group form-----', data)
        $('.close').click()
      })
      this.ngOnInit();
    }
  }

  checkBoxClick(event) {
    const checked = event.target.checked

    console.log('--------------', event.target.checked)
    if (checked == true) {
      this.moveItemsArray.push(event.target.id) //wishlist item id
    } else {
      const index = this.moveItemsArray.indexOf(event.target.id)
      this.moveItemsArray.splice(index, 1)
    }
    console.log('--------ARRAY------', this.moveItemsArray)
  }

  moveToGroup(event) {
    console.log(event.target.id)
    if (this.moveItemsArray.length == 0) {
      console.log('in ifff')
      this.toastr.error('Please Select at least one item')
      return
    } else {
      var obj = {
        wishlistitems_id: this.moveItemsArray,
        wish_groups_id: event.target.id
      }
      console.log('in elseeeee', obj)

      this.CustomerService.moveToGroup(obj).subscribe(data => {
        console.log('moved group data', data)
      })
    }
    this.ngOnInit()
  }

  multipleDelete() {
    console.log('in functyion');
    if (this.moveItemsArray.length == 0) {
      this.toastr.error('Please Select at least one item')
      return
    } else {
      for (let i = 0; i < this.moveItemsArray.length; i++) {
        let element = this.moveItemsArray[i];
        var obj = {
          wishlistitems_id: element
        }
        this.CustomerService.removeWishlistData(obj).subscribe(res => {
          if (res.code == 200 || res.code == '200') {
            this.toastr.success('Item Removed From Wishlist')
            this.ngOnInit();
          }
        })
      }
    }
  }

  deleteGroup(event) {
    this.CustomerService.groupDelete({ group_id: event.target.id }).subscribe(res => {
      console.log(res)
      if (res.data == 200 || res.data == '200') {
        this.toastr.success('Group Deleted Successfully')
      }
    })
    this.ngOnInit();
  }

  compareItems(type) {
    if (this.moveItemsArray.length == 2) {
      if (type == 'product') {
        this.CustomerService.getProductDetail({ product_id: this.moveItemsArray[0] }).subscribe(data => {
          console.log('product detail--1-----', data.details)
          this.product_1 = data.details
        })
        this.CustomerService.getProductDetail({ product_id: this.moveItemsArray[1] }).subscribe(data => {
          console.log('product detail---2----', data.details)
          this.product_2 = data.details
        })
        $('#productModalBtn').click()
        this.moveItemsArray = [];
      }
      else if (type == 'professional') {
        this.CustomerService.userDetailsById({ user_id: this.moveItemsArray[0] }).subscribe(data => {
          console.log('user detail--1-----', data.data)
          this.user_1 = data.data
        })
        this.CustomerService.userDetailsById({ user_id: this.moveItemsArray[1] }).subscribe(data => {
          console.log('user detail---2----', data.data)
          this.user_2 = data.data
        })
        $('#professionalModalBtn').click()
        this.moveItemsArray = [];
      }
      else if (type == 'service') {
        this.CustomerService.getProfessionalServicesDetails({ service_id: this.moveItemsArray[0] }).subscribe(data => {
          console.log('service detail--1-----', data.result)
          this.service_1 = data.result
        })
        this.CustomerService.getProfessionalServicesDetails({ service_id: this.moveItemsArray[1] }).subscribe(data => {
          console.log('service detail---2----', data.result)
          this.service_2 = data.result
        })
        $('#serviceModalBtn').click()
        this.moveItemsArray = [];
      }
    }
    else {
      this.toastr.error('Please select two items to compare');
    }
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


