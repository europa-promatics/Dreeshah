import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gallery } from '@ngx-gallery/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { CustomerService } from '../../shared/customer.service'

@Component({
  selector: 'app-seller-quotation-management',
  templateUrl: './seller-quotation-management.component.html',
  styleUrls: ['./seller-quotation-management.component.scss']
})
export class SellerQuotationManagementComponent implements OnInit {


  length
  quotationCount=0;
  pendingQuotations=[]
  user: any;
  user_type: any;

  CancelQuotations=[]
  ClosedQuotations=[]
  InProgressQuotation=[]
  service_name: any;
  CancelQuotations1=[]
  closedquote: any;

  constructor(public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user_type =JSON.parse(localStorage.getItem('userData'))
     
    this.getPendingQuationOrders()
    this.getInProgressQuationOrders()
    this.getClosedQuationOrders()
    this.getCancelQuationOrders()


    }
    filterByServiceName(value,statusQuo){
      var obj = {
        limit : 10,
        offset : 0,
        status : "pending",
        search :value,
        filter : "",
        }
      //console.log("obj===", obj)
    
      this.CustomerService.getQuationOrders(obj).subscribe(async data => {
         this.pendingQuotations = data.result
          console.log("pendingQuotations",this.pendingQuotations
          );
          
          this.quotationCount = data.count
          this.length = data.count
        }
  )

    }

  getPendingQuationOrders() {
    var obj = {
      limit : 10,
      offset : 0,
      status : "pending",
      search : "",
      filter : "",
      }
    //console.log("obj===", obj)
  
    this.CustomerService.getQuationOrders(obj).subscribe(async data => {
       this.pendingQuotations = data.result
        console.log("pendingQuotations",this.pendingQuotations
        );
        
        this.quotationCount = data.count
        this.length = data.count
      }
)
  }
  getInProgressQuationOrders() {
    var obj = {
      limit : 10,
      offset : 0,
      status : "inprogress",
      search : "",
      filter : "",
      }
    //console.log("obj===", obj)
  
    this.CustomerService.getQuationOrders(obj).subscribe(async data => {
     
        this.InProgressQuotation = data.result

        console.log("InProgressQuotation",this.InProgressQuotation
        );
        
        this.quotationCount = data.count
        this.length = data.count
      }
)
  }
  getClosedQuationOrders() {
    var obj = {
      limit : 10,
      offset : 0,
      status : "closed",
      search : "",
      filter : "",
      }
    //console.log("obj===", obj)
  
    this.CustomerService.getQuationOrders(obj).subscribe(async data => {
 
        this.ClosedQuotations = data.result

        

        console.log("ClosedQuotations",this.ClosedQuotations);
        
        this.quotationCount = data.count
        this.length = data.count
      }
)

  }
  getCancelQuationOrders() {
    var obj = {
      limit : 10,
      offset : 0,
      status : "cancel",
      search : "",
      filter : "",
      }
    //console.log("obj===", obj)
  
    this.CustomerService.getQuationOrders(obj).subscribe(async data => {
 
        this.CancelQuotations = data.result
       
        this.quotationCount = data.count
        this.length = data.count
      }
)
  }


}
