import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer-privacy-policy',
  templateUrl: './customer-privacy-policy.component.html',
  styleUrls: ['./customer-privacy-policy.component.scss']
})
export class CustomerPrivacyPolicyComponent implements OnInit {
  obj1
  status
  detail
  userData: any;
  constructor(public CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    this.obj1 = {
      type: "privacy_policy",
      user_type: this.userData.user_type
    }
    this.CustomerService.getGeneralContents(this.obj1).subscribe(res => {
      this.detail = res.data;
      console.log("Privacy Policy Data is=====>", this.detail)


    })

  }

}



