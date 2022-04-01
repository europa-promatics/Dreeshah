import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-customer-quotation-details',
  templateUrl: './customer-quotation-details.component.html',
  styleUrls: ['./customer-quotation-details.component.scss']
})
export class CustomerQuotationDetailsComponent implements OnInit {

  id
  detail
  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id')
    console.log("ID of the quoDetail>>>>>",this.id)

    var obj={
      quotation_id : this.id
    }
    this.CustomerService.customerQuotationDetail(obj).subscribe(res=>{
      console.log("Response of the quotaion detail>>>>",res)
      this.detail =res.details
      console.log("Response of the quotaion detail>>>>",this.detail)
    })
  }

}
