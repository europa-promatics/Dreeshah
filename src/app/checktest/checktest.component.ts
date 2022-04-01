import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from './../shared/customer.service'
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-checktest',
  templateUrl: './checktest.component.html',
  styleUrls: ['./checktest.component.scss']
})
export class ChecktestComponent implements OnInit {
// @ViewChild('picker') picker: any;
  // @ViewChild('picker') picker1: any;
  value: number = 50;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;

   today = new Date();
 dd = this.today.getDate()
 mm = this.today.getMonth()  
 yyyy = this.today.getFullYear();

//today = this.mm + '/' + dd + '/' + yyyy

  minDate =new Date(this.yyyy, this.mm, this.dd)
  //public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  public dateControlMinMax = new FormControl(new Date());

  public optionss = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  public listColors = ['primary', 'accent', 'warn'];

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];

  items: GalleryItem[];
  catValue =false
  image_path
  profile_image_path
  userData
  IdS
  services_list = []
  category_id
  sub_category_id
  sub_category_list
  cities = []
  category_name
  sub_category_name
  service_count
  selected_city = ""
  service_name
  selected_service
  timeBook
  dateBook
  quotationForm: FormGroup;
  bookForm: FormGroup
  phoneForm :FormGroup
  splitNum
  submit_quotation = false
  submit_book = false
  uniqueNumber
  requestID
  serviceName
  phone_number
  countryDial
  phone
  len
  len2
  quotationNum
  serviceNameQuo
  serviceIdQuo
  timeQuo
  dateQuo
  dateQuo2
  salesRepres
  quoRef
  profIdQuo
  proffIdAppoint
  todayDate
  offset_val =0
  limit_val =19
  length
  customerName
  appName
	
  constructor(public gallery: Gallery,
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit() {
    this.services_list = this.services_list.sort((low, high) => low.price - high.price);
    this.customerName =JSON.parse(localStorage.getItem('userData'))
    console.log("Data of the User>>>>>>",this.customerName)
    console.log("Mindate>>>",this.minDate)
    this.todayDate = moment(this.minDate).format('LL');
    console.log("Today Date>>>>",this.todayDate)
    //console.log("Unique: ",moment().unix())
    //this.category_id = this.route.snapshot.paramMap.get('category_id') ? this.route.snapshot.paramMap.get('category_id') : "602b5af21efd3e653e9d7993"
    //this.sub_category_id = this.route.snapshot.paramMap.get('sub_category_id') ? this.route.snapshot.paramMap.get('sub_category_id') : "602b5c8a6e1b446663d2b6f2"
    this.category_id = this.route.snapshot.paramMap.get('category_id')
    this.sub_category_id = this.route.snapshot.paramMap.get('sub_category_id')
    this.image_path = environment.image_path + "ProfessionalServices/"
    this.profile_image_path = environment.image_path + "userProfile/"
   // this.getServiceListing()
    //this.serviceList()
    if(this.category_id && this.sub_category_id){
      this.catValue=true
      this.getServiceListing()
      this.serviceList()
    }else{
      this.serviceListGuest()
      this.getAllServiceList()
    }
    
    
    this.getDistinctServiceCties()

    this.bookForm = new FormGroup({
      appName: new FormControl('', [
        Validators.required,
      ]),
      appDate: new FormControl(new Date(), [
        Validators.required,
      ]),
      appTime: new FormControl(new Date(), [
        Validators.required,
      ]), 
      appLocation: new FormControl('', [
        Validators.required,
      ]),
      appDetail: new FormControl('', [
        Validators.required,
      ]),
      //appSubject: new FormControl(''),
      
    })


    this.phoneForm = new FormGroup({
      phone: new FormControl('', [Validators.required])
    });
    
    this.quotationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        // Validators.email,
        Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      // phone: new FormControl('', [
      //   Validators.required
      // ]),
      // phone_number: new FormControl('', [
      //   Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern('^[0-9]*')
      // ]),
      quotation_ref: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl(new Date(), [
        Validators.required,
      ]),
      // time: new FormControl(new Date(), [
      //   Validators.required,
      // ]),
      sales_representative: new FormControl('', [
        Validators.required,
      ]),
      service_name: new FormControl(''),
      location: new FormControl('', [
        Validators.required,
      ]),
      // quantity: new FormControl('', [
      //   Validators.required, Validators.pattern('^[0-9]*')
      // ]),
      expected_date: new FormControl('', [
        Validators.required,
      ]),
      estimated_budget: new FormControl('', [
        Validators.required, Validators.pattern('^[0-9]*')
      ]),
      description: new FormControl('', [
        Validators.required,
      ]),
    })
    $(document).ready(function () {
      $("#filterContent").hide();
      $("#filterBtn").click(function () {
        $("#filterContent").slideToggle(function () {
          $("#btn-receitamob i").toggleClass("fa-chevron-right fa-chevron-down");
        });
        $(this).find("i").toggleClass("fa-caret-down fa-caret-up");
      });
    });
    this.items = data.map(item =>
      new ImageItem({
        src: item.srcUrl,
        thumb: item.previewUrl,
        text: item.text,
        download: item.download,
        share: item.share,
        title: item.title,
        saves: item.saves,
        shares: item.shares,
        rate: item.rate,
        photographerName: item.photographerName,
        photographerRate: item.photographerRate,
        ProfName: item.ProfName,
        profRate: item.profRate,
      })
    );
    // Load items into the lightbox
    this.basicLightboxExample();

    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig();
  }
  basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }
  withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }

  //paginationOptionChange(evt) {
    //   console.log("evthrm",evt)
    //   this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
    //   this.reqData.limit = evt.pageSize
    //   this.currentPage=evt.pageSize
    //   this.currentIndex=evt.pageIndex
    //   console.log('checking  page Index', this.currentPage)
    //   console.log('checking current page',evt.pageSize)
    
    //   var list={ 
    //     limit_val:this.reqData.limit,
    //      offset_val:this.reqData.offset
    //     }
    
    //   this.CustomerService.getAllProduct(list).subscribe(res => {
    //     console.log('paginator limit',res)
      
    //     if(res){	  
    //     this.length = res.data.count;
    //     this.dataSource = res.data;
    //   }
    // });
    // }

  getAllServiceList() {
    var obj = {
      limit : this.limit_val,
      offset: this.offset_val
    }
    console.log("obj===", obj)
    this.CustomerService.getAllServiceLists(obj).subscribe(async data => {
      console.log("Response of all the service listing>>>>>",data);
      if (data.code == 200) {
        this.services_list = data.result
        this.service_count = data.result.length
        this.length= data.total_counts
      }
    })
  }
  getPageSizeOptions() {
    return [1,2,3];
    }

  paginationOptionChange(evt) {
    console.log("evthrm",evt)
    this.offset_val = (evt.pageIndex * evt.pageSize)
    this.limit_val = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
  var obj={
   
    limit : this.limit_val,
      offset: this.offset_val
    
  }
  this.CustomerService.getAllServiceLists(obj).subscribe(async data => {
    console.log("Response of all the service listing>>>>>",data);
    if (data.code == 200) {
      this.services_list = data.result
      this.service_count = data.result.length
    }
  })


}

  getServiceListing() {
    var obj = {
      category_id: this.category_id,
      sub_category_id: this.sub_category_id,
      city: this.selected_city,
      service_name: this.service_name
    }
    console.log("obj===", obj)
    this.CustomerService.getServiceListing(obj).subscribe(async data => {
      console.log(data);
      if (data.code == 200) {
        this.services_list = data.data
        this.service_count = data.count
      }
    })
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          this.services_list = this.services_list.sort((low, high) => low.price - high.price);
          break;
        }

      case "High":
        {
          this.services_list = this.services_list.sort((low, high) => high.price - low.price);
          break;
        }

      case "Name":
        {
          this.service_name = this.services_list.sort(function (low, high) {
            if (low.service_name < high.service_name) {
              return -1;
            }
            else if (low.service_name > high.service_name) {
              return 1;
            }
            else {
              return 0;
            }
          })
          break;
        }

      default: {
        this.services_list = this.services_list.sort((low, high) => low.price - high.price);
        break;
      }

    }
    return this.services_list;

  }

  serviceList() {
    this.CustomerService.serviceList().subscribe(data => {
      console.log("data of subcategory ====>>>", data)
      if (data.code == '200' || data.code == 200) {
        this.sub_category_list = data.data
        var item = this.sub_category_list.find(item => item._id == this.sub_category_id)
        console.log("===item==", item)
        this.category_name = item.service_category_id.name
        this.sub_category_name = item.name
      }
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

  serviceListGuest() {
    this.CustomerService.serviceList().subscribe(data => {
      console.log("data of subcategory ====>>>", data)
      if (data.code == '200' || data.code == 200) {
        this.sub_category_list = data.data
        // var item = this.sub_category_list.find(item => item._id == this.sub_category_id)
        // console.log("===item==", item)
        // this.category_name = item.service_category_id.name
        // this.sub_category_name = item.name
      }
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

  onChangeSubCat(value) {
    console.log(value)
    var item = this.sub_category_list.find(item => item._id == value)
    console.log("===item==", item)
    this.category_id = item.service_category_id._id
    this.sub_category_id = item._id
    this.category_name = item.service_category_id.name
    this.sub_category_name = item.name
    this.getServiceListing()
  }

  getDistinctServiceCties() {
    this.CustomerService.getDistinctServiceCties().subscribe(data => {
      console.log("Data of the cities is ====>>>>>>>", data)
      if (data.code == '200' || data.code == 200) {
        this.cities = data.data
      }
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
  onSelectCity(value) {
    console.log("city===", value)
    this.getServiceListing()
  }
  filterByServiceName(value) {

    if(value){
    console.log("uuuuuu===", value)
    this.service_name = value
    var obj={
      search :this.service_name
    }
    this.CustomerService.searchServices(obj).subscribe(res => {
        console.log("Result of the search====>>>",res)
        if (res.code == '200' || res.code == 200) {
          this.services_list = res.result
          this.service_count = res.result.length
        }
    })
    //this.getServiceListing()
    }else{
      this.ngOnInit()
  }
  }

  
  countryCode(evt){
    console.log("Country Code is >>>>",evt)
    this.countryDial='+'+ evt.dialCode
    console.log("Country Code is >>>>",this.countryDial)
  }

  quotation(service) {
    this.quoRef = moment().unix()
    console.log("Quotation Reference>>>>>",this.quoRef)
    console.log("ID of the professional to be sent ==>>>>>",service.professional_id._id)
    this.profIdQuo = service.professional_id._id
    console.log("Service response>>>>",service)
    console.log("ID OF the SERVICE>>>>>>",service.id)
    console.log("name===", service.service_name)
    this.selected_service = service
    this.serviceNameQuo = service.service_name
    this.serviceIdQuo = service.id
    this.salesRepres = service.professional_id.first_name + ' '+ service.professional_id.last_name
    console.log("ID OF the SERVICE>>>>>>",this.serviceIdQuo)
    console.log("name===",this.serviceNameQuo)
    $('#QuotationForm').modal('show');
    this.quotationForm.controls['service_name'].setValue(service.service_name)
    this.quotationForm.controls['sales_representative'].setValue(this.salesRepres)
    this.quotationForm.controls['quotation_ref'].setValue(this.quoRef)
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>",this.quotationNum)
    this.quotationNumber()
  }

  quotationNumber(){
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>",this.quotationNum)
  }

  

  submitQutation() {

    this.quotationNum = moment().unix()
    console.log("Quotation Number is>>>>",this.quotationNum)
    console.log("Phone Number is>>>>",this.phone)
    this.len2 = this.phone.length
    console.log("Country Code is >>>>",this.countryDial)
    console.log("Country Code Length is >>>>",this.countryDial.length)
    this.len = this.countryDial.length

    this.splitNum=this.phone.slice(this.len,this.len2)

    this.timeQuo = moment(this.quotationForm.value.time).format('LT');
    this.dateQuo = moment(this.quotationForm.value.date).format('LL');
    this.dateQuo2 = moment(this.quotationForm.value.expected_date).format('LL');
   
    console.log("Split Number is.>>>",this.splitNum)
    // console.log("local====",localStorage['userData'])
    if (localStorage['userData']) {
      this.userData = JSON.parse(localStorage['userData']);
      console.log("user======>", this.userData)
      if (this.userData.user_type != "customer") {
        this.toastr.error("Please login as customer to continue")
        return
      } else {
        this.submit_book = true
        console.log("=====ouatation form", this.quotationForm.value)
        var obj = {
          professional_id: this.profIdQuo,
          professional_service_id: this.serviceIdQuo,
          name: this.quotationForm.value.name,
          email: this.quotationForm.value.email,
          phone_number: this.splitNum,
         // 
          quotation_ref: this.quoRef.toString(),
          date: this.dateQuo,
          //time: this.timeQuo,
          sales_representative: this.salesRepres,
          service_name : this.serviceNameQuo,
          location: this.quotationForm.value.location,
          quantity: this.quotationForm.value.quantity,
          expected_date: this.dateQuo2,
          estimated_budget: this.quotationForm.value.estimated_budget,
         // customer_id: JSON.parse(localStorage['userData'])._id,
          description: this.quotationForm.value.description,
          country_code: this.countryDial,
          quotation_no: this.quotationNum.toString(),
          subject : this.serviceNameQuo
    
        }
        console.log("object of Instant Quotation ===>", obj)
        this.phoneForm.controls.phone.patchValue(' ');
        this.phoneForm.reset()
        this.quotationForm.reset()
       
        $('#QuotationForm').modal('hide');
        // return
         this.CustomerService.requestQuotation(obj).subscribe(data => {
            console.log("Quotation Submit Response ====>>>>>>", data)
            this.phoneForm.controls.phone.setValue('');
            this.phoneForm.reset()
            this.quotationForm.reset()
            
            $('#QuotationForm').modal('hide');
            this.toastr.success('Quotation Form submitted successfully', 'success')
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
    } else {
      this.toastr.error("Please login as customer to continue")
      return
    }
  }

  first(value){
    console.log("Date is>>>>>",value)
    //this.datePipe.transform(value, 'MM-dd-yyyy');
    console.log(moment(value).format("LL"));
    this.dateBook = moment(value).format("LL")
    console.log("Date is>>>>>",this.dateBook)
  }

  second(value1){
    console.log("Time is>>>>>",value1)
    
    console.log(moment(value1).format("MMM Do YYYY"));
    this.timeBook = moment(value1).format('LT');
    console.log("Date is>>>>>",this.timeBook)
  }

  idOfService(val){
    console.log("Customer Data>>>>>",this.customerName)
    console.log("Data of the service for appointment is>>>>>>",val)
    console.log("Professional Id for the appointment>>",val.professional_id._id)
    this.proffIdAppoint = val.professional_id._id
    this.IdS =val.id
    this.serviceName = val.service_name
    console.log("Value of the id is>>>>",this.IdS)
    console.log("Name of the service",this.serviceName)
    this.requestID=moment().unix()
    this.appName = this.customerName.first_name + ' ' + this.customerName.last_name
  }


  bookAppointment() {

   
   console.log("New Request ID>>>>",this.requestID.toString())

    console.log(moment(this.bookForm.value.appTime).format("LT"));
    this.timeBook = moment(this.bookForm.value.appTime).format('LT');
    //console.log("Time is>>",this.timeBook)
   // console.log("Date is>>>",this.dateBook)
    //console.log("Date is>>>>>",this.timeBook)
    console.log("Name is>>>",this.bookForm.value.appName)
    console.log("Sub is>>>",this.serviceName)
    console.log("Loc is>>>",this.bookForm.value.appLocation)
    console.log("Date is>>>", this.dateBook)
    console.log("Time is>>>", this.timeBook)
    console.log("Detail is>>>",this.bookForm.value.appDetail)
    console.log("Request ID Modified to string>>>>",this.IdS)

    if (localStorage['userData']) {
      this.userData = JSON.parse(localStorage['userData']);
      console.log("user======>", this.userData)
      if (this.userData.user_type != "customer") {
        this.toastr.error("Please login as customer to continue")
        return
      } else {
        this.submit_quotation = true
        console.log("=====Book form values", this.bookForm.value)
        var obj = {
          //customer_id: JSON.parse(localStorage['userData'])._id,
          professional_id: this.proffIdAppoint,
          request_id : this.requestID.toString(),
          name: this.bookForm.value.appName,  
          subject: this.serviceName,
          location: this.bookForm.value.appLocation,
          date: this.dateBook,
          time: this.timeBook,
          request_details: this.bookForm.value.appDetail,
          service_id : this.IdS
        }
        console.log("obj ===>", obj)
        this.bookForm.reset()
        $('#bookAptmnt').modal('hide');
        // return
        this.CustomerService.addBooking(obj).subscribe(data => {
            console.log("data is ====", data)
            this.bookForm.reset()
            $('#bookAptmnt').modal('hide');
            this.toastr.success('Submitted successfully', 'success')
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
    } else {
      this.toastr.error("Please login as customer to continue")
      return
    }
  }

 
  

}
const data = [
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Kitchen",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",

  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Dinning Room",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Bath",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Bedroom",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/05/26/04/17/home-1416381_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/05/26/04/17/home-1416381_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Living",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/02/26/22/22/kitchen-1224845_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/02/26/22/22/kitchen-1224845_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Corridor",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Home & Office",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    text: "fa fa-thumbs-up",
    download: "fa fa-download",
    share: "fa fa-share-alt",
    title: "Home Bar",
    saves: "2111",
    shares: "3000",
    rate: "$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName: "Grace Lawerence",
    profRate: "$45",
  },


];
