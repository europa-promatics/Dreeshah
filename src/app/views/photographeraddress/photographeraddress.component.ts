import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';
import {ThemePalette} from '@angular/material/core';
//import { runInThisContext } from 'vm';

@Component({
  selector: 'app-photographeraddress',
  templateUrl: './photographeraddress.component.html',
  styleUrls: ['./photographeraddress.component.scss']
})
export class PhotographeraddressComponent implements OnInit {

  addressForm: FormGroup;
  phoneForm :FormGroup
  countryDial
  phone
  details
  userData
  submit_button =false
  addline1
  addline2
  fname
  lname
  streetNum
  streetName
  buildingName
  buildingNum
  area
  country
  state
  city
  pincode
  phoneNo
  addType
  divHide= false;
  // color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  isChecked = false;
  defaultAdd

  selectedCountry: any
  selectedState :any
  states
  cities
  countries

  constructor(
    public CustomerService: CustomerService,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {

    this.addressForm = this.formBuilder.group({
      
      'addline1':[null, Validators.compose([Validators.required])], 
      'addline2':[null, Validators.compose([Validators.required])], 
      'city':[null, Validators.compose([Validators.required])],
     
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
    this.divHide= false;
    this.userData=localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
    this.CustomerService.addressLists().subscribe(res => {
      console.log("Address Response=========",res)
      this.details=res.data.address_details
      console.log("Address Details======>>>>",this.details)
     
   })

  
  }

  

  deleteService(value) {
    console.log("Enter in the")
    console.log("Id to be deleted of address===>>>>",value)
      Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Address!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }) .then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your Address has been deleted.',
          'success'
        ).then(delete_service => {
          var obj={
            address_id:value
          }
            this.CustomerService.deleteAddress(obj).subscribe(data => {
              console.log(data);
              this.ngOnInit();
              //this.toastr.success("Service deleted sucessfully")
    }) 
   // $(document).ready(function(){
     // $("#add-address-btn").click(function(){
       // $(".add-address-form").toggle();
    //  });
  //  });
        })
      }  else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Address is safe :)',
          'error'
        )
      } 
    })  

  //  $(document).ready(function(){
    //  $("#add-address-btn").click(function(){
       // $(".add-address-form").toggle();
   //   });
   // });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  saveAddress(){
    this.submit_button = true;
   
      this.submit_button=true;
      var formData = new FormData();
  
      formData.append('address_line1', this.addressForm.value.addline1);
      formData.append('address_line2', this.addressForm.value.addline2);
      formData.append('city', this.addressForm.value.city);
  
      formData.append('country', this.addressForm.value.country.name);
      formData.append('zip_code', this.addressForm.value.pincode);
    
     
      formData.append('landmark', this.addressForm.value.area);
      formData.append('address_type', this.addressForm.value.addType);
      //formData.append('street_name', this.addressForm.value.streetName);
      //formData.append('street_number', this.addressForm.value.streetNum);
      //formData.append('building_name', this.addressForm.value.buildingName);
     // formData.append('building_number', this.addressForm.value.buildingNum);
      
      
  
       if (!this.addressForm.valid ) {
        //this.toastr.error("Please fill required fields")
        return
      }
  
      else{
        this.divHide = false;
         this.router.navigate(['/address-photographer']);
          console.log("Enter in the service block")
          console.log("Addline1",this.addline1)
          //this.toastr.success("Address added sucessfully")
           this.CustomerService.addNewAddres(formData).subscribe(res => {
            console.log("After Submission Response======",res)
            this.toastr.success("Address added sucessfully")
            this.addressForm.reset();
            this.router.navigate(['/address-photographer']);
           this.ngOnInit()
         }) 
      } 
    
  
  }

  ClicKFunction(){
    //console.log("function os called====")
    if(this.details.lenght>0){
      this.toastr.error('Address already added')
    }
 
    this.divHide=true;
  }

  defaultAddress(val,evt){
    console.log("Event is:",evt)
    console.log("value of address ID:",val)
    console.log("Inside the default address function:")
    //this.checked = !this.checked
    console.log("value of the event checked:=======",evt.checked)
    if(evt.checked == true){
      this.defaultAdd = 'yes'
    }else{
      this.defaultAdd = 'no'
    }

    var obj2={
      is_default : this.defaultAdd,
      address_id :val
    }
    if(evt.checked == true){
    this.CustomerService.defaultAddress(obj2).subscribe(res => {
      console.log("Response for default address======",res)
      this.toastr.success("Address set as Default")
      this.ngOnInit();
    }) 
  }

  //$(document).ready(function(){
  //  $("#add-address-btn").click(function(){
    //  $(".add-address-form").toggle();
    //});
  //});
    
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
			countryCode: this.selectedCountry.isoCode
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
