import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonServiceService } from '../../shared/common-service.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-db-header',
  templateUrl: './db-header.component.html',
  styleUrls: ['./db-header.component.scss']
})
export class DbHeaderComponent implements OnInit {
  image_path
  userData
  userDetails
  user_image
  categories = []
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) { 
    this.subscription = this.CommonService.getProfileImg().subscribe(x => {                  
        console.log('-----x',x)
        this.user_image = x
    });
  }


  ngOnInit(): void {
    this.getCatAndSubCat()
    $('.User-avtar').click(function () {
      if ($(".User-Dropdown").hasClass("U-open")) {
        $('.User-Dropdown').removeClass("U-open");
      }
      else {
        $('.User-Dropdown').addClass("U-open");
      }
    });
    $('.moreless-button').click(function () {
      $('.moretext').slideToggle();
      if ($('.moreless-button').text() == "View All") {
        $(this).text("View Less")
      } else {
        $(this).text("View All")
      }
    });
    this.image_path = "https://developers.promaticstechnologies.com/dreeshah_apis/public/userProfile/"
    this.userData = JSON.parse(localStorage['userData']);
    this.getProfile()
  }

  getProfile() {
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.userDetails = data.data
        if (data.data.profile_image) {
          this.user_image = data.data.profile_image
        }
      }
    })
  }

  getCatAndSubCat(){
    this.CustomerService.getCatAndSubCat().subscribe(data => {
      console.log(data);
      if (data.code == 200) {
        this.categories = data.data
        
      }
    })
  }

  navigate(cat_id,sub_id) {
    this.router.navigate(['/services/', cat_id,sub_id]);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  
  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
