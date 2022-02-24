import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
declare var $;
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr'
import { Location } from '@angular/common'
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-seller-add-services',
  templateUrl: './seller-add-services.component.html',
  styleUrls: ['./seller-add-services.component.scss']
})
export class SellerAddServicesComponent implements OnInit {

 
  subCatArr=[]
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Delhi'];
  allFruits: string[] = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Nagpur'];
  countries = []
  ProjectCost:any[] = [
    {
      name: '1000-20000'
    },
    {
      name:'20000-300000'
    },
    {
      name: '40000-500000'
    }
  ]
  items = []
  cities = []
  userData
  userDetails
  ServiceSubCat = []
  ServiceCat = []
  formGroup: FormGroup;
  service_image
  submit_button = false
  projects = []
  image_path
  selected_projects = []
  checked = [];
  lenArrCity:number
  lenArrCategory:number
  service_description
  categiryArr=[]
  catArr=[]
  subCateArr=[]
  serviceDuration:any = null;
  serviceName:any = null;
  maxSize:any=null;
  countryName:any = null;
  areaCovr:any = null;
  ckedit
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

  selected(event: MatAutocompleteSelectedEvent): void  {
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
    if(event) {
      for(var i = 0; i < event.addedFiles.length; i++){
        var size= event.addedFiles[i].size;
        console.log('sss', size)
        if(size>2000000) {
          this.toastr.error('Please  upload less than 2MB,')
        }
        else {
          console.log(event);
          this.files=event.addedFiles;
          console.log('fff',this.files)
        }
      }
    }
   
    
   
   
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  files1: File[] = [];
  onSelect1(event) {
    if(event) {
      for(var i = 0; i < event.addedFiles.length; i++){
        var size= event.addedFiles[i].size;
        console.log('sss', size)
        if(size>2000000) {
          this.toastr.error('Please  upload less than 2MB,')
        }
        else {
          console.log(event);
          console.log(event);
           this.files1=event.addedFiles;
           console.log("all pics are===>",this.files1);
           
        }
      }
    }
    
  }

  onRemove1(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  ngOnInit(): void {
    this.maxSize = 2;
    this.image_path = environment.image_path + "ProfessionalProject/"
    this.getCountries()
    this.userData = JSON.parse(localStorage['userData']);
    this.getProfile()
    // this.getProject()
    this.getCategoryList()
    this.formGroup = new FormGroup({
      service_name: new FormControl('', [
        Validators.required,
      ]),
      service_description: new FormControl('', [
        Validators.required,
      ]),
      // country: new FormControl('', [
      //   Validators.required,
        
      // ]),
      // city: new FormControl('', [
      //   Validators.required,
        
      // ]),
      service_category: new FormControl('', [
        Validators.required,
      ]),
      service_sub_category: new FormControl('', [
        Validators.required,
      ]),
      service_img: new FormControl('', [
        Validators.required,
      ]),
      // service_related_photos: new FormControl('', [
      //   // Validators.required,
      // ]),
      // service_other_photos: new FormControl('', [
      //   // Validators.required,
      // ]),
      service_price: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d*\.?\d*$/)
      ]),
      service_duration: new FormControl('', [
        Validators.required, Validators.pattern("^[0-9]*")
        // Validators.pattern('^[0-9]*')
      ]),
      service_visible_customer: new FormControl('', [
        // Validators.required,
      ]),
      service_visible_professional: new FormControl('', [
        // Validators.required,
      ]),
      keyWords:  new FormControl('', [
        
      ]), 
      issuedInCountry: new FormControl('',[Validators.required]),
      issuedIncities: new FormControl('',[Validators.required]),
      service_checkbox: new FormControl('',[Validators.required]),
    
      //ckedit: new FormControl('',[Validators.required]),
    })


    this.CustomerService.proffSelectedCatAndSubcat().subscribe(res => {
      console.log('Response of the Category and Subcategory Lists<<<<>>>>>', res)
      this.catArr=res.data.service_categories
      this.subCateArr= res.data.service_subcategories
      //this.categiryArr = res.data

    })
  }
  fun(): void {
    console.log('gg',this.formGroup)
    console.log(this.formGroup.value.service_name)
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
  // getCountries() {
  //   this.CustomerService.getCountries().subscribe(data => {
  //     console.log("main data is ====", data)
  //     if (data.code == '200' || data.code == 200) {
  //       this.countries = data.data
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

  getProfile() {
    this.ServiceSubCat = []
    var arr = []
    var obj = {
      id: this.userData._id
    }
    this.CustomerService.getUserDetails().subscribe(async data => {
      console.log('getProfileData-------->',data);
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
  // getProject() {
  //   var obj = {
  //     user_id: this.userData._id
  //   }
  //   this.CustomerService.getProfessionalProjects(obj).subscribe(async data => {
  //     console.log('getProjects old----------------',data);
  //     if (data.code == 200) {
  //       this.projects = data.data
  //     }
  //   })
  // }
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

// New Work ha

newArr = []
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





  // getCities(event) {
  //   console.log("====event", event)
  //   var arr = []
  //   if (Array.isArray(event)) {
  //     arr = event
  //   } else {
  //     arr.push(event)
  //   }
  //   var obj = {
  //     country_code: arr
  //   }
  //   console.log("===obj", obj)
  //   this.CustomerService.getAllCities(obj).subscribe(data => {
  //     console.log("city data is ====", data)
  //     if (data.code == '200' || data.code == 200) {
  //       this.cities = data.data
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

  

  getSubCat(event) {
    console.log("Event for the sub category>>>",event)
    var arr = []
		if (Array.isArray(event)) {
			arr = event
      this.lenArrCategory =arr.length
		//	this.formGroup.controls['issuedInCountry'].setValue(event)
		} else {
			arr.push(event)
      this.lenArrCategory =arr.length
		}
    event= arr[this.lenArrCategory-1]
    console.log("EVENT>>>>>",event)
		// var obj = {
		// 	category: arr[this.lenArrCity-1]
		// }
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
    var _URL = window.URL || window.webkitURL;
    var self = this
    var img
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
    console.log("hbcvhsvdcsjvcs",file.width +" and " +file.height);
  //   img = new Image();
  //   var objectUrl = _URL.createObjectURL(file);
  //   img.onload = function () {
  //     alert(this.width + " " + this.height);
  //     _URL.revokeObjectURL(objectUrl);
  // };
  // file.height
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      // this.toastr.warning('Please upload image file')
      return;
    }
    console.log(evt.target.files[0])
    this.service_image = evt.target.files[0];
    console.log("this.service_image>>>>>>>>>>",this.service_image)
    var obj={
      file:{
        service_image: this.service_image
      }
    }
    var formdata2 = new FormData()
    formdata2.append('service_image', JSON.stringify(obj))
    this.CustomerService.uploadImageService(formdata2).subscribe(data => {
			console.log("Response of the image upload",data)
			this.service_image = data.files.service_image;
		}, err => {
			console.log(err)
			this.toastr.error('Some error occured, please try again!!', 'Error')

		})
    const fr = new FileReader();
    fr.onloadend = (loadEvent) => {
      let mainImage = fr.result;
      console.log(fr);
      
      // self.profile_img = mainImage;
      // alert(self.profile_img)
    };
    fr.readAsDataURL(file);
  }
  areaCoveredArr=[]
  areaCoveredFormArr=[]
  areaCovered(evt){
    

    // var a={
    //   city:evt
    // }
    this.areaCoveredArr=evt
    console.log('this.areaCoveredArr',this.areaCoveredArr);
    
  }
  newChecked=[]
  visible_customer
  visible_pro
  visibleErr=false
  submit() {
    
    console.log('this.formGroup.value.service_visible_customer',this.formGroup.value.service_visible_customer)
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
    // if(!this.formGroup.value.service_visible_professional && !this.formGroup.value.service_visible_customer ){
    //   this.visibleErr=true
    //   console.log('this.visibleErr',this.visibleErr)
    //   return
    // }else{
    //   this.visibleErr=false
    // }
    console.log('this.formGroup.value.service_visible_professional',this.formGroup.value.service_visible_professional)
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
    this.newChecked.forEach(el=>{
      console.log('newChecked',el)
    })
    console.log('newChecked',this.newChecked)
    console.log('this.formGroup.value.service_name',this.formGroup.value.service_name);
    console.log('this.formGroup.value.service_description',this.formGroup.value.service_description);
    console.log('Area Covered',this.areaCoveredFormArr);
    console.log('this.formGroup.value.country',this.formGroup.value.country);
    console.log('this.formGroup.value.service_category',this.formGroup.value.service_category);
    console.log('service_sub_category',this.formGroup.value.service_sub_category);
    console.log('service_project',this.checked);
    console.log('price',this.formGroup.value.service_price);
    console.log('duration',this.formGroup.value.service_duration);
    console.log('service_visible_customer', this.visible_customer);
    console.log('service_visible_professional', this.visible_pro);
    console.log('service_image',this.service_image);
    console.log('related_images', this.files);
    console.log('other_images',this.files1);
    
    


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
    console.log("Service Countries<<<<//////>>>>>>>",this.formGroup.value.issuedInCountry)
    // formdata.append('professional_id', this.userDetails.data._id)
    formdata.append('service_name', this.formGroup.value.service_name)
    formdata.append('service_description', this.formGroup.value.service_description)
    formdata.append('country', JSON.stringify(this.formGroup.value.issuedInCountry))
    formdata.append('area_covered',JSON.stringify(this.formGroup.value.issuedIncities))
    // formdata.append('city', this.formGroup.value.city)
    formdata.append('service_category', JSON.stringify(this.formGroup.value.service_category))
    formdata.append('service_sub_category', JSON.stringify(this.formGroup.value.service_sub_category))
    formdata.append('price', this.formGroup.value.service_price)
    formdata.append('duration', this.formGroup.value.service_duration)
    formdata.append('service_visible_customer', this.formGroup.value.service_visible_customer)
    formdata.append('service_visible_professional', this.formGroup.value.service_visible_professional)
    formdata.append('service_project',JSON.stringify(this.newChecked))
    // if(this.newChecked.length > 0){
    //   this.newChecked.forEach(element => {
    //     console.log('new checked  element',element)
    //     formdata.append('service_project', element)
    //   });
    // }
    if (!this.formGroup.valid) {
      this.toastr.error("Please fill required feilds")
      return
    } else if (!this.formGroup.value.service_visible_customer && !this.formGroup.value.service_visible_professional) {
      this.toastr.error("Please select visiblity of service")
      this.visibleErr=true
      return
    } else if (this.files.length == 0) {
      this.toastr.error("Please add related images")
      return
    } else {
      this.CustomerService.AddProfessionalService(formdata).subscribe(data => {
        console.log(data);
        // this.ngOnInit()
        this.router.navigate(['/seller-service-list']);
        this.toastr.success("Service added sucessfully")
      })
    }
  }

  getCountries() {
		this.CustomerService.getCountries().subscribe(data => {
			console.log("main data is ====", data)
			if (data.code == '200' || data.code == 200) {
        this.countries = data.data
        // console.log('countries issued in',this.countries)
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
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

 
  getCities(event) {
    this.cities=[]
		console.log("==== event to chekc isssued in countriessssssssssssssssssssssss", event)
		var arr = []
		if (Array.isArray(event)) {
			arr = event
      this.lenArrCity =arr.length
			this.formGroup.controls['issuedInCountry'].setValue(event)
		} else {
			arr.push(event)
      this.lenArrCity =arr.length
		}
		var obj = {
			country_code: arr[this.lenArrCity-1]
		}
		console.log("===obj", obj)
		this.CustomerService.getAllCities(obj).subscribe(data => {
      this.cities=[]
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
}
