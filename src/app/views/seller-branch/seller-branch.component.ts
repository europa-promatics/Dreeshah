import { Component, OnInit, ViewChild } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { isObject } from '@amcharts/amcharts4/core';
import { MatStepper } from '@angular/material/stepper';
declare var $;
@Component({
  selector: 'app-seller-branch',
  templateUrl: './seller-branch.component.html',
  styleUrls: ['./seller-branch.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class SellerBranchComponent implements OnInit {
	@ViewChild('stepper') stepper: MatStepper;
  myArr=[]
  licenceImage
  houseNo
  area
  issuedCity=[]
  issuedCountry=[]
  certificates_arr=[]
  licence_img
  temp=false
  branchId
  firstName
  lastName
  SingleBranchArr=[]
  serCountryArr=[]
  serCityArr=[]
  servicesArr=[]
  certificationArr=[]
  service_list = []
  isLinear = false;
  have_branches
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  email: any;
  brEn: any;
  brAr: any;
  genral
  branchType: any;
  branchTypeCat: any;
  branchBrief: any;
  pincode: any;
  addr_first_name: any;
  addr_last_name: any;
  selectedCountryProf
  landmark: any;
  city: any;
  state: any;
  servicesSubCat=[]
  coNameEng: any;
  coNameAr: any;
  selectedStateProf
  brEmail
  brWeb: any;
  mobile: any;
  bMobile
  
  insta
  servicesCat=[]
  youtube
  bsEstYear
  serCost
  licenceNumber: any;
  noOfEmp: any;
  profileUrl
  address_line_1
  address_line_2
  brImg
  branchTypeCatId
  phone_number
  licImg
  imgUrl
  country
  loader
  branch_cat = []
  // branchTypeEdit
  branch_type=[]
  states: []
	cities: []
  firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;
	addressFormGroup: FormGroup;
	contactFormGroup: FormGroup;
	businessFormGroup: FormGroup;
	serviceFormGroup: FormGroup;
	branchFormGroup: FormGroup;
  countries: any
  next1 = false
	next2 = false
	next3 = false
	next4 = false
	next5 = false
	next6 = false
	branchTypeId
  constructor(private _formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private CustomerService:CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
      this.branchId=this.route.snapshot.params.id
      this.singleBranchDetail()
      this.brandTypes()
      this.getCountries()
      this.serviceList()
      this.profileUrl = environment.profileUrl
      this.imgUrl=environment.professionalImg
  		$(document).ready(function(){
      $("#seller-new-address").click(function(){
        $(".seller-new-address-form").toggle();
      });
    });

      // stepper Old component 
    //   this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

    this.firstFormGroup = new FormGroup({
			first_name: new FormControl('', [
				Validators.required,
			]),
			last_name: new FormControl('', [
				Validators.required,
			]),
			email: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
			]),
			// password: new FormControl('', [
			// 	Validators.required,
			// 	Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
			// ]),
			// confirm_password: new FormControl('', [
			// 	Validators.required,
			// ]),+
			branch_name_eng: new FormControl('', [
				Validators.required,
			]),
			branch_name_arabic: new FormControl('', [
				Validators.required,Validators.pattern('[\u0600-\u06FF ]*')
				]),
			branch_type: new FormControl('', [
			]),
			branch_cat: new FormControl('', [
			]),
			brief_about_branch: new FormControl('', [
			]),
			certificate_awards: new FormControl('', [
				// Validators.required,
			]),
		})

		this.addressFormGroup = new FormGroup({
			pincode: new FormControl('', [
				Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*')
			]),
			country: new FormControl('', [
				Validators.required,
			]),
			addr_first_name: new FormControl('', [
				Validators.required,
			]),
			addr_last_name: new FormControl('', [
				Validators.required,
			]),
			address_line_1: new FormControl('', [
				Validators.required,
			]),
			address_line_2: new FormControl('', [
				Validators.required,
			]),
		
			phone_number: new FormControl('', [
				Validators.required,
			]),
			landmark: new FormControl('', [
				Validators.required,
			]),
			state: new FormControl('', [
				Validators.required,
			]),
			city: new FormControl('', [
				Validators.required,
			]),
			
		});

		const Webreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
		this.contactFormGroup = new FormGroup({
			co_ordinator_eng: new FormControl('', [
				Validators.required,
			]),
			co_ordinator_arabic: new FormControl('', [
				Validators.required,Validators.pattern('[\u0600-\u06FF ]*')
				]),
			branch_email: new FormControl('', [
				Validators.required,
				Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
			]),
			branch_website: new FormControl('', [
				Validators.required,
				Validators.pattern(Webreg)
			]),
			mobile_number: new FormControl('', [
				Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
			]),
			business_mobile_number: new FormControl('', [
				Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
			]),
			insta_acc: new FormControl('', [
				
			]),
			youtube_channel: new FormControl('', [
				
			]),
		});

		this.businessFormGroup = new FormGroup({
			branch_year: new FormControl('', [
				Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*')
			]),
			issued_in_countries: new FormControl("", [
				Validators.required,
			]),
			issued_in_cities: new FormControl("", [
				Validators.required,
			]),
			branch_licence: new FormControl('', [
				Validators.required,
			]),
			licence_number: new FormControl('', [
				Validators.required
			]),
			no_of_emp: new FormControl('', [
				Validators.required
			]),
		});

		this.serviceFormGroup = new FormGroup({
			services_products: new FormControl('', [
				Validators.required,
			]),
			service_country: new FormControl('', [
				Validators.required,
			]),
			service_city: new FormControl('', [
				Validators.required,
			]),
			service_cost: new FormControl('', [
				Validators.required,
			]),
		});

		this.branchFormGroup = new FormGroup({
			have_branches: new FormControl('', [
				// Validators.required,
			]),
			no_of_branches: new FormControl('', [
				// Validators.required,
				Validators.pattern('^[0-9]*')
			]),
		});
  }
hello(data) {

	if(data==1){
		this.stepper.selectedIndex = 1; 
	}
	else if(data==2){
		this.stepper.selectedIndex = 2; 
	}
	else if(data==3){
		this.stepper.selectedIndex = 3; 
	}
	else if(data==4){
		this.stepper.selectedIndex = 4; 
	}else{
		this.stepper.selectedIndex = 0; 
	}
	
}
  singleBranchDetail(){
    var i={
      branch_id:this.branchId
	}
	this.loader=true;
    this.CustomerService.getBranchDetails(i).subscribe(res =>{
      console.log('res of single branch ',res.result)
      this.SingleBranchArr=res.result
      this.firstName=res.result.first_name
      this.lastName=res.result.last_name
      this.email=res.result.email
      this.brEn=res.result.branch_name_en
      this.brAr=res.result.branch_name_ar
      this.branchType=res.result.branch_type_id.name
	  this.branchTypeId=res.result.branch_type_id
      this.branchTypeCat=res.result.branch_category_id.name
	  this.branchTypeCatId=res.result.branch_category_id
      this.branchBrief=res.result.branch_brief
      this.pincode=res.result.branch_address.pincode
      this.addr_first_name=res.result.branch_address.addr_first_name
      this.addr_last_name=res.result.branch_address.addr_last_name
	  this.address_line_1=res.result.branch_address.address_line_1
	  this.address_line_2=res.result.branch_address.address_line_2
	  this.phone_number=res.result.branch_address.phone_number
      this.landmark=res.result.branch_address.landmark
      this.city=res.result.branch_address.city
     // this.state=res.result.branch_address.state.name
	  //this.country=res.result.branch_address.country.name
      this.coNameEng=res.result.contact_details.co_ordinator_eng
      this.coNameAr=res.result.contact_details.co_ordinator_arabic
      this.brEmail=res.result.contact_details.branch_email
      this.brWeb=res.result.contact_details.branch_website
      this.mobile=res.result.contact_details.mobile_number
      this.bMobile=res.result.contact_details.business_mobile_number
      this.insta=res.result.contact_details.insta_acc
      this.youtube=res.result.contact_details.youtube_channel
      this.bsEstYear=res.result.business_details.branch_year
      this.issuedCountry=res.result.business_details.issued_in_countries
      this.issuedCity=res.result.business_details.issued_in_cities
      this.licenceNumber=res.result.business_details.licence_number
      this.noOfEmp=res.result.business_details.no_of_emp
      console.log('NO offfff Employeeeee',this.noOfEmp)
      this.licImg=res.result.business_details.branch_licence
	  this.servicesCat=res.result.service_categories
	  this.servicesSubCat=res.result.service_subcategories
	  
      this.serCountryArr=res.result.service_details.service_country
	  this.serCityArr=res.result.service_details.service_city
		var obj = {
			country_code: this.serCountryArr
		}
	// console.log("===obj", obj)
		this.CustomerService.getAllCities(obj).subscribe(data => {
			// console.log("city data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.cities = data.data
				console.log('cities ......',this.cities)
			}
		})
      this.serCost=res.result.service_details.service_cost
      this.brImg=res.result.branch_profile
      this.certificationArr=res.result.branch_image
	  console.log('this.certificationArr',this.certificationArr)
	  this.loader=false
    })
  }
  branchCatListing(id) {

		console.log('branchCatListing99999999999',id)
		var obj = {
			brand_type_id: id
		}
		this.CustomerService.branch_cat(obj).subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.branch_cat = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				// this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
  }
  brandTypes() {
		this.CustomerService.brandTypes().subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.branch_type = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				// this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
  }
  newCountry
  newIssuedCountry
  newCountryArr=[]
  newIssuedCountryArr=[]
  getCountries() {
		this.CustomerService.getCountries().subscribe(data => {
			// console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.countries = data.data
				this.countries.forEach(element => {
					this.serCountryArr.forEach(ele =>{
						if(element.isoCode == ele){
							this.newCountry=element.name
							this.newCountryArr.push(this.newCountry)
						}
							
						
						// console.log('new Country wala array',this.newCountryArr)
					})
					this.issuedCountry.forEach(e =>{
						if(element.isoCode == e){
							this.newIssuedCountry=element.name
							this.newIssuedCountryArr.push(this.newIssuedCountry)
						}
					})
				});
			// console.log('getAllCountries ------',this.countries)
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}
		})
  }
  getStates() {
		this.CustomerService.getCountries().subscribe(data => {
			// console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.countries = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
	}
  getCities(event) {
		console.log("====e vent", event)
		var arr = []
		if (Array.isArray(event)) {
			arr = event
			this.businessFormGroup.controls['issued_in_countries'].setValue(event)
		} else {
			arr.push(event)
		}
		var obj = {
			country_code: arr
		}
		// console.log("===obj", obj)
		this.CustomerService.getAllCities(obj).subscribe(data => {
			// console.log("city data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.cities = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
  }
  serName
  serviceList() {
	//   let serName
	 
		this.CustomerService.serviceList().subscribe(data => {
			// console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.service_list = data.data
				// console.log('service List ^^^^^^^^^^^^^^^^^',this.servicesArr)
				this.service_list.forEach(ele =>{
					this.servicesArr.forEach(ser =>{
						if(ele._id == ser)
						{
							
							this.serName=ele.name
							
							this.myArr.push(this.serName)
						}
						console.log('new array of servicesssss 555',this.myArr)
						//
					})
					
					
				})
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				// console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}
		})
  }
  onFileChange(evt) {
		var self = this
		if (!evt.target) {
			return;
		}
		if (!evt.target.files) {
			return;
		}
		if (evt.target.files.length !== 1) {
			return;
		}
		const file = evt.target.files[0];
		if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
			// this.toastr.warning('Please upload image file')
			return;
		}
		console.log(evt.target.files[0])
		this.uploadImage(evt.target.files[0], 'licence')
		// this.bannerData.image = evt.target.files[0];
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			self.licence_img = mainImage;
			self.temp = true;
			// alert(self.licence_img)
		};
		fr.readAsDataURL(file);
  }
  uploadImage(image, index) {
		var formdata: FormData = new FormData();
		formdata.append("image", image);
		formdata.append("destination", "professionalData");

		this.CustomerService.uploadImage(formdata).subscribe(data => {
			console.log(data)
			if (index != 'licence') {
				this.certificates_arr[index].image = data.data
			} else {
				this.licenceImage=data.data
			}
		}, err => {
			console.log(err)
			this.toastr.error('Some error occured, please try again!!', 'Error')

		})
  }
  tess(evt){
    console.log(evt)
  }
  branchImage
  branchimageName
  image
  profilePicChange(event) {

	if (!event.target) {
			return;
		}
		if (!event.target.files) {
			return;
		}
		if (event.target.files.length !== 1) {
			return;
		}
		const file = event.target.files[0];
		if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
			// this.toastr.warning('Please upload image file')
			return;
		}
		console.log(event.target.files[0])
		this.branchImage= event.target.files[0];
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			this.image = mainImage;
		};
	fr.readAsDataURL(file);
	var formData =new FormData()
	formData.append('image',this.branchImage)
	this.CustomerService.uploadProfile(formData).subscribe(res =>{
	  console.log('response of edit profile pic new ',res)
	  this.branchimageName=res.data
	  // this.toastr.success('Updated Successfully')
	  // this.ngOnInit()
	})
  } 
//   UpdateBranch(){
     
UpdateBranch(){
	// console.log('lic imageeee',this.licImg)
	// console.log('lic imageeee',this.licImg)
    var obj={
      branch_id:this.branchId,
	  ...(this.branchimageName !=undefined && {branch_profile:this.branchimageName}),
	  ...(this.branchimageName == undefined && {branch_profile:this.brImg}),
      first_name: this.firstName,
      last_name: this.lastName,
      user_type: "professional",
	  email: this.email,
	  
      // password: this.addBranchForm.value.password,
      branch_name_en: this.brEn,
      branch_name_ar: this.brAr,
      branch_type_id: this.branchTypeId,
      branch_category_id: this.branchTypeCatId,
      branch_brief: this.branchBrief,
      // branch_image: this.certificates_arr,
      // no_of_branches: this.addBranchForm.value.no_of_branches,
      
        pincode: this.pincode,
        
		country: this.country,

		addr_first_name:this.addr_first_name,
		addr_last_name:this.addr_last_name,
		address_line_1:this.address_line_1,
		address_line_2:this.address_line_2,
		phone_number:this.phone_number,
    
        landmark: this.landmark,
        state: this.state,
        city: this.city,
      
      contact_details: {
        co_ordinator_eng: this.coNameEng,
        co_ordinator_arabic: this.coNameAr,
        branch_email: this.brEmail,
        branch_website: this.brWeb,
        mobile_number: this.mobile,
        business_mobile_number: this.bMobile,
        insta_acc: this.insta,
        youtube_channel: this.youtube,
      },
      business_details: {
        branch_year: this.bsEstYear,
        issued_in_countries: this.issuedCountry,
		issued_in_cities: this.issuedCity,
		...(this.licenceImage != undefined && {branch_licence: this.licenceImage}),
		...(this.licenceImage == undefined && {branch_licence: this.licImg}),
        // branch_licence: this.licenceImage,
        licence_number: this.licenceNumber,
        no_of_emp: this.noOfEmp,

      },
      service_details: {
        services_products: this.servicesArr,
        service_country: this.serCountryArr,
        service_city: this.serCityArr,
        service_cost: this.serCost
      }
	}
	console.log('obj',obj)
    this.CustomerService.editProfessionalBranch(obj).subscribe(res =>{
      console.log('res',res)
	  this.toastr.success('Updated')
	  let currentUrl = this.router.url;
            console.log('currentUrl',currentUrl)
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             
              this.router.navigate([`/sellerBranch/${this.branchId}`]);
            });
    })
  }
  
	selectCountry(evt) {
		console.log("CODEEEEEE>>>>>",evt)
		var obj = {
			countryCode: evt.value.isoCode
		}


		this.CustomerService.getStates(obj).subscribe(data => {
			console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.states = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})

		var obj1={
			countryCode: evt.value.countryCode
		}
		this.CustomerService.getAllCities(obj1).subscribe(data => {
			console.log("city data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.cities = data.data
			}
		}, err => {
			console.log(err.status)
			if (err.status >= 404) {
				console.log('Some error occured')
			} else {
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
	}
}
