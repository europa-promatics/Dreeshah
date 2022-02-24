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
const data = []
@Component({
  selector: 'app-seller-service-detail',
  templateUrl: './seller-service-detail.component.html',
  styleUrls: ['./seller-service-detail.component.scss']
})
export class SellerServiceDetailComponent implements OnInit {
  items1: GalleryItem[];
  items2: GalleryItem[];
  service_data
  image_path
  project_image_path
  service_id
  country_name
  profile_image_path
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
        this.country_name = data.data.name
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



  getServiceDetails() {
    var obj = {
      service_id: this.route.snapshot.paramMap.get('id')
    }
    console.log("obj", obj)
    this.CustomerService.getServiceDetails(obj).subscribe(data => {
      console.log("main data is ====", data)
      this.service_data = data.data
      this.getCountryByCode(data.data.country)
      this.items1 = this.service_data.related_images.map(item =>
        new ImageItem({
          src: this.image_path + item.name,
          thumb: this.image_path + item.name,
        })
      );
      this.basicLightboxExample();
      this.withCustomGalleryConfig();
      if (this.service_data.other_images.length > 0) {
        this.items2 = this.service_data.other_images.map(item =>
          new ImageItem({
            src: this.image_path + item.name,
            thumb: this.image_path + item.name,
          })
        );
        this.basicLightboxExample2();
        this.withCustomGalleryConfig2();
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

}
