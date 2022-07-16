import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'


declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
		quotationForm: FormGroup;
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
	// today = new Date();
	// dd = this.today.getDate()
	// mm = this.today.getMonth()
	// yyyy = this.today.getFullYear();
  
	professionallist: any;
	productId: any;
	wishlistType: string;
	isLogin: string;
	profId: any;
	detail: any;
	quotationNum: any;
	salesRepres: string;
	serviceIdQuo: any;
	serviceNameQuo: any;
	quoRef: any;
	selected_service: any;
	profIdQuo: any;
	len: any;
	len2: any;
	phone: any;
	countryDial: any;
	splitNum: any;
	timeQuo: string;
	dateQuo: string;
	dateQuo2: string;
	userData: any;
	submit_book: boolean;
	phoneForm: any;
	// yyyy: number;
	// mm: number;
	// dd: number;
	// todayDate: string;
	// dateBook: string;
	// timeBook: string;

	
  constructor(
	public CustomerService: CustomerService,
	private toastr: ToastrService
  ) { 

    // this.phoneForm = new FormGroup({
	// 	phone: new FormControl('', [Validators.required])
	//   });
	// this.quotationForm = new FormGroup({
	// 	name: new FormControl('', [
	// 	  Validators.required,
	// 	]),
	// 	email: new FormControl('', [
	// 	  Validators.required,
	// 	  // Validators.email,
	// 	  Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
	// 	]),
		// phone: new FormControl('', [
		//   Validators.required
		// ]),
		// phone_number: new FormControl('', [
		//   Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
		// ]),
		// quotation_ref: new FormControl('', [
		//   Validators.required,
		// ]),
		// date: new FormControl(new Date(), [
		//   Validators.required,
		// ]),
		// // time: new FormControl(new Date(), [
		// //   Validators.required,
		// // ]),
		// sales_representative: new FormControl('', [
		//   Validators.required,
		// ]),
		// service_name: new FormControl(''),
		// location: new FormControl('', [
		//   Validators.required,
		// ]),
		// quantity: new FormControl('', [
		//   Validators.required, Validators.pattern('^[0-9]*')
		// ]),
	// 	expected_date: new FormControl('', [
	// 	  Validators.required,
	// 	]),
	// 	estimated_budget: new FormControl('', [
	// 	  Validators.required, Validators.pattern('^[0-9]*')
	// 	]),
	// 	description: new FormControl('', [
	// 	  Validators.required,
	// 	]),
	//   })
  }
//   minDate = new Date(this.yyyy, this.mm, this.dd)
  ngOnInit(): void {

	var obj={
		limit : this.limit_val,
		offset : this.offset_val
	}


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
// submitQutation() {

//     this.quotationNum = moment().unix()
//     console.log("Quotation Number is>>>>", this.quotationNum)
//     console.log("Phone Number is>>>>", this.phone)
//     this.len2 = this.phone.length
//     console.log("Country Code is >>>>", this.countryDial)
//     console.log("Country Code Length is >>>>", this.countryDial.length)
//     this.len = this.countryDial.length

//     this.splitNum = this.phone.slice(this.len, this.len2)

//     this.timeQuo = moment(this.quotationForm.value.time).format('LT');
//     this.dateQuo = moment(this.quotationForm.value.date).format('LL');
//     this.dateQuo2 = moment(this.quotationForm.value.expected_date).format('LL');

//     console.log("Split Number is.>>>", this.splitNum)
//     // console.log("local====",localStorage['userData'])
//     if (localStorage['userData']) {
//       this.userData = JSON.parse(localStorage['userData']);
//       console.log("userquotation======>", this.userData)
//       if (this.userData.user_type != "customer") {
//         this.toastr.error("Please login as customer to continue")
//         return
//       } else {
//         this.submit_book = true
//         console.log("=====ouatation form", this.quotationForm.value)
//         var obj = {
//           professional_id: this.profIdQuo,
//           professional_service_id: this.serviceIdQuo,
//           name: this.quotationForm.value.name,
//           email: this.quotationForm.value.email,
//           phone_number: this.splitNum,
          
//           quotation_ref: this.quoRef.toString(),
//           date: this.dateQuo,
//           time: this.timeQuo,
//         //   sales_representative: this.salesRepres,
//         //   service_name: this.serviceNameQuo,
//           location: this.quotationForm.value.location,
//          // quantity: this.quotationForm.value.quantity,
//           expected_date: this.dateQuo2,
//           estimated_budget: this.quotationForm.value.estimated_budget,
//           // customer_id: JSON.parse(localStorage['userData'])._id,
//           description: this.quotationForm.value.description,
//           country_code: this.countryDial,
//           quotation_no: this.quotationNum.toString(),
//           subject: this.serviceNameQuo,
//           modified:'added'

//         }
//         console.log("object of Instant Quotation ===>", obj)
//         this.phoneForm.controls.phone.patchValue(' ');
//         this.phoneForm.reset()
//         this.quotationForm.reset()

//         $('#QuotationForm').modal('hide');
//         // return
//         this.CustomerService.requestQuotation(obj).subscribe(data => {
//           console.log("Quotation Submit Response ====>>>>>>", data)
//           this.phoneForm.controls.phone.setValue('');
//           this.phoneForm.reset()
//           this.quotationForm.reset()

//           $('#QuotationForm').modal('hide');
//           this.toastr.success('Quotation Form submitted successfully', 'success')
//         }, err => {
//           console.log(err.status)
//           if (err.status >= 404) {
//             console.log('Some error occured')
//           } else {
//             this.toastr.error('Some error occured, please try again!!', 'Error')
//             console.log('Internet Connection Error')
//           }
//         })
//       }
//     } else {
//       this.toastr.error("Please login as customer to continue")
//       return
//     }
//   }
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
          this.toastr.success("professional to the Wishlist");
          if (data.session_id && !this.isLogin) {
            localStorage.setItem("session_data", data.session_id);
            localStorage.setItem("wishlist_id", data.data.wishlist_id);
           
          }
          
          
        })
      } 
    }


}
