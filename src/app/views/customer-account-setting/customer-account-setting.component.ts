import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer-account-setting',
  templateUrl: './customer-account-setting.component.html',
  styleUrls: ['./customer-account-setting.component.scss']
})
export class CustomerAccountSettingComponent implements OnInit {
  image_path: string;
  userData: any;
  userDetails: any;
  user_image: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService) { }

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
        console.log("khgiuhg", this.userDetails)
      }
    })
  }

  clickNotification() {
    this.router.navigateByUrl('/customer-notification');
  }

  clickFAQ() {
    this.router.navigateByUrl('/customer-faq');
  }
  clickTermAndCondition() {
    this.router.navigateByUrl('/customer-term-and-condition');
  }
  clickPrivacyPolicy() {
    this.router.navigateByUrl('/customer-privacy-policy');
  }

}
