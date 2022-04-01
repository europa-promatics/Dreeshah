import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'

@Component({
  selector: 'app-sellerdiscounts',
  templateUrl: './sellerdiscounts.component.html',
  styleUrls: ['./sellerdiscounts.component.scss']
})
export class SellerdiscountsComponent implements OnInit {
  list=[];
  lists=[];
  listss=[];
  listsss=[];
  user: any;

  constructor( public CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("userData"))
    this.getlist1()
    this.getlist2()
    this.getlist3()
    this.getlist4()
  }
getlist1(){
  var obj={
    status:"all"
  }
  this.CustomerService.getdiscountlist(obj).subscribe(data=>{
    console.log("discount data is++++++",data)
    this.list=data.discount_list
    console.log("All discount list+++=",this.list);
    
  })
}
getlist2(){
  var obj={
    status:"active"
  }
  this.CustomerService.getdiscountlist(obj).subscribe(data=>{
    console.log("discount data is++++++",data)
    this.lists=data.discount_list
    console.log("All active list+++=",this.list);
    
  })
}
getlist3(){
  var obj={
    status:"scheduled"
  }
  this.CustomerService.getdiscountlist(obj).subscribe(data=>{
    console.log("discount data is++++++",data)
    this.listss=data.discount_list
    console.log("All scheduled list+++=",this.list);
    
  })
}
getlist4(){
  var obj={
    status:"expired"
  }
  this.CustomerService.getdiscountlist(obj).subscribe(data=>{
    console.log("discount data is++++++",data)
    this.listsss=data.discount_list
    console.log("All expired list+++=",this.list);
    
  })
}
}
