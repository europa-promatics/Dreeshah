import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment';

import { OwlOptions } from "ngx-owl-carousel-o";
@Component({
  selector: 'app-interior',
  templateUrl: './interior.component.html',
  styleUrls: ['./interior.component.scss']
})
export class InteriorComponent implements OnInit {
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
  interiorCatalogue=[]
  imgpath=environment.homeImg;
  constructor(    public CustomerService: CustomerService) { }

  ngOnInit(): void {
    this.getcatogory();
  }
  getcatogory() {
    let obj = {
      type: "interior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.interiorCatalogue=res.records
        console.log(this.interiorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }
}
