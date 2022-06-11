import { Component, OnInit } from '@angular/core';
declare var $;
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../../shared/customer.service';
import {environment} from '../../../../environments/environment.prod';
import { Router, Route,ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-view-single-project-list',
  templateUrl: './view-single-project-list.component.html',
  styleUrls: ['./view-single-project-list.component.scss']
})
export class ViewSingleProjectListComponent implements OnInit {

  heroOpt: OwlOptions = {
    loop: true,
    mouseDrag: false,
    items:1,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    animateOut: 'fadeOut',
    URLhashListener:true,
      autoplayHoverPause:true,
      startPosition: 'URLHash',
    navText: ['<i class="far fa-long-arrow-left"></i>', '<i class="far fa-long-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
}
id
imgArr=[]
imgUrl
category=[]
website
style
description
subCategory=[]
cost
year
keywords=[]
projectName
location
  data: any;
  constructor(public CustomerService: CustomerService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id
    this.imgUrl=environment.projImg
    this.getDetails()
  }
  getDetails(){
    var b={
      project_id:this.id
    }
    this.CustomerService.getProjectById(b).subscribe(res =>{
      console.log('ressssss',res)
      this.data = res.result
      console.log('this.data: ', this.data);
      this.imgArr=res.result.project_images
      this.category=res.result.project_category
      this.subCategory=res.result.project_sub_category
      this.style=res.result.project_style.name
      this.year=res.result.project_year
      this.cost=res.result.project_cost
      this.website=res.result.project_website
      this.keywords=res.result.project_keyword
      this.projectName=res.result.project_name
      this.location=res.result.project_address
      this.description=res.result.project_description

      console.log('keeeeeeeeee',this.keywords);
      

    })
  }
}
