import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { CommonServiceService } from '../../shared/common-service.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss']
})
export class ConsultantHeaderComponent implements OnInit {
  image_path
  userData
  userDetails
  user_image
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    public CommonService: CommonServiceService
  ) {
    this.subscription = this.CommonService.getProfileImg().subscribe(x => {
      console.log('-----x', x)
      this.user_image = x
    });
  }
  subscription: Subscription;
  ngOnInit(): void {
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
    this.image_path = environment.image_path + "userProfile/"
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
  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  
    myProfile(){
      if(this.userData != null){
 this.userData.user_type == 'photographer';
        this.router.navigate(['/photographerProfile']);
        
      }else{
        this.router.navigate(['/login'])
        }
    
    }
    dashboard(){
      if(this.userData != null){
        this.userData.user_type == 'photographer'
        this.router.navigate(['/photographerDashboard']);
       
        }else{
        this.router.navigate(['/login'])
        }

    }
}
