import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-change-password-professional',
  templateUrl: './change-password-professional.component.html',
  styleUrls: ['./change-password-professional.component.scss']
})
export class ChangePasswordProfessionalComponent implements OnInit {
  passcheck:boolean=false;
  customerForm: FormGroup;
	password:any
  oldpassword:any
  constructor(
  	private route: ActivatedRoute,
		private router: Router,
		public _formBuilder: FormBuilder,
		public CustomerService: CustomerService,
		private toastr: ToastrService,
  ) { 
  	this.customerForm = this._formBuilder.group({
      'oldpassword': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
		  'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'confirm_password': [''],
		},{validator: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }     
  }

  get rpf() {
    return this.customerForm.controls;
  }


  hide=true;
  hideC=true;
  ngOnInit(): void {

//   	$(".toggle-password").click(function() {

//   $(this).toggleClass("fa-eye fa-eye-slash");
//   var input = $($(this).attr("toggle"));
//   if (input.attr("type") == "password") {
//     input.attr("type", "text");
//   } else {
//     input.attr("type", "password");
//   }
// });
  }


  resetPassword(){
  /* 	var obj = {
  		password: this.password,
  		id: localStorage.getItem('token_id')
  	}

  	this.CustomerService.resetPassword(obj).subscribe(data => {
      console.log("main data is ====",data)
      if (data.code == '200' || data.code == 200) {
        this.toastr.success('Password changed successfully', 'Success')
        this.router.navigate(['/login']);
      }
    }, err => {
      console.log(err.status)
      if (err.status >= 404) {
        console.log('Some error occured')
      } else {
        this.toastr.error('Some error occured, please try again!!', 'Error')
        console.log('Internet Connection Error')
      }

    }) */
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

    this.CustomerService.changePassword(obj).subscribe(data => {
      console.log("main data is ====",data)
      if (data.code == '200' || data.code == 200) {
        this.toastr.success('Password changed successfully', 'Success')
        this.logout() 
        this.router.navigate(['/login']);
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
}
   
  
  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
