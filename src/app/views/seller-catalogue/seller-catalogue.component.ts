import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from "src/app/shared/customer.service";
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
interface quotesstatus {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-seller-catalogue',
  templateUrl: './seller-catalogue.component.html',
  styleUrls: ['./seller-catalogue.component.scss']
})
export class SellerCatalogueComponent implements OnInit {
  statusquotes: quotesstatus[] = [

    { value: 'interior', viewValue: 'Interior' },
    { value: 'exterior', viewValue: 'Exterior' },

  ];

  subsubcategory
  albumForm: FormGroup;
  submit_button;
  id;
  data;
  media: File[] = [];
  subcategory = [];
  detail;
  imgpath = environment.homeImg;
  obj1;
  selectValue;
  files: File[] = [];
  obj2;
  dataAlbum;
  isTouch = false;
  description;
  NewImgSelected = [];
  idNewImgSelected;
  albumLength = 0;
  idToBeReplaced;
  ImageForm: FormGroup;
  modalClose = false;
  name;
  type;

  currentPage = 10;
  currentIndex = 0;
  length = 0;

  albumName;

  catdata;
  reqData;
  searchValue;
  styles: any;
  photographers: any;
  projects: any;
  user_id: any;

  constructor(
    public CustomerService: CustomerService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  createForm() {
    this.ImageForm = this.formBuilder.group({
      'Category': [null, Validators.compose([Validators.required])],
      'SubCategory': [null, Validators.compose([Validators.required])],
      'SubSubCategory': [null, Validators.compose([Validators.required])],
      'styles':[null,Validators.compose([Validators.required])],
      'photographer':[null,Validators.compose([Validators.required])],
      'project':[null,Validators.compose([Validators.required])],
      'description':[null,Validators.compose([Validators.required])],
      'media': [null, Validators.compose([Validators.required])],
    });
  }



  selectImg(event, value) {
    console.log("Event is>>>", event);
    console.log("Id of the media", value);
    this.idNewImgSelected = value;
    //this.NewImgSelected = event
    this.NewImgSelected.push(event);
    console.log("Inside the select Image Function", this.NewImgSelected);
    console.log("Event On Selected is=====", event);
    this.edit();
  }

  ngOnInit() {
    this.createForm();

    this.CustomerService.getUserCatalogueList().subscribe((res) => {
      //console.log("Album List:",res)
      this.data = res.data;
      this.length = this.data.length
      console.log("catalaogues List::", this.data);
    });
  }

  refresh() {
    this.ngOnInit();
  }

  // add catalogue

  /* delete(val){
    console.log("In the delete function")
     this.obj1={
      album_id : this.detail._id ,
      album_media_id : val ,
    }
    this.CustomerService.deleteAlbum(this.obj1).subscribe(res =>{		
      console.log("Deleted Item Response:",res)
      this.ngOnInit()
     // this.data=res.result
      //console.log("Album List::",this.data)
                  
      })
  } */
  onSelect(event) {
    console.log(event);
    if (this.files.length > 9) {
      this.toastr.error('Maximum 10 files are allowed only');
      return
    }
    //this.files.push(event.addedFiles[0]);
    this.files.push(...event.addedFiles);
    console.log("added files consoles======", event.addedFiles[0]);
    if (this.files.length == 0) {
      this.isTouch = false;
    } else {
      this.isTouch = true;
    }
    // this.isTouch = true;

    this.media = this.files;
    console.log('filesArray----',this.files);

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getMediaid(idOfImg) {
    console.log("Id to Be changed>>>>>>", idOfImg);
    this.idToBeReplaced = idOfImg;
    console.log("Id to Be changed>>>>>>", this.idToBeReplaced);
  }

  edit() {
    console.log("Id of the album is=====", this.id);
    console.log("Id of the media is:", this.idToBeReplaced);
    console.log("New Image is=====", this.NewImgSelected[0]);
    var formData = new FormData();
    formData.append("album_id", this.id);
    formData.append("album_media_id", this.idToBeReplaced);

    this.NewImgSelected.forEach((element) => {
      formData.append("media", element);
      console.log("Image to be sent is =====", element);
    });

    this.CustomerService.editCatalogue(formData).subscribe((res) => {
      console.log("Response of the updated image", res);
      this.toastr.success("Image Updated sucessfully");
      this.ngOnInit();
    });
  }

  delete(val) {
    console.log("Enter in the");
    console.log("Id to be deleted of address===>>>>", val);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Catalogue!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {

        this.obj1 = {
          catalogue_id: val,

        };
        this.CustomerService.deleteCatalogue(this.obj1).subscribe((data) => {
          console.log(data);
          console.log("length inside function>>>", this.albumLength);

          this.ngOnInit();


          this.toastr.success("Catalogue deleted sucessfully")
        });


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Image is safe :)", "error");
      }
    });
  }
  //add catalogue in catalogue list
  submitImages() {
    this.submit_button = true;
    let userData = JSON.parse(localStorage['userData']);
    this.user_id = userData._id;
    if (!this.ImageForm.valid && this.files.length == 0) {
      this.toastr.error("Please select image/videos");
      this.modalClose = false;
      return;
    } else {
      document.getElementById("modelClose").click();
      var project = [this.ImageForm.controls['project'].value];
      var formData = new FormData();
      // formData.append("catagory", this.ImageForm.controls['Category'].value);
      // formData.append("sub-category", this.ImageForm.controls['SubCategory'].value);
      // formData.append("sub-sub-category", this.ImageForm.controls['SubSubCategory'].value);
      // formData.append("style", this.ImageForm.controls['styles'].value);
      // formData.append("type", userData.user_type);
      formData.append("catalogue_catagory", this.ImageForm.controls['Category'].value);
      formData.append("catalogue_sub_category_id", this.ImageForm.controls['SubCategory'].value);
      formData.append("catalogue_sub_sub_category_id", this.ImageForm.controls['SubSubCategory'].value);
      formData.append("style_id", this.ImageForm.controls['styles'].value);
      formData.append("photographer_id", this.ImageForm.controls['photographer'].value);
      formData.append("project_id", JSON.stringify(project));
      formData.append("description", this.ImageForm.controls['description'].value);
      formData.append("type", userData.user_type);
      this.files.map(val => {
        formData.append("album_images", val);
      })
      console.log('formdata------------',formData)


      this.CustomerService.addUserCatalogue(formData).subscribe((res) => {

        this.toastr.success("Catalogue added sucessfully");
        this.ImageForm.reset();
        this.files = []
        this.ngOnInit();
      });
    }
  }

  getSubCategory(value) {
    let obj = {
      type: value,
      limit: 10,
      offset: 0,
    };
    this.CustomerService.getCatalogueSubCategories(obj).subscribe((res) => {
      this.subcategory = res.records;
      console.log(this.subcategory, 'category');
    });
  }
  getSubSubCategory(value) {
    let obj = {
      type: this.ImageForm.controls['Category'].value,
      limit: 10,
      offset: 0,
      sub_category_id: value
    };
    this.CustomerService.getCatalogueSubSubCategoriesAll(obj).subscribe((res) => {
      this.subsubcategory = res.records;
      console.log(this.subsubcategory, 'category');
    });
    this.getStyles()
  }

  getStyles() {
    this.CustomerService.getStyles().subscribe((res) => {
      this.styles = res.data;
      console.log('this.styles: ', this.styles);
    })
    this.getAllPhotographer();
  }

  getAllPhotographer() {
    this.CustomerService.getAllPhotographers({ type: 'photographer' }).subscribe((res) => {
      this.photographers = res.data;
      console.log('this.photographers: ', this.photographers);
    })
    this.getProfessionalProjects()
  }

  getProfessionalProjects() {
    let obj = {
      user_id: this.user_id
    }
    this.CustomerService.getProfessionalProject(obj).subscribe((res) => {
      this.projects = res.data;
      console.log('this.projects: ', this.projects);
    })
  }

  isImage(name) {
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }
}
