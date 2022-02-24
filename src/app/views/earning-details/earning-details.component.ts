import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-earning-details',
  templateUrl: './earning-details.component.html',
  styleUrls: ['./earning-details.component.scss']
})
export class EarningDetailsComponent implements OnInit {
  id: string;
  details=[];
  data

  constructor(private service:CustomerService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.paramMap.get('id')
    console.log("id is=====>",this.id);
    this.id=JSON.parse(localStorage.getItem('userData'))._id
    this.data=JSON.parse(localStorage.getItem('earning Details'))
    this.getEarningsList()
    console.log("jhasdgkjsgufdhedjfhdshfdhsfklhjdf",this.data);
    
    // setTimeout(() => {
    //   this.data=this.details.find(i=>i._id==this.id)
    //   console.log("wqeqweqweqweqw",this.data);
    // }
    //   ,2000)
  }
  getEarningsList(){
    var obj={
      professional_id:this.id,
      limit:100,
      offset:0,
      search:''
      
    }
    this.service.getEarnings(obj).subscribe(data=>{
      //console.log(data);
      this.details=data.data
      console.log("dfdsfdfdfdf",this.details);
     
     
     
      
      
    })
  }
}
