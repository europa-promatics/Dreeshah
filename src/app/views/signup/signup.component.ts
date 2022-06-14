import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { Location } from '@angular/common'
import { MatStepper } from '@angular/material/stepper';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
//import * as Moment from 'moment';
import { Moment } from 'moment';
import { element } from 'protractor';
import { Twilio } from "twilio";

const moment = _moment;


declare var $;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})

export class SignupComponent implements OnInit {
  formattedAddress
  branch_type
  branch_year
  branch_cat = []
  service_list = []
  licence_img
  cert_image
  opened
  customerForm: FormGroup;
  otpForm: FormGroup;
  values
  professionalForm1: FormGroup;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  businessFormGroup: FormGroup;
  serviceFormGroup: FormGroup;
  branchFormGroup: FormGroup;
  photographer_contactFormGroup: FormGroup
  photoGeneralFormGroup: FormGroup
  photoServiceFormGroup: FormGroup
  photographerDetailGroup: FormGroup
  have_branches
  general_details = false;
  hide = true;
  hideC = true;
  hideD = true;
  hideE = true;
  countries: any
  states: []
  cities: []
  stateCities: []
  selectedCountry: any
  selectedState: any
  selectedCity: any
  country: any
  state: any
  first_name: any
  last_name: any
  phone_number: any
  business_mobile_number: any
  email: any
  password: any
  first: any
  second: any
  third: any
  fourth: any
  fifth: any
  sixth: any
  verify_type
  p_false = false
  save = false
  next1 = false
  next2 = false
  next3 = false
  next4 = false
  next5 = false
  next6 = false
  photo_next = false
  photo_next1 = false
  photo_next2 = false
  photo_submit = false
  certificates_arr = [{
    image: "",
    date: new Date()
  }]
  terms_checked = false
  temp = false
  temp2 = false
  photo_licence_img
  countryDial
  years = []
  otpCheck = false

  selectedCountryProf
  selectedStateProf
  lenArrCity
  lenArrCategory
  categiryArr = []
  subCatArr = []
  datePicker
  dateBook
  imgUpload
  branchYear
  countryDialAddress
  businessMobileCode
  businessLandCode
  nameArr = []


  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  OTP: number;
  locations = [];
  customCities: any[] = []
  professionalImage: any;
  photographerImage: any;
  customerImage: any;
  photographerImg: any;
  customerImg: any;
  professionalImg: any;
  trustedEvent: any;
  flag: boolean=false;





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.customerForm = this._formBuilder.group({
      'first_name': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
      'last_name': [null, Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")])],
      'phone_number': [null, Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern('^[0-9+]*')])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$"), Validators.minLength(1)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')])],
      'confirm_password': [''],
      'country': [null, Validators.compose([Validators.required])],
      'state': [null, Validators.compose([Validators.required])],
      'city': [null, Validators.compose([Validators.required])],
    }, { validator: this.checkPasswords })

    this.otpForm = this._formBuilder.group({
      'first': [null, Validators.compose([Validators.required])],
      'second': [null, Validators.compose([Validators.required])],
      'third': [null, Validators.compose([Validators.required,])],
      'fourth': [null, Validators.compose([Validators.required])],
      'fifth': [null, Validators.compose([Validators.required])],
      'sixth': [null, Validators.compose([Validators.required])]
    })

    this.businessFormGroup = new FormGroup({
      branch_year: new FormControl('', [
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


    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    //event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }



  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  get rpf() {
    return this.customerForm.controls;
  }
  ngOnInit(): void {
    this.customerBackgroundImg()
    this.professionalBackgroundImg()
    this.photographerBackgroundImg()
    console.log("jkashjkashdkaskldjklas", this.subCatArr);

    this.getCountries();
    this.getCategoryList()
    this.getLogCities()
    $('.digit-group').find('input').each(function () {
      $(this).attr('maxlength', 1);
      $(this).on('keyup', function (e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find('input#' + $(this).data('previous'));

          if (prev.length) {
            $(prev).select();
          }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
          var next = parent.find('input#' + $(this).data('next'));

          if (next.length) {
            $(next).select();
          } else {
            if (parent.data('autosubmit')) {
              parent.submit();
            }
          }
        }
      });
    });

    // 
    $('#enter_no_branches').hide();
    $(document).ready(function () {
      $(document).on('change', '.radio_check', function () {
        var st = $(this).children('option:selected').val();
        alert(st);
        if (st == 'yes') {
          $('#Enter_no_branches').show();
        } else {
          $('#Enter_no_branches').hide();

        }
      });
    });

    // stepper
    this.firstFormGroup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required, Validators.pattern("[a-zA-Z ]*")
      ]),
      last_name: new FormControl('', [
        Validators.required, Validators.pattern("[a-zA-Z ]*")
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
      // branch_name_arabic: new FormControl('', [
      // 	Validators.required,
      // ]),
      branch_name_arabic: new FormControl('', [
        Validators.required, Validators.pattern('[\u0600-\u06FF ]*')
      ]),
      branch_type: new FormControl('', [
        Validators.required,
      ]),
      branch_cat: new FormControl('', [
        Validators.required,
      ]),
      brief_about_branch: new FormControl('', [
        Validators.required,
      ]),
      certificate_awards: new FormControl('', [

      ]),
    })

    this.addressFormGroup = new FormGroup({
      pincode: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]{6}$')
      ]),
      fName: new FormControl('', [
        Validators.required, Validators.pattern("[a-zA-Z]*")
      ]),
      lName: new FormControl('', [
        Validators.required, Validators.pattern("[a-zA-Z]*")
      ]),
      aLine1: new FormControl('', [
        Validators.required,
      ]),
      aLine2: new FormControl('', [
        Validators.required,
      ]),
      // house_no: new FormControl('', [
      // 	Validators.required,
      // ]),
      // area: new FormControl('', [
      // 	Validators.required,
      // ]),
      landmark: new FormControl(''),
      country: new FormControl('', [
        Validators.required,
      ]),
      state: new FormControl(''),
      city: new FormControl('', [
        Validators.required,
      ]),
      phone_number: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9+]*')
      ]),
      defaultaddress: new FormControl(false, [
        Validators.required,
      ]),
    });

    const Webreg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.contactFormGroup = new FormGroup({
      co_ordinator_eng: new FormControl('', [
        Validators.required,
      ]),
      co_ordinator_arabic: new FormControl('', [
        Validators.required, Validators.pattern('[\u0600-\u06FF ]*')
      ]),
      branch_email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      branch_website: new FormControl('', [
        Validators.required,
        Validators.pattern(Webreg)
      ]),
      //branch_website: new FormControl(),
      mobile_number: new FormControl('', [
        Validators.required
      ]),
      business_mobile_number: new FormControl('', [
        Validators.required
      ]),
      insta_acc: new FormControl('', [
        Validators.required
      ]),
      youtube_channel: new FormControl('', [
        Validators.required
      ]),
    });



    this.serviceFormGroup = new FormGroup({
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
      placeOfDispatch: new FormControl('', [
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

    this.photographerDetailGroup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required, Validators.pattern('[a-zA-Z ]*')
      ]),
      last_name: new FormControl('', [
        Validators.required, Validators.pattern('[a-zA-Z ]*')
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
    })
    this.photographer_contactFormGroup = new FormGroup({
      name_eng: new FormControl('', [
        Validators.required, Validators.pattern('[a-zA-Z ]*')
      ]),
      name_arabic: new FormControl('', [
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
        Validators.required,
      ]),
      business_mobile_number: new FormControl('', [
        Validators.required,
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
        Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')
      ]),
      about_company: new FormControl('', [
        Validators.required,
      ]),
      photo_country_and_city: this._formBuilder.array([]),
      // issued_in_countries: new FormControl('', [
      //   Validators.required,
      // ]),
      // issued_in_cities: new FormControl('', [
      //   Validators.required,
      // ]),
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

    this.secondFormGroup = new FormGroup({})
    this.brandTypes()
    this.serviceList()


    this.generateArrayOfYears()
    if (this.countryAndCity.length < 1) {
      this.addNewField()
    }
    if (this.photoCountryAndCity.length < 1) {
      this.photoAddNewField()
    }
  }

  get countryAndCity(): FormArray {
    return this.businessFormGroup.get('country_and_city') as FormArray
  }

  get photoCountryAndCity(): FormArray {
    return this.photoGeneralFormGroup.get('photo_country_and_city') as FormArray
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

  removeField(index?: number) {
    this.countryAndCity.removeAt(index)
    let customCityIndex = this.customCities.findIndex(item => item.id == index + 1)
    this.customCities.splice(customCityIndex, 1)
    for (let i = 0; i < this.customCities.length; i++) {
      if (this.customCities[i].id > index + 1) {
        this.customCities[i].id -= 1
      }
    }
    // this.ngOnInit();
  }

  photoAddNewField() {
    console.log(this.photoGeneralFormGroup)
    if (this.photoCountryAndCity.valid) {
      this.photoCountryAndCity.push(this._formBuilder.group({
        issued_in_countries: ['', [Validators.required]],
        issued_in_cities: ['', [Validators.required]]
      }))
    }
  }

  photoRemoveField(index?: number) {
    this.photoCountryAndCity.removeAt(index)
    let customCityIndex = this.customCities.findIndex(item => item.id == index + 1)
    this.customCities.splice(customCityIndex, 1)
    for (let i = 0; i < this.customCities.length; i++) {
      if (this.customCities[i].id > index + 1) {
        this.customCities[i].id -= 1
      }
    }
    // this.ngOnInit();
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

  onKey(event: any) {
    this.values = event.target.value;
    console.log(this.values)
    if (this.firstFormGroup.value.password === this.values) {
      this.p_false = false;
    } else {
      this.p_false = true;
    }
  }

  on_Key(event: any) {
    this.values = event.target.value;
    console.log(this.values)
    if (this.photographerDetailGroup.value.password === this.values) {
      this.p_false = false;
    } else {
      this.p_false = true;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getCountries() {
    this.CustomerService.getCountries().subscribe(data => {
      console.log("main data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.countries = data.data
        console.log('this.countries', this.countries);

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


  selectCountry(evt, index?: number) {
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
          console.log('this.customCities: ', this.customCities);
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

  getCities(event, index?: number) {
    console.log("====event", event)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
      this.lenArrCity = arr.length
      // this.businessFormGroup.controls['issued_in_countries'].setValue(event)
    } else {
      arr.push(event)
      this.lenArrCity = arr.length
    }
    var obj = {
      country_code: arr[this.lenArrCity - 1]
    }
    console.log("===obj", obj)
    this.CustomerService.getAllCities(obj).subscribe(data => {
      console.log("city data is ====", data)
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
          console.log('this.customCities: ', this.customCities);
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
  myCityArr = []
  getCitiesState(event) {
    this.myCityArr = []
    console.log("====event GET Cities State", event.value,)
    console.log("====event GET Cities State", event.value.isoCode)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
      this.businessFormGroup.controls['country'].setValue(event)
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

  getCitiesAll(event) {
    console.log("====event GET  State Code", event)
    console.log("====event GET Cities State", event.value.isoCode)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
      this.businessFormGroup.controls['country'].setValue(event)
    } else {
      arr.push(event)
    }



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
    console.log(id)
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

  businessMobile(evt3) {
    console.log("Country Code is >>>>", evt3)
    this.businessMobileCode = '+' + evt3.dialCode
    console.log("business mobile Code is >>>>", this.businessMobileCode)
  }

  businessLandline(evt4) {
    console.log("Country Code is >>>>", evt4)
    this.businessLandCode = '+' + evt4.dialCode
    console.log("business landline Code is >>>>", this.businessLandCode)
  }

  tk
  // signupCustomer() {
  // 	console.log(this.terms_checked)
  // 	console.log("Phone number is =======",this.phone_number)
  // 	console.log("City is >>>>>",this.selectedCity)
  // 	console.log("City Name is >>>>>",this.selectedCity.cName)



  // 	var obj = {
  // 		first_name: this.first_name,
  // 		last_name: this.last_name,
  // 		user_type: 'customer',
  // 		country: this.selectedCountry.name,
  // 		state: this.selectedState.name,
  // 		city: this.selectedCity.cName,
  // 		email: this.email,
  // 		password: this.password,
  // 		country_code: this.countryDial,
  // 		phone_number: this.phone_number
  // 	}
  // 	if (!this.terms_checked) {
  // 		this.toastr.error("Please accept terms and condition")
  // 		return
  // 	}
  // 	console.log("Object of the customer signup form>>>>>",obj)
  // 	 this.CustomerService.signupCustomer(obj).subscribe(data => {
  // 		console.log(data)
  // 		if (data.code == '200' || data.code == 200) {

  // 			// console.log("edit form data ============",this.editUniForm)
  // 			// this.location.back()
  // 			this.tk=data.token
  // 			 //localStorage.setItem('token', data.token);
  // 			$('#verificationModal').modal('show');

  // 		} else {
  // 			this.toastr.success('Registration done successfully', 'Success')
  // 		}
  // 	}, err => {
  // 		console.log(err)
  // 		if (err.msg = "EMAIL_ALREADY_EXISTS") {
  // 			this.toastr.error("Email address already registered");
  // 			// this.loading = false;
  // 		} else {
  // 			console.log(err)
  // 			// this.loading = false;
  // 			this.CustomerService.commonError(err)
  // 		}
  // 		// this.toastr.error('Some error occured, please try again!!', 'Error')

  // 	}) 
  // }


  signupCustomer() {
    if (this.verify_type == 'mobile') {
      alert('type=mobile')
      this.OTP = Math.floor(100000 + Math.random() * 900000);

      const From = '+14128168787'
      const To = this.phone_number
      const Body = 'Your OTP is:' + this.OTP

      this.CustomerService.getTwilioService(From, To, Body).subscribe(data => {
        //	console.log(data)
        console.log('otp send successfully')
        $('#verificationModal').modal('show');

      }, err => {
        console.log('err=', err)
      });
    } else {
      this.regesterUser()
    }



  }

  regesterUser() {

    console.log(this.terms_checked)
    console.log("Phone number is =======", this.phone_number)
    console.log("City is >>>>>", this.selectedCity)
    console.log("City Name is >>>>>", this.selectedCity.cName)



    var obj = {
      first_name: this.first_name,
      last_name: this.last_name,
      user_type: 'customer',
      country: this.selectedCountry.name,
      state: this.selectedState.name,
      city: this.selectedCity.cName,
      email: this.email,
      password: this.password,
      country_code: this.countryDial,
      phone_number: this.phone_number,

      send_email: ''
    }
    if (this.verify_type == 'mobile') {
      obj.send_email = 'no'
    }
    else {
      obj.send_email = 'yes'
    }
    if (!this.terms_checked) {
      this.toastr.error("Please accept terms and condition")
      return
    }
    console.log("Object of the customer signup form>>>>>", obj)
    this.CustomerService.signupCustomer(obj).subscribe(data => {
      console.log(data)
      if (this.verify_type = 'mobile') {
        $('#verificationModal').modal('hide');
      }

      if (data.code == '200' || data.code == 200) {

        if (this.verify_type = 'email') {
          $('#verificationModal').modal('show')
        }



        this.tk = data.token
        if (this.verify_type == 'mobile') {
          this.toastr.success('Registration done successfully', 'Success')

        }

      } else {
        this.toastr.success('Registration done successfully', 'Success')
      }
    }, err => {
      console.log(err)
      if (err.msg = "EMAIL_ALREADY_EXISTS") {
        this.toastr.error("Email address already registered");
        // this.loading = false;
      } else {
        console.log(err)
        // this.loading = false;
        this.CustomerService.commonError(err)
      }
      // this.toastr.error('Some error occured, please try again!!', 'Error')

    })
  }


  validateOtp() {
    var otp = this.first + this.second + this.third + this.fourth + this.fifth + this.sixth


    if (this.verify_type == 'mobile' && this.OTP == otp) {
      this.regesterUser();
      return;
    } else if (this.verify_type == 'mobile' && this.OTP != otp) {
      this.toastr.error('Some error occured, please try again!!', 'Error')
      return
    }

    console.log("IN the otp validate>>>>>???")

    console.log(otp)
    // console.log("Token is>>>>",localStorage.getItem('token'))
    if (!this.otpForm.valid) {
      this.otpCheck = true;

    } else {
      var obj = {
        otp: otp,
        //token: localStorage.getItem('token')
        token: this.tk
      }
      this.CustomerService.validateOtp(obj).subscribe(data => {
        console.log(data)
        if (data.code == '200' || data.code == 200) {

          // console.log("edit form data ============",this.editUniForm)
          // this.location.back()
          $('#verificationModal').modal('hide');
          this.toastr.success('Registration done successfully', 'Success')
          this.router.navigate(['/login']);
        } else {

          this.toastr.error('Wrong otp', 'Error')
        }
      }, err => {
        console.log(err)
        this.toastr.error('Some error occured, please try again!!', 'Error')

      })
    }
  }

  somethingChanged(completed: boolean) {
    console.log(completed)
    this.general_details = completed;
  }

  firstFormSubmit(stepper: MatStepper) {
    console.log(this.firstFormGroup.valid)
    console.log(this.firstFormGroup.value)
    console.log(this.certificates_arr)
    this.next1 = true
    // this.toastr.success("hoolllllooooo")

    // this.stepperNextAsyc(stepper, '1')
  }

  addressFormSubmit() {
    console.log(this.addressFormGroup.value)
    this.next2 = true

  }

  contactFormSubmit() {
    console.log(this.contactFormGroup.value)
    this.next3 = true
  }

  businessFormSubmit() {
    console.log(this.businessFormGroup.value)
    console.log("Business License Number>>>", this.businessFormGroup.value.branch_licence)
    console.log("Branch Year>>>>>", this.branch_year)
    this.next4 = true
  }

  serviceFormSubmit() {
    console.log(this.serviceFormGroup.value)
    this.next5 = true

  }

  async branchFormSubmit() {
    this.next6 = true
    console.log("First Name>>>>>", this.firstFormGroup.value.first_name)
    console.log("Last Name>>>>>", this.firstFormGroup.value.last_name)
    console.log("Email>>>>>", this.firstFormGroup.value.email)
    console.log("Password>>>>>", this.firstFormGroup.value.password)
    console.log("Branch Name Eng>>>>>", this.firstFormGroup.value.branch_name_eng)
    console.log("Branch Name Ara>>>>>", this.firstFormGroup.value.branch_name_arabic)
    console.log("Branch type ID>>>>>", this.firstFormGroup.value.branch_type)
    console.log("Branch Category ID>>>>>", this.firstFormGroup.value.branch_cat)
    console.log("Certificate Array>>>>>", this.certificates_arr)
    console.log("Branch Brief>>>>>", this.firstFormGroup.value.brief_about_branch)
    console.log(this.branchFormGroup.value)
    var obj = {
      first_name: this.firstFormGroup.value.first_name,
      last_name: this.firstFormGroup.value.last_name,
      user_type: "professional",
      email: this.firstFormGroup.value.email,
      password: this.firstFormGroup.value.password,
      branch_name_en: this.firstFormGroup.value.branch_name_eng,
      branch_name_ar: this.firstFormGroup.value.branch_name_arabic,
      branch_type_id: this.firstFormGroup.value.branch_type,
      branch_category_id: this.firstFormGroup.value.branch_cat,
      branch_brief: this.firstFormGroup.value.brief_about_branch,
      certificate_awards: this.certificates_arr,
      no_of_branches: this.branchFormGroup.value.no_of_branches,
      //address_details: [{
      pincode: this.addressFormGroup.value.pincode,
      phone_number: this.addressFormGroup.value.phone_number,
      address_line_1: this.addressFormGroup.value.aLine1,
      address_line_2: this.addressFormGroup.value.aLine2,
      addr_first_name: this.addressFormGroup.value.fName,
      addr_last_name: this.addressFormGroup.value.lName,
      //house_no: this.addressFormGroup.value.house_no,
      //area: this.addressFormGroup.value.area,
      country_ph_code: this.countryDialAddress,
      landmark: this.addressFormGroup.value.landmark,
      country: this.addressFormGroup.value.country.name,
      state: this.addressFormGroup.value.state.name,
      city: this.addressFormGroup.value.city,
      //}],
      logistic_location_id: this.serviceFormGroup.value.placeOfDispatch,
      service_categories: this.serviceFormGroup.value.service_category,
      service_subcategories: this.serviceFormGroup.value.service_sub_category,
      contact_details: {
        co_ordinator_eng: this.contactFormGroup.value.co_ordinator_eng,
        co_ordinator_arabic: this.contactFormGroup.value.co_ordinator_arabic,
        branch_email: this.contactFormGroup.value.branch_email,
        branch_website: this.contactFormGroup.value.branch_website,
        country_code: this.businessMobileCode,
        mobile_number: this.contactFormGroup.value.mobile_number,
        business_country_code: this.businessLandCode,
        business_mobile_number: this.contactFormGroup.value.business_mobile_number,
        insta_acc: this.contactFormGroup.value.insta_acc,
        youtube_channel: this.contactFormGroup.value.youtube_channel,
      },
      business_details: {
        branch_year: this.branchYear,
        issued_in_countries: await this.businessFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_countries
        }),
        issued_in_cities: await this.businessFormGroup.value.country_and_city.map((item: any) => {
          return item.issued_in_cities
        }),
        // issued_in_countries: this.businessFormGroup.value.issued_in_countries,
        // issued_in_cities: this.businessFormGroup.value.issued_in_cities,
        branch_licence: this.businessFormGroup.value.branch_licence,
        licence_number: this.businessFormGroup.value.licence_number,
        no_of_emp: this.businessFormGroup.value.no_of_emp,

      },
      service_details: {
        //services_products: this.serviceFormGroup.value.services_products,
        service_country: this.serviceFormGroup.value.service_country,
        service_city: this.serviceFormGroup.value.service_city,
        service_cost: this.serviceFormGroup.value.service_cost
      }
    }
    console.log("obj---", obj)
    if (this.branchFormGroup.value.have_branches == 'yes' && !this.branchFormGroup.value.no_of_branches && !this.branchFormGroup.valid) {
      this.toastr.error("Please fill no of branches")
    } else {
      console.log("Inside the else condition to sign up the Professional<<<<>>>>>")
      this.CustomerService.registerProfessional(obj).subscribe(data => {
        console.log(data)
        if (data.code == '200' || data.code == 200) {
          this.router.navigate(['/login']);
          this.toastr.success('Registration done successfully. Please Login', 'Success')
          // localStorage.setItem('token', data.token);
          // $('#verificationModal').modal('show');
        } else {
          this.toastr.success('Registration done successfully', 'Success')
        }
      }, err => {
        console.log("ERROR During Professional Sign up>>>>>", err)
        if (err.msg = "EMAIL_ALREADY_EXISTS") {
          this.toastr.error("Email address already registered");
          // this.loading = false;
        } else {
          console.log(err)
          // this.loading = false;
          this.CustomerService.commonError(err)
        }
        // this.toastr.error('Some error occured, please try again!!', 'Error')

      })
    }
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

  async PhotographerSignup() {
    console.log("==sumbit", this.photoGeneralFormGroup.value)
    this.photo_submit = true
    var obj = {
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
        // issued_in_countries: this.photoGeneralFormGroup.value.issued_in_countries,
        // issued_in_cities: this.photoGeneralFormGroup.value.issued_in_cities,
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
      this.CustomerService.registerPhotographer(obj).subscribe(data => {
        console.log(data)
        if (data.code == '200' || data.code == 200) {
          this.toastr.success('Registration done successfully', 'Success')
          this.router.navigate(['/login']);
          // localStorage.setItem('token', data.token);
          // $('#verificationModal').modal('show');
        }
      }, err => {
        console.log(err)
        if (err.msg = "EMAIL_ALREADY_EXISTS") {
          this.toastr.error("Please fill required all detail");
          // this.loading = false;
        } else {
          console.log(err)
          // this.loading = false;
          this.CustomerService.commonError(err)
        }
        // this.toastr.error('Some error occured, please try again!!', 'Error')

      })
    }
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
      this.toastr.warning('Please upload jpg/png/jpeg file')
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

  uploadCertificate(evt, index) {
    console.log("Event of the upload data>>>>", evt)
    console.log("index for the event>>>>", index)
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
    this.imgUpload = evt.target.files[0]
    const file = evt.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      this.toastr.warning('Please upload image jpg/png/jpeg file')
      return;
    }
    console.log(evt.target.files[0])
    this.uploadImage(evt.target.files[0], index)
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      self.cert_image = mainImage;
      self.temp2 = true;

      // alert(self.licence_img)
    };
    fr.readAsDataURL(file);
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

  uploadImage(image, index) {
    var formdata: FormData = new FormData();
    formdata.append("image", image);
    formdata.append("destination", "professionalData");

    this.CustomerService.uploadImage(formdata).subscribe(data => {
      console.log(data)
      if (index != 'licence') {
        this.certificates_arr[index].image = data.data
      } else {
        this.businessFormGroup.controls['branch_licence'].setValue(data.data);
      }
    }, err => {
      console.log(err)
      this.toastr.error('Some error occured, please try again!!', 'Error')

    })
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

  removeCertificate(index) {
    this.certificates_arr.splice(index, 1)
  }

  firstDate(value, i) {
    console.log(i, this.certificates_arr);

    this.dateBook = moment(value).format("LL")
    this.certificates_arr[i].date = value;
  }

  addCertificate() {
    var obj = {
      image: '',
      date: new Date()
    }
    console.log("object added is>>>>>>", obj)
    this.certificates_arr.push(obj)
    //console.log("ARRAY of object for the Certificate>>>>",this.certificates_arr)
  }


  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  htate(evt) {
    console.log("Fuction gorg frg CITY", evt)
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
    console.log("Event for the sub category>>>", event)

    var arr = []

    if (Array.isArray(event)) {
      arr = event
      //nameArr.push(event.name)
      this.lenArrCategory = arr.length
      //	this.formGroup.controls['issuedInCountry'].setValue(event)
    } else {
      arr.push(event)
      //nameArr.push(event.name)
      this.lenArrCategory = arr.length
    }
    // nameArr.push(event.name)
    event = arr[this.lenArrCategory - 1]
    console.log("EVENT>>>>>", event)
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
      this.subCatArr = res.sub_categories
    })

  }


  getBranchYear(evt) {
    console.log("Branch Year is>>>>>", evt.value)
    this.branchYear = evt.value
  }

  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address
    // Do some stuff
  }
  getLogCities() {
    this.CustomerService.getLogisticLocations().subscribe(data => {
      console.log("Logistics Location Data is================>", data);
      this.locations = data.locations
    })
  }





  // 11-june-2022---------------------------------------------------------------------------------------

  customer(event){
    console.log("eventntntntntntntnt",event.isTrusted);
    this.trustedEvent=event.isTrusted
    this.flag=true
    console.log("customer ki event h re baba>>>>>>.",event.target.label);
    this.customerImg=event.target.label
    console.log("this.customerImg>>>>>",this.customerImg)
    if(event.target.label=='Customer'){
      this.customerImg=event.target.label
      this.professionalImg=''
      this.photographerImg=''
    }
  }

  professional(event){
    console.log("eventntntntntntntnt",event.isTrusted);
    this.trustedEvent=event.isTrusted
    this.flag=true

    console.log("professional ki event h re baba>>>>>>.",event.target.label);
    this.professionalImg=event.target.label
    console.log("this.professionalImg>>>>>",this.professionalImg)
    if(event.target.label=='Professionals'){
      this.professionalImg=event.target.label
      this.customerImg=''
      this.photographerImg=''
    }

  }


  photographer(event){
    console.log("eventntntntntntntnt",event.isTrusted);
    this.trustedEvent=event.isTrusted
    this.flag=true
    
    console.log("photographer ki event h re baba>>>>>>.",event.target.label);
    this.photographerImg=event.target.label
    console.log("this.photographerImg>>>>>",this.photographerImg)
    if(event.target.label=='Photographer'){
      this.photographerImg=event.target.label
      this.customerImg=''
      this.professionalImg=''
     
    }

  }



  customerBackgroundImg(){
    var obj={
      user_type: 'customer'
    }

    this.CustomerService.signupBackgroungImage(obj).subscribe(res => {
      console.log("response of customer Image>>> ",res);
      this.customerImage=res.data[0].background_image
      console.log("this.customerImage",this.customerImage);
      
    })

  }

  professionalBackgroundImg(){
    var obj={
      user_type: 'professional'
    }

    this.CustomerService.signupBackgroungImage(obj).subscribe(res => {
      console.log("response of professional Image >>>>.",res);
      this.professionalImage=res.data[0].background_image
      console.log("this.professionalImage",this.professionalImage);
      
    })

  }

  photographerBackgroundImg(){
    var obj={
      user_type: 'photographer'
    }

    this.CustomerService.signupBackgroungImage(obj).subscribe(res => {
      console.log("response of photographer Image>>>> ",res);
      this.photographerImage=res.data[0].background_image
      console.log("this.photographerImage",this.photographerImage);
      
      
    })

  }

}
