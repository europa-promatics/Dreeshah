import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';
import { MatFormFieldControl } from '@angular/material/form-field';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
const data = []
@Component({
  selector: 'app-seller-service-detail',
  templateUrl: './seller-service-detail.component.html',
  styleUrls: ['./seller-service-detail.component.scss']
})
export class SellerServiceDetailComponent implements OnInit {
  formGroup: FormGroup;
  items1: GalleryItem[];
  items2: GalleryItem[];
  service_data
  image_path
  project_image_path
  service_id
  country_name
  profile_image_path
  Service_data: any;
  selected_projects: any;
  areaCoveredArrr: any;
  areaCoveredArr: any;
  ccc: any;
  projects: any;
  cities: any;
  countries: any;
  desc: any;
  serviceImage: any;
  relatedImage: any;
  otherImage: any;
  constructor(
    public gallery: Gallery,
    public gallery1: Gallery,
    // @Inject(DOCUMENT) private document: Document,
    // private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private location: Location
  ) { }


  heroOpt: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    animateOut: 'fadeOut',
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
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
  ngOnInit(): void {
    this.getServiceDetails()
    this.image_path = environment.image_path + "ProfessionalServices/"
    this.project_image_path = environment.image_path + "ProfessionalProject/"
    this.profile_image_path = environment.image_path + "userProfile/"
    this.service_id = this.route.snapshot.paramMap.get('id')
    this.getCountries()
    this.getCategoryList()


    this.formGroup = new FormGroup({
      service_name: new FormControl('', []),
      service_description: new FormControl('', []),
      country: new FormControl('', []),
      city: new FormControl('', []),
      service_category: new FormControl('', []),
      service_sub_category: new FormControl('', []),
      service_img: new FormControl('', []),
      keyWords:new FormControl(''),
      service_price: new FormControl('', []),
      service_duration: new FormControl('', []),
      service_visible_customer: new FormControl('', []),
      service_visible_professional: new FormControl('', []),
    })
  }

  basicLightboxExample() {
    this.gallery.ref().load(this.items1);
  }

  basicLightboxExample2() {
    this.gallery1.ref().load(this.items2);
  }
  /**
   * Use custom gallery config with the lightbox
   */
  withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Bottom,

    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items1);
  }

  withCustomGalleryConfig2() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef1 = this.gallery1.ref('anotherLightbox1');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef1.setConfig({
      imageSize: ImageSize.Contain,
      thumbPosition: ThumbnailsPosition.Bottom,

    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef1.load(this.items2);
  }

  getCountryByCode(code) {
    var obj = {
      country_code: code
    }

    this.CustomerService.getCountryByCode(obj).subscribe(data => {
      console.log("data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.country_name = data.data?.name
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



  // getServiceDetails() {
  //   var obj = {
  //     service_id: this.route.snapshot.paramMap.get('id')
  //   }
  //   console.log("obj", obj)
  //   this.CustomerService.getServiceDetails(obj).subscribe(data => {
  //     console.log("main data details is =======>>>>>", data)
  //     this.service_data = data.data
  //     this.getCountryByCode(data.data.country)
  //     this.items1 = this.service_data.related_images.map(item =>
  //       new ImageItem({
  //         src: this.image_path + item.name,
  //         thumb: this.image_path + item.name,
  //       })
  //     );
  //     this.basicLightboxExample();
  //     this.withCustomGalleryConfig();
  //     if (this.service_data.other_images.length > 0) {
  //       this.items2 = this.service_data.other_images.map(item =>
  //         new ImageItem({
  //           src: this.image_path + item.name,
  //           thumb: this.image_path + item.name,
  //         })
  //       );
  //       this.basicLightboxExample2();
  //       this.withCustomGalleryConfig2();
  //     }
  //   }, err => {
  //     console.log(err.status)
  //     if (err.status >= 404) {
  //       console.log('Some error occured')
  //     } else {
  //       this.toastr.error('Some error occured, please try again!!', 'Error')
  //       console.log('Internet Connection Error')
  //     }
  //   })
  // }



  getServiceDetails() {
    var obj = {
      service_id: this.route.snapshot.paramMap.get('id')
    }
    console.log("onnnn", obj)
    this.CustomerService.getSellerServiceDetails(obj).subscribe(data => {
      console.log("main data is ====>>>>>>>>>>>>>>>>>>>", data)
      this.Service_data = data.data
      console.log('this.Service_data',this.Service_data);

      this.desc=this.Service_data.service_description

      this.serviceImage=this.Service_data.service_image

      this.relatedImage=this.Service_data.related_images[0].name

      this.otherImage=this.Service_data.other_images[0].name
      
      if (data.data.service_project.length > 0) {
        this.selected_projects = data.data.service_project
      }
      this.getCities(data.data.country)
      this.areaCoveredArrr=data.data.area_covered
      this.areaCoveredArrr.forEach(el =>{
        let v=el.city
        this.areaCoveredArr?.push(v)
      })
      this.ccc= this.areaCoveredArr
      
      console.log('areaaaa covered arrrrrrrrrr',this.ccc)
      this.formGroup?.controls['service_name'].setValue(data.data.service_name);
      this.formGroup?.controls['service_description'].setValue(data.data.service_description);
      this.formGroup?.controls['country'].setValue(data.data.country[0]);
      this.formGroup?.controls['city'].setValue(this.areaCoveredArrr[0]);
      this.formGroup?.controls['service_category'].setValue(data.data.service_category[0]);
      this.CustomerService.getSubCat(data.data.service_category).subscribe(res => {
        console.log('reveeeee sub category ', res)
        this.subCatArr=res.sub_categories
})
      this.formGroup?.controls['service_sub_category'].setValue(data.data.service_sub_category[0]);
     
        var obj = {
          sub_category_id: data.data.service_sub_category
      }
      this.CustomerService.getProjectsAccordingToSubCat(obj).subscribe(async data => {
        console.log('getProjects new----------------',data);
        if (data.code == 200) {
          this.projects = data.result
        }
      })
    
      this.formGroup?.controls['service_img'].setValue(data.data?.service_image);
      this.formGroup?.controls['service_price'].setValue(data.data.price);
      this.formGroup?.controls['service_duration'].setValue(data.data.duration);
      this.formGroup?.controls['service_visible_customer'].setValue(data.data.service_visible_customer);
      this.formGroup?.controls['service_visible_professional'].setValue(data.data.service_visible_professional);

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


  getCities(event) {
    console.log("====event", event)
    var arr = []
    if (Array.isArray(event)) {
      arr = event
    } else {
      arr.push(event)
    }
    var obj = {
      country_code: arr
    }
    console.log("===obj", obj)
    this.CustomerService.getAllCities(obj).subscribe(data => {
      console.log("city data is ====", data)
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


  getCountries() {
    this.CustomerService.getCountries().subscribe(data => {
      console.log("main data is ====", data)
      if (data.code == '200' || data.code == 200) {
        this.countries = data.data
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



  categiryArr=[]
  getCategoryList() {
    this.CustomerService.getCatAndSubCat().subscribe(res => {
      console.log('res of category List', res)
      this.categiryArr = res.data

    })
  }

  subCatArr=[]
  getSubCat(event) {
   console.log('event',event)
    this.CustomerService.getSubCat(event).subscribe(res => {
          console.log('reveeeee sub category ', res)
          this.subCatArr=res.sub_categories
  })

  }


  getInnerHTML(val){
    return val?.replace(/(<([^>]+)>)/ig,'');
  }

}
