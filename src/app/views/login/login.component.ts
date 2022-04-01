import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { ToastrService } from 'ngx-toastr'

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
      'user_type': [null, Validators.compose([Validators.required])],
    })
  }
  hide = true;
  ngOnInit(): void {
    // this.user_type = 'customer'
  }

  login() {
    var obj = {}
    var obj1 = {}
    if (localStorage.getItem("cart_id")) {

      var cart_id = localStorage.getItem("cart_id")

      console.log("inside condition", cart_id)
      obj = {

        user_type: this.user_type,
        email: this.email,
        password: this.password,
        cart_id: cart_id
      }
    } else {
      console.log("inside else condition")
      obj = {
        user_type: this.user_type,
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
        localStorage['userData'] = JSON.stringify(data.user);
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

          this.router.navigate(['/dashboard']);
        } else if (data.user.user_type == 'professional') {
          this.router.navigate(['/seller-dashboard']);
        } else {
          this.router.navigate(['/photographerDashboard']);
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

}
