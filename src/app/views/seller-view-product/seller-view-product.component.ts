import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, FormArray } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

declare var $: any;

@Component({
  selector: 'app-seller-view-product',
  templateUrl: './seller-view-product.component.html',
  styleUrls: ['./seller-view-product.component.scss']
})
export class SellerViewProductComponent implements OnInit {

  productForm: FormGroup;

  checked;
  submit_button = false;
  isTouch = false;
  title: any;
  category: any;
  sub_category: any;
  categoryData: [];
  userData;
  pricing = {
    'price': null,
    'comprice': null,
    'costPerItem': null,
    'margin': null,
    'profit': null,
    'tax': null
  };
  inventory1 = {};
  quantity = {};
  customInfo = {};
  numbutton = false;
  price: any;
  comprice: any;
  costitem: any;
  margin: any;
  profit: any;
  tags: any;
  inventory: any;
  sku: any;
  field1: any;
  barcode: any;
  field2: any;
  field3: any;
  weight: any;
  productType: any;
  ckedit: any;
  //checked: any;
  userDetails;
  ServiceSubCat = [];
  ServiceCat = []
  region: any;
  status1 = "no";
  status2 = "no";
  status3 = "false";
  status4 = "false";
  status5 = "false";
  collec: any;
  code: any;
  cbox1: any;
  subvar = false;
  ckeditorContent;
  media: any;
  vintage: any;
  professId;
  type: any;
  vendor: any;
  manufacture: any;
  product_details
  url;
  files: File[] = [];
  files2: File[] = [];
  inventoryData
  productTypeData
  vendorTypeData
  branchListData
  branchDetail
  branch_name_en
  qty
  qtyObject
  itemQtyArr:any=[]
  collection
  weightData
  weightUnit
  // size
  color
  colorCode
  productColor
  productSize
  productColorCode
  colorObject
  sizeObject
  colorArr = []
  sizeArr = []
  taxPrice: any;
  ShippingOption: any
  professionalShippingCharges: any;
  lengthImage: any;
  size: number=0;
  filesize: number;
  id: void;
  ids: string;
  userdata: any;
  image: any;
  event: any;
  color_name: void;
  taxPricee: any;

  
  
  onSelect(event) {
    this.lengthImage=event.addedFiles.length
    console.log("this.length of image>>>>>>",this.lengthImage);
    console.log("event of image size>>>>>>",event.addedFiles)
    
    if(event) {
    for(let i = 0; i < event.addedFiles.length; i++){
    
    this.size += event.addedFiles[i].size;
    this.filesize = Math.round((this.size / 1024));
    console.log('sss', this.size)
    
    if(this.size>=5000000) {
    this.toastr.error('Please upload less than 5 MB,')
    this.isTouch = false
    }
    else {
    this.isTouch = true
    console.log(event);
    this.files=event.addedFiles;
    this.media = this.files;
    console.log('fff',this.files)
    }
  
    }
    }  
    
    
    
    }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  Submit() {
    console.log(this.url)
    this.validURL(this.url)
    if (this.validURL(this.url)) {
      this.subvar = false
      this.files2.push(this.url);
      $('#urlModal').modal("hide")
    } else {
      this.subvar = true;
    }
    this.url = ''
  }

  validURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
      '((\\d{1,3}\\.){3}\\d{1,3}))' + 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 'i');

    return pattern.test(url)
  }

  removeRelatedImage(f) {
    this.files2.splice(this.files2.indexOf(f), 1);
  }

  onChange1(evt1) {
    if (evt1.checked == true) {
      this.status1 = "yes";
      this.productForm.controls['weight'].setValidators([Validators.required]);
      this.productForm.controls['weight'].updateValueAndValidity();
    } else {
      this.status1 = "no";
      this.productForm.controls['weight'].clearValidators();
      this.productForm.controls['weight'].updateValueAndValidity();
    }
    console.log(this.status1)
  }


  onChange2(evt2) {
    if (evt2.target.checked == true) {
      this.status2 = "yes";
    } else {
      this.status2 = "no";
    }
    console.log(this.status2)
  }

  onChange3(evt3) {
    if (evt3.checked == true) {
      this.status3 = "true";
    } else {
      this.status3 = "false";
    }
    console.log(this.status3)
  }

  onChange4(evt4) {
    if (evt4.checked == true) {
      this.status4 = "true";
    } else {
      this.status4 = "false";
    }
    console.log(this.status4)
  }
  onChange5(evt5) {
    if (evt5.checked == true) {
      this.status5 = "true";
      this.productForm.controls['taxPrice'].setValidators(Validators.required)
    } else {
      this.status5 = "false";
      this.productForm.controls['taxPrice'].clearValidators()
    }
    console.log("Response status5 products =====",this.status5)
  }

  constructor(
    public formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private Router: ActivatedRoute,
  ) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.productForm = this.formBuilder.group({
      'title': [null, Validators.compose([Validators.required])],
      'category': [null, Validators.compose([Validators.required])],
      'sub_category': [null, Validators.compose([Validators.required])],
      'price': [null, Validators.compose([Validators.required])],
      'comprice': [null, Validators.compose([Validators.required])],
      'costitem': [null, Validators.compose([Validators.required])],
      'margin': [null, Validators.compose([Validators.required])],
      'profit': [null, Validators.compose([Validators.required])],
      'inventory': [null, Validators.compose([Validators.required])],
      'sku': [null, Validators.compose([Validators.required])],
      'barcode': [null, Validators.compose([Validators.required])],
      'manufacture': [null, Validators.compose([Validators.required])],
      'region': [null, Validators.compose([Validators.required])],
      'weight': [null],
      'weightUnit': [null],
      'quantity':[null],
      'ckedit': [null, Validators.compose([Validators.required])],
      'media': [null, Validators.compose([Validators.required])],
      'productType': [null, Validators.compose([Validators.required])],
      'vendor': [null, Validators.compose([Validators.required])],
      'collection': [null, Validators.compose([Validators.required])],
      'tags': [null, Validators.compose([Validators.required])],
      "taxPrice": [null],

      'selectCustomer': [null],
      "selectProfessional": [null],
      "variant": [null],
      "tax_price": [null],

      'ShippingOption': [null, Validators.compose([Validators.required])],
      'professional_shipping_charges': [null],
      'variants': new FormGroup({
        'colors': new FormArray([this.formBuilder.group({
          'color_name': [null, []],
          'color_image': [null, []]

        })]),
        'variant_size': new FormArray([])
      })
    });



  }
  get colors() {
    return ((this.productForm.controls['variants'] as FormGroup).controls['colors'] as FormArray)
  }
  get variant_size() {
    return ((this.productForm.controls['variants'] as FormGroup).controls['variant_size'] as FormArray)
  }
  AddColor() {
    this.colors.push(this.formBuilder.group({
      'color_name': [null, []],
      'color_image': [null, []]

    }))
  }

  AddSize(value) {
    console.log("size==>", value);

    this.variant_size.push(new FormControl(value))
  }
  deleteColor(data, i) {
    this.colors.removeAt(i)

  }

  UploadVarientImages(event, i) {
    const file = event.target.files[0]

    const formdata = new FormData()
    formdata.append('image', file)
    formdata.append('destination', 'AllImages')

    this.CustomerService.uploadImage(formdata).subscribe((resp) => {
      console.log('image upload ==>', environment.homeImg + resp.data);
      this.colors.at(i).patchValue({ 'color_image': environment.homeImg + resp.data })
      console.log(this.colors);

    })
  }

  ngOnInit(): void {
    this.ids=this.Router.snapshot.paramMap.get('id')
    console.log("Response Edit products =====", this.ids);

  
    this.getCategory();

    this.getProductService()
   

    this.professId = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null;
    console.log(this.professId)

    this.CustomerService.getInventory().subscribe(data => {
      this.inventoryData = data.result
      console.log("Response of the inventory is=====", this.inventoryData);
    })

    this.CustomerService.getProductType().subscribe(res => {
      this.productTypeData = res.product_types
      console.log("Response of the product type is=====", this.productTypeData);
    })

    this.CustomerService.getBranchList().subscribe(res => {
      this.branchListData = res.result
      console.log("Response of the Branch List is=====", this.branchListData);
    })

    $(document).ready(function () {
      $("#add-address-btn").click(function () {
        $(".add-address-form").toggle();
      });
    });
  }

 
  

  validateIfChecked(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.checked) {
        return control.value ? null : { 'err': true };
      }
      return null;
    }
  }

  getVendorList(event) {
    this.event=event.value  
    console.log('---',event)
    console.log('---',this.event)

    var obj={
      product_type_id:this.event
    }
    console.log(event)
    this.CustomerService.getProductVendorType(obj).subscribe(data => {
      this.vendorTypeData = data.result;
      console.log("Reponse of the vendor List:", this.vendorTypeData);
    })

  }

  getCategory() {

    this.CustomerService.getUserDetails().subscribe(res => {
      console.log("cat==>", res);

      this.categoryData = res.data.service_categories
      console.log(this.categoryData);
    })
  }
  getSubCat(event) {
    this.event=event.value

    var obj={
      id:this.event
    }
    this.CustomerService.getSubCat(obj).subscribe(data => {
      console.log("data of get sub cat--------",data);
      this.ServiceSubCat = data.sub_categories
      console.log("--------------this.service sub cat",this.ServiceSubCat);
    })



  }

  // getSubCat(event) {

  //   console.log(event)
  //   this.CustomerService.getSubCat(event).subscribe(data => {
  //     console.log(data);
  //     this.ServiceSubCat = data.sub_categories
  //     console.log(this.ServiceSubCat);
  //   })



  // }

  addQuantity(index, quant) {
    console.log("Quantity is:", quant)
    console.log("Index of the branch is:", index)
    this.branchListData[index].quantity = quant
    console.log("array is===", this.branchListData)
  }

  // getVendorList(event) {
  //   var obj = {
  //     product_type_id: event
  //   }
  //   console.log(event)
  //   this.CustomerService.getProductVendorType(obj).subscribe(data => {
  //     this.vendorTypeData = data.result;
  //     console.log("Reponse of the vendor List:", this.vendorTypeData);
  //   })

  // }

  publish(argument) {
    console.log('form data=>',this.productForm);
    
    console.log(this.files)

    this.submit_button = true;
    this.pricing = {
      'price': parseFloat(this.productForm.value.price),
      'comprice': parseFloat(this.productForm.value.comprice),
      'costPerItem': parseFloat(this.productForm.value.costitem),
      'margin': parseFloat(this.productForm.value.costitem),
      'profit': parseFloat(this.productForm.value.profit),
      'tax': null
    }
    if (this.status5) {
      this.pricing.tax = this.taxPrice
    }

    this.inventory1 = {
      'inventory': this.productForm.value.inventory,
      'sku': this.productForm.value.sku,
      'barcode': this.productForm.value.barcode
    }

 

    this.customInfo = {
      'region': this.productForm.value.region,
      'code': this.productForm.value.code
    }

    this.weightData = {
      'weight': this.productForm.value.weight,
      'unit': this.productForm.value.weightUnit
    }

    this.product_details = {
      product_type: this.productType,
      vendor: this.vendor,
    }
  

    this.branchListData.forEach(element => {
      this.qtyObject = {
        branch_name: element.branch_name_en,
        branch_quantity: element.quantity,
        branch_id: element._id
      }
      this.itemQtyArr?.push(this.qtyObject)
    })

    console.log("Product Category Id is>>>>>", this.productForm.value.category)
    console.log("Product Sub Category Id is>>>>>", this.productForm.value.sub_category)
    console.log("Product Title is>>>>>", this.productForm.value.title)
    console.log("Product manufacture is>>>>>", this.productForm.value.manufacture)
    console.log("Product Description is>>>>>", this.productForm.value.ckedit)
    console.log("Pricing is>>>>>", this.pricing)
    console.log("Inventory is>>>>>", this.inventory1)
    console.log("Reponse of the quantity from branch in FORM=====", this.itemQtyArr)
    console.log("Shipping Status Data is>>>>>", this.status1)
    console.log("Weight Data is>>>>>", this.weightData)
    console.log("Custome Information Data is>>>>>", this.customInfo)
    console.log("Varaint Status Data is>>>>>", this.status2)
    console.log("Visible to proffesional Status Data is>>>>>", this.status3)
    console.log("Visible to customer Status Data is>>>>>", this.status4)
    console.log("Charge Tax Status>>>>>", this.status5)
    console.log("Available color data is>>>>>", this.colorObject)
    console.log("Available Size data is>>>>>", this.sizeObject)
    console.log("Product Details data is>>>>>", this.product_details)
    console.log("TAGS>>>>>>>>", this.tags)

    console.log(this.productForm.value);
    var formData = new FormData();
    formData.append('product_id',this.ids)
  
    formData.append('product_title', this.productForm.value.title);
    formData.append('category_id', this.productForm.value.category);
    formData.append('sub_category_id', this.productForm.value.sub_category);
    formData.append('product_description',this.productForm.value.ckedit);
    formData.append('weight_details', JSON.stringify(this.weightData));
    formData.append('pricing', JSON.stringify(this.pricing));
    formData.append('inventory', JSON.stringify(this.inventory1));
    formData.append('customs_information', JSON.stringify(this.customInfo));
    formData.append('shipping', this.status1);
    formData.append('variant', this.status2);
    formData.append('visible_to_professinal', this.status3);
    formData.append('visible_to_customer', this.status4);
    formData.append('charge_tax', this.status5);
    formData.append('quantity',  JSON.stringify(this.itemQtyArr));
    formData.append('product_details', JSON.stringify(this.product_details));
    formData.append('product_manufacturer_name', this.productForm.value.manufacture);
    formData.append('tags', this.tags);
    formData.append('shipping_option', this.productForm.value.ShippingOption);
    formData.append('variants',JSON.stringify(this.productForm.controls['variants'].value))
    formData.append('form_status',argument=='save'?'save':'publish')
    console.log(JSON.stringify (localStorage.getItem('userData')))
      formData.append('professional_id',this.professId._id)
    if (this.professionalShippingCharges) {
      formData.append('professional_shipping_charges', this.productForm.value.professionalShippingCharges);
    }

  
    this.files.forEach(element => {
      formData.append('product_media', element);
    });
    if (!this.productForm.valid && this.files.length == 0) {
      return
    }

    else {

      this.CustomerService.editProductService(formData).subscribe(res => {
        console.log(res)
        this.router.navigate(['/seller-product-list']);
        
        argument=="save" ?this.toastr.success("Product save sucessfully"):
        this.toastr.success("Product Edit sucessfully")
      })
    }
  }

  getProductService(){
    var obj={
      product_id:this.ids
    }
    console.log("object object >>>>>>",obj);
    
    this.CustomerService.getProductService(obj).subscribe((res)=>{
       console.log(" Ab dekho edit  ki response by id >>>>>",res)

       this.image=res.product_media
       console.log("this image is ------",this.image);
       
       this.color_name=res.variants.colors[0].color_name
       console.log(res.variants.colors[0].color_name,"fffff")

       this.taxPricee=res.pricing.tax
       this.ckedit=res.product_description

      //  this.variant_size=res.variants.variant_size[0].variant_size
      //  console.log(res.variants.colors[0].color_name,"fffff")
      let vendoor={
        value:res?.product_details?.product_type
      }
      this.getVendorList(vendoor)
        this.productForm.patchValue({
          tax_price:res.charge_tax,
          selectProfessional:res.visible_to_professinal,
          selectCustomer:res.visible_to_customer,
          variant:res.variants,
          title:res.product_title,
          category:res?.category_id?._id,
          sub_category:res?.sub_category_id?.id,
          ckedit:res.product_description,
          price:res.pricing.price,
          comprice:res.pricing.comprice,
          quantity:res.quantity[0].branch_quantity,
          weight:res.weight_details.weight,
          region:res.customs_information.region,
          variant_size:res.weight_details.weight,
          productType:res.product_details.product_type,
          vendor:res.product_details.vendor,
          // color_name:res?.variants?.colors.map((res)=>{return  res.color_name }),
          // color_name:res.variants.color[1][0].color_name,
          manufacture:res.product_manufacturer_name,
          // productType:res.product_details.product_type,
          // vendor:res.product_details.vendor,
          tags:res.tags,
          collection:res.collection,
          costitem:res.pricing.costPerItem,
          margin:res.pricing.margin,
          profit:res.pricing.profit,
          taxPrice:res.pricing.tax,
          inventory:res.inventory.inventory,
          sku:res.inventory.sku,
          barcode:res.inventory.barcode,
          ShippingOption:res.shipping_option,
          professional_shipping_charges:res.professional_shipping_charges,
          // weightUnit:res.weight_details.weight,
        })
       
   
        // this.vendor=res.product_details.vendor
        // this.productForm.get("vendor").setValue(vendoor)
        let event={
          checked:res.charge_tax
        }
        this.onChange5(event)
        let productSubCategoryObj = {
          value: res.category_id?._id,
          }
          this.getSubCat(productSubCategoryObj)
              
            })
          } 



  changeShippingOption(e) {
    if (e.target.value == 'professional') {
      this.productForm.controls['professionalShippingCharges'].setValidators(Validators.required)
    } else {
      this.productForm.controls['professionalShippingCharges'].clearValidators()
    }
  }


  keyPressNumbersDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
     return true;
    }

  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  compval() {
    console.log(this.price);
    console.log(this.profit);
    if (parseFloat(this.profit) > parseFloat(this.price)) {

      this.numbutton = true;
    } else {
      this.numbutton = false;
    }
  }


}
