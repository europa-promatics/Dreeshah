import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  obj1
  status
  detail
  userData: any;
  constructor(public CustomerService: CustomerService,) { }

  ngOnInit(): void {
    this.userData=JSON.parse(localStorage.getItem("userData"))
    this.obj1={
      type:"terms_conditions",
      user_type:this.userData.user_type
    }

    this.CustomerService.getGeneralContents(this.obj1).subscribe(res =>{
			
			//console.log("Terms and Conditions Data=======:",res)
      this.detail=res.data	
      console.log("Terms and Conditions Data========>>>>>>",this.detail)
		
			
		  })

  }

  

}
