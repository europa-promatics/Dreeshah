import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  obj1
  status
  detail
  userData: any;
  constructor(public CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem("userData"))
    this.obj1={
      type:"privacy_policy",
      user_type:this.userData.user_type
    }


    this.CustomerService.getGeneralContents(this.obj1).subscribe(res =>{
			
			//console.log("Privacy Policy Data=======:",res)	
      this.detail=res.data;
      console.log("Privacy Policy Data is=====>",this.detail)
			
			
		  })

  }

}
