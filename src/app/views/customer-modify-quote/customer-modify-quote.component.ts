
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


@Component({
  selector: 'app-customer-modify-quote',
  templateUrl: './customer-modify-quote.component.html',
  styleUrls: ['./customer-modify-quote.component.scss']
})
export class CustomerModifyQuoteComponent implements OnInit {
  
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
  quote_id
  user_type
  status=[]
  detail
  wf=[];
  paymentTerms=[];
  workFlow=[];
  reqdItems=[];
  workSchedule: any;
  reqDates=[];
  title: any;
  warranty: any;
  offer_validity: any;
  price: any;
  quantity: any;
  vat: any;
  scope_of_work: any;
  exclusion: any;
  dreeshah_terms: any;
  seller_terms: any;
  dataimage: File;

  uploadFileEvt(imgFile) {
    console.log(imgFile);
    
   this.dataimage=imgFile.target.files[0]
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
   // public _formBuilder: FormBuilder,
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
  addMilestones(){
    const controls=new FormGroup({
      'payment_percent':new FormControl(null, Validators.required),
      'start_date':new FormControl(null, Validators.required),
      'end_date':new FormControl(null, Validators.required)
    }) 
    console.log("dfdsfdsf", this.reqdfields1);
    (<FormArray>this.quotationForm.get('paymentterms')).push(controls)
    
  }
  showDetails(i){
    $('#exampleModal').modal("show")
    console.log("swdrfwertfe",i);
    this.reqdItems=i.data
    console.log("dsggdsvs",this.reqdItems);
    
    for(let i=0; i<this.reqdItems.length;i++){
    this.itemControls= new FormGroup({
      'name':new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required)
    });
    (<FormArray>this.ItemForm.get('items')).push(this.itemControls);
  }
  }
  ckeditorContent
  ngOnInit(): void {
    this.quote_id = this.route.snapshot.paramMap.get('id')
    this.user_type =JSON.parse(localStorage.getItem('userData'))
    //console.log(this.quote_id.paramKey,'hello');
    console.log("sadsfefweqds",this.user_type)
    console.log("sadsfefweqds",this.quote_id)
    this.Issuequotation();
    this.route.queryParams
    .subscribe(params => {
      console.log(params,this.status);
      this.status.push(params)
    }
  );
   
    
   // console.log("DGFxdsgtstg",this.reqdId)
    this.quotationForm = new FormGroup({
      title: new FormControl('', [Validators.required,]),
      warranty: new FormControl('', [Validators.required,]),
      offer_validity: new FormControl('', [Validators.required,]),
      price: new FormControl('', [Validators.required,]),
      quantity: new FormControl('', [Validators.required,]),
      vat: new FormControl('', [Validators.required,]),
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
  Issuequotation(){
    let obj={
      quotation_id:this.quote_id, 
      user_type:this.user_type.user_type
    }
    this.CustomerService.issueQuotation(obj).subscribe(res=>{
      console.log("Response of the quotaion details>>>>",res)
      this.detail =res.data
      this.title=this.detail.title
      this.warranty=this.detail.warranty
      this.offer_validity=this.detail.offer_validity
      this.price=this.detail.price
      this.quantity=this.detail.quantity
      this.vat=this.detail.vat
      this.scope_of_work=this.detail.scope_of_work
      this.exclusion=this.detail.exclusion
      this.dreeshah_terms=this.detail.dreeshah_terms
      this.seller_terms=this.detail.seller_terms
      this.image=this.detail.image

      this.workFlow=this.detail.workflow
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
      console.log("hjjhjkhuyuytfytf", this.workSchedule)
    })
    }
  additems(){
      this.itemControls= new FormGroup({
        'name':new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required)
      });
      (<FormArray>this.ItemForm.get('items')).push(this.itemControls);
      console.log("dfdsafsaedfcvase",this.ItemForm);


      
      
  }
  saveTitleandItems(){

    this.ItemForm.reset()
    console.log(this.quotationForm);
  }
  submitmodifiedQutation() {

    this.quotationNum = moment().unix()
    console.log("Quotation Number is>>>>", this.quotationNum)

      
        this.submit_book = true
        console.log("=====quatation form", this.quotationForm)

    var workSchedule=this.quotationForm.value.workSchedule.map(data=>{
      return {module:data.module,description:data.description,start_date:data.date_range.start,end_date:data.date_range.end}
    })
    console.log("asfdasfd",workSchedule);
    var workFlow= this.quotationForm.value.titles.map(data=>{
      return {title:data.title1,data:data.items.map(a=>{
        return {itemName:a.name,price:a.price}
      })}
    })
    console.log("fdgdsfgdff",workFlow);
    this.wf.push(workFlow)
    
    

		const uploadData = new FormData(); 

		
	  uploadData.append('quotation_id',this.detail._id);
    uploadData.append('professional_id', this.detail.professional_id);
    uploadData.append('customer_quotation_id', this.detail.customer_quotation_id);

		uploadData.append('title', this.quotationForm.value['title']);
	//	uploadData.append('token_from',localStorage.getItem("token"));
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
    if(this.image!=null){
      uploadData.append('image', this.image);
    }
    else{
      uploadData.append('image', this.dataimage);
    }
    
        console.log("object of Instant Quotation ===>", uploadData)
        
        this.CustomerService.issueQuotationmodify(uploadData).subscribe(data => {
          console.log("Quotation Submit Response ====>>>>>>", data)
       
         
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
      
  //   } else {
  //     this.toastr.error("Please login as customer to continue")
  //     return
  //   }
  // }

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
 
}
  