import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';

@Component({
  selector: 'app-customer-faq',
  templateUrl: './customer-faq.component.html',
  styleUrls: ['./customer-faq.component.scss']
})
export class CustomerFAQComponent implements OnInit {
  obj1
  status
  detail
  userData: any;
  panelOpenState = false;
  constructor(public CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem("userData"))
    this.obj1 = {
      user_type: this.userData.user_type
    }

    this.CustomerService.getFaqContents(this.obj1).subscribe(res => {

      this.detail = res.data;
    })

  }

}
