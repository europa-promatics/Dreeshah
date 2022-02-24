import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $;
@Component({
  selector: 'app-seller-order-management',
  templateUrl: './seller-order-management.component.html',
  styleUrls: ['./seller-order-management.component.scss']
})
export class SellerOrderManagementComponent implements OnInit {
  Form1: FormGroup;
  token
  orderData
  submit_button
  divHide2=true;
  quantity
  pcs
  status
  userData
  orderDetail: any;
  constructor(public CustomerService: CustomerService,
    public formBuilder: FormBuilder,
    private router: Router,) {

      this.Form1 = this.formBuilder.group({
        'quantity': [null, Validators.compose([Validators.required])],
        'pcs': [null, Validators.compose([Validators.required])],
        'status':[null, Validators.compose([Validators.required])],   
    
        }) ;
     }

  ngOnInit(): void {

    this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null
    console.log("Data of the user is:",this.userData)
    this.CustomerService.getOrderPurchasedByUserList().subscribe(res =>{
      //console.log(res)
      this.orderData=res.result;
      console.log("Order Purchased By User:",this.orderData)
    })

    $(document).ready(function(){
      $("#card-btn").click(function(){
        $(".card-form").toggle();
      });
       $("#address-btn").click(function(){
        $(".order-address-details-form").toggle();
      });
    });

  }
  orderDetails(details){
    this.orderDetail=details
    localStorage.setItem("orderDetails",JSON.stringify(details))
    this.router.navigate(['/order-details'])
  }
  submit(){
    this.submit_button = true
    this.divHide2 = false;
    if (!this.Form1.valid ) {
      //this.toastr.error("Please fill required fields")
      return
    }
    console.log("Data of the form is",this.Form1.value)
    
  }
  filterByServiceName(value,statusQuo){
console.log("value is====",value)
  }
  ClicKFunction2(){
    //console.log("function os called====")
    
    this.divHide2=true;
  }
}
