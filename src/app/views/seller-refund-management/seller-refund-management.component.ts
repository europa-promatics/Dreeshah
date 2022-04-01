import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-seller-refund-management',
  templateUrl: './seller-refund-management.component.html',
  styleUrls: ['./seller-refund-management.component.scss']
})
export class SellerRefundManagementComponent implements OnInit {

  id: any;
  details=[];
  totalEarnings: any[]=[];
  allEarnigns: any[]=[];
  stardDate: string;
  endDate: any;
  
 
 @ViewChild('toInput', {
    read: MatInput
 }) toInput: MatInput;
   constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.id=JSON.parse(localStorage.getItem('userData'))._id
    this.getEarningsList()
  }
  getEarningsList(){
    var obj={
      professional_id:this.id,
      limit:10,
      offset:0,
      
    }
    this.service.getEarnings(obj).subscribe(data=>{
      console.log(data);
      this.details=data.data
      this.allEarnigns=data.totalAmount;
      
    })
  }
  onSelectingStartDate(evt){
    console.log(evt);
    
    this.stardDate=evt.value
    var obj={
      professional_id:this.id,
      limit:10,
      offset:0,
      start_date:this.stardDate
    }
    this.service.getEarnings(obj).subscribe(data=>{
      console.log(data);
      this.details=data.data
      this.allEarnigns=data.totalAmount;
      
    })
  }
  onSelectingEndDate(event){
    this.endDate=event.value
    var obj={
      professional_id:this.id,
      limit:10,
      offset:0,
      start_date:this.stardDate,
      end_date:this.endDate
    }
    this.service.getEarnings(obj).subscribe(data=>{
      console.log(data);
      this.details=data.data
      this.allEarnigns=data.totalAmount;
      
    })
  }

}
