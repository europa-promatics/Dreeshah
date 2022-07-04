import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { Options } from 'ng5-slider';
import * as moment from 'moment';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  limit_val = 10
  offset_val = 0
  length
  style_slider: OwlOptions = {
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
        items: 1
      }
    },
  }
  reqData: any;
  count: any;
  // config: { itemsPerPage: number; currentPage: number};
  prodData: any=[];
  imgpath=environment.prodImg;
  options: Options = {
   floor: 0,
   ceil: 100
 };
  service_count: any;
  services_list: any;
  services_list_all: any;
  searchFilters: any;
  image_path: string;
  interiorCatalogue: any;

  imgpath1=environment.homeImg;
  exteriorCatalogue: any;
  quoRef: number;
  profIdQuo: any;
  selected_service: any;
  serviceNameQuo: any;
  serviceIdQuo: any;
  salesRepres: string;
  quotationForm: any;
  quotationNum: number;
  customerName: any;
  proffIdAppoint: any;
  IdS: any;
  serviceName: any;
  requestID: number;
  appName: string;
  id: string;
  search_id: string;
  search: any;
  productSearchData: any;
  productSearchData1: any;
  serviceSearchData: any;
  professionalSearchData: any;
  productIndex: any;
  serviceIndex: any;
  device_id: any;
  serviceSearchData1: any;
  professionalSearchData1: any;
  catalogueSearchData: any;
  catalogueSearchData1: any;
  imgpathh=environment.homeImg;
  catalogueInterior: any;
  catalogueExterior: any;
  addDeviceId: any;

  constructor(
    public CustomerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.search_id = this.route.snapshot.paramMap.get('searchText')
    console.log("this.search resrgtyhhhhtyghtyh",this.search_id);

    this.getAllsearchData()
    

    this.productData()
    this.getAllServiceList()
    this.image_path = environment.image_path + "ProfessionalServices/"

    this.getcatogory();
    this.getSubcatogory();

    $('.click').click(function () {
      if ($('span').hasClass("fa-star")) {
        $('.click').removeClass('active')
        setTimeout(function () {
          $('.click').removeClass('active-2')
        }, 30)
        $('.click').removeClass('active-3')
        setTimeout(function () {
          $('span').removeClass('fa-star')
          $('span').addClass('fa-star-o')
        }, 15)
      } else {
        $('.click').addClass('active')
        $('.click').addClass('active-2')
        setTimeout(function () {
          $('span').addClass('fa-star')
          $('span').removeClass('fa-star-o')
        }, 150)
        setTimeout(function () {
          $('.click').addClass('active-3')
        }, 150)
        $('.info').addClass('info-tog')
        setTimeout(function () {
          $('.info').removeClass('info-tog')
        }, 1000)
      }
    })
  }



  // 15-June-2022------------------------------------------------------------------------------

  // product data starts here ---------------

  productData(){
    this.reqData = {} 
	  this.reqData.offset = 0
    this.reqData.limit = 10
	  this.length
    var list={
      limit:this.reqData.limit,
      offset:this.reqData.offset
    }
    this.CustomerService.productList(list).subscribe(res =>{
      console.log("product response data>>>>>>>>>>",res)
      this.prodData=res.products;
      this.count=res.total_counts;
      console.log(this.prodData)
      console.log(this.count)
      // this.config = {
      //   itemsPerPage: 10,
      //   currentPage: 1,
      // };
    })
  }

  // product data ends here -----------------



  // service data starts here----------------------------

  getAllServiceList() {
    var obj={
      limit:100,
       offset:0
    }

    this.CustomerService.getAllServiceLists(obj).subscribe(async data => {
      console.log("Response of all the service listing>>>>>", data);
      this.services_list_all = data.result
      this.services_list = data.result.length
      console.log("service length????>>>>>>>>>>>>>.",this.services_list);
      
      console.log("this.services_list>>>>>",this.services_list_all);
      


      // if (data.code == 200) {
      //   this.services_list_all = data.result
        
      //   this.length = data.main_count
      // }
    })
  }


  quotation(service) {
    this.quoRef = moment().unix()
    console.log("Quotation Reference>>>>>", this.quoRef)
    console.log("ID of the professional to be sent ==>>>>>", service)
    this.profIdQuo = service.professional_id
    console.log("Service response>>>>", service)
    console.log("ID OF the SERVICE>>>>>>", service.id)
    console.log("name===", service.service_name)
    this.selected_service = service
    this.serviceNameQuo = service.service_name
    this.serviceIdQuo = service._id
    console.log( this.serviceIdQuo,' this.serviceIdQuo');
    
    this.salesRepres = service.professional_id.first_name + ' ' + service.professional_id.last_name
    console.log("ID OF the SERVICE>>>>>>", this.serviceIdQuo)
    console.log("name===", this.serviceNameQuo)
    console.log('this.salesRepres+++++++++++++',this.salesRepres); 
    
    $('#QuotationForm').modal('show');
    this.quotationForm.controls['service_name'].setValue(service.service_name)
    this.quotationForm.controls['sales_representative'].setValue(this.salesRepres)
    this.quotationForm.controls['quotation_ref'].setValue(this.quoRef)
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>", this.quotationNum)
    this.quotationNumber()
  }
  quotationNumber() {
    this.quotationNum = moment().unix()
    console.log("Quotation Number>>>>>", this.quotationNum)
  }

  idOfService(val) {
    console.log("Customer Data>>>>>", this.customerName)
    console.log("Data of the service for appointment is>>>>>>", val)
    console.log("Professional Id for the appointment>>", val.professional_id)
    this.proffIdAppoint = val.professional_id
    this.IdS = val._id
    this.serviceName = val.service_name
    console.log("Value of the id is>>>>", this.IdS)
    console.log("Name of the service", this.serviceName)
    this.requestID = moment().unix()
    this.appName = this.customerName.first_name + ' ' + this.customerName.last_name
  }

  CalledChatRoom(data){
    console.log("Rashika",data);
   
    let professional = {
      _id :  data.professional_id,
      first_name : data.professionalData[0].first_name,
      user_type : data.professionalData[0].user_type,
      profile_image : data.professionalData[0].profile_image,
      email : data.professionalData[0].email,
    }

    
      localStorage.setItem('PROFESSIONAL_DATA',JSON.stringify(professional));
      this.router.navigate([`/mychat/${professional._id}`])
    // else{
    //   this.toastr.error("Somthing bed happen")
    // }
   
  }

  
  

  // service data ends here----------------------------



  // catalogue starts here-------------------------------------

  getcatogory() {
    let obj = {
      type: "interior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.interiorCatalogue=res.records
        console.log(this.interiorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }

  getSubcatogory() {
    let obj = {
      type: "exterior",
      offset: 0,
      limit: 10,
    };
    this.CustomerService.getCatalogueSubCategoriesPagination(obj).subscribe(
      (res) => {
        this.exteriorCatalogue=res.records
        console.log(this.exteriorCatalogue, "getCatalogueSubCategoriesPagination");
      }
    );
  }

  // catalogue ends here-------------------------------------



  // get Serach data value----------------------------------------------------

getAllsearchData(){
  var obj={
    search:this.search_id
  }
  this.CustomerService.searchInHomeScreenn(obj).subscribe(res => {
    console.log("response of home search>>>>>>>>>>>>>>",res);

    this.catalogueSearchData=res.SearchUserCatalogue
    console.log("this.catalogueSearchData>>>>>",this.catalogueSearchData)
    this.catalogueSearchData1=res.SearchUserCatalogue.length
    console.log("this.catalogueSearchData>>>>>",this.catalogueSearchData1)
    this.catalogueInterior=res.SearchUserCatalogue[0]?.catalogue_category
    console.log("this.catalogueInterior>>>>>>",this.catalogueInterior);
    this.catalogueExterior=res.SearchUserCatalogue[0]?.catalogue_category
    console.log("this.catalogueExterior>>>>>>>",this.catalogueExterior);
    

    
    this.productSearchData=res.SearchInProfessionalProduct
    console.log(" this.productSearchData>>>>>>", this.productSearchData);


    this.productSearchData1=res.SearchInProfessionalProduct.length
    console.log("length of product>>>>>>",this.productSearchData1);
    
    

    this.serviceSearchData=res.SearchInProfessionalService
    console.log("this.serviceSearchData>>>>>>>>>",this.serviceSearchData);

    this.serviceSearchData1=res.SearchInProfessionalService.length
    console.log("length of serviceSearchData>>>>>>>>>",this.serviceSearchData1);
    

    this.professionalSearchData=res.professionalSearch
    console.log("this.professionalSearchData>>>>>>>>>>>",this.professionalSearchData);

    this.professionalSearchData1=res.professionalSearch.length
    console.log("length of professionalSearchData>>>>>>>>>",this.professionalSearchData1);



    
    
  })

}





// -------------------------------


homeSearch() {
  var obj={
    text:this.search,
    device_id:this.device_id
  }
  this.CustomerService.addUserSearchdata(obj).subscribe(res => {
    console.log("response of user add data  search>>>>>>>>>>>>>>",res);
    this.addDeviceId= res.data.data.device_id
    console.log("this.addDeviceId>>>>>>",this.addDeviceId);
    this.router.navigate([`/search-results/${obj.text}`])
    this.ngOnInit()
  })



}




}
