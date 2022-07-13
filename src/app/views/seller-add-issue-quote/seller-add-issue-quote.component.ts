import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
// import {FormGroup, FormControl} from '@angular/forms';
//import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomerService } from '../../shared/customer.service'
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
declare var $;
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Moment } from 'moment';
import { Validators } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-seller-add-issue-quote',
  templateUrl: './seller-add-issue-quote.component.html',
  styleUrls: ['./seller-add-issue-quote.component.scss']
})
export class SellerAddIssueQuoteComponent implements OnInit {


   @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  image: File;
  addArray=[];
  sections:any
  reqdfields: number;
  reqdfields1: number;
  addArray1=[];
  controls: FormGroup;
  itemControls: FormGroup;
  group: FormGroup;
  quote_id: any;
  user_type: any;
  detail: any;
  title: any;
  workFlow=[];
  paymentTerms=[];
  workSchedule=[];
  reqDates=[];
  warrenty: any;
  offerValidity: any;
  price: any;
  quantity: any;
  vat: any;
  scope_of_work: any;
  exclusion: any;
  add_terms_and_conditions_of_dreeshah: any;
  add_terms_and_conditions_of_seller: any;
  reqdItems=[];
  dataimage: File;
  reason: FormControl;

  uploadFileEvt(imgFile) {
    console.log(imgFile);
    
   this.image=imgFile.target.files[0]
  }

  selected: {start: Date, end: Date};
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  

  quotationNum: number;
  submit_book: boolean;
  quotationForm:FormGroup;
  ItemForm:FormGroup;
  _id: any;
  professionalData: any;
  index;
  userData: any;
  reqdId: string;
  constructor(public gallery: Gallery,  private route: ActivatedRoute,
    private router: Router,

    public CustomerService: CustomerService,
    private toastr: ToastrService,) { 
  	
  }
  addSections(){
    
   this.controls= new FormGroup({
     'title1': new FormControl(null, Validators.required),
     'items': this.ItemForm.get('items')
   });
   (<FormArray>this.quotationForm.get('titles')).push(this.controls)
   console.log("fdfssdfsd");
   
   console.log("fdsfdasrfdesfrwes",this.quotationForm.get('titles'));
   console.log("xfczfzds",this.quotationForm);
   
  }
  removeSections(controls){
    
    this.controls= new FormGroup({
      'title1': new FormControl(null, Validators.required),
      'items': this.ItemForm.get('items')
    });
    (<FormArray>this.quotationForm.get('titles')).removeAt(controls)
    
   }
  addMilestones(){
    const controls=new FormGroup({
      'payment_percent':new FormControl(null,[ Validators.required,Validators.pattern("^[0-9]*")]),
      'start_date':new FormControl(null, Validators.required),
      'end_date':new FormControl(null, Validators.required)
    }) 
    console.log("dfdsfdsf", this.reqdfields1);
    (<FormArray>this.quotationForm.get('paymentterms')).push(controls)
    
  }
  removeMilestones(controls){
    this.controls=new FormGroup({
      'payment_percent':new FormControl(null,[ Validators.required,Validators.pattern("^[0-9]*")]),
      'start_date':new FormControl(null, Validators.required),
      'end_date':new FormControl(null, Validators.required)
    }) 
    console.log("dfdsfdsf", this.reqdfields1);
    (<FormArray>this.quotationForm.get('paymentterms')).removeAt(controls)

  }
  showDetails(i){
    $('#exampleModal').modal("show")
    this.reqdItems=i.data

    
  }
  ckeditorContent
  ngOnInit(): void {
    this.quote_id=this.route.snapshot.queryParams.quote_id
    this.user_type=JSON.parse(localStorage.getItem('userData'))
    this.Issuequotation()

    
   
    this.quotationForm = new FormGroup({
      title: new FormControl('', [Validators.required,]),
      warranty: new FormControl('', [Validators.required,]),
      offer_validity: new FormControl('', [Validators.required,]),
      price: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*")]),
      quantity: new FormControl('', [Validators.required,,Validators.pattern("^[0-9]*")]),
      vat: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*")]),
      sec: new FormControl('', [Validators.required,]),
      scope_of_work: new FormControl('', [Validators.required,]),
      exclusion: new FormControl('', [Validators.required,]),
      add_terms_and_conditions_of_dreeshah: new FormControl('', [Validators.required,]),
      add_terms_and_conditions_of_seller: new FormControl('', [Validators.required,]),
      milestone: new FormControl('', [Validators.required,]),
      image:new FormControl('', [Validators.required,]),
      'titles':new FormArray([]),
      'workSchedule': new FormArray([]),
      'paymentterms':new FormArray([])
    })
    this.ItemForm=new FormGroup({
      'items': new FormArray([])
    })
    
  }
  additems(){
      this.itemControls= new FormGroup({
        'name':new FormControl(null, Validators.required),
        'price': new FormControl(null, [Validators.required,Validators.pattern("^[0-9]*")])
      });
      (<FormArray>this.ItemForm.get('items')).push(this.itemControls);
      console.log("dfdsafsaedfcvase",this.ItemForm);
      
      
  }
  removeitems(itemControls){
    this.itemControls= new FormGroup({
      'name':new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required)
    });
    (<FormArray>this.ItemForm.get('items')).removeAt(itemControls);
   // console.log("dfdsafsaedfcvase",this.ItemForm);
    
    
}
  saveTitleandItems(i){
    $('#exampleModal1').modal("hide")
    

    this.ItemForm.reset()
    console.log(this.quotationForm);
  }
  Issuequotation(){
    let obj={
      quotation_id:this.quote_id, 
      user_type:this.user_type.user_type
    }
    this.CustomerService.issueQuotation(obj).subscribe(res=>{
      console.log("Response of the quotaion details>>>>",res)
      this.detail =res.data
      this.title=this.detail.title
      this.warrenty=this.detail.warrenty
      this.offerValidity=this.detail.offer_validity
      this.price=this.detail.price
      this.quantity=this.detail.quantity
      this.vat=this.detail.vat
      this.workFlow=this.detail.workflow
      this.scope_of_work=this.detail.scope_of_work
      this.exclusion=this.detail.exclusion
      this.add_terms_and_conditions_of_dreeshah=this.detail.dreeshah_terms
      this.add_terms_and_conditions_of_seller=this.detail.seller_terms
      this.image=this.detail.image
      for(let i=0;i<this.workFlow.length;i++){
        this.controls= new FormGroup({
          'title1': new FormControl(null, Validators.required),
          'items': this.ItemForm.get('items')
        });
        (<FormArray>this.quotationForm.get('titles')).push(this.controls)
        console.log("fdfssdfsd");
      }
      this.paymentTerms=this.detail.payment_terms
      for(let i=0;i<this.paymentTerms.length;i++){
        const controls=new FormGroup({
          'payment_percent':new FormControl(null, Validators.required),
          'start_date':new FormControl(null, Validators.required),
          'end_date':new FormControl(null, Validators.required)
        }) 
        console.log("dfdsfdsf");
        (<FormArray>this.quotationForm.get('paymentterms')).push(controls)
        console.log("fdfssdfsd");
      }
      console.log("quotation issue",this,this.paymentTerms)
      this.workSchedule=this.detail.work_schedule
      for(let i=0;i<this.workSchedule.length;i++){
        const startDate=new Date(this.workSchedule[i].start_date)
        const endDate=new Date(this.workSchedule[i].end_date)
        this.reqDates.push({start:startDate,end:endDate})
        const group=new FormGroup( 
          {
          'module':new FormControl(null, Validators.required),
          'description':new FormControl(null, Validators.required),
          'date_range':new FormControl(null, Validators.required)
        });
          (<FormArray>this.quotationForm.get('workSchedule')).push(group)
      }
      console.log("dsfgsedgtdsfs",this.reqDates)
    })
    }
  submitQutation() {

    this.quotationNum = moment().unix()
    console.log("Quotation Number is>>>>", this.quotationNum)

      
        this.submit_book = true
        console.log("=====quatation form", this.quotationForm)

    var workSchedule=this.quotationForm.value.workSchedule.map(data=>{
      return {module:data.module,description:data.description,start_date:data.date_range.startDate._d,end_date:data.date_range.endDate._d}
    })
    console.log("asfdasfd",workSchedule);
    var workFlow= this.quotationForm.value.titles.map(data=>{
      return {title:data.title1,data:data.items.map(a=>{
        return {itemName:a.name,price:a.price}
      })}
    })
    console.log("fdgdsfgdff",workFlow);
    
    

		const uploadData = new FormData(); 

		
		uploadData.append('customer_quotation_id', this.route.snapshot.queryParams.quote_id);
    uploadData.append('customer_id', this.route.snapshot.queryParams.cust_id);

		uploadData.append('title', this.quotationForm.value['title']);
		uploadData.append('token_from',localStorage.getItem("token"));
		uploadData.append('warranty',this.quotationForm.value['warranty'])

		uploadData.append('offer_validity', this.quotationForm.value['offer_validity']);

		uploadData.append('price',this.quotationForm.value['price']);
		uploadData.append('quantity', this.quotationForm.value['quantity']);
		uploadData.append('vat', this.quotationForm.value['vat']);
		uploadData.append('scope_of_work', this.quotationForm.value['scope_of_work']);
    uploadData.append('dreeshah_terms', this.quotationForm.value['add_terms_and_conditions_of_dreeshah']);
    uploadData.append('seller_terms', this.quotationForm.value['add_terms_and_conditions_of_seller']);

		uploadData.append('exclusion', this.quotationForm.value['exclusion']);
		uploadData.append('payment_terms',JSON.stringify(this.quotationForm.value.paymentterms));
    uploadData.append('workflow',JSON.stringify(workFlow));
    uploadData.append('work_schedule',JSON.stringify(workSchedule))
    uploadData.append('image', this.image);
        console.log("object of Instant Quotation ===>", uploadData)
        
        this.CustomerService.AddQuotation(uploadData).subscribe(data => {
          console.log("Quotation Submit Response ====>>>>>>", data)
       
          this.router.navigate(['sellerQuotation'])
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
add(evt){
  const num=evt.target.value

  const group=new FormGroup( 
  {
  'module':new FormControl(null, Validators.required),
  'description':new FormControl(null, Validators.required),
  'date_range':new FormControl(null, Validators.required)
});
  (<FormArray>this.quotationForm.get('workSchedule')).push(group)
 
  console.log("fdsfdasrfdesfrwes",this.quotationForm.get('workSchedule'));
  }

  remove(group){
 
  
    this.group=new FormGroup( 
    {
    'module':new FormControl(null, Validators.required),
    'description':new FormControl(null, Validators.required),
    'date_range':new FormControl(null, Validators.required)
  });
    (<FormArray>this.quotationForm.get('workSchedule')).removeAt(group)
   

    }
 
}
  


