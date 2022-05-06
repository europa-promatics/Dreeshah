import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  addressForm: FormGroup
  countries: any;
  states: any;
  cities: any;
  country: any;
  state: any;
  constructor(
    private CustomerService: CustomerService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({
      country: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      zip_code: ['', [Validators.required]],
      address_type: ['', [Validators.required]],
      address_line1: ['', [Validators.required]],
      address_line2: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getCountries();
    // this.addressForm.controls.first_name.valueChanges.subscribe(res => {
    //   console.log('res: ', res)
    //   console.log('res: ', res!='')
    //   if(res){
    //     this.addressForm.controls.last_name.clearValidators()
    //     this.addressForm.controls.last_name.updateValueAndValidity()
    //   }else{
    //     this.addressForm.controls.last_name.setValidators([Validators.required])
    //     this.addressForm.controls.last_name.updateValueAndValidity()
    //   }
    // })
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

  selectCountry(evt) {
    console.log("CODEEEEEE>>>>>", evt)
    console.log("CODEEEEEE>>>>>", evt.target.value)
    this.country = evt.target.options[evt.target.options.selectedIndex].text;
    var obj = {
      countryCode: evt.target.value
    }

    this.addressForm.get('country').patchValue(this.country)
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

  }

  selectState(evt) {
    console.log("State>>>>>", evt.target.value)
    this.state = evt.target.value
    this.addressForm.get('state').patchValue(evt.target.value)
  }



  addAddress() {
    console.log('this.addressForm.value: ', this.addressForm.value);
    if (!this.addressForm.valid) {
      this.addressForm.markAllAsTouched()
      return
    }
    this.CustomerService.addNewAddres(this.addressForm.value).subscribe(data => {
      console.log('service data---------------', data)
    })
  }


}
