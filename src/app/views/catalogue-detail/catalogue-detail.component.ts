import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/shared/customer.service";

import { OwlOptions } from "ngx-owl-carousel-o";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-catalogue-detail",
  templateUrl: "./catalogue-detail.component.html",
  styleUrls: ["./catalogue-detail.component.scss"],
})
export class CatalogueDetailComponent implements OnInit {
  topPage = 0
  limit=5
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
  subcatlist: [];
  lengthi: any;
  allAlbumImg: any;
  catalogue_sub_sub_category
  album=[];

  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute,
    private toastr:ToastrService
  ) {}
  interiorSubCatalogue;
  subCatalogueId;
  imgpath = environment.homeImg;
  cataguesAlbum = [];
  catalogueSubcatId;
  ngOnInit(): void {
    // this.subCatalogueId = this.route.snapshot.paramMap.get("id");
    // this.getSubSubcatogory();

    // this.getCataloguesAccToSubSubCategory();
    this.subcatlisting()
    this.getSubSubcatogory()
  }
  // getIdCatalogue(id) {
  //   this.catalogueSubcatId = id;
  //   this.ngOnInit();
  // }
  getSubSubcatogory() {
    let obj = {
      sub_category_id: this.route.snapshot.paramMap.get('cata_id'),
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.interiorSubCatalogue = res.records;
        console.log(
          "fgfggfgfgfrws",res
        );
      }
    );
  }
  click(id) {
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
        // getIdCataloguethis.cataguesAlbum=res.data
        this.allAlbumImg = res.data;
        console.log(this.allAlbumImg, "cataguesAlbum");
      }
    );
  }
  paginationOptionChange(evt) {
    console.log("evthrm", evt)
    this.topPage = evt.pageIndex
   
   var obj = {
    id:this.route.snapshot.paramMap.get('cata_id'),
      
      limit: evt.pageSize,
       offset:  (evt.pageIndex * evt.pageSize)

     }
     this.CustomerService.getCataloguesAccToSubSubCategory(obj).subscribe(async data => {
       console.log("Response of all the subcategory listing>>>>>", data);
     
       
        this.subcatlist = data.data,
        this.album= data.data.album
        this.lengthi = data.count
       
     }) 
  }
  getPageSizeOptions() {
    return [5,10,25,100];
  }

  subcatlisting(){
    var obj = {
     id:this.route.snapshot.paramMap.get('cata_id'),
 limit:5,
 offset:0,
//  search:this.name
      }
     console.log("onnnn", obj)
     this.CustomerService.getCataloguesAccToSubSubCategory(obj).subscribe(data => {
           console.log("main data for subsubcat is ====", data)
           this.subcatlist = data.data
           this.album= data.data[0].album
           this.lengthi = data.count
           
         }, err => {
           console.log(err.status)
           if (err.status >= 404) {
             console.log('Some error occured')
           } else {
              this.toastr.error('Some error occured, please try again!!', 'Error')
             console.log('Internet Connection Error')
           }
         })
   }
  
}
