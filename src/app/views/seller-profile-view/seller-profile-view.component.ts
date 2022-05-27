import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-seller-profile-view',
  templateUrl: './seller-profile-view.component.html',
  styleUrls: ['./seller-profile-view.component.scss']
})
export class SellerProfileViewComponent implements OnInit {
  userData
  userDetails
  profile_img
  profile_image
  image_path
  user_image
  logo_image: any;
  constructor(
    public CustomerService: CustomerService,
    public CommonService: CommonServiceService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.image_path = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"
    this.userData = JSON.parse(localStorage['userData']);
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
        if (data.data.logo) {
          this.logo_image = data.data.logo
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
      this.ngOnInit()
    })
  }
  
  toggleLogo(event){
    console.log('------event------',event.checked)
    var obj = {
      user_id:this.userData._id,
      show_logo_image:event.checked
    }
    this.CustomerService.activeInactiveProfileImageAndLogo(obj).subscribe(data=>{
      console.log(data)
      this.toastr.success('Status Changed Successfully')
    })
  }

}
