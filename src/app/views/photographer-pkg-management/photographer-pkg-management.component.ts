import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-photographer-pkg-management',
  templateUrl: './photographer-pkg-management.component.html',
  styleUrls: ['./photographer-pkg-management.component.scss']
})
export class PhotographerPkgManagementComponent implements OnInit {
  packages=[];

  constructor(private service:CustomerService) { }

  ngOnInit(): void {
    this.getPackages()
  }
  getPackages(){
    var obj={
      type:"photographer"
    }
    this.service.packagelist(obj).subscribe(data=>{
      console.log("packages are++======>",data);
      this.packages=data.data
    })
  }
}
