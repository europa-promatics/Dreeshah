import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from '../../shared/common-service.service';

declare var $;
@Component({
  selector: 'app-photographer-change-password',
  templateUrl: './photographer-change-password.component.html',
  styleUrls: ['./photographer-change-password.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class PhotographerChangePasswordComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  general_details = false;
  photographer_contactFormGroup: FormGroup
  photoGeneralFormGroup: FormGroup
  photoServiceFormGroup: FormGroup
  photographerDetailGroup: FormGroup
  hideC = true;
  hide = true;
  hideD = true;
  photo_next = false
  selectedCountry
  photo_next1 = false
  photo_next2 = false
  photo_submit = false
  photo_licence_img
  service_list = []
  cities = []
  countries = []
  image_path
  userData
  userDetails
  user_image
  profile_image
  profile_img
  mainImage
  stateCities
  countryDial
  countryDialAddress
  states
  mobile_number
  selectedCity
  myCityArr = []
  businessMobileCode
  logo_image: any;
  logoImage: string | ArrayBuffer;
  logo_img: string | ArrayBuffer;
  customCities: any[] = []
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,

    private location: Location,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService) { }







  ngOnInit(): void {
    this.getCountries()
    const Webreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.image_path = environment.image_path + "userProfile/"
    this.userData = JSON.parse(localStorage['userData']);
    this.getProfile()
    // stepper
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.photographerDetailGroup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
      ]),
      last_name: new FormControl('', [
        Validators.required,
      ]),
    })

    this.photographer_contactFormGroup = new FormGroup({
      name_eng: new FormControl('', [
        Validators.required,
      ]),
      name_arabic: new FormControl('', [
        Validators.required,
      ]),
      business_email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      business_website: new FormControl('', [
        Validators.required,
        Validators.pattern(Webreg)
      ]),
      mobile_number: new FormControl('', [
        Validators.required,
      ]),
      business_mobile_number: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
      ]),
      insta_acc: new FormControl('', [
        Validators.required,
      ]),
      youtube_channel: new FormControl('', [
        Validators.required,
      ]),
    });

    this.photoGeneralFormGroup = new FormGroup({
      company_name_eng: new FormControl('', [
        Validators.required,
      ]),
      address_1: new FormControl('', [
        Validators.required,
      ]),
      address_2: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
      ]),
      city: new FormControl('', [
        Validators.required,
      ]),
      establishment_year: new FormControl('', [
        Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*')
      ]),
      about_company: new FormControl('', [
        Validators.required,
      ]),
      // issued_in_countries: new FormControl('', [
      //   Validators.required,
      // ]),
      // issued_in_cities: new FormControl('', [
      //   Validators.required,
      // ]),
      country_and_city: this._formBuilder.array([]),
      // issued_in_cities:this._formBuilder.array([]),
      licence_number: new FormControl('', [
        Validators.required,
      ]),
      licence_img: new FormControl('', [
        // Validators.required,
      ]),
    })

    this.photoServiceFormGroup = new FormGroup({
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

    this.serviceList()
  }

  get countryAndCity(): FormArray {
    return this.photoGeneralFormGroup.get('country_and_city') as FormArray
  }

  addNewField() {
    console.log(this.photoGeneralFormGroup)
    if (this.countryAndCity.valid) {
      this.countryAndCity.push(this._formBuilder.group({
        issued_in_countries: ['', [Validators.required]],
        issued_in_cities: ['', [Validators.required]]
      }))
    }
  }

  getProfile() {
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(data => {

      if (data.code == 200) {
        this.userDetails = data.data
        console.log('retshrtghtrhgtrehg', this.userDetails);
        this.photographerDetailGroup.controls['first_name'].setValue(data.data.first_name);
        this.photographerDetailGroup.controls['last_name'].setValue(data.data.last_name);

        this.photographer_contactFormGroup.controls['name_eng'].setValue(data.data.contact_details.name_eng);
        this.photographer_contactFormGroup.controls['name_arabic'].setValue(data.data.contact_details.name_arabic);
        this.photographer_contactFormGroup.controls['business_email'].setValue(data.data.contact_details.business_email);
        this.photographer_contactFormGroup.controls['business_website'].setValue(data.data.contact_details.business_website);
        this.photographer_contactFormGroup.controls['mobile_number'].setValue(data.data.contact_details.mobile_number);
        this.photographer_contactFormGroup.controls['business_mobile_number'].setValue(data.data.contact_details.business_mobile_number);
        this.photographer_contactFormGroup.controls['insta_acc'].setValue(data.data.contact_details.insta_acc);
        this.photographer_contactFormGroup.controls['youtube_channel'].setValue(data.data.contact_details.youtube_channel);

        if (data.data.business_details && data.data.business_details.company_name_eng) {
          this.photoGeneralFormGroup.controls['company_name_eng'].setValue(data.data.business_details.company_name_eng);
          this.photoGeneralFormGroup.controls['address_1'].setValue(data.data.business_details.address_1);
          this.photoGeneralFormGroup.controls['address_2'].setValue(data.data.business_details.address_2);
          this.photoGeneralFormGroup.controls['country'].setValue(data.data.business_details.country);
          this.photoGeneralFormGroup.controls['city'].setValue(data.data.business_details.city);
          this.photoGeneralFormGroup.controls['establishment_year'].setValue(data.data.business_details.establishment_year);
          this.photoGeneralFormGroup.controls['about_company'].setValue(data.data.business_details.about_company);
          // this.photoGeneralFormGroup.controls['issued_in_countries'].setValue(data.data.business_details.issued_in_countries);
          // this.photoGeneralFormGroup.controls['issued_in_cities'].setValue(data.data.business_details.issued_in_cities);
          this.photoGeneralFormGroup.controls['licence_number'].setValue(data.data.business_details.licence_number);
          this.photoGeneralFormGroup.controls['licence_img'].setValue(data.data.business_details.licence_img);
        }
        if (data.data.business_details.issued_in_countries.length > 0) {
          for (let i = 0; i < data.data.business_details.issued_in_countries.length; i++) {
            const country = data.data.business_details.issued_in_countries[i];
            const city = data.data.business_details.issued_in_cities[i];
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


        this.photoServiceFormGroup.controls['services_products'].setValue(data.data.service_categories.name);
        this.photoServiceFormGroup.controls['service_country'].setValue(data.data.service_details.service_country);
        this.photoServiceFormGroup.controls['service_city'].setValue(data.data.service_details.service_city);
        this.photoServiceFormGroup.controls['service_cost'].setValue(data.data.service_details.service_cost);

        if (data.data.profile_image) {
          this.user_image = data.data.profile_image
        }
        if (data.data.logo) {
          this.logo_image = data.data.logo
        }
        console.log("khgiuhg", this.userDetails)
      }
    })
  }

  serviceList() {
    this.CustomerService.serviceList().subscribe(data => {
      console.log("data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.service_list = data.data
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

  getCountries() {
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

  getCities(event, index?: number) {
    console.log("====event", event)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
      // this.businessFormGroup.controls['issued_in_countries'].setValue(event)
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
        console.log('index: ', index);
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

  getCustomTity(index: number) {
    let cities = this.customCities.find((item: any) => {
      return item.id == index
    })?.cities
    console.log('cities: ', cities);
    return cities
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


  somethingChanged(completed: boolean) {
    console.log(completed)
    this.general_details = completed;
  }
  photoDetailsSubmit(stepper: MatStepper) {
    console.log(this.photographerDetailGroup.valid)
    console.log(this.photographerDetailGroup.value)
    this.photo_next = true
    // this.toastr.success("hoolllllooooo")

    // this.stepperNextAsyc(stepper, '1')
  }

  photographerfirstFormSubmit(stepper: MatStepper) {
    console.log(this.photographer_contactFormGroup.valid)
    console.log(this.photographer_contactFormGroup.value)
    this.photo_next1 = true
    // this.toastr.success("hoolllllooooo")

    // this.stepperNextAsyc(stepper, '1')
  }

  photoGeneralInfoSubmit(stepper) {
    this.photo_next2 = true
    console.log(this.photoGeneralFormGroup.value)

  }

  uploadPhotographerLicence(evt) {
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
    this.uploadPhotographerlicence(evt.target.files[0])
    // this.bannerData.image = evt.target.files[0];
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      self.photo_licence_img = mainImage;
      // alert(self.licence_img)
    };
    fr.readAsDataURL(file);
  }

  async PhotographerSignup() {
    console.log("==sumbit", this.photoGeneralFormGroup.value)
    this.photo_submit = true
    var obj = {
      user_id: this.userData._id,
      first_name: this.photographerDetailGroup.value.first_name,
      last_name: this.photographerDetailGroup.value.last_name,
      user_type: "photographer",
      email: this.photographerDetailGroup.value.email,
      password: this.photographerDetailGroup.value.password,

      contact_details: {
        name_eng: this.photographer_contactFormGroup.value.name_eng,
        name_arabic: this.photographer_contactFormGroup.value.name_arabic,
        business_email: this.photographer_contactFormGroup.value.business_email,
        business_website: this.photographer_contactFormGroup.value.business_website,
        mobile_number: this.photographer_contactFormGroup.value.mobile_number,
        business_mobile_number: this.photographer_contactFormGroup.value.business_mobile_number,
        insta_acc: this.photographer_contactFormGroup.value.insta_acc,
        youtube_channel: this.photographer_contactFormGroup.value.youtube_channel,
      },

      business_details: {
        company_name_eng: this.photoGeneralFormGroup.value.company_name_eng,
        address_1: this.photoGeneralFormGroup.value.address_1,
        address_2: this.photoGeneralFormGroup.value.address_2,
        country: this.photoGeneralFormGroup.value.country,
        city: this.photoGeneralFormGroup.value.city,
        establishment_year: this.photoGeneralFormGroup.value.establishment_year,
        about_company: this.photoGeneralFormGroup.value.about_company,
        issued_in_countries: await this.photoGeneralFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_countries
        }),
        issued_in_cities: await this.photoGeneralFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_cities
        }),
        licence_number: this.photoGeneralFormGroup.value.licence_number,
        licence_img: this.photoGeneralFormGroup.value.licence_img,
      },

      service_details: {
        services_products: this.photoServiceFormGroup.value.services_products,
        service_country: this.photoServiceFormGroup.value.service_country,
        service_city: this.photoServiceFormGroup.value.service_city,
        service_cost: this.photoServiceFormGroup.value.service_cost
      }
    }
    console.log("final data===", obj);
    if (this.photoServiceFormGroup.valid) {
      this.CustomerService.updatePhotographerProfile(obj).subscribe(data => {
        console.log(data)

        this.toastr.success("Profile updated sucessfully");
        this.router.navigate(['/photographerProfile'])
      }, err => {
        console.log(err)
        if (err.msg = "EMAIL_ALREADY_EXISTS") {
          this.toastr.error("Email address already registered");

        } else {
          console.log(err)

          this.CustomerService.commonError(err)
        }
        this.toastr.error('Some error occured, please try again!!', 'Error')

      })
    }
  }

  uploadPhotographerlicence(image) {
    var formdata: FormData = new FormData();
    formdata.append("image", image);
    formdata.append("destination", "photographerData");

    this.CustomerService.uploadImage(formdata).subscribe(data => {
      console.log(data)
      this.photoGeneralFormGroup.controls['licence_img'].setValue(data.data);

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
    this.profile_image = evt.target.files[0];
    // this.uploadProfile()
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      this.mainImage = fr.result;
      self.profile_img = this.mainImage;
      // alert(self.profile_img)
    };
    fr.readAsDataURL(file);
  }

  onLogoChange(evt) {
    let self = this
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
    this.logo_image = evt.target.files[0];
    // this.uploadProfile()
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      this.logoImage = fr.result;
      self.logo_img = this.logoImage;
      // alert(self.logo_img)
    };
    fr.readAsDataURL(file);
  }

  uploadProfile() {
    if (this.profile_image) {
      var formdata: FormData = new FormData();
      formdata.append('profile_image', this.profile_image)
      // formdata.append('logo', this.logo_image)
      formdata.append('id', this.userData._id)

      this.CustomerService.updateProfile(formdata).subscribe(data => {
        console.log(data);
        // this.user_image = data.profile_image
        // this.profile_img = ""
        this.CommonService.sendProfileImg(data.profile_image);
        this.ngOnInit()
      })
    }
    if (this.logo_image) {
      var formdata: FormData = new FormData();
      // formdata.append('profile_image', this.profile_image)
      formdata.append('logo', this.logo_image)
      formdata.append('id', this.userData._id)

      this.CustomerService.editProfessionalProfile(formdata).subscribe(data => {
        console.log('logo------', data);
        // this.user_image = data.profile_image
        // this.profile_img = ""
        this.CommonService.sendProfileImg(data.logo);
        this.toastr.success('Updated Successfully')
        this.ngOnInit()
      })
    }
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
      countryCode: evt.value.isoCode
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

  getCitiesState(event) {
    this.myCityArr = []
    console.log("====event GET Cities State", event.value,)
    console.log("====event GET Cities State", event.value.isoCode)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
      console.log(event, 'citydata rashika');
      this.photoGeneralFormGroup.controls['country'].setValue(event)
    } else {
      arr.push(event)
    }
    var obj = {
      country_code: event.value.countryCode
    }
    console.log("===obj", obj)
    this.CustomerService.getAllCities(obj).subscribe(data => {


      data.data.forEach(e => {
        let v = e.name
        if (event.value.isoCode == e.stateCode) {
          var c = {
            cName: e.name,

          }
          this.myCityArr.push(c)
          console.log("City |Array is>>>>", this.myCityArr)
        }
      })
      if (data.code == '200' || data.code == 200) {
        this.stateCities = data.data
        console.log("city data is ****************** ====", this.stateCities)

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
  countryCode(evt) {
    console.log("Country Code is >>>>", evt)
    this.countryDial = '+' + evt.dialCode
    console.log("Country Code is >>>>", this.countryDial)
  }

  countryCodeAddress(evt2) {
    console.log("Country Code is >>>>", evt2)
    this.countryDialAddress = '+' + evt2.dialCode
    console.log("countryDialAddress Code is >>>>", this.countryDialAddress)
  }
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
  businessMobile(evt3) {
    console.log("Country Code is >>>>", evt3)
    this.businessMobileCode = '+' + evt3.dialCode
    console.log("business mobile Code is >>>>", this.businessMobileCode)
  }
}
