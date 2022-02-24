import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {
  id: any;
  details=[];
  totalEarnings: any[]=[];
  allEarnigns: any[]=[];
  stardDate: string;
  endDate: any;
  @ViewChild('fromInput', {
    read: MatInput
 }) fromInput: MatInput;
 
 @ViewChild('toInput', {
    read: MatInput
 }) toInput: MatInput;
  user: any;
   constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('userData'))
    this.id=JSON.parse(localStorage.getItem('userData'))._id
    this.getEarningsList()
  }
  filter(event){
    var obj={
      professional_id:this.id,
      limit:10,
      offset:0,
      search:event.target.value
      
    }
    console.log("search is===",obj.search)
    this.service.getEarnings(obj).subscribe(data=>{
      console.log(data);
      if(data.data){
      this.details=data.data
      
      this.allEarnigns=data.totalAmount;
      }
    },err=>{
      this.details=[]
    })
  }
  getEarningsList(){
    var obj={
      professional_id:this.id,
      limit:10,
      offset:0,
      search:''
      
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
      offser:0,
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
      offser:0,
      start_date:this.stardDate,
      end_date:this.endDate
    }
    this.service.getEarnings(obj).subscribe(data=>{
      console.log(data);
      this.details=data.data
      this.allEarnigns=data.totalAmount;
      
    })
  }
  fun(item){
    localStorage.setItem("earning Details",JSON.stringify(item))
  }

}
