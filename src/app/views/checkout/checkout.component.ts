import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
} from "@angular/forms";
import { CustomerService } from "../../shared/customer.service";
import { ToastrService } from "ngx-toastr";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { Router, ActivatedRoute, Params } from "@angular/router";

declare var $;
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  checked:boolean=false
  form1: FormGroup;
  form2: FormGroup;
  phoneForm: FormGroup;
  fname;
  lname;
  product_id;
  professional_id;
  quantity;
  aline1;
  aline2;
  city;
  state;
  zcode;
  phone;
  namecard;
  numbercard;
  datecard;
  cvv;
  submit_button = false;
  submit_button2 = false;
  addressdetails: any;
  cardsdetails;
  latestAddress;
  streetName;
  streetNumber;
  area;
  country;
  country_ph_code;
  buildingNumber;
  buildingName;
  len: any;
  arr1 = [];
  hideNum = [];
  cardsLength;
  changedNum = [];
  price;
  addObj;
  orederObj;
  UserId;
  isLogin;
  userId;
  cartDetail;
  obj1;
  obj2;
  productObj = [];
  files = [];
  files2 = [];
  obj3;
  divHide1 = true;
  divHide2 = true;
  Items;
  qty;
  itemId;
  tokenid
  addline1;
  addline2;
  streetNum;
  buildingNum;
  pincode;
  phoneNo;
  selectedCountry: any;
  selectedState: any;
  states;
  cities;
  countries;
  countryDial;
  addType;
  professionalIdArr = [];
  productsList = [];
  landmark;
  address_type;
  checkoutData = {};
  handler:any = null;
  public today = new Date().toJSON().split("T")[0];
  locations: any[]=[];
  LogCity: any;

  constructor(
    public formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form1 = this.formBuilder.group({
      fname: [null, Validators.compose([Validators.required])],
      lname: [null, Validators.compose([Validators.required])],
      addline1: [null, Validators.compose([Validators.required])],
      addline2: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      country: [null, Validators.compose([Validators.required])],
      pincode: [null, Validators.compose([Validators.required])],
      area: [null, Validators.compose([Validators.required])],
      addType: [null, Validators.compose([Validators.required])],
      //'phone':[null, Validators.compose([Validators.required])],
      //'streetName':[null, Validators.compose([Validators.required])],
      //'streetNumber':[null, Validators.compose([Validators.required])],
      //'buildingNumber':[null, Validators.compose([Validators.required])],
      //'buildingName':[null, Validators.compose([Validators.required])],
    });

    this.phoneForm = new FormGroup({
      phone: new FormControl("", [Validators.required]),
    });

    this.form2 = this.formBuilder.group({
      namecard: [null, Validators.compose([Validators.required])],
      numbercard: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]{12}(?:[0-9]{4})?$"),
        ]),
      ],
      datecard: [null, Validators.compose([Validators.required])],
      cvv: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(3)]),
      ],
    });
  }

  ngOnInit(): void {
    
    this.getCountries();
    this.loadStripe();
    this.getLogCities()
    this.price = this.route.snapshot.paramMap.get("total");
    this.qty = this.route.snapshot.paramMap.get("qty");
    this.itemId = this.route.snapshot.paramMap.get("id");
    this.isLogin = localStorage.getItem("isLoggedIn");
    console.log(this.isLogin);
    if (!this.isLogin && localStorage.getItem("session_data")) {
      this.userId = localStorage.getItem("session_data");
    } else {
      this.userId = "";
    }

    console.log("this.userId", this.userId);
    this.obj1 = {
      user_id: this.userId,
    };
    if (this.itemId) {
      this.files.push(this.itemId);
      this.files2.push(this.qty);
    } else {
      this.cartDetails();
    }

    //console.log("In the ng onit=====",this.cartDetail)
    // this.files.forEach(element => {
    //   .append('project_images', element)
    // });

    this.CustomerService.addressLists().subscribe((res) => {
      console.log("Address Response=========", res);
      this.addressdetails = res.data.address_details;
      this.latestAddress = this.addressdetails.length;
      //console.log("Length of the array of address=======",this.latestAddress)
      this.len = this.latestAddress - 1;
      //console.log("Length to be sent for latest address",this.len)
      console.log("Address Details======>>>>", this.addressdetails);

      this.addressdetails.forEach((element) => {
        console.log(element, "addressdetails");

        if (element.is_default == "no") {
          this.fname = element.first_name;
          this.lname = element.last_name;
          this.addline1 = element.address_line1;
          this.addline2 = element.address_line2;
          this.streetNum = element.street_number;
          this.streetName = element.street_name;
          this.area = element.area;
          this.buildingNum = element.building_number;
          this.buildingName = element.building_name;
          this.country = element.country;
          this.state = element.state;
          this.city = element.city;
          this.pincode = element.zip_code;
          this.phoneNo = element.phone_number;
          this.address_type = element.address_type;
          this.landmark = element.landmark;
        }
        // console.log("ID from the for each",this.addId)
      });
      
      
    });

    this.CustomerService.cardsLists().subscribe((res) => {
      console.log("Card holder Details Response=========", res);
      this.cardsdetails = res.data;
      console.log("Cards holder Details======>>>>", this.cardsdetails);
      this.cardsLength = this.cardsdetails.length;
      this.getcardnum();
    });

    $(document).ready(function () {
      $("#card-btn").click(function () {
        $(".card-form").toggle();
      });
      $("#address-btn").click(function () {
        $(".order-address-details-form").toggle();
      });
    });
  console.log("logcity=======",this.LogCity);
  
  }

  cartDetails() {
    let obj = {
      user_id: this.userId,
      // session_id:session_data.session_id
    };
    console.log("inside cart details component", this.obj1);
    if (!this.isLogin) {
      this.CustomerService.cartDetailGuest(obj).subscribe((res) => {
        console.log("Cart Details:", res);
        this.cartDetail = res.data.ProffesionalObj;
        console.log(this.cartDetail);
        this.cartDetail.forEach((element) => {
          this.obj3 = element._id;
        });
        console.log("reponse====>>>", this.obj3);
      });
    } else {
      this.CustomerService.cartDetail().subscribe((res) => {
        this.cartDetail = res.data.ProffesionalObj;
        
        this.cartDetail.forEach((element) => {
          console.log(element, " element =======================");

            console.log( element.ProductDetails.available_size.size);
            console.log(element.ProductDetails.available_color.color_code);
            console.log( element.ProductDetails.available_size.size);
            

            let tmp = {
              professional_id: element.professional_id,
              amount: element.ProductDetails.pricing.price,
              products: [],
            };
            let product = {
              product_id: element.product_id,
              product_quantity: element.quantity,
              color_name: element.ProductDetails.available_color.color_name,
              color_code: element.ProductDetails.available_color.color_code,
              size: element.ProductDetails.available_size.size,
              size_unit: element.ProductDetails.weight_details.unit,
            };
            tmp.products.push(product);
            this.productObj.push(tmp);
        });       
      });
    }
  }
  datacart(cartdata) {}
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getcardnum() {
    for (let i = 0; i < this.cardsLength; i++) {
      this.arr1.push(this.cardsdetails[i].card_number);
      this.cardHide(this.cardsdetails[i].card_number);
    }
    console.log(
      "Response of the array cardsNumbers for the numbers are:",
      this.arr1
    );
  }

  insertSlash(val) {
    return val.match(new RegExp(".{1,2}", "g")).join("/");
  }

  cardHide(card) {
    this.hideNum = [];
    for (let i = 0; i < card.length; i++) {
      if (i < card.length - 4) {
        this.hideNum.push("X");
      } else {
        this.hideNum.push(card[i]);
      }
    }
    return this.hideNum.join("");
    // console.log("Final Response of the array",this.hideNum.join(""));
    // this.changedNum.push(this.hideNum.join(""))
    // console.log("Final Response for the Number Manipulated=======>>>>>>",this.changedNum)
  }

  submitAddress() {
    this.submit_button = true;
    console.log(this.form1.value, "form1valueeeeeeee");
    console.log(this.form1.value.aline1);

    var formData = new FormData();
    formData.append("first_name", this.form1.value.fname);
    formData.append("last_name", this.form1.value.lname);
    formData.append("address_line1", this.form1.value.addline1);
    formData.append("address_line2", this.form1.value.addline2);
    formData.append("city", this.form1.value.city);
    formData.append("state", this.form1.value.state.name);
    formData.append("country", this.form1.value.country.name);
    formData.append("zip_code", this.form1.value.pincode);
    formData.append("country_ph_code", this.countryDial);
    formData.append("phone_number", this.phoneForm.value.phone);
    formData.append("landmark", this.form1.value.area);
    formData.append("address_type", this.form1.value.addType);
   
    //formData.append('street_name', this.form1.value.streetName);
    //formData.append('street_number', this.form1.value.streetNumber);
    //formData.append('building_name', this.form1.value.buildingName);
    // formData.append('building_number', this.form1.value.buildingNumber);

    if (!this.form1.valid) {
      //this.toastr.error("Please fill required fields")
      return;
    } else {
      this.divHide1 = false;
      console.log("Enter in the service block");
      this.CustomerService.addNewAddres(formData).subscribe((res) => {
        console.log("After Submission Response======", res);
        this.toastr.success("Address added sucessfully");
        //this.router.navigate(['/seller-product-list']);
        this.ngOnInit();
      });
    }
  }

  submitCard() {
    this.submit_button2 = true;
    console.log(
      this.form2.value.datecard,
      "cvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
    );

    var formData = new FormData();
    formData.append("card_holder_name", this.form2.value.namecard);
    formData.append("card_number", this.form2.value.numbercard);
    formData.append("expiry_date", this.form2.value.datecard);
    formData.append("cvv", this.form2.value.cvv);

    if (!this.form2.valid) {
      //this.toastr.error("Please fill required fields")
      return;
    } else {
     
      //console.log("CARD Submitted=====>>>>>>>")
      this.CustomerService.addNewCards(formData).subscribe((res) => {
        console.log("After Submission Card Response======", res);
        this.toastr.success("Card added sucessfully");
        this.ngOnInit();
         this.divHide2 = false;
        //this.router.navigate(['/seller-product-list']);
      });
    }
  }

  prodCheckOut() 
  {
    console.log("gfsdhgdsfhbfdhbdbbtedgh",this.fname);
    var self=this;
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: function (token: any) {
        this.tokenid=token;
        console.log(token)
        self.saveOrder()
      }
    });
    handler.open({
     
      amount: this.price*100
    });
    const user = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {};
    console.log(user, "user");
    this.UserId = user._id;
    console.log(this.UserId, "hiii");
    console.log(
      this.productsList,
      "this.productsList this.productsList this.productsList"
    );

 
  }
  saveOrder(){
    this.addObj = {
      first_name: this.fname,
      last_name: this.lname,
      address_line1: this.addline1,
      address_line2: this.addline2,
      city: this.city,
      state: this.state,
      zip_code: this.pincode,
      phone_number: this.phoneNo,
      country: this.country,
      country_ph_code: this.countryDial,
      
      address_type: this.address_type,
      landmark: this.landmark,
    };

    var obj2 = {
      user_id: this.UserId,
      amount: this.price,
      token:this.tokenid,
      logistic_location_id: this.LogCity,
      order_items: this.productObj,
      address: this.addObj,
    };
    
    console.log("By Default Address is:", this.addObj);
    console.log("logcity=======",this.LogCity);
    if (this.addressdetails.length > 0){
      if (this.cardsdetails.length > 0 && this.isCardSel.length) {
        this.CustomerService.ordersCheckout(obj2).subscribe((res) => {
          console.log("After Submission Checkout Response======", res);
          this.toastr.success("Order Placed Successfull");
        });
        this.router.navigate(["/myorders"]);
      } else {
        this.toastr.error("Please Add and select card detail");
      }
    } else {
      this.toastr.error("Please Add Address");
    }
  }
  getLogCities(){
    this.CustomerService.getLogisticLocations().subscribe(data=>{
      console.log("log data is============>",data);
      this.locations=data.locations
    })
  }

  ClicKFunction1() {
    //console.log("function os called====")
    this.divHide1 = true;
  }

  ClicKFunction2() {
    //console.log("function os called====")
    this.divHide2 = true;
  }

  getCountries() {
    this.CustomerService.getCountries().subscribe(
      (data) => {
        console.log("main data is ====", data);
        if (data.code == "200" || data.code == 200) {
          this.countries = data.data;
          console.log("this.countries", this.countries);
        }
      },
      (err) => {
        console.log(err.status);
        if (err.status >= 404) {
          console.log("Some error occured");
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }

  selectCountry(evt) {
    console.log("CODEEEEEE>>>>>", evt);
    var obj = {
      countryCode: this.selectedCountry.isoCode,
    };

    this.CustomerService.getStates(obj).subscribe(
      (data) => {
        console.log("main data is ====", data);
        if (data.code == "200" || data.code == 200) {
          this.states = data.data;
        }
      },
      (err) => {
        console.log(err.status);
        if (err.status >= 404) {
          console.log("Some error occured");
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );

    var obj1 = {
      country_code: this.selectedCountry.countryCode,
    };
    this.CustomerService.getAllCities(obj1).subscribe(
      (data) => {
        console.log("city data is ====", data);
        if (data.code == "200" || data.code == 200) {
          this.cities = data.data;
        }
      },
      (err) => {
        console.log(err.status);
        if (err.status >= 404) {
          console.log("Some error occured");
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }

  countryCode(evt) {
    console.log("Country Code is >>>>", evt);
    this.countryDial = "+" + evt.dialCode;
    console.log("Country Code is >>>>", this.countryDial);
  }
  isCardSel = [];
  checkCardDetail(e, id) {
    console.log("dssfdsfdsfdsfdf",e);
    this.checked=e.target.checked
    console.log(this.checked);
    
    
    if (e.target.checked) {
      this.isCardSel.push(id);
    } else {
      let index = this.isCardSel.indexOf(id);
      this.isCardSel.splice(index, 1);
    }
    console.log(this.isCardSel);
  }

  loadStripe() {
      
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          // 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI'
          key: 'ek_test_YWNjdF8xSldETTJJN0E3eWNiQ3pELFk2WkxiOTFsSnNieXVvVFZaWHRkdjVXNjdUM2Z1V3U_00jBlWEvXU',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
        
      window.document.body.appendChild(s);
    }
  }

}
