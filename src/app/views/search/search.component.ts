import { Component, OnInit } from '@angular/core';

declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  trp_slider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    nav: true,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
}

prdct_slider: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  margin: 10,
  nav: true,
  navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
}

services_slider: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  margin: 10,
  nav: true,
  navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 3
    }
  },
}
  products=[];
  professionals=[];
  services=[];
  profileUrl: string;
  prodUrl: string;
  imagePath: string;
  constructor(private service:CustomerService) { }

  ngOnInit(): void {
   this.profileUrl=environment.profileUrl
   this.prodUrl=environment.prodImg   
   this.imagePath=environment.image_path + "ProfessionalServices/"
  }
  search(event){
    var obj={
      limit:10,
      offset:0,
      search:event.target.value
    }
    this.service.search(obj).subscribe(data=>{
      console.log(data);
      this.products=data.SearchInProfessionalProduct
      this.services=data.SearchInProfessionalService
      this.professionals=data.professionalSearch
    })
  }
  
  
 

}
