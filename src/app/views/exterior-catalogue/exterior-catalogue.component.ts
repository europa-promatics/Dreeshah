import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/shared/customer.service";

import { OwlOptions } from "ngx-owl-carousel-o";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-exterior-catalogue",
  templateUrl: "./exterior-catalogue.component.html",
  styleUrls: ["./exterior-catalogue.component.scss"],
})
export class ExteriorCatalogueComponent implements OnInit {
  topPage=0
  limit=5
  exteriorSubCatalogue = [];
  subcatlist;
  subCatalogueId;
  catalogueSubcatId;
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
  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  imgpath = environment.homeImg;
  ngOnInit(): void {
    this.subCatalogueId = this.route.snapshot.paramMap.get("id");
    this.getSubSubcatogory();
    this.getCataloguesAccToSubSubCategory();
  }
  click(id) {
    this.catalogueSubcatId = id;
    this.ngOnInit();
  }
  getSubSubcatogory() {
    let obj = {
      sub_category_id: this.subCatalogueId,
      offset: 0,
      limit: 5,
    };
    this.CustomerService.getCatalogueSubSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.exteriorSubCatalogue = res.records;
        console.log('gsfdgsgsggsggfsdgd',
          this.exteriorSubCatalogue
        
        );
      }
    );
  }
  getIdCatalogue(id) {
    this.catalogueSubcatId = id;
    this.ngOnInit();
  }
  getCataloguesAccToSubSubCategory() {
    let sub_sub_category_id = "";
    if (this.catalogueSubcatId) {
      sub_sub_category_id = this.catalogueSubcatId;
    }
    let obj = {
      sub_sub_category_id: sub_sub_category_id,
    };
    this.CustomerService.getCataloguesAccToSubSubCategory(obj).subscribe(
      (res) => {
        // this.cataguesAlbum=res.data
        this.subcatlist = res.data;
        console.log("cataguessublist",this.subcatlist);
      }
    );
  }
  paginationOptionChange(evt) {
    console.log("evthrm", evt)
    this.topPage = evt.pageIndex
   
   var obj = {
    id:this.route.snapshot.paramMap.get('id'),
      
      limit: evt.pageSize,
       offset:  (evt.pageIndex * evt.pageSize)

     }
     this.CustomerService.getCataloguesAccToSubSubCategory(obj).subscribe(async data => {
       console.log("Response of all the subcategory listing>>>>>", data);
     
       
        // this.subcatlist = data.data,
        // this.album= data.data.album
        // this.lengthi = data.count
       
     }) 
  }
  getPageSizeOptions() {
    return [5,10,25,100];
  }
}
