import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-catalogue-designing',
  templateUrl: './catalogue-designing.component.html',
  styleUrls: ['./catalogue-designing.component.scss']
})
export class CatalogueDesigningComponent implements OnInit {
  cataguesAlbum
  ImgSrc
  constructor(public CustomerService: CustomerService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCataloguesAccToSubSubCategory()
  }
  getCataloguesAccToSubSubCategory() {
    let obj = {
     // sub_sub_category_id: '',
      limit:10,
       offset:0
     
    };
    this.CustomerService.getCataloguesAccToSubSubCategory(obj).subscribe(
      (res) => {
        this.cataguesAlbum=res.records
        console.log(this.cataguesAlbum, "getCataloguesAccToSubSubCategory");
      }
    );
  }
}
