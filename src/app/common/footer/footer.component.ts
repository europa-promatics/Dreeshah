import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import * as moment from 'moment'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerData
  year
  constructor(
    public CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {

    this.year = moment(new Date()).format('YYYY');
    console.log("Current Year is>>>",this.year);
    this.CustomerService.getHomeSectionFooter().subscribe(res => {
      console.log("Data Of the Home Section Footer>>>>",res)
       this.footerData=res.result
       console.log("Data of the Home Section Footer>>>>>",this.footerData)
       
       })
  }

}
