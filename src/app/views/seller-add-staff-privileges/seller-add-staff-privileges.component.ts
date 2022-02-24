import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-seller-add-staff-privileges',
  templateUrl: './seller-add-staff-privileges.component.html',
  styleUrls: ['./seller-add-staff-privileges.component.scss']
})
export class SellerAddStaffPrivilegesComponent implements OnInit {
  listingArr
  brId
  addStaffForm
  designation
  desigId
  desigArr
  phone
  profId
  countryDial
  submit=false
  user: any;
  constructor(public CustomerService: CustomerService,
    private toastr: ToastrService, private fb: FormBuilder,
    private router: Router ) {
      this.createForm();
     }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))

    this.getAllBranchList()
    this.getDesignation()
    this.profId=JSON.parse(localStorage.getItem('userData'))
    console.log("Proff. Data>>>>>>>>>>>>>>>>>>",this.profId)
    console.log("Proff. IDs>>>>>>>>>>>>>>>>>>",this.profId._id)
  }
  getAllBranchList(){
    this.CustomerService.getBranchList().subscribe(res => {

      this.listingArr = res.result
      // console.log('response of getBranchList', this.listingArr)
    })
  }
  countryCode(evt){
		console.log("Country Code is >>>>",evt)
		this.countryDial='+'+ evt.dialCode
		console.log("Country Code is >>>>",this.countryDial)
	  }

  getDesignation(){
    this.CustomerService.getDesignations().subscribe(res => {
      console.log("Response of the designation>>>",res)
      this.desigArr = res.designations
      // console.log('response of getBranchList', this.listingArr)
    })
  }
  createForm(){
    this.addStaffForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required ]),
      branch: new FormControl('',[Validators.required]),
      designation: new FormControl('',[Validators.required]),
      // privilage: new FormControl('',[Validators.required])
    })
  }
 add(){
   this.submit=true
   if(this.addStaffForm.invalid){
    //  this.toastr.error('Please fill all the details correct')
     return
   }
   var p={
    professional_id: this.profId._id,
    branch_id:this.brId,
    full_name:this.addStaffForm.value.name,
    email:this.addStaffForm.value.email,
    country_code:this.countryDial,
    designation:this.desigId,
    phone_number:this.addStaffForm.value.phone,
    privileges:this.addStaffForm.value.privilage
   }
  //  console.log('p',p)
  this.CustomerService.addProfessionalStaffs(p).subscribe(res =>{
    // console.log('reas',res)
    this.toastr.success("Added Successfully")
    this.router.navigate(['/sellerStaffPrivileges'])
  },
  errors=>{
    if(errors.message == undefined){
      this.toastr.error('Already Registered')
    }
  })
 }
}
