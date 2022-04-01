import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../shared/customer.service'
@Component({
  selector: 'app-creatediscount',
  templateUrl: './creatediscount.component.html',
  styleUrls: ['./creatediscount.component.scss']
})
export class CreatediscountComponent implements OnInit {
  TypesForm:FormGroup;

  list: any;
  code:any;
  value: any;
  profCheck: boolean;
  coupon=[];
  index=0
  details: any;
  value1: any;
  value2: any;
  value3: any;
  value4: any;
  value5: any;
  start_date:any;
  end_date:any;
  start_time:any;
  end_time:any;
  percent:any;
  fxdamnt:any;
  productX:any;
  productY:any;
  any:any;
  collection:any;
  product:any
  cost:any;
  quant:any;
  eligibility:any;
  limit:any
  ApplyTo: FormGroup;
  MinReq: FormGroup;
  CustEligible: FormGroup;
  Usage: FormGroup;
  data: any;
  prodata=[];
  
  collection_id: any;
  product_id: any;
  prodX_id: any;
  prodY_id: any;






  constructor( public CustomerService: CustomerService,private fb: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getlist1()
    this.getProductList()
    this.TypesForm=new FormGroup({
      types: new FormControl('', [Validators.required,]),
      percent: new FormControl('', [Validators.required,, Validators.pattern('^[0-9]*')]),
      amount: new FormControl('', [Validators.required,]),
      productX: new FormControl('', [Validators.required,]),
      productY: new FormControl('', [Validators.required,])
    })
    this.ApplyTo=new FormGroup({
      applyto: new FormControl('', [Validators.required,]),
      collection: new FormControl('', [Validators.required,]),
      product: new FormControl('', [Validators.required,]),
    })
    this.MinReq=new FormGroup({
      minreq: new FormControl('', [Validators.required,]),
      cost: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*')])),
      quant: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*')])),
    })
    this.CustEligible=new FormGroup({
      custeleg: new FormControl('', [Validators.required,]),
      eligibility: new FormControl('', [Validators.required,]),
    })
    this.Usage=new FormGroup({
      usage: new FormControl('', [Validators.required,]),
      
      limit: new FormControl('', [Validators.required,])
    })
   // console.log("saaaaaaaaaaaaaaaaaaa",this.TypesForm);
    
    
  }
  getProductList(){
    var list={ 
      limit_val:10,
       offset_val:0
      }
  
    this.CustomerService.getAllProduct(list).subscribe(res => {
      console.log('paginator limit',res)
      this.data=res.data
      this.prodata.push(this.data.product_title)
      this.collection_id=this.data.find(i=>i.product_title==this.ApplyTo.value.collection)
      this.product_id=this.data.find(i=>i.product_title==this.ApplyTo.value.product)
      this.prodX_id=this.data.find(i=>i.product_title==this.TypesForm.value.productX)
      this.prodY_id=this.data.find(i=>i.product_title==this.TypesForm.value.productY)
      
    })
    
  }
  getlist1(){
    var obj={
      status:"all"
    }
    this.CustomerService.getdiscountlist(obj).subscribe(data=>{
      console.log("all discount data is++++++",data)
      this.list=data.discount_list
      console.log("All discount list+++=",this.list);
      for(let i=0;i<=this.list.length;i++){
        this.coupon.push(this.list[i]?.discount_coupon)
        console.log("dsfgdfgdgdffgdg",this.coupon);
        
        
      }
     
      
    })
  }
 
  fun(){
   this.index=this.index++
    //console.log(this.index);
    
    this.code=this.coupon[this.index++]
   // console.log("DFGFDGdsGFD",this.code);
    
  }
 

 
 
  submit(){
    console.log("saaaaaaaaaaaaaaaaaaa",this.TypesForm);
    console.log("saaaaaaaaaaaaaaaaaaa",this.ApplyTo);
    console.log("saaaaaaaaaaaaaaaaaaa",this.MinReq);
    console.log("saaaaaaaaaaaaaaaaaaa",this.CustEligible);
    console.log("saaaaaaaaaaaaaaaaaaa",this.Usage);
    var obj={
      discount_coupon:this.code,
      discount_value:this.TypesForm.value.percent,
      discount_type: this.TypesForm.value.types,
      discount_apply: { to:this.ApplyTo.value.applyto ,product_id:this.product_id, collection_id:this.collection_id},
      minimum_requirement: {requirement : this.MinReq.value.minreq, value : this.MinReq.value.cost},
      customer_eligibility: this.CustEligible.value.custeleg,
      date_time: this.start_date,
      usage:{
        usage_type: this.Usage.value.usage, 
         
        usage_value:this.Usage.value.limit
      },
     buy_x_get_y : {
                   x: this.prodX_id,
                   y: this.prodY_id
                    } , 
  expiry_date : this.end_date 
   

    }
    console.log("DFDZFDSFSFSFFFFF",obj);
    
    this.CustomerService.adddiscount(obj).subscribe(data=>{
      console.log(data)
      if(data.code==201){
        this.toastr.success("New Discount Added Successfully!!")
      }
      else if(data.code==422){
        this.toastr.error("Please Fill All the Fields Properly")
      }
      else{
        this.toastr.error("Some Error Occur!!")
      }

      
    })
    
  }
}
