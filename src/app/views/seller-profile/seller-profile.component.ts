import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import {environment} from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/shared/common-service.service';
@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {
  temp = false
  branchLicImage
  certificates_arr = [{
		image: "",
		date: new Date()
	}]
  licence_img
  getservicesbyid=[]
  service_list = []
  name
  email
  mobile
  interested = ""
  whoAmI =""
  orgName=""
  orgName_isValid: false;
  orgMessage=""
  subject
  message
  submitted = false
  sellerProfileForm: FormGroup;
  userData
  professionalProfile=[]
  profileData={
    fName:'',
    lName:'',
    email:'',
    companyNameEn:'',
    companyNameAr:'',
    branchBrief:'',
    city:'',
    co_ordinator_eng:'',
    co_ordinator_arabic:'',
    brEmail:'',
    brSite:'',
    insta:'',
    youtube:'',
    estabilishmentyear:'',
    licNumber:'',
    employees:'',
    serviceCost:''
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
  profileImg
  image
  imgProfile
  profileUrl
  obj = {}
  editprofilepic: any;


  selectedCountryProf
  selectedStateProf
  countryDialAddress
  phone_number
  businessMobileCode
  businessLandCode
  branchYear
  years =[]
  pincode
  lenArrCategory
  subCatArr
  categiryArr=[]
  branch_year
  no_of_branches
  year
  yearValue
  yearArr=[]
  selectedCountry
  branch_lic_img
  locations: any;

  constructor(public CustomerService: CustomerService, public CommonService: CommonServiceService,
    private toastr: ToastrService,    
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
   }

  ngOnInit(): void {
    this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null
    this.imgUrl=environment.professionalImg
    this.profileUrl=environment.profileUrl
    this.getCountries();
    this.generateArrayOfYears()
    this.getCategoryList()
    this.getLogCities()
    // var o={
    //   id:this.userData._id
    // }
    this.CustomerService.getUserDetails().subscribe(res =>{
      console.log("Response of the Prof Data>>>>",res)
      console.log("res----------------------",res.data)
      this.yearValue=res.data.business_details.branch_year
    //  this.no_of_branches=res.data.no_of_branches
      console.log(res.data.no_of_branches,'');
      
      console.log("Array of the year array<<<>>",this.yearValue)
      this.yearArr.push(this.yearValue)
      console.log("Array of the year array<<<>>",this.yearArr)
      this.selectedCountryProf = res.data.professional_address.country;
      console.log("Country is<<<>>>>",this.selectedCountryProf)
      let obj={
        country_name : res.data.professional_address.country
    }
 
      this.CustomerService.getStatesFromCountryName(obj).subscribe(data => {
        console.log("main data is ====", data)
        if (data.code == '200' || data.code == 200) {
          this.states = data.data
          this.selectedStateProf = res.data.professional_address.state
          console.log("States are<<<>>>",this.selectedStateProf)
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

      //console.log("States are<<<>>>",this.selectedStateProf)


      this.professionalProfile=res.data
      this.profileData.fName=res.data.first_name
      this.profileData.lName=res.data.last_name
      this.profileData.email=res.data.email
      this.profileData.companyNameEn=res.data.branch_name_en
      this.profileData.companyNameAr=res.data.branch_name_ar
      this.profileData.branchBrief=res.data.branch_brief
      // this.profileData.pincode=res.data.address_details[0].pincode
      // this.profileData.houseNo=res.data.address_details[0].pincode
      // this.profileData.area=res.data.address_details[0].pincode
      // this.profileData.landmark=res.data.address_details[0].pincode
      this.profileData.city=res.data.professional_address.city

      this.sellerProfileForm.controls['country'].setValue(res.data.professional_address.country)
      this.sellerProfileForm.controls['city'].setValue(res.data.professional_address.city)
      this.sellerProfileForm.controls['pincode'].setValue(res.data.professional_address.pincode)
      this.sellerProfileForm.controls['phone_number'].setValue(res.data.professional_address.phone_number)
      this.sellerProfileForm.controls['landmark'].setValue(res.data.professional_address.landmark)
      this.sellerProfileForm.controls['fName_Add'].setValue(res.data.professional_address.addr_first_name)
      this.sellerProfileForm.controls['lName_Add'].setValue(res.data.professional_address.addr_last_name)
      this.sellerProfileForm.controls['aLine1'].setValue(res.data.professional_address.address_line_1)
      this.sellerProfileForm.controls['aLine2'].setValue(res.data.professional_address.address_line_2)
      this.sellerProfileForm.controls['mobile_number'].setValue(res.data.contact_details.mobile_number)
      this.sellerProfileForm.controls['business_mobile_number'].setValue(res.data.contact_details.business_mobile_number)
      this.sellerProfileForm.controls['companyEmail'].setValue(res.data.contact_details.branch_email)
      this.sellerProfileForm.controls['companyWebsite'].setValue(res.data.contact_details.branch_website)

      this.sellerProfileForm.controls['insta'].setValue(res.data.contact_details.insta_acc)
      this.sellerProfileForm.controls['youtube'].setValue(res.data.contact_details.youtube_channel)
      this.sellerProfileForm.controls['branch_year'].setValue(res.data.business_details.branch_year)
      this.sellerProfileForm.controls['no_of_branches'].setValue(res.data.no_of_branches)
      this.sellerProfileForm.controls['LogCity'].setValue(res?.data?.logistic_location_id?._id)
      this.profileData.co_ordinator_eng=res.data.contact_details.co_ordinator_eng
      this.profileData.co_ordinator_arabic=res.data.contact_details.co_ordinator_arabic
      this.mobile=res.data.contact_details.mobile_number
      this.businessMobile=res.data.contact_details.business_mobile_number
      //this.profileData.brEmail=res.contact_details.branch_email
     // this.profileData.brSite=res.contact_details.branch_website
     // this.profileData.brSite=res.contact_details.branch_website
      //this.profileData.insta=res.data.contact_details.insta_acc
      //this.profileData.youtube=res.data.contact_details.youtube_channel
      this.profileData.estabilishmentyear=res.data.business_details.branch_year
      this.profileData.licNumber=res.data.business_details.licence_number
      console.log("FVsghfdhbgfhnbfgh>>>>>>>>>>>",this.profileData.licNumber)
      this.profileData.employees=res.data.business_details.no_of_emp
      this.profileData.serviceCost=res.data.service_details.service_cost
      this.imgProfile=res.data.profile_image
      console.log('imgProfile~~~~~~~~~~~~~~`',this.profileUrl +this.imgProfile )
      this.addressdetail=res.data.professional_address.pincode
      //this.houseNo=res.address_details[0].house_no
      //this.area=res.address_details[0].area
      this.branchLicImage=res.data.business_details.branch_licence
      this.certificates_arr=res.data.certificate_awards
      console.log('iiiiiiiiiiiiiiiiii',this.imgUrl+this.branchLicImage)

      //this.sellerProfileForm.controls['licNum'].setValue(res.data.business_details.licence_number)
      this.sellerProfileForm.controls['issuedInCountry'].setValue(res.data.business_details.issued_in_countries) 
      this.sellerProfileForm.controls['issuedIncities'].setValue(res.data.business_details.issued_in_cities) 
      this.sellerProfileForm.controls['service_country'].setValue(res.data.service_details.service_country)
      this.sellerProfileForm.controls['service_city'].setValue(res.data.service_details.service_city)

      // this.getservicesbyid=res.data.service_details.services_products
      this.state=res.data.professional_address.state
      this.branch_category_id=res.data.branch_category_id
      this.branchTypeId=res.data.branch_type_id
      console.log('this.branchTypeId first time',this.branchTypeId)
      this.CustomerService.brandTypes().subscribe(data => {
        console.log("data is ====", data)
        if (data.code == '200' || data.code == 200) {
          this.branch_type = data.data
          console.log(" this.branch_type",this.branch_type)
          console.log("this.branchTypeId",this.branchTypeId)
          this.branch_type.forEach(element => {
            if(element.id == this.branchTypeId){
              // this.sellerProfileForm.controls['cType'].setValue(element.name)
              this.firseDropLabel=element.name
              this.secondDropId=element.id
              console.log("this.secondDropId",this.secondDropId)
            }
            var obj = {
              brand_type_id:this.secondDropId
            }
            
            this.CustomerService.branch_cat(obj).subscribe(data => {
              // console.log("data is ====", data)
              if (data.code == '200' || data.code == 200) {
                this.branch_cat = data.data
                // console.log('secondrop valueeeeeeeeeee',this.branch_cat)
                this.branch_cat.forEach(element => {
                  if(this.branch_category_id == element._id){
                    // this.sellerProfileForm.controls['cCategory'].setValue(element.name)
                    this.secondropVal=element.name
                    console.log("this.secondropVal--------------------------",this.secondropVal)
                  }
                  
                });
              }
            })
          });
        }
      })
      let temp = [];
      res.data.service_categories.map((item)=>{
        temp.push(item._id);
      })
      this.sellerProfileForm.controls['service_category'].setValue(temp);
       
      this.CustomerService.getSubCat(temp).subscribe(res => {
        console.log('reveeeee sub category ', res)
        this.subCatArr=res.sub_categories
    })
      let temp2=[]
    
        res.data.service_subcategories.map((item)=>{
          temp2.push(item._id);
        })
        this.sellerProfileForm.controls['service_sub_category'].setValue(temp2)


      console.log("Data for the Categories>>>",res.data.service_categories)
      //this.sellerProfileForm.controls['service_sub_category'].setValue(temp) 

      //this.sellerProfileForm.controls['serviceProduct'].setValue(res.data.service_details.services_products)
     
      // cCategory
      // this.sellerProfileForm.controls['companyLicence'].setValue(res.data.business_details.branch_licence)
      
      // this.landmark=res.data.address_details[0].landmark
      
      

      // this.profileData.employees=res.data.business_details.no_of_emp
      // console.log("res----------------------",this.professionalProfile)
      // this.professionalProfile.forEach(element => {
      //   this.profileData.email=element.email
      //   this.profileData.companyNameEn=element.branch_name_en
      //   this.profileData.companyNameAr=element.branch_name_ar
      // });
    })
    this.brandTypes()
    this.serviceList()
  }
  createForm() {
    this.sellerProfileForm = this.fb.group({
      // category: new FormControl('', [Validators.required]),
      // name: new FormControl('',[Validators.required]),
      // email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
     
      
      fName: new FormControl('',[Validators.required]),
      lName: new FormControl('',[Validators.required]),
      fName_Add: new FormControl('',[Validators.required]),
      lName_Add: new FormControl('',[Validators.required]),
      aLine1: new FormControl('',[Validators.required]),
      aLine2: new FormControl('',[Validators.required]),
      mobile_number: new FormControl('',[Validators.required]),
      business_mobile_number: new FormControl('',[Validators.required]),

      no_of_branches: new FormControl('',[Validators.required]),
      branch_year: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      service_category: new FormControl('',[Validators.required]),
      service_sub_category: new FormControl('',[Validators.required]),

      // mobile: new FormControl('',[Validators.required]),
      // Validators.pattern("0-9")
      cNameEng: new FormControl('',[Validators.required]),
      cNameArb: new FormControl('', [
				Validators.required,Validators.pattern('[\u0600-\u06FF ]*')
				]),
      briefCompany: new FormControl('',[Validators.required]),
      branch_type: new FormControl('',[Validators.required]),
      branch_cat: new FormControl('',[Validators.required]),
      //cType: new FormControl(''),
      // [Validators.required]
     // cCategory: new FormControl('',),
      // [Validators.required]
     // cityRange: new FormControl('',[Validators.required]),
      //serviceProduct: new FormControl('',[Validators.required]),
      //companyLicence: new FormControl('',[Validators.required]),
      issuedInCountry: new FormControl('',[Validators.required]),
      licNum: new FormControl('',[Validators.required]),
      //estYear: new FormControl('',[Validators.required]),
      youtube: new FormControl('',[Validators.required]),
      insta: new FormControl('',[Validators.required]),
      companyWebsite: new FormControl('',[Validators.required]),
      companyEmail: new FormControl('',[Validators.required]),
      //businessMobile: new FormControl('',[Validators.required]),
      //mobile: new FormControl('',[Validators.required]),
      coordinatorArb: new FormControl('',[Validators.required,,Validators.pattern('[\u0600-\u06FF ]*')]),
      coordinatorEng: new FormControl('',[Validators.required]),
      country: new FormControl('',[Validators.required]),

      state: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      //addressThree: new FormControl('',[Validators.required]),
     // addressTwo: new FormControl('',[Validators.required]),
      //addressOne: new FormControl('',[Validators.required]),
     // Certifications: new FormControl('',[Validators.required]),
      no_of_emp:new FormControl('',[Validators.required]),
      service_cost:new FormControl('',[Validators.required]),
      pincode:new FormControl('',[Validators.required]),
      landmark:new FormControl('',[Validators.required]),
      issuedIncities:new FormControl('',[Validators.required]),
      service_country:new FormControl('',[Validators.required]),
      service_city:new FormControl('',[Validators.required]),
      phone_number:new FormControl('',[Validators.required]),
      LogCity:new FormControl('',[Validators.required]),
      branch_licence: new FormControl('', [
				Validators.required,
			]),
      // orgName: new FormControl(''),
      // subject: new FormControl('',[Validators.required]),
      // message: new FormControl('',[Validators.required])
      
    })
  }
  get f() { return this.sellerProfileForm.controls }
  
  // getCountries() {
	// 	this.CustomerService.getCountries().subscribe(data => {
	// 		console.log("main data is ====", data)
	// 		if (data.code == '200' || data.code == 200) {
  //       this.countries = data.data
  //       // console.log('countries issued in',this.countries)
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
  empEvt(evt){
    // console.log("employee event ",evt)
  }
  branchCatListing(id) {
		// console.log('branchCatListing',id)
		var obj = {
			brand_type_id: id
		}
		this.CustomerService.branch_cat(obj).subscribe(data => {
			// console.log("data is ====", data)
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
  getLogCities(){
    this.CustomerService.getLogisticLocations().subscribe(data=>{
      console.log("log data is============>",data);
      this.locations=data.locations
    })
  }
  
  brandTypes() {
		this.CustomerService.brandTypes().subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
        this.branch_type = data.data
        console.log(" this.branch_type",this.branch_type)
        console.log("this.branchTypeId",this.branchTypeId)
        this.branch_type.forEach(element => {
          if(element.id == this.branchTypeId){
            this.firseDropLabel=element.name
            console.log("this.firseDropLabel",this.firseDropLabel)
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


  getCities(event) {
		console.log("==== event to chekc isssued in countriessssssssssssssssssssssss", event)
		var arr = []
		if (Array.isArray(event)) {
			arr = event
			this.sellerProfileForm.controls['issuedInCountry'].setValue(event)
		} else {
			arr.push(event)
		}
		var obj = {
			country_code: arr
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
  serviceList() {
		this.CustomerService.serviceList().subscribe(data => {
			console.log("data is ====", data)
			if (data.code == '200' || data.code == 200) {
        this.service_list = data.data
        console.log('this.service_list`````````````````````',this.service_list)
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
  uploadImage(image, index) {
		var formdata: FormData = new FormData();
		formdata.append("image", image);
		formdata.append("destination", "professionalData");

		this.CustomerService.uploadImage(formdata).subscribe(data => {
			// console.log(,data)
			if (index != 'licence') {
				this.certificates_arr[index].image = data.data
			} else {
				this.sellerProfileForm.controls['branch_licence'].setValue(data.data);
			}
		}, err => {
			console.log(err)
			this.toastr.error('Some error occured, please try again!!', 'Error')

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
    this.branch_lic_img= evt.target.files[0]
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
  uploadCertificate(evt, index) {
		console.log('evt index',evt,index)
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
		console.log('evt.target.files for certification awards',evt.target.files[0])

		this.uploadImage(evt.target.files[0], index)
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			// alert(self.licence_img)
		};
		fr.readAsDataURL(file);
	}
  validate(){
    if(!this.sellerProfileForm.valid){
      this.sellerProfileForm.markAllAsTouched()
    }
    else{
      this.submit()
    }
  }
  

  submit(){
    // var service_details={

		// 		services_products: this.sellerProfileForm.value.serviceProduct,
		// 		service_country: this.sellerProfileForm.value.service_country,
		// 		service_city: this.sellerProfileForm.value.service_city,
		// 		service_cost: this.sellerProfileForm.value.service_cost
      
    // }
    console.log("this.this.profileImg",this.profileImg)
    // this.submitted=true;
    // if(this.sellerProfileForm.invalid){
    //   return
    
    // }
    // var ser=	service_details: {
		// 		services_products: this.sellerProfileForm.value.serviceProduct,
		// 		service_country: this.sellerProfileForm.value.service_country,
		// 		service_city: this.sellerProfileForm.value.service_city,
		// 		service_cost: this.sellerProfileForm.value.service_cost
    //   }
    // var formData=new FormData();
    // formData.append('user_type',"professional")
    // formData.append('email',this.sellerProfileForm.value.email)
    // formData.append('branch_name_en',this.sellerProfileForm.value.cNameEng)
    // formData.append('branch_name_ar',this.sellerProfileForm.value.cNameArb)
    // if(this.sellerProfileForm.value.cType !=undefined)
    // {
    //   formData.append('branch_type_id',this.sellerProfileForm.value.cType)
    // }
    // if(this.sellerProfileForm.value.cCategory !=undefined){
    //   formData.append('branch_category_id',this.sellerProfileForm.value.cCategory)
    // }
    
    // formData.append('branch_brief',this.sellerProfileForm.value.briefCompany)
    // formData.append('certificate_awards',JSON.stringify(this.certificates_arr))
    // formData.append('address_details',JSON.stringify([{
    //   pincode: this.sellerProfileForm.value.pincode,
    //   house_no: this.sellerProfileForm.value.addressOne,
    //   area: this.sellerProfileForm.value.addressThree,
    //   // landmark: this.sellerProfileForm.value.landmark,
    //   state: this.sellerProfileForm.value.country,
    //   city: this.sellerProfileForm.value.city,
    // }]))
    // formData.append('contact_details',JSON.stringify({
    //   co_ordinator_eng: this.sellerProfileForm.value.coordinatorEng,
    //   co_ordinator_arabic: this.sellerProfileForm.value.coordinatorArb,
    //   branch_email: this.sellerProfileForm.value.companyEmail,
    //   branch_website: this.sellerProfileForm.value.companyWebsite,
    //   mobile_number: this.sellerProfileForm.value.mobile,
    //   business_mobile_number: this.sellerProfileForm.value.businessMobile,
    //   insta_acc: this.sellerProfileForm.value.insta,
    //   youtube_channel: this.sellerProfileForm.value.youtube,
    // }))
    // formData.append('business_details',JSON.stringify({
    //   branch_year: this.sellerProfileForm.value.estYear,
    //   issued_in_countries: this.sellerProfileForm.value.issuedInCountry,
    //   issued_in_cities: this.sellerProfileForm.value.issuedIncities,
    //   branch_licence: this.sellerProfileForm.value.branch_licence,
    //   licence_number: this.sellerProfileForm.value.licNum,
    //   no_of_emp: this.sellerProfileForm.value.no_of_emp,

    // }))
    // formData.append('service_details',JSON.stringify(service_details))
    // formData.append('profile_image',this.profileImg)
    // formData.append('',)
    // formData.append('',)
    console.log(this.sellerProfileForm.value.phone_number,'this.sellerProfileForm.value.phone_number,');
    
    this.obj = {
      profile_image:this.editprofilepic,
			first_name: this.sellerProfileForm.value.fName,
			last_name: this.sellerProfileForm.value.lName,
      user_type: "professional",
      // profile_image:this.profileImg,
			email: this.sellerProfileForm.value.email,
			// password: this.sellerProfileForm.value.password,
			branch_name_en: this.sellerProfileForm.value.cNameEng,
      branch_name_ar: this.sellerProfileForm.value.cNameArb,
      ...(this.sellerProfileForm.value.cType !=undefined && {branch_type_id: this.sellerProfileForm.value.cType}),
      ...(this.sellerProfileForm.value.cCategory !=undefined && {branch_category_id: this.sellerProfileForm.value.cCategory}),
			branch_type_id: this.sellerProfileForm.value.branch_type,
			branch_category_id: this.sellerProfileForm.value.branch_cat,
			branch_brief: this.sellerProfileForm.value.briefCompany,
			certificate_awards: this.certificates_arr,
      no_of_branches: this.sellerProfileForm.value.no_of_branches,
			// no_of_branches: this.sellerProfileForm.value.no_of_branches,
		//	address_details: [{
			pincode: this.sellerProfileForm.value.pincode,
			phone_number : this.sellerProfileForm.value.phone_number,
			address_line_1 : this.sellerProfileForm.value.aLine1,
			address_line_2 : this.sellerProfileForm.value.aLine2,
			addr_first_name : this.sellerProfileForm.value.fName_Add,
			addr_last_name : this.sellerProfileForm.value.lName_Add,
		
			country_ph_code : this.countryDialAddress,
			landmark: this.sellerProfileForm.value.landmark,
			country: this.sellerProfileForm.value.country,
			state: this.sellerProfileForm.value.state,
			city: this.sellerProfileForm.value.city,
		//	}],
    service_categories: this.sellerProfileForm.value.service_category,
			service_subcategories: this.sellerProfileForm.value.service_sub_category,
			contact_details: {
				co_ordinator_eng: this.sellerProfileForm.value.coordinatorEng,
				co_ordinator_arabic: this.sellerProfileForm.value.coordinatorArb,
				branch_email: this.sellerProfileForm.value.companyEmail,
				branch_website: this.sellerProfileForm.value.companyWebsite,
				country_code: this.businessMobileCode,
				mobile_number: this.sellerProfileForm.value.mobile_number,
				business_country_code: this.businessLandCode,
				business_mobile_number: this.sellerProfileForm.value.business_mobile_number,
				insta_acc: this.sellerProfileForm.value.insta,
				youtube_channel: this.sellerProfileForm.value.youtube,
			},
			business_details: {
        branch_year: this.branchYear,
			
				issued_in_countries: this.sellerProfileForm.value.issuedInCountry,
        issued_in_cities: this.sellerProfileForm.value.issuedIncities,
        ...(this.sellerProfileForm.value.branch_licence  && {branch_licence: this.sellerProfileForm.value.branch_licence}),
			  
        branch_licence: this.branch_lic_img,
				licence_number: this.sellerProfileForm.value.licNum,
				no_of_emp: this.sellerProfileForm.value.no_of_emp,

			},
			service_details: {
				service_country: this.sellerProfileForm.value.service_country,
				service_city: this.sellerProfileForm.value.service_city,
				service_cost: this.sellerProfileForm.value.service_cost
      },
      logistic_location_id:this.sellerProfileForm.value.LogCity 
    }
    // var formData=new FormData();
    // formData.append('obj',JSON.stringify(this.obj))
    // formData.append('profile_image',this.profileImg)
    
    this.CustomerService.editProfessionalProfile(this.obj).subscribe(res =>{
      console.log('response of edit profile',res)
      this.toastr.success('Updated Successfully')
      this.router.navigate(['/seller-dashboard'])
      this.ngOnInit()
    })
  //  console.log('object of submit',obj) 
  }
  
  profilePicChange(event) {
    console.log("vgfsdjghvdvg>>>>>>",event)
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
		this.profileImg= event.target.files[0];
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			this.image = mainImage;
		};
    fr.readAsDataURL(file);
    var formData =new FormData()
    formData.append('profile_image',this.profileImg)
    formData.append('id', this.userData._id)
    this.CustomerService.updateProfile(formData).subscribe(res =>{
      console.log('response of edit profile pic new ',res)
      this.editprofilepic=res.data
       this.toastr.success('Updated Successfully')
       this.CommonService.sendProfileImg(res.data);
       this.ngOnInit()
      
    })
  }
  addCertificate() {
		var obj = {
			image: "",
			date: new Date()
		}

		this.certificates_arr.push(obj)
  }
  
	removeCertificate(index) {
		this.certificates_arr.splice(index, 1)
	}
  // uploadProfileImg(){
  //   var formData=new FormData();
  //   formData.append('profile_image',this.profileImg)
  //   this.CustomerService.editProfessionalProfile(formData).subscribe(res =>{
  //     console.log('res oooooooof image upload',res)
  //   })
  // }


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

  countryCodeAddress(evt2){
		console.log("Country Code is >>>>",evt2)
		this.countryDialAddress='+'+ evt2.dialCode
		console.log("countryDialAddress Code is >>>>",this.countryDialAddress)
	  }

    businessMobileCod(evt3){
      console.log("Country Code is >>>>",evt3)
      this.businessMobileCode='+'+ evt3.dialCode
      console.log("business mobile Code is >>>>",this.businessMobileCode)
      }
    
      businessLandline(evt4){
        console.log("Country Code is >>>>",evt4)
        this.businessLandCode='+'+ evt4.dialCode
        console.log("business landline Code is >>>>",this.businessLandCode)
        }

  // selectCountry(evt) {
	// 	console.log("CODEEEEEE>>>>>",evt)
	// 	var obj = {
	// 		countryCode: evt.value.isoCode
	// 	}


	// 	this.CustomerService.getStates(obj).subscribe(data => {
	// 		console.log("main data is ====", data)
	// 		if (data.code == '200' || data.code == 200) {
	// 			this.states = data.data
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

	// 	var obj1={
	// 		countryCode: evt.value.countryCode
	// 	}
	// 	this.CustomerService.getAllCities(obj1).subscribe(data => {
	// 		console.log("city data is ====", data)
	// 		if (data.code == '200' || data.code == 200) {
	// 			this.cities = data.data
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

  getBranchYear(evt){
    console.log("Branch Year is>>>>>",evt.value)
    this.branchYear = evt.value
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

    getCategoryList() {
      this.CustomerService.getCatAndSubCat().subscribe(res => {
        console.log('res of category List', res)
        this.categiryArr = res.data
        console.log('Res of category List>>>>>>>>>>>>>>>>>>>>>>', this.categiryArr)
        
    
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

      selectCountry(evt) {
        console.log("CODEEEEEE>>>>>",evt)
        var obj = {
          country_name : evt.value
        //	countryCode: this.selectedCountry.isoCode
    
          }
    
    
        this.CustomerService.getStatesFromCountryName(obj).subscribe(data => {
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
          country_code: this.selectedCountry.countryCode
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
