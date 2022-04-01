import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';
import { FormBuilder, Validators } from "@angular/forms";
declare var $;
@Component({
  selector: 'app-customer-add-issue-quote',
  templateUrl: './customer-add-issue-quote.component.html',
  styleUrls: ['./customer-add-issue-quote.component.scss']
})
export class CustomerAddIssueQuoteComponent implements OnInit {
  days = new FormControl();

  daysList: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  user_type: string;
  _id: any;
  detail: any;
  modify: any;
  quote_id: any;

  constructor(private router: Router,  private route: ActivatedRoute,private CustomerService:CustomerService,public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
  }
  issueQuotationmodify(){
    if(this.user_type=="customer"){
   this._id=this.user_type
    }else{
  this._id=this.detail.professional_id
    }
  
    let obj={
      quotation_id:this.quote_id, 
      id:this._id
    }
    this.CustomerService.issueQuotationmodify(obj).subscribe(res=>{
      console.log("Response of the quotaion detail>>>>",res)
      
      this.modify =res.data
      console.log("quotation issue",this.detail)
      this.router.navigate(['/customer-quotation']);
    })
  }
}
