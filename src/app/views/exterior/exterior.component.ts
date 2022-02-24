import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment';

import { OwlOptions } from "ngx-owl-carousel-o";
@Component({
  selector: 'app-exterior',
  templateUrl: './exterior.component.html',
  styleUrls: ['./exterior.component.scss']
})
export class ExteriorComponent implements OnInit {
  exteriorCatalogue=[]
 
  imgpath=environment.homeImg;
  constructor( public CustomerService: CustomerService) { }
  related_products_slider: OwlOptions = {
    loop: true,
  
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    nav: true,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
  };
  ngOnInit(): void {
    this.getSubcatogory();
  }
  getSubcatogory() {
    let obj = {
      type: "exterior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.exteriorCatalogue=res.records
        console.log(this.exteriorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }
 
}
