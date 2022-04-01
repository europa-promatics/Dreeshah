import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from '../../shared/common-service.service';

@Component({
  selector: 'app-photographer-update-password',
  templateUrl: './photographer-update-password.component.html',
  styleUrls: ['./photographer-update-password.component.scss']
})
export class PhotographerUpdatePasswordComponent implements OnInit {
  oldpassword:any
  passcheck:boolean=false;
  password:any
  customerForm: FormGroup;
  hideC = true;
  hide = true;
  hideD = true;
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    
    private location: Location,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService) { this.customerForm = this._formBuilder.group({
    'oldpassword': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    'confirm_password': [''],
  },{validator: this.checkPasswords })}

  ngOnInit(): void {
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }
  get rpf() {
    return this.customerForm.controls;
  }
  pssCheckfeild(){
    if( this.oldpassword==this.password){
      this.passcheck=true;
      this.toastr.error('old and new password can not be same')
    } 
  }
  changePassword(){
    var obj = {
  	
      old_password: this.oldpassword,
      new_password: this.password
  		//id: localStorage.getItem('token_id')
  	}
    
if(this.oldpassword!==this.password){
    this.CustomerService.changePassword(obj).subscribe(data => {
      console.log("main data is ====",data)
      if (data.code == '200' || data.code == 200) {
        this.toastr.success('Password changed successfully', 'Success')
        this.router.navigate(['/photographerProfile']);
      }
    }, err => {
      console.log(err.status)
      if (err.status == 422) {
        this.toastr.error("Old Password Mismatch")
       
      }else if(err.status >= 404){
        console.log('Some error occured')
      } 
      else {
        this.toastr.error('Some error occured, please try again!!', 'Error')
        console.log('Internet Connection Error')
      }

    })

  }else{
    this.toastr.error("Old and New Password Can't be same")
  }}
}
