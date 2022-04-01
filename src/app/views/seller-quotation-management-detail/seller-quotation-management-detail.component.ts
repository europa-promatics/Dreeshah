import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'


@Component({
  selector: 'app-seller-quotation-management-detail',
  templateUrl: './seller-quotation-management-detail.component.html',
  styleUrls: ['./seller-quotation-management-detail.component.scss']
})
export class SellerQuotationManagementDetailComponent implements OnInit {
  ClosedQuotations=[];
  issue_quotation_Array=[];
 

  constructor(  public CustomerService: CustomerService, ) { }

  ngOnInit(): void {
    this. getClosedQuationOrders() 
  }
  getClosedQuationOrders() {
    var obj = {
      limit : 10,
      offset : 0,
      status : "all",
      search : "",
      filter : "",
      }
    //console.log("obj===", obj)
  
    this.CustomerService.getQuationOrders(obj).subscribe(async data => {
 
        this.ClosedQuotations = data.result
        console.log("Quotations management details",this.ClosedQuotations);
        var array= this.ClosedQuotations.map(res=>{return {issue_quotation:res.issue_quotation.map(data=>{
          return {paymentTerms:data.payment_terms.map(a=>{
            return {startDate:a.start_date,endDate:a.end_date}
            
          })}
        })
     
      }})
  
      })
      
    }
}
