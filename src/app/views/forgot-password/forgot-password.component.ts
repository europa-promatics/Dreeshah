import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
declare var $; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  customerForm: FormGroup;
  otpForm: FormGroup;
	email:any
  first:any
  second:any
  third:any
  fourth:any
  fifth:any
  sixth:any

  constructor(
	private route: ActivatedRoute,
	private router: Router,
	public _formBuilder: FormBuilder,
	public CustomerService: CustomerService,
	private toastr: ToastrService,
  ) { 
		this.customerForm = this._formBuilder.group({
		  'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
		})

		this.otpForm = this._formBuilder.group({
      'first': [null, Validators.compose([Validators.required])],
      'second': [null, Validators.compose([Validators.required])],
      'third': [null, Validators.compose([Validators.required,])],
      'fourth': [null, Validators.compose([Validators.required])],
      'fifth': [null, Validators.compose([Validators.required])],
      'sixth': [null, Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  	$('.digit-group').find('input').each(function() {
  	  $(this).attr('maxlength', 1);
  	  $(this).on('keyup', function(e) {
  		var parent = $($(this).parent());
  		
  		if(e.keyCode === 8 || e.keyCode === 37) {
  			var prev = parent.find('input#' + $(this).data('previous'));
  			
  			if(prev.length) {
  				$(prev).select();
  			}
  		} else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
  			var next = parent.find('input#' + $(this).data('next'));
  			
  			if(next.length) {
  				$(next).select();
  			} else {
  				if(parent.data('autosubmit')) {
  					parent.submit();
  				}
  			}
  		}
  	});
  });
  }

  forgotPass(){
  	var obj = {
  		email: this.email
  	}
  	this.CustomerService.forgotPassword(obj).subscribe(data => {
      console.log(data)
      if (data.code == '200' || data.code == 200) {
        
        // console.log("edit form data ============",this.editUniForm)
        // this.location.back()
        localStorage.setItem('token_id', data.user_id);
        this.toastr.success('Forgot password mail sent successfully', 'Success')
        $('#forgotPasswordModal').modal('show');
      }else{
        this.toastr.error('Invalid email address', 'Error')
      }
    }, err => {
      console.log(err)
      this.toastr.error('Some error occured, please try again!!', 'Error')

    })
  }


  validateOtp(){
    var otp = this.first+this.second+this.third+this.fourth+this.fifth+this.sixth
    console.log(otp)
    var obj = {
      otp: otp,
      id: localStorage.getItem('token_id')
    }


    this.CustomerService.validateForgotOtp(obj).subscribe(data => {
      console.log(data)
      if (data.code == '200' || data.code == 200) {
        
        // console.log("edit form data ============",this.editUniForm)
        // this.location.back()
        $('#forgotPasswordModal').modal('hide');
        this.toastr.success('Verification done successfully', 'Success')
        this.router.navigate(['/change-password']);
      }else{

        this.toastr.error('Wrong otp', 'Error')
      }
    }, err => {
      console.log(err)
      this.toastr.error('Some error occured, please try again!!', 'Error')

    })
  }

}
