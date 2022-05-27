import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { ToastrService } from 'ngx-toastr'
import { CommonServiceService } from '../../shared/common-service.service';

import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-photographer-profile',
  templateUrl: './photographer-profile.component.html',
  styleUrls: ['./photographer-profile.component.scss']
})
export class PhotographerProfileComponent implements OnInit {
  userData
  userDetails
  imgpath=environment.profileUrl;
  profile_img
  profile_image
  image_path
  user_image
  userServices = []
  SubServices=[]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) { }

  ngOnInit(): void {
    // $(document).ready(function(){
    //    $("#add-address-btn").click(function(){
    //    	alert("clicked")
    //      $(".add-address-form").toggle();
    //    });
    //  });
    this.image_path = environment.image_path + "userProfile/"
    this.userData = JSON.parse(localStorage['userData']);
    this.getProfile()

    $(document).on("click", "#addressBtn", function () {
      $(".add-address-form").toggle();
    });
  }

  getProfile() {
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.userDetails = data.data
        this.userServices = this.userDetails.service_categories
        this.SubServices=this.userDetails.service_subcategories
        if (data.data.profile_image) {
          this.user_image = data.data.profile_image
        }
        console.log("khgiuhg", this.userDetails)
        console.log(' this.userServices', this.userServices);
        
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
      this.ngOnInit()
    })
  }

  toggleLogo(event){
    console.log('------event------',event.target.checked)
    var obj = {
      user_id:this.userData._id,
      show_logo_image:event.target.checked
    }
    this.CustomerService.activeInactiveProfileImageAndLogo(obj).subscribe(data=>{
      console.log(data)
      this.toastr.success('Status Changed Successfully')
    })
  }

}
