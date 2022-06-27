import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';
// import { Console } from 'console';

@Component({
  selector: 'app-seller-edit-services',
  templateUrl: './seller-edit-services.component.html',
  styleUrls: ['./seller-edit-services.component.scss']
})
export class SellerEditServicesComponent implements OnInit {
  areaCoveredArr=[]
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Delhi'];
  allFruits: string[] = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Nagpur'];
  countries = []
  cities = []
  userData
  userDetails
  ServiceSubCat = []
  ServiceCat = []
  formGroup: FormGroup;
  service_image
  submit_button = false
  Service_data
  image_path
  project_image_path
  service_img
  service_id
  related_images = [1, 2, 2, 3, 4, 4, 45]
  projects
  checked = [];
  selected_projects = []
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChildren('checkBox') checkBox: QueryList<any>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

  }

  getCheckbox(checkbox) {
    this.checked = [];
    const checked = this.checkBox.filter(checkbox => checkbox.checked);
    checked.forEach(data => {
      this.checked.push({
        'checked': data.checked,
        'value': data.value._id
      })
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  files: File[] = [];
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  files1: File[] = [];
  onSelect1(event) {
    console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.image_path = environment.image_path + "ProfessionalServices/"
    this.project_image_path = environment.image_path + "ProfessionalProject/"
    this.service_id = this.route.snapshot.paramMap.get('id')
    this.getServiceDetails()
    this.getCountries()
    this.getCategoryList()
    this.userData = JSON.parse(localStorage['userData']);
    this.getProfile()
    // this.getProject()
    this.formGroup = new FormGroup({
      service_name: new FormControl('', [
        Validators.required,
      ]),
      service_description: new FormControl('', [
        Validators.required,
      ]),
      country: new FormControl('', [
        Validators.required,
        // Validators.email,
        // Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")
      ]),
      city: new FormControl('', [
        // Validators.required,
        // Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')
      ]),
      service_category: new FormControl('', [
        Validators.required,
      ]),
      service_sub_category: new FormControl('', [
        Validators.required,
      ]),
      service_img: new FormControl('', [
        Validators.required,
      ]),
      keyWords:new FormControl(''),
      // service_related_photos: new FormControl('', [
      //   // Validators.required,
      // ]),
      // service_other_photos: new FormControl('', [
      //   // Validators.required,
      // ]),
      service_price: new FormControl('', [
        Validators.required,
        // Validators.pattern('^[0-9]*')
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      service_duration: new FormControl('', [
        Validators.required,
        
      ]),
      service_visible_customer: new FormControl('', [
        // Validators.required,
      ]),
      service_visible_professional: new FormControl('', [
        // Validators.required,
      ]),
    })
  }
  areaCovered(evt){
    console.log('evt',evt);
    // var a={
    //   city:evt
    // }
    this.areaCoveredArr=evt
    
  }
  areaCoveredArrr=[]
  ccc
  getServiceDetails() {
    var obj = {
      service_id: this.route.snapshot.paramMap.get('id')
    }
    console.log("onnnn", obj)
    this.CustomerService.getSellerServiceDetails(obj).subscribe(data => {
      console.log("main data is ====>>>>>>>>>>>>>>>>>>>", data)
      this.Service_data = data.data
      console.log('this.Service_data',this.Service_data);
      
      if (data.data.service_project.length > 0) {
        this.selected_projects = data.data.service_project
      }
      this.getCities(data.data.country)
      this.areaCoveredArrr=data.data.area_covered
      // this.formGroup.controls['city'].setValue(this.areaCoveredArr)
      this.areaCoveredArrr.forEach(el =>{
        let v=el.city
        this.areaCoveredArr.push(v)
      })
      this.ccc= this.areaCoveredArr
      
      console.log('areaaaa covered arrrrrrrrrr',this.ccc)
      this.formGroup.controls['service_name'].setValue(data.data.service_name);
      this.formGroup.controls['service_description'].setValue(data.data.service_description);
      this.formGroup.controls['country'].setValue(data.data.country[0]);
      this.formGroup.controls['city'].setValue(this.areaCoveredArrr[0]);
      this.formGroup.controls['service_category'].setValue(data.data.service_category[0]);
      this.CustomerService.getSubCat(data.data.service_category).subscribe(res => {
        console.log('reveeeee sub category ', res)
        this.subCatArr=res.sub_categories
})
      this.formGroup.controls['service_sub_category'].setValue(data.data.service_sub_category[0]);
     
        var obj = {
          sub_category_id: data.data.service_sub_category
      }
      this.CustomerService.getProjectsAccordingToSubCat(obj).subscribe(async data => {
        console.log('getProjects new----------------',data);
        if (data.code == 200) {
          this.projects = data.result
        }
      })
    
      this.formGroup.controls['service_img'].setValue(data.data?.service_image);
      this.formGroup.controls['service_price'].setValue(data.data.price);
      this.formGroup.controls['service_duration'].setValue(data.data.duration);
      this.formGroup.controls['service_visible_customer'].setValue(data.data.service_visible_customer);
      this.formGroup.controls['service_visible_professional'].setValue(data.data.service_visible_professional);

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

  removeRelatedImage(i) {
    // alert("ppppp")
    this.Service_data?.related_images.splice(i, 1)
  }

  removeOtherImage(i) {
    // alert("ppppp")
    this.Service_data?.other_images.splice(i, 1)
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
  getProject(event){
    var obj = {
      sub_category_id: event.value
  }
  this.CustomerService.getProjectsAccordingToSubCat(obj).subscribe(async data => {
    console.log('getProjects new----------------',data);
    if (data.code == 200) {
      this.projects = data.result
    }
  })
}
  getProfile() {
    this.ServiceSubCat = []
    var arr = []
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(async data => {
      console.log(data);
      if (data.code == 200) {
        this.userDetails = await data
        await data.user_services.forEach(async (element, ind) => {
          this.ServiceSubCat.push(element.service_id)
          arr.push(element.service_id.service_category_id)
          if (data.user_services.length - 1 == ind) {
            // await this.getServiceCat(arr)
          }
        });
      }
    })
  }

  // getServiceCat(ids) {
  //   var obj = {
  //     ids: ids
  //   }
  //   console.log("oiiooihh----", obj)
  //   this.CustomerService.getCatFromSubCat(obj).subscribe(data => {
  //     console.log(data);
  //     if (data.code == 200) {
  //       this.ServiceCat = data.data
  //     }
  //   })
  // }

  newArr = []
  categiryArr=[]
  getCategoryList() {
    this.CustomerService.getCatAndSubCat().subscribe(res => {
      console.log('res of category List', res)
      this.categiryArr = res.data
      // this.categiryArr.forEach((el, ind) => {

        // this.CustomerService.getSubCat(el.id).subscribe(res => {
        //   console.log('reeees', res)
        //   res.sub_categories.forEach(element => {
        //     let v = {
        //       name: element.name,
        //       id: element._id
        //     }
        //     this.newArr.push(v)
        //   });
        //   console.log('newarrcategory', this.newArr)
        // })

      // })

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

  // getSubCat(event) {
  //   console.log("getting event", event, "arrr ===>", this.userDetails.user_services)
  //   var sub_cat = this.userDetails.user_services.filter(element => element.service_id.service_category_id == event);
  //   console.log("sub cat== ->", sub_cat)
  //   this.ServiceSubCat = []
  //   sub_cat.forEach(element => {
  //     this.ServiceSubCat.push(element.service_id)
  //   });
  // }

  subCatArr=[]
  getSubCat(event) {
   console.log('event',event)
    // Old Start
    // console.log("getting event", event, "arrr ===>", this.userDetails.user_services)
    // var sub_cat = this.userDetails.user_services.filter(element => element.service_id.service_category_id == event);
    // console.log("sub cat== ->", sub_cat)
    // this.ServiceSubCat = []
    // sub_cat.forEach(element => {
    //   this.ServiceSubCat.push(element.service_id)
    // });
    // End

    // New Work below
    this.CustomerService.getSubCat(event).subscribe(res => {
          console.log('reveeeee sub category ', res)
          this.subCatArr=res.sub_categories
  })

  }
  
  



  onFileChange(evt) {
    var self = this
    if (!evt.target) {
      return;
    }
    if (!evt.target.files) {
      return;
    }
    if (evt.target.files.length !== 1) {
      return;
    }
    const file = evt.target.files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      // this.toastr.warning('Please upload image file')
      return;
    }
    console.log(evt.target.files[0])
    this.service_image = evt.target.files[0];
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      self.service_img = mainImage;
      // alert(self.profile_img)
    };
    fr.readAsDataURL(file);
  }
  visible_customer
  visible_pro
  areaCoveredFormArr=[]
  newChecked=[]
  submit() {
    console.log(' this.checked', this.checked);
    // console.log('this.Service_data.other_images',this.Service_data.other_images)



    this.areaCoveredArr.forEach(el=>{
      let b={
        city:el
      }
      this.areaCoveredFormArr.push(b)
    })
    this.checked.forEach(el =>{
      let r={
        project_id:el.value
      }
      this.newChecked.push(r)
    })
    console.log('this.newChecked',this.newChecked)
    if(this.formGroup.value.service_visible_customer){
      this.visible_customer=true
      console.log('this.visible_customer',this.visible_customer);
      
    }else if(!this.formGroup.value.service_visible_customer){
      this.visible_customer=false
       console.log('this.visible_customer',this.visible_customer);
    }

    if(this.formGroup.value.service_visible_professional){
      this.visible_pro=true
      console.log('this.visible_pro',this.visible_pro);
    }else if(!this.formGroup.value.service_visible_professional){
      this.visible_pro=false
      console.log('this.visible_pro',this.visible_pro);
    }
    console.log(this.files)
    console.log("ugtgh data", this.formGroup.value)
    this.submit_button = true
    var formdata = new FormData()
    var formdata: FormData = new FormData();
    // formdata.append('id', this.userData._id)
    console.log("===imag", this.service_image)
    if (this.service_image) {
      formdata.append('service_image', this.service_image)
    }
    if (this.files.length > 0) {
      // formdata.append('related_images', this.files)
      this.files.forEach(element => {
        formdata.append('related_images', element)
      });
    }

    if (this.files1.length > 0) {
      this.files1.forEach(element => {
        formdata.append('other_images', element)
      });
    }
    // formdata.append('professional_id', this.userDetails.data._id)
    formdata.append('area_covered',JSON.stringify(this.areaCoveredFormArr))
    formdata.append('service_id', this.service_id)
    formdata.append('service_name', this.formGroup.value.service_name)
    formdata.append('service_description', this.formGroup.value.service_description)
    formdata.append('country', this.formGroup.value.country)
    // formdata.append('city', this.formGroup.value.city)
    formdata.append('service_category', this.formGroup.value.service_category)
    formdata.append('service_sub_category', this.formGroup.value.service_sub_category)
    formdata.append('price', this.formGroup.value.service_price)
    formdata.append('duration', this.formGroup.value.service_duration)
    formdata.append('service_visible_customer', this.visible_customer)
    formdata.append('service_visible_professional', this.visible_pro)
    formdata.append('related_images', JSON.stringify(this.Service_data?.related_images))
    formdata.append('other_images', JSON.stringify(this.Service_data?.other_images))
    formdata.append('service_project', JSON.stringify(this.newChecked))
    // if (this.newChecked.length > 0) {
    //   this.newChecked.forEach(element => {
    //     formdata.append('service_project', JSON.stringify(this.newChecked))
    //   });
    // }
    console.log(this.Service_data?.related_images)
    console.log(this.Service_data?.other_images)
    // return

    if (!this.formGroup.valid) {
      this.toastr.error("Please fill required feilds")
      return
    } else if (!this.formGroup.value.service_visible_customer && !this.formGroup.value.service_visible_professional) {
      this.toastr.error("Please select visiblity of service")
      return
    } else if (this.files.length == 0 && this.Service_data?.related_images.length == 0) {
      this.toastr.error("Please add related images")

    } else if (this.formGroup.valid) {
      this.CustomerService.editSellerServices(formdata).subscribe(data => {
        console.log(data);
        // this.ngOnInit()
        this.router.navigate(['/seller-service-list']);
        this.toastr.success("Service updated sucessfully")
      })
    }
  }
}
