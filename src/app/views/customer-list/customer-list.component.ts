import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customers=[];

  constructor(private srvice:CustomerService) { }

  ngOnInit(): void {
    this.getCsutomers()
  }
  getCsutomers(){
    var obj={
      limit:10,
      offset:0,
      professional_id:JSON.parse(localStorage.getItem("userData"))._id
    }
    this.srvice.getCustomerFromOrderItems(obj).subscribe(data=>{
      console.log("customers are=====>",data);
      this.customers=data.data
    })
  }

}
