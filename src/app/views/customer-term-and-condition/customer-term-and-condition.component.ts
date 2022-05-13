import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';


@Component({
  selector: 'app-customer-term-and-condition',
  templateUrl: './customer-term-and-condition.component.html',
  styleUrls: ['./customer-term-and-condition.component.scss']
})
export class CustomerTermAndConditionComponent implements OnInit {

  obj1
  status
  detail
  userData: any;
  constructor(public CustomerService: CustomerService,) { }


  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    this.obj1 = {
      type: "terms_conditions",
      user_type: this.userData.user_type
    }

    this.CustomerService.getGeneralContents(this.obj1).subscribe(res => {

      this.detail = res.data
      console.log("Terms and Conditions Data========>>>>>>", this.detail)
    })

  }

}



