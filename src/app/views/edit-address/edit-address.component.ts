import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  editForm: FormGroup;
  phoneForm :FormGroup
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
  selectedState :any
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

    this.editForm = this.formBuilder.group({
      'fname': [null, Validators.compose([Validators.required])],
      'lname': [null, Validators.compose([Validators.required])],
      'addline1':[null, Validators.compose([Validators.required])], 
      'addline2':[null, Validators.compose([Validators.required])], 
      'city':[null, Validators.compose([Validators.required])],
      'state':[null, Validators.compose([Validators.required])],
      'country':[null, Validators.compose([Validators.required])], 
      'pincode':[''],
      'area':[''],    
      'addType':[null, Validators.compose([Validators.required])],
      //'phoneNo':[null, Validators.compose([Validators.required])], 
      //'streetName':[null, Validators.compose([Validators.required])], 
      //'streetNum':[null, Validators.compose([Validators.required])], 
      //'buildingNum':[null, Validators.compose([Validators.required])], 
      //'buildingName':[null, Validators.compose([Validators.required])], 
      
  
      }) ;

      this.phoneForm = new FormGroup({
        phone: new FormControl('', [Validators.required])
      });




  }

  ngOnInit(): void {
    this.getCountries()
    this.addressId=this.route.snapshot.paramMap.get('id')
    console.log("Id fetched is======>>>>",this.addressId)
    this.CustomerService.addressLists().subscribe(res => {
      console.log("Address Response=========",res)
      this.details=res.data.address_details
      console.log("Address Details======>>>>",this.details)
     
      this.details.forEach(element=>{
          this.addId=element._id
          if(this.addId == this.addressId){
            
            this.fname = element.first_name;
            this.lname = element.last_name;
            this.addline1 = element.address_line1;
            this.addline2 = element.address_line2;
            this.city = element.city;
            this.state = element.state;
            this.selectedCountry = element.country;
            let obj={
                country_name : element.country
            }
         
              this.CustomerService.getStatesFromCountryName(obj).subscribe(data => {
                console.log("main data is ====", data)
                if (data.code == '200' || data.code == 200) {
                  this.states = data.data
                  this.selectedState = element.state
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
      
              //this.selectedState = element.state
            this.area = element.landmark;
            this.pincode = element.zip_code;
            this.phone = element.phone_number;
            this.addType =element.address_type
            //this.streetNum = element.street_number;
            //this.streetName = element.street_name;
            
            //this.buildingNum = element.building_number;
            //this.buildingName = element.building_name;
            
            
           
            


          }
         // console.log("ID from the for each",this.addId)

      })
   })

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  save(){
    this.submit_button=true;
    var obj={
      address_id: this.addressId,
      first_name: this.editForm.value.fname,
      last_name: this.editForm.value.lname,
      address_line1: this.editForm.value.addline1,
      address_line2: this.editForm.value.addline2,
      city : this.editForm.value.city,
      state : this.editForm.value.state,
      country: this.editForm.value.country,
      //state : this.editForm.value.state.name,
      //country: this.editForm.value.country.name,
      iso_code:this.editForm.value.country.isoCode,
      zip_code: this.editForm.value.pincode,
      country_ph_code: this.countryDial,
      phone_number: this.phoneForm.value.phone,
      landmark: this.editForm.value.area,
      address_type:this.editForm.value.addType,
     // street_number: this.editForm.value.streetNum,
     // street_name: this.editForm.value.streetName,
     
      //building_number: this.editForm.value.buildingNum,
      //building_name: this.editForm.value.buildingName,
     

    }

    if (!this.editForm.valid ) {
      //this.toastr.error("Please fill required fields")
      return
    }else{

    this.CustomerService.editAddress(obj).subscribe(res =>{
      console.log("Address is Updated",res)
      this.toastr.success("Address Updated sucessfully")
      this.router.navigate(["/address"])
    })
  }
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

  countryCode(evt){
    console.log("Country Code is >>>>",evt)
    this.countryDial='+'+ evt.dialCode
    console.log("Country Code is >>>>",this.countryDial)
  }

}
