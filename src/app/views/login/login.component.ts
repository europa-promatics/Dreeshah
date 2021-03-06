import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  customerForm: FormGroup;
  email: any
  password: any
  user_type: any
  loginImage: any;
  auth2: any;

  

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
  ) {
    this.customerForm = this._formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
      'password': [null, Validators.compose([Validators.required])],
      // 'user_type': [null, Validators.compose([Validators.required])],
    })
  }
  hide = true;
  ngOnInit(): void {
    // this.googleAuthSDK();
    // this.user_type = 'customer'
    this.loginBackgroundImg()
    this.googleAuthSDK();
    this.login()
  }
  callLoginButton() {

   

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},

      (googleAuthUser) => {

   

        let profile = googleAuthUser.getBasicProfile();
        console.log('profile: ', profile);

        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);

        console.log('ID: ' + profile.getId());

        console.log('Name: ' + profile.getName());

        console.log('Image URL: ' + profile.getImageUrl());

        console.log('Email: ' + profile.getEmail());
        var obj = {
          social_id:profile.getId(),
          social_type:'google',
          profile_image:profile.getImageUrl(),
          first_name:profile.getName().split(' ')[0],
          last_name:profile.getName().substr(profile.getName().indexOf(" ") + 1),
          email:profile.getEmail()
        }
        console.log('obj: ', obj);

        this.CustomerService.socialLogin(obj).subscribe(res=>{
          console.log(res.user)
          // if(res.user.social_id){
          //   localStorage["social_login"]=true
          // }
          localStorage['userData'] = JSON.stringify(res.user);
        localStorage.setItem("remember_me", "yes"),
          localStorage.setItem("token", res.token),
          console.log("login_res", res)
        localStorage["isLoggedIn"] = true,
          this.toastr.success('Login successful', 'Success')
          this.router.navigate(['/myprofile']);
          this.ngOnInit()
        })
        
       /* Write Your Code Here */

   

      }, (error) => {

        alert(JSON.stringify(error, undefined, 2));

      });

 

  }

  googleAuthSDK() {

   

    window['googleSDKLoaded'] = () => {

      window['gapi'].load('auth2', () => {

        this.auth2 = window['gapi'].auth2.init({

          client_id: '865315456867-qj21ifohf6p5tpnns7hltjungo1qjun0.apps.googleusercontent.com',

          cookiepolicy: 'single_host_origin',

          scope: 'profile email'

        });

        this.callLoginButton();

      });

    }

   

    (function(d, s, id){

      var js, fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id)) {return;}

      js = d.createElement(s); js.id = id;

      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";

      fjs.parentNode.insertBefore(js, fjs);

    }(document, 'script', 'google-jssdk'));

 

  }

  login() {
    this.customerForm.markAllAsTouched();
    console.log(this.customerForm);
    var obj = {}
    var obj1 = {}
    if (localStorage.getItem("cart_id")) {

      var cart_id = localStorage.getItem("cart_id")

      console.log("inside condition", cart_id)
      obj = {

        // user_type: this.user_type,
        email: this.email,
        password: this.password,
        cart_id: cart_id
      }
    } else {
      console.log("inside else condition")
      obj = {
        // user_type: this.user_type,
        email: this.email,
        password: this.password
      }
    }

    /* if(localStorage.getItem("wishlist_id")){
            
      var wishlist_id = localStorage.getItem("wishlist_id")
      // console.log("inside condition", cart_id)
      obj1 = {
        user_type: this.user_type,
        email: this.email,
        password: this.password,
        wishlist_id: wishlist_id
      }
    }else{
      console.log("inside else condition")
      obj1 = {
        user_type: this.user_type,
        email: this.email,
        password: this.password
      }
    } */


    this.CustomerService.login(obj).subscribe(data => {
      console.log(data)
      if (data.status == '200' || data.code == 200) {
        // localStorage['userData'] = JSON.stringify(data.user);
        localStorage.setItem('userData',JSON.stringify(data.user));
        localStorage.setItem("remember_me", "yes"),
          localStorage.setItem("token", data.token),
          console.log("login_res", data)
        localStorage["isLoggedIn"] = true,
          this.toastr.success('Login successful', 'Success')
        if (data.user.user_type == 'customer') {
          // if(data.user._id){
          //   localStorage.setItem('user_Data',JSON.stringify(data.user));
          //   this.router.navigate(['/mychat'])
          // }else{
          //   this.toastr.error("Somthing bed happen")
          // }

          this.router.navigate(['/myprofile']);
         
         
        } else if (data.user.user_type == 'professional') {
          this.router.navigate(['/seller-profile-view']);
        
        } else {
          this.router.navigate(['/photographerProfile']);
        }
      } else {
        this.toastr.error('Invalid Credentials, please try again', 'Error')

      }
    }, err => {
      console.log(err)
      let errors = err.error.errors.msg
      if (err.status > 400) {
        this.toastr.error("Incorrect Username or Password");
        // this.loading = false;
      } else {
        console.log(err)
        // this.loading = false;
        this.toastr.error("Incorrect Username or Password");
      }
      // this.toastr.error('Invalid Credentials, please try again', 'Error')

    })
  }



    // 13-June-2022 login backgroundimage-----------------------------------------------------------

    loginBackgroundImg(){
      var obj={
        user_type: 'login_page'
      }
  
      this.CustomerService.signupBackgroungImage(obj).subscribe(res => {
        console.log("response of loginnnnn Image>>>> ",res);
        this.loginImage=res.data[0].background_image
        console.log("this.loginImage",this.loginImage);
        
        
      })
  
    }

}
