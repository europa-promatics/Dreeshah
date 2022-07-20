import { Component, NgModule, OnInit } from '@angular/core';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service';
import { environment } from '../../../environments/environment.prod';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
    selector: 'addproject',
    templateUrl: 'addproject.html',
    styleUrls: ['./seller-add-services.component.scss']
})

export class addproject {
    addProjectForm
    keyWordsArr = []
    projectImgarr = []
    branchIdArr = []
    categiryArr = []
    styleArr = []
    branchListArr = []
    items = [];
    getProjectArr = []
    catDrop
    styleDrop
    submit = false
    lenArrCity:number
    lenArrCategory:number
    service_description
    countries = []
    cities = []
    country
    city
    areaCovered
    branchYear
    years =[]
    disabled:boolean = true;
    SerCategory:String ;
    serviceSubCat:String;
    projctCost: any;
    reqdSubCat=[];
    reqdCat=[];
    reqd_countries=[];
    reqd_cities=[];
    reqdCategories=[];
    subCats=[];
    newdata: any;
  
  
    constructor(
      public CustomerService: CustomerService,
      private toastr: ToastrService,
      private fb: FormBuilder,
      private router:Router,
      private route: ActivatedRoute,
    ) {
      this.createForm();
      console.log('ff',history.state.data)
    }
  
    files: File[] = [];
  
    ngOnInit(): void {
      this.route.paramMap.subscribe(res=> {
        console.log(res)
      })
      console.log('ff',history.state.data)
     
      this.SerCategory = 'Service category'
      this.serviceSubCat= 'Service Sub category'
      this.getCountries()
      this.getCategoryList()
      this.style()
      this.getAllBranch()
      // this.getProfessionalProjects()
      this.generateArrayOfYears()
    }
    onSelect(event) {
      console.log(event);
      for (let i = 0; i < event.addedFiles.length; i++) {
        const element = event.addedFiles[i];
        if(element.size>2000000){
          this.toastr.error('File size must be less than 2 MB')
          continue
        }else{
          this.files.push(element);
        }
      }
  
      console.log('this.files image array', this.files)
    }
    onRemove(event) {
      console.log('remove image event', event);
      this.files.splice(this.files.indexOf(event), 1);
    }
    createForm() {
      const reg = '[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?'
      this.addProjectForm = this.fb.group({
  
        sellerProject: new FormControl('',),
        // [Validators.required]
  
        newProjName: new FormControl('', [Validators.required]),
        CatName:new FormControl('', [Validators.required]),
        projectAddress: new FormControl(),
        description: new FormControl('', [Validators.required]),
        category: new FormControl('',[Validators.required]),
        styles: new FormControl(''),
        projectYear: new FormControl('',[Validators.required]),
        projectCost: new FormControl('', [Validators.required]),
        // dropzone: new FormControl('', [Validators.required]),
        website: new FormControl('', [Validators.required,Validators.pattern(reg)]),
  
        keyWords: new FormControl('',Validators.required),
        getNoticed: new FormControl(''),
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
       
        // content: new FormControl('',[Validators.required]),
        // publish: new  FormControl('',[Validators.required]),
  
  
      })
    }
    newArr = []
    getCategories(event){
      this.reqdCategories=event
    }
    getCategoryList() {
      this.CustomerService.getCatAndSubCat().subscribe(res => {
        console.log('res of category List', res)
        this.categiryArr = res.data
        this.categiryArr.forEach((el, ind) => {
  
          this.CustomerService.getSubCat(el.id).subscribe(res => {
            console.log('reeees', res)
            res.sub_categories.forEach(element => {
              let v = {
                name: element.name,
                id: element._id
              }
              this.newArr.push(v)
            });
            console.log('newarrcategory', this.newArr)
          })
  
        })
  
      })
    }
    // getProfessionalProjects() {
    //   this.CustomerService.getProfessionalProjectsWithoutPagination().subscribe(res => {
  
    //     this.getProjectArr = res.data
    //     console.log('getProfessionalProjectsWithoutPagination', this.getProjectArr)
    //   })
    // }
    getAllBranch() {
      this.CustomerService.getAllprofessionals().subscribe(res => {
        console.log('branch list response', res)
        this.branchListArr = res.data
      })
    }
  
    style() {
      this.CustomerService.getStyleListing().subscribe(res => {
        console.log('style response', res)
        this.styleArr = res.result
      })
    }
  
    bridevt(event) {
      console.log('eeeeeee', event)
      this.branchIdArr=event
      // this.styleArr.push(event)
    }
    catDropId
    styleDropId
    SelectProject(event) {
      console.log('project Change', event)
      console.log('getProjectArr', this.getProjectArr);
  
      this.getProjectArr.forEach(el => {
        if (event.value == el.project_name) {
          // this.addProjectForm.controls['newProjName'].setValue(el.project_name)
          this.addProjectForm.controls['projectAddress'].setValue(el.project_address)
          console.log("FSAfrawe",this.addProjectForm);
          this.projctCost=el.project_cost.toString()
          console.log(this.projctCost);
          
          this.catDrop = el.project_category[0].name
          if(this.catDrop){
            this.addProjectForm.controls['category'].clearValidators();
            this.addProjectForm.controls['category'].updateValueAndValidity();
          }
          
          this.catDropId = el.project_category.map(data=>{
            return data._id 
          })
          console.log("fsdsafved",this.catDropId);
          
          this.subCats=el.project_sub_category.map(data=>{
            return data._id 
          })
          console.log("fdsafaw",this.subCats);
          
          console.log("fdgsgreghyteryh",this.catDropId);
         
          this.styleDrop = el.project_style.name
          if(this.styleDrop){
            this.addProjectForm.controls['styles'].clearValidators();
            this.addProjectForm.controls['styles'].updateValueAndValidity();
          }
          this.styleDropId = el.project_style.id
           this.addProjectForm.controls['category'].setValue(el?.project_category?.map(data=>{
             return data._id
           }))
           this.addProjectForm.controls['styles'].setValue(el.project_style._id)
          this.addProjectForm.controls['projectYear'].setValue(el.project_year)
          this.addProjectForm.controls['projectCost'].setValue(el.project_cost)
          this.addProjectForm.controls['website'].setValue(el.project_website)
          this.addProjectForm.controls['CatName'].setValue(el?.project_sub_category?.map(data=>{
            return data._id
          }))
          this.addProjectForm.controls['description'].setValue(el.project_description)
          this.addProjectForm.controls['country'].setValue(el.project_country)
          this.addProjectForm.controls['city'].setValue(el.project_city)
          this.addProjectForm.controls['keyWords'].setValue(el.project_keyword)
         
        
          
          el.project_keyword.forEach(element => {
            this.items.push(element.name)
  
         });
           el.project_images.forEach(element => {
             this.files.push(element.name)
           });
          
  
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
    new
    greaterYear=false
    lesserYear=false
  
    profCheck
    prodCheck
    serCheck
    checkFunctionPro(event) {
      console.log('checkbox event', event.source.value)
      if (event.checked) {
        this.profCheck = true
      } else {
        this.profCheck = false
      }
    }
    getreqdCities(event){
      this.reqd_cities=event
    }
    checkFunctionService(event) {
      if (event.checked) {
        this.serCheck = true
      } else {
        this.serCheck = false
      }
    }
    checkFunctionproduct(event) {
      if (event.checked) {
        this.prodCheck = true
      } else {
        this.prodCheck = false
      }
    }
    getSubCategories(event){
      this.reqdSubCat=event
    }
    checkboxEr = false
    cateValidation=false
    ngxDrop = false
    styleValidation=false
    emptyProjYear=false
    invalidYear=false


    addProject() {
      console.log("DGSFdgvdsg",this.addProjectForm);
      
      console.log("Project Cost Value is>>>>",this.addProjectForm.value.projectCost)
      var flag=false
      console.log('this.addProjectForm.invalid',this.addProjectForm.invalid);
      
      console.log('this.prodCheck', this.prodCheck)
      console.log('this.profCheck', this.profCheck)
      this.submit = true
      let date=new Date()
       this.new =date.getFullYear()
      console.log('datee',this.new)
      console.log('year validation event',this.addProjectForm.value.projectYear)
      if(this.addProjectForm.value.projectYear.toString().length < 4){
        this.invalidYear=true;
        this.emptyProjYear=false;
        this.greaterYear=false;
        this.lesserYear=false;
        return
        flag=true
       
        // return
      }else{
        this.invalidYear=false;
        flag=false
      }
      
      if(this.addProjectForm.value.projectYear > this.new && this.addProjectForm.value.projectYear.toString().length >3){
        this.greaterYear=true;
        this.emptyProjYear=false;
        
        this.lesserYear=false;
        this.invalidYear=false;
        return
        console.log('this.greaterYear',this.greaterYear)
        flag=true
      }else{
        this.greaterYear=false;
        flag=false
        console.log('this.greaterYear',this.greaterYear)
      }
      // num1.toString().length
      if(this.addProjectForm.value.projectYear < 1995 && this.addProjectForm.value.projectYear.toString().length >3){
        this.lesserYear=true;
        this.emptyProjYear=false;
        this.greaterYear=false;
       
        this.invalidYear=false;
        return
        console.log('this.greaterYear',this.lesserYear)
        flag=true
      }else{
        this.lesserYear=false
        flag=false
        console.log(' this.lesserYear',this.lesserYear)
      }
  
      if (this.addProjectForm.value.category || this.catDrop != null) {
        this.cateValidation=false
        this.addProjectForm.controls['category'].clearValidators();
        this.addProjectForm.controls['category'].updateValueAndValidity();
      }else{
        this.cateValidation=true
        this.addProjectForm.controls['category'].setValidators([Validators.required]);
        this.addProjectForm.controls['category'].updateValueAndValidity();
      }
      if (this.addProjectForm.value.styles || this.styleDrop != null) {
        this.styleValidation=false
        this.addProjectForm.controls['styles'].clearValidators();
        this.addProjectForm.controls['styles'].updateValueAndValidity();
      }else{
        this.styleValidation=true
        this.addProjectForm.controls['styles'].setValidators([Validators.required]);
        this.addProjectForm.controls['styles'].updateValueAndValidity();
      }
    
      if (this.addProjectForm.invalid) {
        return
      }
      if (this.prodCheck == undefined && this.profCheck == undefined && this.serCheck == undefined) {
        this.checkboxEr = true;
        return
        console.log('this.checkboxEr', this.checkboxEr)
        // this.checkboxEroor="Please select atleast one checkbox where you want to publish "
        flag=true
      } else {
        this.checkboxEr = false;
        flag=false
      }
      if (this.files.length < 1) {
        this.ngxDrop = true
        return
        console.log('this.ngxDrop', this.ngxDrop)
        flag=true
      } else {
        this.ngxDrop = false
        flag=false
      }
      if (this.prodCheck == undefined) {
        this.prodCheck = false
      }
      if (this.profCheck == undefined) {
        this.profCheck = false
      }
      if (this.serCheck == undefined) {
        this.serCheck = false
      }
  
  
      // if(!flag){
      //   this.toastr.error('Please fill all the required fields')
      //   return
      // }
      console.log('formValue------------', this.addProjectForm.value)
      // console.log('this.keyWordsArr', this.keyWordsArr)
      // console.log('this.this.projectImgarr', this.projectImgarr)
      console.log('this.branchIdArr', this.branchIdArr)
      console.log('img files arrray', this.files)
      console.log('this.keywords array', this.items);
      console.log('this.prodCheck', this.prodCheck)
      console.log('this.profCheck', this.profCheck)
      console.log('this.serCheck', this.serCheck)
      var formData = new FormData()
      formData.append('project_name', this.addProjectForm.value.newProjName)
      formData.append('project_address', this.addProjectForm.value.projectAddress)
      formData.append('project_country',JSON.stringify(this.addProjectForm.value.country.map(data=>{
        return data.name? data.name: data
      })))
      formData.append('project_city',JSON.stringify(this.addProjectForm.value.city.map(data=>{
        return  data.name? data.name: data
      })))
  
      // formData.append('project_description', this.addProjectForm.value.description)
      if(this.reqdSubCat){
        formData.append('project_sub_category',JSON.stringify(this.reqdSubCat))
      }else{
         formData.append('project_sub_category',JSON.stringify(this.addProjectForm.value.CatName))
  
      }
      
      if (this.reqdCategories) {
        formData.append('project_category', JSON.stringify(this.reqdCategories))
      } else {
         formData.append('project_category',JSON.stringify(this.addProjectForm.value.category))
      }
      if (this.addProjectForm.value.styles) {
        formData.append('project_style', this.addProjectForm.value.styles)
      } else {
        formData.append('project_style', this.styleDropId)
      }
      // formData.append('project_sub_category',  this.addProjectForm.value.CatName)
      formData.append('project_description',  this.addProjectForm.value.description)
      formData.append('project_year', this.addProjectForm.value.projectYear)
      formData.append('project_cost', this.addProjectForm.value.projectCost)
      formData.append('project_website', this.addProjectForm.value.website)
      formData.append('project_keyword', JSON.stringify(this.addProjectForm.value.keyWords.map(data=>{
        return data.value ? data.value: data
      })))
      // formData.append('project_images', JSON.stringify(this.files))
      this.files.forEach(element => {
        formData.append('project_images', element);
      });
      formData.append('project_publish_product', this.prodCheck)
      formData.append('project_publish_professional', this.profCheck)
      formData.append('project_publish_services', this.serCheck)
      formData.append('notify_professional_ids', JSON.stringify(this.branchIdArr))
      this.CustomerService.addSellerProject(formData).subscribe(res => {
        console.log('res of add branch', res)
        // this.newdata=res['data']
        this.emitEvent(res)
        this.toastr.success('Project created Successfully')
        this.router.navigate(['/addService'])
        this.ngOnInit()
      })
    }

    emitEvent(res) {
      this.CustomerService.updateProjectsViaFilter((
        JSON.stringify(res)
      ))
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
  
   
    getCities(event) {
      this.reqd_countries=event
      this.cities=[]
          console.log("==== event to chekc isssued in countriessssssssssssssssssssssss", event)
          var arr = []
          if (Array.isArray(event)) {
              arr = event
        this.lenArrCity =arr.length
          //	this.formGroup.controls['issuedInCountry'].setValue(event)
          } else {
              arr.push(event)
        this.lenArrCity =arr.length
          }
          var obj = {
              country_code: arr[this.lenArrCity-1].isoCode
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
  
    generateArrayOfYears() {
          var max = new Date().getFullYear()
          var min = max - 600
          this.years = []
        
          for (var i = max; i >= min; i--) {
            this.years.push(i)
          }
          //console.log("List of the years>>>>>>",this.years)
        }
  
      getBranchYear(evt){
        console.log("Branch Year is>>>>>",evt.value)
        this.branchYear = evt.value
      }
  
}