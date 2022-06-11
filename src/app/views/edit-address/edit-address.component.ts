import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  addressDetail;
  editForm: FormGroup;
  phoneForm: FormGroup
  countryDial
  details
  addressId
  addId
  addline1
  addline2
  streetNum
  streetName
  area
  buildingName
  buildingNum
  country
  state
  city
  pincode
  fname
  lname
  phoneNo
  submit_button
  countries
  selectedCountry: any
  selectedState: any
  states
  cities
  addType
  phone


  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.addressId = this.route.snapshot.paramMap.get('id')
    this.editForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      address_type: ['', [Validators.required]],
      address_line1: ['', [Validators.required]],
      address_line2: ['', [Validators.required]],
      landmark: [],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      address_id: [],
    });
  }

  ngOnInit(): void {
    this.getCountries()
    // this.selectCountry(any)


    this.CustomerService.addressLists().subscribe(res => {
      this.details = res.data.address_details
      this.addressDetail = this.details.find(item => {
        return item._id == this.addressId
      });

      for (let key of Object.keys(this.editForm.value)) {
        this.editForm.controls[key].patchValue(this.addressDetail[key])
      }
      this.editForm.controls.address_id.patchValue(this.addressId)

      var obj = {
        country_name: this.editForm.controls.country.value
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
      // this.details.forEach(element=>{
      //     this.addId=element._id
      //     if(this.addId == this.addressId){

      //       this.fname = element.first_name;
      //       this.lname = element.last_name;
      //       this.addline1 = element.address_line1;
      //       this.addline2 = element.address_line2;
      //       this.city = element.city;
      //       this.state = element.state;
      //       this.selectedCountry = element.country;
      //       let obj={
      //           country_name : element.country
      //       }

      //         this.CustomerService.getStatesFromCountryName(obj).subscribe(data => {
      //           console.log("main data is ====", data)
      //           if (data.code == '200' || data.code == 200) {
      //             this.states = data.data
      //             this.selectedState = element.state
      //           }
      //         }, err => {
      //           console.log(err.status)
      //           if (err.status >= 404) {
      //             console.log('Some error occured')
      //           } else {
      //             this.toastr.error('Some error occured, please try again!!', 'Error')
      //             console.log('Internet Connection Error')
      //           }

      //         })

      //         //this.selectedState = element.state
      //       this.area = element.landmark;
      //       this.pincode = element.zip_code;
      //       this.phone = element.phone_number;
      //       this.addType =element.address_type
      //       //this.streetNum = element.street_number;
      //       //this.streetName = element.street_name;

      //       //this.buildingNum = element.building_number;
      //       //this.buildingName = element.building_name;






      //     }
      //    // console.log("ID from the for each",this.addId)

      // })
    })

  }

  // numberOnly(event): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   }
  //   return true;

  // }

  save() {
    this.submit_button = true;

    // var obj={
    //   address_id: this.addressId,
    //   first_name: this.editForm.value.fname,
    //   last_name: this.editForm.value.lname,
    //   address_line1: this.editForm.value.addline1,
    //   address_line2: this.editForm.value.addline2,
    //   city : this.editForm.value.city,
    //   state : this.editForm.value.state,
    //   country: this.editForm.value.country,
    //   //state : this.editForm.value.state.name,
    //   //country: this.editForm.value.country.name,
    //   iso_code:this.editForm.value.country.isoCode,
    //   zip_code: this.editForm.value.pincode,
    //   country_ph_code: this.countryDial,
    //   phone_number: this.phoneForm.value.phone,
    //   landmark: this.editForm.value.area,
    //   address_type:this.editForm.value.addType,
    //  // street_number: this.editForm.value.streetNum,
    //  // street_name: this.editForm.value.streetName,

    //   //building_number: this.editForm.value.buildingNum,
    //   //building_name: this.editForm.value.buildingName,


    // }

    if (!this.editForm.valid) {
      this.editForm.value
      console.log('this.editForm.value: ', this.editForm.value);
      this.editForm.markAllAsTouched()
      //this.toastr.error("Please fill required fields")
      return
    } else {
      console.table('this.editForm.value after valid: ', this.editForm.value);
      this.CustomerService.editAddress(this.editForm.value).subscribe(res => {
        console.log("Address is Updated", res)
        this.toastr.success("Address Updated sucessfully")
        this.router.navigate(["/address"])
      })
    }
  }

  getCountries() {
    this.CustomerService.getCountries().subscribe(data => {
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

  selectCountry(evt) {
    console.log("CODEEEEEE>>>>>", evt.target.value)
    var obj = {
      country_name: evt.target.value
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

    // var obj1={
    // 	country_code: this.selectedCountry.countryCode
    // }
    // this.CustomerService.getAllCities(obj1).subscribe(data => {
    // 	console.log("city data is ====", data)
    // 	if (data.code == '200' || data.code == 200) {
    // 		this.cities = data.data
    // 	}
    // }, err => {
    // 	console.log(err.status)
    // 	if (err.status >= 404) {
    // 		console.log('Some error occured')
    // 	} else {
    // 		this.toastr.error('Some error occured, please try again!!', 'Error')
    // 		console.log('Internet Connection Error')
    // 	}

    // })
  }

  // countryCode(evt) {
  //   console.log("Country Code is >>>>", evt)
  //   this.countryDial = '+' + evt.dialCode
  //   console.log("Country Code is >>>>", this.countryDial)
  // }

}
