import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-issue-gift',
  templateUrl: './issue-gift.component.html',
  styleUrls: ['./issue-gift.component.scss']
})
export class IssueGiftComponent implements OnInit {
  expiry:FormControl
  giftForm:FormGroup
  expiryDate:FormControl
  Note: FormControl;
  expiryForm:FormGroup
  customers=[];
  constructor(private service:CustomerService) { 
    this.giftForm=new FormGroup({
      code:new FormControl(""),
      value:new FormControl("")
    })
    this.expiryForm=new FormGroup({
      expiry:new FormControl(""),
      expiryDate:new FormControl("")
    })
    
   
  }

  ngOnInit(): void {
    this.getCustomerFromOrderItems()
    
  }
  getCustomerFromOrderItems(){
    var ob={
      limit:10,
      offset:0,
      professional_id:JSON.parse(localStorage.getItem("userData"))._id
    }
    this.service.getCustomerFromOrderItems(ob).subscribe(data=>{
      console.log("customers data is=========>",data);
      this.customers=data.data
    })
  }
 
  addGiftCard(){
    
    var ob={
      gift_card_code:this.giftForm.value.code,
      professional_id:JSON.parse(localStorage.getItem("userData"))._id,
      never_expires:this.expiryForm.value.expiry,
      expiry_date:this.expiryForm.value.expiryDate,
      value:this.giftForm.value.value,
      note:this.Note,
      customers:this.customers
    }
    this.service.addGiftCard(ob).subscribe(res=>{
      console.log("res is=========>",res);
      
    })
  }
}
