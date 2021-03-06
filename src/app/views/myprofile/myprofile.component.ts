import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { ToastrService } from 'ngx-toastr'
import { CommonServiceService } from '../../shared/common-service.service';
// import intlTelInput from 'intl-tel-input';

declare var $;
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  userData
  userDetails
  profile_img
  profile_image
  image_path
  user_image
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) { }

  ngOnInit(): void {
    this.image_path = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"
    this.userData = JSON.parse(localStorage['userData']);
    console.log(this.userData,"s")
    this.getProfile()
  }

  getProfile() {
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.userDetails = data.data
        if (data.data.profile_image) {
          this.user_image = data.data.profile_image
        }
        console.log("khgiuhg", this.userDetails)
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
    this.uploadProfile()
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      // this.toastr.warning('Please upload image file')
      return;
    }
    console.log(evt.target.files[0])
    this.profile_image = evt.target.files[0];
    this.uploadProfile()
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      self.profile_img = mainImage;
      // alert(self.profile_img)
    };
    fr.readAsDataURL(file);
  }

  uploadProfile() {
    var formdata: FormData = new FormData();
    formdata.append('profile_image', this.profile_image)
    formdata.append('id', this.userData._id)

    this.CustomerService.updateProfile(formdata).subscribe(data => {
      console.log(data);
      this.user_image = data.profile_image

      this.CommonService.sendProfileImg(data.profile_image);
  
    })
  }
}
