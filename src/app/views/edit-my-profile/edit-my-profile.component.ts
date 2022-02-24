import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonServiceService } from '../../shared/common-service.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-edit-my-profile',
	templateUrl: './edit-my-profile.component.html',
	styleUrls: ['./edit-my-profile.component.scss']
})
export class EditMyProfileComponent implements OnInit {
	userData
	userDetails
	profile_img
	user_image
	save = false
	image_path
	image
	countryDial: string;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public _formBuilder: FormBuilder,
		public CustomerService: CustomerService,
		private toastr: ToastrService,
		public CommonService: CommonServiceService
	) { }

	ProfileFormGroup = new FormGroup({
		first_name: new FormControl('', [
			Validators.required,
		]),
		last_name: new FormControl('', [
			Validators.required,
		]),
		email: new FormControl('', [
			Validators.required,
			// Validators.email,
			Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
		]),

		phone_number: new FormControl('', [
			Validators.required,
			Validators.minLength(7),
			Validators.maxLength(16),
			//Validators.pattern('^[0-9]*')
		]),
	})

	get control() {
		return this.ProfileFormGroup.controls;
	}

	ngOnInit(): void {
		this.userData = JSON.parse(localStorage['userData']);
		this.image_path = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"

		this.getProfile()
	}
	isNumberKey(evt)
	{
	   var charCode = (evt.which) ? evt.which : evt.keyCode;
	   if (charCode != 46 && charCode > 31 
		 && (charCode < 48 || charCode > 57))
		  return false;
	
	   return true;
	}
	getProfile() {
		var obj = {
			id: this.userData._id
		}
		this.CustomerService.getUserDetails().subscribe(data => {
			console.log(data);
			if (data.code == 200) {
				this.userDetails = data.data
				this.ProfileFormGroup.controls['first_name'].setValue(data.data.first_name);
				this.ProfileFormGroup.controls['last_name'].setValue(data.data.last_name);
				this.ProfileFormGroup.controls['email'].setValue(data.data.email);
				this.ProfileFormGroup.controls['phone_number'].setValue("+"+data.data.country_code+ data.data.phone_number);
				if (data.data.profile_image) {
					this.user_image = data.data.profile_image
				}
			}
		})
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
			 this.toastr.warning('Please upload image file')
			return;
		}
		console.log(evt.target.files[0])
		this.image = evt.target.files[0];
		const fr = new FileReader();
		fr.onloadend = (loadEvent) => {
			let mainImage = fr.result;
			self.profile_img = mainImage;
			// alert(self.profile_img)
		};
		fr.readAsDataURL(file);
	}

	uploadProfile() {
		if (this.ProfileFormGroup.valid) {
			var formdata: FormData = new FormData();
			formdata.append('id', this.userData._id)
			if(this.image){
				formdata.append('profile_image', this.image)
			}
			formdata.append('first_name', this.ProfileFormGroup.value.first_name),
			formdata.append('last_name', this.ProfileFormGroup.value.last_name),
			formdata.append('phone_number', this.ProfileFormGroup.value.phone_number),
			this.CustomerService.updateProfile(formdata).subscribe(data => {
				console.log(data);
				this.user_image = data.profile_image
				this.CommonService.sendProfileImg(data.profile_image)
				this.toastr.success("Profile updated successfully")
				this.router.navigate(["/myprofile"])
			})
		}
	}
	countryCode(evt){
		console.log("Country Code is >>>>",evt)
		this.countryDial='+'+ evt.dialCode
		console.log("Country Code is >>>>",this.countryDial)
	  }
}
