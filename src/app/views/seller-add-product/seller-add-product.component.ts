import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, FormArray } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
//import { AnyTxtRecord } from 'dns';
declare var $: any;
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
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
  manufacture: any;
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
  status6 = "false";
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
  itemQtyArr = []
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

  // onSelect(event) {
  //   console.log(event);

  //   this.files.push(...event.addedFiles);
  //   if (this.files.length == 0) {
  //     this.isTouch = false
  //   } else {
  //     this.isTouch = true
  //   }
  //   // this.isTouch = true;
  //   this.media = this.files;
  //   console.log(this.files)
  // }
  
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
    //if(this.url ){
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
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name 
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v$4) address 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string 
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator return !!

    return pattern.test(url)
  }

  removeRelatedImage(f) {
    // alert("ppppp")
    //this.Service_data.related_images.splice(i, 1)
    this.files2.splice(this.files2.indexOf(f), 1);
  }

  onChange1(evt1) {
    //this.condCheck();
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

  /*  condCheck(){
     
       if (this.checked.value == 'true' ) {
           this.productForm.controls['weight'].setValidators([Validators.required]);
           this.productForm.controls['weight'].updateValueAndValidity();
       } else {
           this.productForm.controls['weight'].clearValidators();
           this.productForm.controls['weight'].updateValueAndValidity();
       }
   
   } */
  // if(this.status1 == "yes"){
  //   this.productForm.get('weight').setValidators([

  //   Validators.required,

  //   ])
  // }

  onChange2(evt2) {
    //console.log("evt",evt2)
    if (evt2.target.checked == true) {
      this.status2 = "yes";
    } else {
      this.status2 = "no";
    }
    console.log(this.status2)
  }

  onChange3(evt3) {
    //console.log("evt",evt3)
    if (evt3.checked == true) {
      this.status3 = "true";
    } else {
      this.status3 = "false";
    }
    console.log(this.status3)
  }

  onChange4(evt4) {
    //console.log("evt",evt3)
    if (evt4.checked == true) {
      this.status4 = "true";
    } else {
      this.status4 = "false";
    }
    console.log(this.status4)
  }
  onChange5(evt5) {
    //console.log("evt",evt5)
    if (evt5.checked == true) {
      this.status5 = "true";
      this.productForm.controls['taxPrice'].setValidators(Validators.required)
    } else {
      this.status5 = "false";
      this.productForm.controls['taxPrice'].clearValidators()
    }
    console.log(this.status5)
  }

  onChange6(evt2) {
    //console.log("evt",evt2)
    if (evt2.target.checked == true) {
      this.status6 = "yes";
    } else {
      this.status6 = "no";
    }
    console.log(this.status6)
  }



  /* Remove() {
    console.log(this.url);
    this.files2.splice(this.files2.indexOf(this.url), 1);
  } */
  constructor(
    public formBuilder: FormBuilder,
    public CustomerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
  ) {

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.productForm = this.formBuilder.group({
      'title': [null, Validators.compose([Validators.required])],
      'category': [null, Validators.compose([Validators.required])],
      'sub_category': [null, Validators.compose([Validators.required])],
      'price': [null, Validators.compose([Validators.required])],
      'comprice': [null, Validators.compose([Validators.required])],
      'manufacture': [null, Validators.compose([Validators.required])],

      'costitem': [null, Validators.compose([Validators.required])],
      'margin': [null, Validators.compose([Validators.required])],
      'profit': [null, Validators.compose([Validators.required])],
      'inventory': [null, Validators.compose([Validators.required])],
      'sku': [null, Validators.compose([Validators.required])],
      'barcode': [null, Validators.compose([Validators.required])],
      //'field1': [null, Validators.compose([Validators.required])],
      //'field2': [null, Validators.compose([Validators.required])],
      //'field3': [null, Validators.compose([Validators.required])],
      'region': [null, Validators.compose([Validators.required])],
      //'weight': [null, Validators.compose([Validators.required])],
      'weight': [null],
      'weightUnit': [null],
      // 'code': [null, Validators.compose([Validators.required])],
      //'checked': [false, Validators.compose([Validators.requiredTrue])],
      //'checked': [false],
      'ckedit': [null, Validators.compose([Validators.required])],
      'media': [null, Validators.compose([Validators.required])],

      //'url': [null, Validators.compose([Validators.pattern(reg)])],
      'productType': [null, Validators.compose([Validators.required])],
      'vendor': [null, Validators.compose([Validators.required])],
      'collection': [null, Validators.compose([Validators.required])],
      'tags': [null, Validators.compose([Validators.required])],
      "taxPrice": [null],
      'ShippingOption': [null, Validators.compose([Validators.required])],
      'professionalShippingCharges': [null],
      'variants': new FormGroup({
        'colors': new FormArray([this.formBuilder.group({
          'color_name': [null, []],
          'color_image': [null, []]

        })]),
        'variant_size': new FormArray([])
      }),
     
        'question_and_answers': new FormArray([this.formBuilder.group({
          'question': [null, []],
          'answer': [null, []]

        })])
   
    });



  }
  get colors() {
    return ((this.productForm.controls['variants'] as FormGroup).controls['colors'] as FormArray)
  }
  get variant_size() {
    return ((this.productForm.controls['variants'] as FormGroup).controls['variant_size'] as FormArray)
  }
  get question_and_answers() {
    return (this.productForm.controls['question_and_answers'] as FormArray)
  }
  AddColor() {
    this.colors.push(this.formBuilder.group({
      'color_name': [null, []],
      'color_image': [null, []]

    }))
  }
  Addquestions(){
    this.question_and_answers.push(this.formBuilder.group({
      'question': [null, []],
      'answer': [null, []]

    }))
  }

  AddSize(value) {
    console.log("size==>", value);

    this.variant_size.push(new FormControl(value))
  }

  deleteColor(data, i) {
    this.colors.removeAt(i)

  }

  deletequestion(i){
    this.question_and_answers.removeAt(i)
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
    this.getCategory();
    this.professId = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null;
    console.log(this.professId)

    this.CustomerService.getInventory().subscribe(data => {
      //console.log("Response of the inventory is=====",data);
      this.inventoryData = data.result
      console.log("Response of the inventory is=====", this.inventoryData);
    })

    this.CustomerService.getProductType().subscribe(res => {
      //console.log("Response of the product type is=====",res);
      this.productTypeData = res.product_types
      console.log("Response of the product type is=====", this.productTypeData);
    })

    this.CustomerService.getBranchList().subscribe(res => {
      //console.log("Response of the Branch List is=====",res);
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



  getCategory() {

    this.CustomerService.getUserDetails().subscribe(res => {
      console.log("cat==>", res);

      this.categoryData = res.data.service_categories
      console.log(this.categoryData);
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
    //this.compval()  
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      //this.numbutton=false;
      return false;

    } else {
      //this.numbutton=true;
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


  // variantSubmit() {
  //   this.productColor = this.color
  //   this.productSize = this.size
  //   this.productColorCode = this.colorCode
  //   console.log("Color>>>>>", this.color)
  //   console.log("Size>>>>>", this.size)
  //   console.log("Color Code>>>>>", this.colorCode)

  //   this.colorObject = {
  //     color_name: this.color,
  //     color_code: this.colorCode,
  //   }
  //   this.colorArr.push(this.colorObject)
  //   console.log("Color Object to be sent is>>>>>", this.colorObject)

  //   this.sizeObject = {
  //     size: this.size
  //   }
  //   console.log("Size Object to be sent is>>>>>", this.sizeObject)

  //   this.sizeArr.push(this.sizeObject)

  //   this.toastr.success("Added Successfully")

  //   this.color = ''
  //   this.size = ''
  //   this.colorCode = ''

  //   $('#variantModal').modal('hide');
  // }




  // getSubCat(event) {

  //   console.log(event)
  //   this.CustomerService.getSubCat(event).subscribe(data => {
  //     console.log(data);
  //     this.ServiceSubCat = data.sub_categories
  //     console.log(this.ServiceSubCat);
  //   })



  // }
  getSubCat(event) {

    console.log('--||||||-',event)
    let obj={
      id:event
    }
    this.CustomerService.getSubCat(obj).subscribe(data => {
      console.log(data);
      this.ServiceSubCat = data.sub_categories
      console.log(this.ServiceSubCat);
    })



  }

  getVendorList(event) {
    var obj = {
      product_type_id: event
    }
    console.log(event)
    this.CustomerService.getProductVendorType(obj).subscribe(data => {
      //console.log("Reponse of the vendor List:",data);
      this.vendorTypeData = data.result;
      console.log("Reponse of the vendor List:", this.vendorTypeData);
    })

  }


  addQuantity(index, quant) {
    console.log("Quantity is:", quant)
    console.log("Index of the branch is:", index)
    this.branchListData[index].quantity = quant
    console.log("array is===", this.branchListData)
  }




  publish(argument) {
    console.log('form data=>',this.productForm);
    
    console.log(this.files)
    /*  if(parseInt(this.profit)>parseInt(this.price)){  
         this.numbutton=true;
         return
     }else{
           this.numbutton=false;
          } */


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

    // this.quantity = {
    //   'field1': this.productForm.value.field1,
    //   'field2': this.productForm.value.field2,
    //   'field3': this.productForm.value.field3
    // }

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
      collection: this.collection,
    }


    this.branchListData.forEach(element => {
      this.qtyObject = {
        branch_name: element.branch_name_en,
        branch_quantity: element.quantity,
        branch_id: element._id
      }
      this.itemQtyArr.push(this.qtyObject)
      //console.log('aaaaaaaa',this.itemQtyArr)
    })

    console.log("Product Category Id is>>>>>", this.productForm.value.category)
    console.log("Product Sub Category Id is>>>>>", this.productForm.value.sub_category)
    console.log("Product Title is>>>>>", this.productForm.value.title)
    console.log("Product Description is>>>>>", this.productForm.value.ckedit)
    console.log("Pricing is>>>>>", this.pricing)
    console.log("Inventory is>>>>>", this.inventory1)
    console.log("Product manufacture is>>>>>", this.productForm.value.manufacture)
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
    console.log("TAGS>>>>>>>>",this.productForm.value.questions )


    console.log(this.productForm.value);
    var formData = new FormData();
    // formData.append('professional_id',);
    formData.append('product_title', this.productForm.value.title);
    formData.append('category_id', this.productForm.value.category);
    formData.append('sub_category_id', this.productForm.value.sub_category);
    formData.append('product_description', JSON.stringify(this.productForm.value.ckedit));
    formData.append('weight_details', JSON.stringify(this.weightData));
    formData.append('pricing', JSON.stringify(this.pricing));
    formData.append('inventory', JSON.stringify(this.inventory1));
    formData.append('product_manufacturer_name', this.productForm.value.manufacture);

    //formData.append('quantity', JSON.stringify(this.quantity));
    formData.append('customs_information', JSON.stringify(this.customInfo));
    formData.append('shipping', this.status1);
    formData.append('variant', this.status2);
     formData.append('question_exists', this.status2);
    
    // formData.append('available_color', JSON.stringify(this.colorObject));
    // formData.append('available_size', JSON.stringify(this.sizeObject));
    formData.append('visible_to_professinal', this.status3);
    formData.append('visible_to_customer', this.status4);
    formData.append('charge_tax', this.status5);
    formData.append('product_question', this.status6);
    formData.append('quantity', JSON.stringify(this.itemQtyArr));
    formData.append('product_details', JSON.stringify(this.product_details));
    formData.append('tags', JSON.stringify(this.tags));
    formData.append('shipping_option', this.productForm.value.ShippingOption);
    formData.append('variants',JSON.stringify(this.productForm.controls['variants'].value))
    formData.append('question_and_answers',JSON.stringify(this.productForm.controls['question_and_answers'].value))
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
      //this.toastr.error("Please fill required fields")
      return
    }

    else {

      this.CustomerService.addProductService(formData).subscribe(res => {
        console.log(res)
        this.router.navigate(['/seller-product-list']);
        
        argument=="save" ?this.toastr.success("Product save sucessfully"):
        this.toastr.success("Product added sucessfully")
      })
    }
  }





}
