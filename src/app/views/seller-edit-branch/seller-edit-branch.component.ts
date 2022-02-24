import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';
import { element } from 'protractor';
const moment =  _moment;
@Component({
	selector: 'app-seller-edit-branch',
	templateUrl: './seller-edit-branch.component.html',
	styleUrls: ['./seller-edit-branch.component.scss']
})
export class SellerEditBranchComponent implements OnInit {
	// submitted=false
	hideD = true;
	hideE = true;
	temp = false
	branchLicImage
	// certificates_arr = [{
	// 	image: "",
	// 	image_isValid:false,
	// 	img_message:"",
	// 	date: new Date(),
	// 	date_message:"",
	// 	date_isValid:false
	// }]
	licence_img
	getservicesbyid = []
	service_list = []
	name
	email
	mobile
	interested = ""
	whoAmI = ""
	orgName = ""
	orgName_isValid: false;
	orgMessage = ""
	subject
	message
	submitted = false
	addBranchForm: FormGroup;
	userData
	professionalProfile = []
	profileData = {
		email: '',
		companyNameEn: '',
		companyNameAr: '',
		branchBrief: '',
		city: '',
		co_ordinator_eng: '',
		co_ordinator_arabic: '',
		brEmail: '',
		brSite: '',
		insta: '',
		youtube: '',
		estabilishmentyear: '',
		licNumber: '',
		employees: '',
		serviceCost: ''
		// mobile:,
		// businessMobile,


	}
	// mobile 
	secondDropId
	businessMobile
	countries
	branch_cat
	secondropVal
	branch_type
	branchCategory
	branchType
	addressdetail
	houseNo
	area
	landmark
	state
	states: []
	cities: []
	branchTypeId
	firseDropLabel
	branch_category_id
	brLicence
	imgUrl
	branchImage
	image
	imgProfile
	profileUrl
	obj = {}
	branchimageName: any;
	hide = true;
	hideC = true;


	selectedCountryProf
	selectedStateProf
	countryDialAddress
	phone_number
	formattedAddress
	businessMobileCode
	businessLandCode
	business_mobile_number
	branchYear
	years =[]
	lenArrCity
	lenArrCategory
	subCatArr
	categiryArr=[]
	certificates_arr = [{
		image: "",
		date: new Date()
	}]
	imgUpload
	dateBook
	datePicker
	selectedCityProf
	profID
	// hideD = true;
	// hideE = true;

	constructor(
		public CustomerService: CustomerService,
		private toastr: ToastrService,
		private fb: FormBuilder,
		private router: Router
	) {
		this.createForm();
	}

	ngOnInit(): void {
		this.brandTypes()
		this.serviceList()
		this.getCountries();
		this.generateArrayOfYears()
		this.getCategoryList()
		this.profID=JSON.parse(localStorage.getItem('userData'))
		console.log("Proff.. ID<<<>>>",this.profID._id)
	}
	generateArrayOfYears() {
		var max = new Date().getFullYear()
		var min = max - 600
		this.years = []
	  
		for (var i = max; i >= min; i--) {
		  this.years.push(i)
		}
		//console.log("List of the years>>>>>>",this.years)
	  }
	createForm() {
		const Webreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
		this.addBranchForm = this.fb.group({
			first_name: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z]*")
			]),
			fName: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z]*")
			]),
			last_name: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z]*")
			]),
			lName: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z]*")
			]),
			aLine1: new FormControl('', [
				Validators.required,
			]),
			aLine2: new FormControl('', [
				Validators.required,
			]),
			email: new FormControl('', [
				Validators.required,
				// Validators.email,
				Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
			]),
			confirm_password: new FormControl('', [
				Validators.required,
			]),

			branch_name_eng: new FormControl('', [
				Validators.required,
			]),
			branch_name_arabic: new FormControl('',[
				Validators.required,Validators.pattern('[\u0600-\u06FF ]*')
				]
			),
			branch_type: new FormControl('', [
				Validators.required,
			]),
			branch_cat: new FormControl('', [
				Validators.required,
			]),
			brief_about_branch: new FormControl('', [
				Validators.required
			]),
			// certificate_awards: new FormControl('', [
			// 	Validators.required,
			// ]),
			pincode: new FormControl('', [
				Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*')
			]),
			// house_no: new FormControl('', [
			// 	Validators.required,
			// ]),
			// area: new FormControl('', [
			// 	Validators.required,
			// ]),
			landmark: new FormControl('', [
				Validators.required,
			]),
			country: new FormControl('', [
				Validators.required,
			]),
			state: new FormControl('', [
				Validators.required,
			]),
			city: new FormControl('', [
				Validators.required,
			]),
			// defaultaddress: new FormControl(false, [
			// 	// Validators.required,
			// ]),
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
			phone_number: new FormControl('', [
				Validators.required, 
			]),
			mobile_number: new FormControl('', [
				Validators.required, 
			]),
			business_mobile_number: new FormControl('', [
				Validators.required, 
			]),
			insta_acc: new FormControl('', [
			
			]),
			youtube_channel: new FormControl('', [
				
			]),
			branch_year: new FormControl('', [
				Validators.required, 
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
			// services_products: new FormControl('', [
			// 	Validators.required,
			// ]),
			service_country: new FormControl('', [
				Validators.required,
			]),
			service_city: new FormControl('', [
				Validators.required,
			]),
			service_cost: new FormControl('', [
				Validators.required,
			]),
			service_category: new FormControl('', [
				Validators.required,
			]),
			service_sub_category: new FormControl('', [
				Validators.required,
			]),

			// email: new FormControl('', [Validators.required, Validators.email]),
			// // mobile: new FormControl('',[Validators.required]),
			// // Validators.pattern("0-9")
			// cNameEng: new FormControl('',[Validators.required]),
			// cNameArb: new FormControl('',[Validators.required]),
			// briefCompany: new FormControl('',[Validators.required]),
			// cType: new FormControl(''),
			// // [Validators.required]
			// cCategory: new FormControl('',),
			// // [Validators.required]
			// cityRange: new FormControl('',[Validators.required]),
			// serviceProduct: new FormControl('',[Validators.required]),
			// companyLicence: new FormControl('',[Validators.required]),
			// issuedInCountry: new FormControl('',[Validators.required]),
			// licNum: new FormControl('',[Validators.required]),
			// estYear: new FormControl('',[Validators.required]),
			// youtube: new FormControl('',[Validators.required]),
			// insta: new FormControl('',[Validators.required]),
			// companyWebsite: new FormControl('',[Validators.required]),
			// companyEmail: new FormControl('',[Validators.required]),
			// businessMobile: new FormControl('',[Validators.required]),
			// mobile: new FormControl('',[Validators.required]),
			// coordinatorArb: new FormControl('',[Validators.required]),
			// coordinatorEng: new FormControl('',[Validators.required]),
			// country: new FormControl('',[Validators.required]),
			// city: new FormControl('',[Validators.required]),
			// addressThree: new FormControl('',[Validators.required]),
			// addressTwo: new FormControl('',[Validators.required]),
			// addressOne: new FormControl('',[Validators.required]),
			// Certifications: new FormControl('',[Validators.required]),
			// no_of_emp:new FormControl('',[Validators.required]),
			// service_cost:new FormControl('',[Validators.required]),
			// pincode:new FormControl('',[Validators.required]),
			// issuedIncities:new FormControl('',[Validators.required]),
			// service_country:new FormControl('',[Validators.required]),
			// service_city:new FormControl('',[Validators.required]),
			// branch_licence: new FormControl('', [
			// 	Validators.required,
			// ]),
			// orgName: new FormControl(''),
			// subject: new FormControl('',[Validators.required]),
			// message: new FormControl('',[Validators.required])

		})
	}

	brandTypes() {
		this.CustomerService.brandTypes().subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.branch_type = data.data
				console.log(" this.branch_type", this.branch_type)
				console.log("this.branchTypeId", this.branchTypeId)
				this.branch_type.forEach(element => {
					if (element.id == this.branchTypeId) {
						this.firseDropLabel = element.name
						console.log("this.firseDropLabel", this.firseDropLabel)
					}
				});
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
	// getCountries() {
	// 	this.CustomerService.getCountries().subscribe(data => {
	// 		console.log("main data is ====", data)
	// 		if (data.code == '200' || data.code == 200) {
	// 			this.countries = data.data
	// 			// console.log('countries issued in',this.countries)
	// 		}
	// 	}, err => {
	// 		console.log(err.status)
	// 		if (err.status >= 404) {
	// 			console.log('Some error occured')
	// 		} else {
	// 			this.toastr.error('Some error occured, please try again!!', 'Error')
	// 			console.log('Internet Connection Error')
	// 		}
	// 	})
	// }
	serviceList() {
		this.CustomerService.serviceList().subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.service_list = data.data
				console.log('this.service_list`````````````````````', this.service_list)
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

	branchCatListing(id) {

		console.log('branchCatListing99999999999', id)
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
				this.toastr.error('Some error occured, please try again!!', 'Error')
				console.log('Internet Connection Error')
			}

		})
	}
	// removeCertificate(index) {
	// 	this.certificates_arr.splice(index, 1)
	// }

	// addCertificate() {
	// 	var obj = {
	// 		image: "",
	// 		image_isValid:false,
	// 		img_message:'',
	// 		date: new Date(),
	// 		date_message:'',
	// 		date_isValid:false
	// 	}

	// 	this.certificates_arr.push(obj)
	// }
	// uploadCertificate(evt, index) {
	// 	console.log('evt index', evt, index)
	// 	var self = this
	// 	if (!evt.target) {
	// 		return;
	// 	}
	// 	if (!evt.target.files) {
	// 		return;
	// 	}
	// 	if (evt.target.files.length !== 1) {
	// 		return;
	// 	}
	// 	const file = evt.target.files[0];
	// 	if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
	// 		// this.toastr.warning('Please upload image file')
	// 		return;
	// 	}
	// 	console.log('evt.target.files for certification awards', evt.target.files[0])

	// 	this.uploadImage(evt.target.files[0], index)
	// 	const fr = new FileReader();
	// 	fr.onloadend = (loadEvent) => {
	// 		let mainImage = fr.result;
	// 		// alert(self.licence_img)
	// 	};
	// 	fr.readAsDataURL(file);
	// }
	uploadImage(image, index) {
		var formdata: FormData = new FormData();
		formdata.append("image", image);
		formdata.append("destination", "professionalData");

		this.CustomerService.uploadImage(formdata).subscribe(data => {
			console.log(data)
			if (index != 'licence') {
				this.certificates_arr[index].image = data.data
			} else {
				this.addBranchForm.controls['branch_licence'].setValue(data.data);
			}
		}, err => {
			console.log(err)
			this.toastr.error('Some error occured, please try again!!', 'Error')

		})
	}
	getCities(event) {
		console.log("====event", event)
		var arr = []
		if (Array.isArray(event)) {
			arr = event
			this.lenArrCity =arr.length
			this.addBranchForm.controls['issued_in_countries'].setValue(event)
		} else {
			arr.push(event)
			this.lenArrCity =arr.length
		}
		var obj = {
			country_code: arr[this.lenArrCity-1]
		}
		console.log("===obj", obj)
		this.CustomerService.getAllCities(obj).subscribe(data => {
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

	// getCountries() {
	// 	this.CustomerService.getCountries().subscribe(data => {
	// 		console.log("main data is ====", data)
	// 		if (data.code == '200' || data.code == 200) {
	// 			this.countries = data.data
	// 		}
	// 	}, err => {
	// 		console.log(err.status)
	// 		if (err.status >= 404) {
	// 			console.log('Some error occured')
	// 		} else {
	// 			this.toastr.error('Some error occured, please try again!!', 'Error')
	// 			console.log('Internet Connection Error')
	// 		}
	// 	})
	// }

	getStates() {
		this.CustomerService.getCountries().subscribe(data => {
			console.log("main data is ====", data)
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
	  p_false = false
	  values
	onKey(event: any) {
		this.values = event.target.value;
		console.log(this.values)
		if (this.addBranchForm.value.password === this.values) {
			this.p_false = false;
		} else {
			this.p_false = true;
		}
	}
	addBranch() {
		var flag=true
		this.submitted=true;
		if(this.addBranchForm.invalid){
			this.toastr.error('Please fill all the fields')
			return
			
		}
		// this.certificates_arr.forEach((ele,ind) =>{
		// 	if(!ele.image){
		// 		this.certificates_arr[ind].image_isValid=false;
		// 		this.certificates_arr[ind].img_message="Certification is required"
		// 		flag=false
		// 	}else{
		// 		this.certificates_arr[ind].image_isValid=true;
		// 		this.certificates_arr[ind].img_message=""
		// 		flag=true
		// 	}
		// 	if(!ele.date){
		// 		this.certificates_arr[ind].date_isValid=false;
		// 		this.certificates_arr[ind].date_message="Date is required"
		// 		flag=false
		// 	}else{
		// 		this.certificates_arr[ind].image_isValid=true;
		// 		this.certificates_arr[ind].img_message=""
		// 		flag=true
		// 	}
		// })
		// if(!flag){
		// 	return
		// }
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		console.log(this.addBranchForm.value.first_name)
		var obj = {
			user_id:this.profID._id ,
			branch_profile:this.branchimageName,
			first_name: this.addBranchForm.value.first_name,
			last_name: this.addBranchForm.value.last_name,
			//user_type: "professional",
			email: this.addBranchForm.value.email,
			password: this.addBranchForm.value.password,
			branch_name_en: this.addBranchForm.value.branch_name_eng,
			branch_name_ar: this.addBranchForm.value.branch_name_arabic,
			branch_type_id: this.addBranchForm.value.branch_type,
			branch_category_id: this.addBranchForm.value.branch_cat,
			branch_brief: this.addBranchForm.value.brief_about_branch,
			branch_certificates: this.certificates_arr,
			//no_of_branches: this.addBranchForm.value.no_of_branches,
			//address_details: [{
				pincode: this.addBranchForm.value.pincode,
				phone_number : this.addBranchForm.value.phone_number,
				address_line_1 : this.addBranchForm.value.aLine1,
				address_line_2 : this.addBranchForm.value.aLine2,
				addr_first_name : this.addBranchForm.value.fName,
				addr_last_name : this.addBranchForm.value.lName,
				//house_no: this.addressFormGroup.value.house_no,
				//area: this.addressFormGroup.value.area,
				country_ph_code : this.countryDialAddress,
				landmark: this.addBranchForm.value.landmark,
				country: this.selectedCountryProf,
				state: this.selectedStateProf,
				city: this.selectedCityProf,
			//}],
			contact_details: {
				co_ordinator_eng: this.addBranchForm.value.co_ordinator_eng,
				co_ordinator_arabic: this.addBranchForm.value.co_ordinator_arabic,
				branch_email: this.addBranchForm.value.branch_email,
				branch_website: this.addBranchForm.value.branch_website,
				country_code :this.businessMobileCode ,
				business_country_code: this.businessLandCode,
				mobile_number: this.addBranchForm.value.mobile_number,
				business_mobile_number: this.addBranchForm.value.business_mobile_number,
				insta_acc: this.addBranchForm.value.insta_acc,
				youtube_channel: this.addBranchForm.value.youtube_channel,
			},
			business_details: {
				branch_year: this.branchYear,
				issued_in_countries: this.addBranchForm.value.issued_in_countries,
				issued_in_cities: this.addBranchForm.value.issued_in_cities,
				branch_licence: this.addBranchForm.value.branch_licence,
				licence_number: this.addBranchForm.value.licence_number,
				no_of_emp: this.addBranchForm.value.no_of_emp,

			},
			service_details: {
				service_country: this.addBranchForm.value.service_country,
				service_city: this.addBranchForm.value.service_city,
				service_cost: this.addBranchForm.value.service_cost
			},
			service_categories: this.addBranchForm.value.service_category,
			service_subcategories: this.addBranchForm.value.service_sub_category,
		}
		this.CustomerService.addProfessionalBranch(obj).subscribe(res =>{
			console.log('res of add branch professional ',res)
			if(res.code==201){
				this.toastr.success('Added Succcessfully')
				this.router.navigate(['/sellerBranchListing'])
			}
			else{
				this.toastr.error('Some error occured, please try again!!', 'Error')
				

			}
		})
		console.log('obj ', obj)
	}


	getCountries() {
		this.CustomerService.getCountries().subscribe(data => {
			console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
				this.countries = data.data
				console.log('this.countries',this.countries);
				
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

	countryCodeAddress(evt2){
		console.log("Country Code is >>>>",evt2)
		this.countryDialAddress='+'+ evt2.dialCode
		console.log("countryDialAddress Code is >>>>",this.countryDialAddress)
	  }

	  businessMobileNum(evt3){
		console.log("Country Code is >>>>",evt3)
		this.businessMobileCode='+'+ evt3.dialCode
		console.log("business mobile Code is >>>>",this.businessMobileCode)
	  }

	  businessLandline(evt4){
		console.log("Country Code is >>>>",evt4)
		this.businessLandCode='+'+ evt4.dialCode
		console.log("business landline Code is >>>>",this.businessLandCode)
	  }

	  getBranchYear(evt){
		console.log("Branch Year is>>>>>",evt.value)
		this.branchYear = evt.value
	}

	  public handleAddressChange(address: any) {
		this.formattedAddress =address.formatted_address
	  // Do some stuff
  }


  getCategoryList() {
	this.CustomerService.getCatAndSubCat().subscribe(res => {
	  console.log('res of category List', res)
	  this.categiryArr = res.data
	  // this.categiryArr.forEach((el, ind) => {

		// this.CustomerService.getSubCat(el.id).subscribe(res => {
		//   console.log('reeees', res)
		//   res.sub_categories.forEach(element => {
		//     let v = {
		//       name: element.name,
		//       id: element._id
		//     }
		//     this.newArr.push(v)
		//   });
		//   console.log('newarrcategory', this.newArr)
		// })

	  // })

	})
  }


  getSubCat(event) {
	console.log("Event for the sub category>>>",event)
	
	var arr = []
	
		if (Array.isArray(event)) {
			arr = event
			//nameArr.push(event.name)
	  this.lenArrCategory =arr.length
		//	this.formGroup.controls['issuedInCountry'].setValue(event)
		} else {
			arr.push(event)
			//nameArr.push(event.name)
	  this.lenArrCategory =arr.length
		}
		// nameArr.push(event.name)
	event= arr[this.lenArrCategory-1]
	console.log("EVENT>>>>>",event)
	//this.nameArr.push(event.name)
	//console.log("Name Array: ",this.nameArr);
	
		// var obj = {
		// 	category: arr[this.lenArrCity-1]
		// }
	// Old Start
	// console.log("getting event", event, "arrr ===>", this.userDetails.user_services)
	// var sub_cat = this.userDetails.user_services.filter(element => element.service_id.service_category_id == event);
	// console.log("sub cat== ->", sub_cat)
	// this.ServiceSubCat = []
	// sub_cat.forEach(element => {
	//   this.ServiceSubCat.push(element.service_id)
	// });
	// End

	// New Work below
	this.CustomerService.getSubCat(event).subscribe(res => {
		  console.log('reveeeee sub category ', res)
		  this.subCatArr=res.sub_categories
  })

  }

  uploadCertificate(evt, index) {
	console.log("Event of the upload data>>>>",evt)
	console.log("index for the event>>>>",index)
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
	this.imgUpload= evt.target.files[0]
	const file = evt.target.files[0];
	if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
		 this.toastr.warning('Please upload image file')
		return;
	}
	console.log(evt.target.files[0])
	this.uploadImage(evt.target.files[0], index)
	const fr = new FileReader();
	fr.onloadend = (loadEvent) => {
		let mainImage = fr.result;
		// alert(self.licence_img)
	};
	fr.readAsDataURL(file);
}

removeCertificate(index) {
	this.certificates_arr.splice(index, 1)
}
firstDate(value,i){
	console.log(i,this.certificates_arr);
	
	this.dateBook = moment(value).format("LL")
	this.certificates_arr[i].date= value;
  }

addCertificate() {
	var obj = {
		image: '',
		//date:this.dateBook
		date: new Date()
	}
	console.log("object added is>>>>>>",obj)
	this.certificates_arr.push(obj)
	//console.log("ARRAY of object for the Certificate>>>>",this.certificates_arr)
}


date = new FormControl(moment());

chosenYearHandler(normalizedYear: Moment,datepicker: MatDatepicker<Moment>) {
  const ctrlValue = this.date.value;
  ctrlValue.year(normalizedYear.year());
  this.date.setValue(ctrlValue);
  datepicker.close();
}
htate(evt){
	console.log("Fuction gorg frg CITY",evt)
}


}
