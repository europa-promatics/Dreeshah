import { Component, OnInit, ViewChild } from '@angular/core';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { isObject } from '@amcharts/amcharts4/core';
import { MatStepper } from '@angular/material/stepper';
declare var $;
@Component({
  selector: 'app-photographer-branch',
  templateUrl: './photographer-branch.component.html',
  styleUrls: ['./photographer-branch.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class PhotographerBranchComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  myArr = []
  licenceImage
  houseNo
  area
  issuedCity = []
  issuedCountry = []
  certificates_arr = []
  licence_img
  temp = false
  branchId
  firstName
  lastName
  SingleBranchArr = []
  serCountryArr = []
  serCityArr = []
  servicesArr = []
  certificationArr = []
  service_list = []
  isLinear = false;
  have_branches
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  email: any;
  branchName
  brEn: any;
  brAr: any;

  genral
  branchType: any;
  company_brief
  branchTypeCat: any;
  branchBrief: any;
  pincode: any;
  addr_first_name: any;
  addr_last_name: any;
  selectedCountryProf
  landmark: any;
  city: any;
  state: any;
  servicesSubCat
  photographer_eng: any;
  photographer_arabic: any;
  selectedStateProf
  business_email
  business_website: any;
  mobile_number: any;
  business_mobile_number

  insta_acc
  servicesCat = []
  youtube_channel
  establishment_year = ''
  serCost
  licenceNumber: any = "";
  noOfEmp: any;
  profileUrl
  address_1
  years = []
  address_2
  branch_profile
  branchTypeCatId
  phone_number
  licImg
  imgUrl
  country
  loader
  branch_cat = []
  // branchTypeEdit
  branch_type = []
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
  branchYear: any;
  servicesSubCat1
  in = '';
  customCities: any[] = []
  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private CustomerService: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.params.id
    // this.getPhotographerBranchDetails()
    this.brandTypes()
    this.generateArrayOfYears()
    this.getCountries()
    this.serviceList()
    this.profileUrl = environment.profileUrl
    this.imgUrl = environment.professionalImg
    $(document).ready(function () {
      $("#seller-new-address").click(function () {
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
      photographer_eng: new FormControl('', [
        Validators.required,
      ]),
      photographer_arabic: new FormControl('', [
        Validators.required, Validators.pattern('[\u0600-\u06FF ]*')
      ]),
      business_email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      business_website: new FormControl('', [
        Validators.required,
        Validators.pattern(Webreg)
      ]),
      mobile_number: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[+0-9]*')
      ]),
      business_mobile_number: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[+0-9]*')
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
      Branch_name: new FormControl("", [
        Validators.required,
      ]),
      company_brief: new FormControl("", [
        Validators.required,
      ]),
      address_1: new FormControl('', [
        Validators.required,
      ]),
      address_2: new FormControl('', [
        Validators.required,
      ]),
      country_and_city: this._formBuilder.array([]),
      // issued_in_countries: new FormControl("", [
      // 	Validators.required,
      // ]),
      // issued_in_cities: new FormControl("", [
      // 	Validators.required,
      // ]),
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
    this.getPhotographerBranchDetails()
  }

  get countryAndCity(): FormArray {
    return this.businessFormGroup.get('country_and_city') as FormArray
  }

  addNewField() {
    console.log(this.businessFormGroup)
    if (this.countryAndCity.valid) {
      this.countryAndCity.push(this._formBuilder.group({
        issued_in_countries: ['', [Validators.required]],
        issued_in_cities: ['', [Validators.required]]
      }))
    }
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
  hello(data) {

    if (data == 1) {
      this.stepper.selectedIndex = 1;
    }
    else if (data == 2) {
      this.stepper.selectedIndex = 2;
    }
    else if (data == 3) {
      this.stepper.selectedIndex = 3;
    }
    else if (data == 4) {
      this.stepper.selectedIndex = 4;
    } else {
      this.stepper.selectedIndex = 0;
    }

  }
  getPhotographerBranchDetails() {
    var i = {
      branch_id: this.branchId
    }
    this.loader = true;
    this.CustomerService.getPhotographerBranchDetails(i).subscribe(res => {
      console.log('res of single branch ', res.data)
      this.SingleBranchArr = res.data

      this.firstName = res.data.first_name
      this.lastName = res.data.last_name
      this.email = res.data.email
      this.branch_profile = res.data.branch_profile
      this.address_1 = res.data.business_details?.address_1
      this.address_2 = res.data.business_details?.address_2
      this.company_brief = res.data.business_details?.company_brief

      this.city = res.data.business_details?.city
      // this.state=res.data.branch_address.state.name
      this.country = res.data.business_details?.issued_in_countries
      this.photographer_eng = res.data.contact_details.photographer_eng
      this.photographer_arabic = res.data.contact_details.photographer_arabic
      this.business_email = res.data.contact_details.business_email
      this.business_website = res.data.contact_details.business_website
      this.mobile_number = res.data.contact_details.mobile_number
      this.business_mobile_number = res.data.contact_details.business_mobile_number
      this.insta_acc = res.data.contact_details.insta_acc
      this.youtube_channel = res.data.contact_details.youtube_channel
      this.establishment_year = res.data.business_details.establishment_year
      if (res.data.business_details.issued_in_countries.length > 0) {
        for (let i = 0; i < res.data.business_details.issued_in_countries.length; i++) {
          const country = res.data.business_details.issued_in_countries[i];
          const city = res.data.business_details.issued_in_cities[i];
          console.log('country---------: ', country, city);
          this.countryAndCity.push(this._formBuilder.group({
            issued_in_countries: [country, [Validators.required]],
            issued_in_cities: [city, [Validators.required]]
          }))
          this.getCities(country, i + 1)
        }
      } else {
        this.countryAndCity.push(this._formBuilder.group({
          issued_in_countries: ['', [Validators.required]],
          issued_in_cities: ['', [Validators.required]]
        }))
      }
      // this.issuedCountry = res.data.business_details?.issued_in_countries
      // this.issuedCity = res.data.business_details?.issued_in_cities
      this.licenceNumber = res.data.business_details?.licence_number
      this.branchName = res.data.business_details?.company_name_eng

      console.log('NO offfff Employeeeee', this.noOfEmp)
      this.licImg = res.data.business_details?.licence_img
      this.servicesCat = res.data.service_categories
      this.servicesSubCat = res.data.service_subcategories[0].name
      //   this.servicesSubCat1=res.data.service_subcategories[0].name
      //   for (var i = 0; i < this.servicesSubCat.length; i++) {
      //   if(this.servicesSubCat[i].name){
      // 	this.in = this.servicesSubCat[i].name;  
      // 	console.log("true ----------");
      //   }}
      this.serCountryArr = res.data.service_details.service_country
      this.serCityArr = res.data.service_details.service_city
      var obj = {
        country_code: this.serCountryArr
      }
      // console.log("===obj", obj)
      this.CustomerService.getAllCities(obj).subscribe(data => {
        // console.log("city data is ====", data)
        if (data.code == '200' || data.code == 200) {
          this.cities = data.data
          console.log('cities ......', this.cities)
        }
      })
      this.serCost = res.data.service_details.service_cost

      this.certificationArr = res.data.branch_image
      console.log('this.certificationArr', this.certificationArr)
      this.loader = false
    })
  }
  showData() {
    console.log('Object Parsed', this.servicesSubCat);
  }
  getBranchYear(evt) {
    console.log("Branch Year is>>>>>", evt.value)
    this.branchYear = evt.value
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
  newCountryArr = []
  newIssuedCountryArr = []
  getCountries() {
    this.CustomerService.getCountries().subscribe(data => {
      // console.log("main data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.countries = data.data
        this.countries.forEach(element => {
          this.serCountryArr.forEach(ele => {
            if (element.isoCode == ele) {
              this.newCountry = element.name
              this.newCountryArr.push(this.newCountry)
            }


            // console.log('new Country wala array',this.newCountryArr)
          })
          this.issuedCountry.forEach(e => {
            if (element.isoCode == e) {
              this.newIssuedCountry = element.name
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
  getCities(event, index?: number) {
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
        if (index) {
          let i = this.customCities.findIndex((item: any) => { return item.id == index })
          console.log('i: ', i);
          if (i != -1) {
            console.log('in if: ', i);
            this.customCities[i].cities = this.cities
          } else {
            this.customCities.push({
              id: index,
              cities: this.cities
            })
          }
          console.log('this.customCities and tities: ', this.customCities);
        }
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

  removeCountryTity(index: number) {
    this.countryAndCity.removeAt(index)
    console.log('this.customCities: ', this.customCities);
    let customCityIndex = this.customCities.findIndex(item => item.id == index + 1)
    this.customCities.splice(customCityIndex, 1)
    for (let i = 0; i < this.customCities.length; i++) {
      if (this.customCities[i].id > index + 1) {
        this.customCities[i].id -= 1
      }
    }
    console.log('this.customCities: after change ', this.customCities);
  }

  serName
  serviceList() {
    //   let serName

    this.CustomerService.serviceList().subscribe(data => {
      // console.log("data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.service_list = data.data
        console.log('gsfdgsdffgsdafgsfgssdgfadsgasdgsdg', this.service_list)
        // console.log('service List ^^^^^^^^^^^^^^^^^',this.servicesArr)
        // this.service_list.forEach(ele =>{
        // 	this.servicesArr.forEach(ser =>{
        // 		if(ele._id == ser)
        // 		{

        // 			this.serName=ele.name

        // 			this.myArr.push(this.serName)
        // 		}
        // 		console.log('new array of servicesssss 555',this.myArr)
        // 		//
        // 	})


        // })
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
        this.licenceImage = data.data
      }
    }, err => {
      console.log(err)
      this.toastr.error('Some error occured, please try again!!', 'Error')

    })
  }
  tess(evt) {
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
    this.branchImage = event.target.files[0];
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      this.image = mainImage;
    };
    fr.readAsDataURL(file);
    var formData = new FormData()
    formData.append('image', this.branchImage)
    this.CustomerService.uploadProfile(formData).subscribe(res => {
      console.log('response of edit profile pic new ', res)
      this.branchimageName = res.data
      // this.toastr.success('Updated Successfully')
      // this.ngOnInit()
    })
  }
  //   UpdateBranch(){

  async UpdateBranch() {
    // console.log('lic imageeee',this.licImg)
    // console.log('lic imageeee',this.licImg)
    var obj = {
      branch_id: this.branchId,
      ...(this.branchimageName != undefined && { branch_profile: this.branchimageName }),
      ...(this.branchimageName == undefined && { branch_profile: this.branch_profile }),
      first_name: this.firstName,
      last_name: this.lastName,
      user_type: "photographer",
      email: this.email,

      // password: this.addBranchForm.value.password,

      // branch_image: this.certificates_arr,
      // no_of_branches: this.addBranchForm.value.no_of_branches,









      contact_details: {
        photographer_eng: this.photographer_eng,
        photographer_arabic: this.photographer_arabic,
        business_email: this.business_email,
        business_website: this.business_website,
        mobile_number: this.mobile_number,
        business_mobile_number: this.business_mobile_number,
        insta_acc: this.insta_acc,
        youtube_channel: this.youtube_channel,
      },
      business_details: {
        establishment_year: this.branchYear,
        issued_in_countries: await this.businessFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_countries
        }),
        issued_in_cities: await this.businessFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_cities
        }),
        // issued_in_countries: this.issuedCountry,
        company_name_eng: this.branchName,
        company_brief: this.company_brief,
        address_1: this.address_1,
        city: this.city,
        country: this.country,
        address_2: this.address_2,
        // issued_in_cities: this.issuedCity,
        //...(this.licenceImage != undefined && {branch_licence: this.licenceImage}),
        //...(this.licenceImage == undefined && {branch_licence: this.licImg}),
        // branch_licence: this.licenceImage,
        licence_number: this.licenceNumber,


      },
      service_details: {
        services_products: this.servicesArr,
        service_country: this.serCountryArr,
        service_city: this.serCityArr,
        service_cost: this.serCost
      }
    }
    console.log('obj', obj)
    this.CustomerService.editPhotographerBranch(obj).subscribe(res => {
      console.log('res', res)
      this.toastr.success('Updated')
      let currentUrl = this.router.url;
      console.log('currentUrl', currentUrl)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([`/photographerBranch/${this.branchId}`]);
      });
    })
  }

  selectCountry(evt) {
    console.log("CODEEEEEE>>>>>", evt)
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

    var obj1 = {
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



