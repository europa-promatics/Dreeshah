import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../shared/customer.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  listingArr
  brId
  addStaffForm
  submit=false
  staffId
  staffArr
  dropName
  nobrSel

  designation
  desigId
  desigArr
  desigName
  phone
  countryDial
  profId
  constructor(public CustomerService: CustomerService,
    private toastr: ToastrService, private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.staffId=this.route.snapshot.params.id
    this.profId=JSON.parse(localStorage.getItem('userData'))
    console.log("Proff. Data>>>>>>>>>>>>>>>>>>",this.profId)
    console.log("Proff. IDs>>>>>>>>>>>>>>>>>>",this.profId._id)
    this.getAllBranchList()
    this.getDesignation()
   
      var d={
         limit_val:10000,
         offset_val:0
      }
      this.CustomerService.getProfessionalStaffList(d).subscribe(res =>{
        
        this.staffArr=res.result
        this.staffArr.forEach(element => {
          if(element._id == this.staffId){
            this.addStaffForm.controls['name'].setValue(element.full_name);
            this.addStaffForm.controls['email'].setValue(element.email);
            this.addStaffForm.controls['phone'].setValue(element.phone_number);
           // this.addStaffForm.controls['desigId'].setValue(element.designation.id)
            // this.addStaffForm.controls['branch'].setValue(element.branch_id.branch_name_en);
           //this.desigName =element.designation.name
           this.desigId=element.designation._id
           this.brId=element.branch_id._id
            this.dropName=element.branch_id.branch_name_en
            this.nobrSel=element.branch_id._id

          }
        });
        // this.length=res.total_counts
        console.log('staffaraayaaaa',this.staffArr)
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
  getAllBranchList(){
    this.CustomerService.getBranchList().subscribe(res => {

      this.listingArr = res.result
      // console.log('response of getBranchList', this.listingArr)
    })
  }
  createForm(){
    this.addStaffForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]),
      phone: new FormControl('',[Validators.required]),
      branch: new FormControl('',[Validators.required]),
      designation: new FormControl('',[Validators.required]),
      // privilage: new FormControl('',[Validators.required])
    })
  }
  add(){
    this.submit=true
    if(this.addStaffForm.invalid){
      this.toastr.error('Please fill all the details correct')
      return
    }
    var p={

  ...(this.brId != null && {branch_id:this.brId}),
  ...(this.brId == null && {branch_id:this.nobrSel}),
    //  branch_id:this.brId,
     full_name:this.addStaffForm.value.name,
     professional_id: this.profId._id,
     email:this.addStaffForm.value.email,
     country_code:this.countryDial,
     phone_number:this.addStaffForm.value.phone,
     designation:this.desigId,
     branch_id:this.brId,
     staff_id:this.staffId
    //  privileges:this.addStaffForm.value.privilage
    }
   //  console.log('p',p)
   this.CustomerService.editProfessionalStaffs(p).subscribe(res =>{
     console.log('reas',res)
     this.toastr.success("Updated Successfully")
     this.router.navigate(['/sellerStaffPrivileges'])
   })
  }
}
