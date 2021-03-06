import { Component, OnInit, } from '@angular/core';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import Swal from "sweetalert2";

import { Router, ActivatedRoute, Params } from "@angular/router";

import { ConsultantHeaderModule } from 'src/app/common/consultant-header/consultant-header.module';
declare var $;
@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss'],
})
export class MyAlbumsComponent implements OnInit {
  albumForm: FormGroup;

  submit_button
  name
  description
  selectValue
  currentPage = 10
  currentIndex = 0
  length = 0
  imgpath = environment.albumImg;
  media: File[] = [];
  isTouch = false;
  obj1
  albumName
  files: File[] = [];
  data
  dataAlbum
  catdata
  reqData
  searchValue
  modalClose = false
  detail: any;
  albumLength: number;
  deleteID: any;
  _id: any;
  moveItemsArray: any = [];
  addAlbumImage: any;
  editAlbumImage: any;
  newdata: any;
  image
  id: any;
  filedata: any;
  imagePath: any;
  editFiledata: any;
  editedId: any;
  checked: any;

  constructor(public CustomerService: CustomerService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,) {


    this.albumForm = this.formBuilder.group({
      'album_name': [null, Validators.compose([Validators.required])],
      'album_cover_image': []


    });
  }


  onSelect(event) {
    console.log(event);

    //this.files.push(event.addedFiles[0]);
    this.files.push(...event.addedFiles);
    console.log("added files consoles======", event.addedFiles[0])
    if (this.files.length == 0) {
      this.isTouch = false
    } else {
      this.isTouch = true
    }
    // this.isTouch = true;
    this.media = this.files;
    console.log(this.files)
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit() {

    this.reqData = {}
    this.reqData.offset = 0
    this.reqData.limit = 10
    this.currentPage = 10
    this.currentIndex = 0

    $(document).ready(function () {
      $("#add-address-btn").click(function () {
        $(".add-address-form").toggle();
      });
    });

    $('#btnSave').click(function () {
      $('#StudentModal').modal('hide');
    });

    // this.CustomerService.serviceList().subscribe(res =>{		
    // 	//console.log("SubCategoriesReponse:",res)
    //   this.catdata=res.data
    //   console.log("SubCategoriesReponse:",this.catdata)
    // 	//console.log("Value of the sub categories is:",this.data[0].name)		
    //   })

    this.obj1 = {
      limit_val: this.reqData.limit,
      offset_val: this.reqData.offset
      // limit_val :16,
      // offset_val :0
    }

    this.CustomerService.getAlbumList(this.obj1).subscribe(res => {
      //console.log("Album List:",res)
      this.data = res.result
      this.length = this.data.length
      console.log("Length of the items is======", this.length)
      console.log("Album List::", this.data)

    })



  }
  submit() {
    this.submit_button = true;

    if (!this.albumForm.valid) {
      this.toastr?.error("Please fill required fields")
      this.modalClose = false
      return
    } else {
      this.modalClose = true
      const formData = new FormData();
      formData.append('album_name', this.albumForm.get('album_name').value);

      if (this.filedata != null) {
        formData.append('album_cover_image', this.filedata);
      }
      this.CustomerService.addUserAlbum(formData).subscribe(res => {
        document.getElementById("modelClose").click();
        this.toastr.success("Album Added sucessfully",)
        this.ngOnInit()
      })

    }


  }

  getPageSizeOptions() {
    return [1, 2, 3];
  }

  paginationOptionChange(evt) {
    console.log("evthrm", evt)
    this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
    this.reqData.limit = evt.pageSize

    this.obj1 = {

      offset_val: this.reqData.offset,
      limit_val: this.reqData.limit

    }
    //   // console.log(this.reqData)
    this.CustomerService.getAlbumList(this.obj1).subscribe(res => {
      //console.log("Album List:",res)
      this.data = res.result

      // this.length= this.data.length
      console.log("Album List::", this.data)

    })


  }

  refresh() {
    this.ngOnInit()
  }

  search(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    //this.filterValue = filterValue.trim().toLowerCase();
    console.log("Value to be search===>>>", filterValue)
    var obj = {
      search: filterValue,
      //limit:this.reqData.limit,
      //offset:(this.config.currentPage-1)*10

    }
    if (obj.search) {
      this.CustomerService.searchAlbum(obj).subscribe(res => {
        console.log('filterResponse for the album======', res)
        if (res) {
          this.data = res.result;
        } else {
          this.toastr?.error(res.message)
        }
      })
    } else {
      this.ngOnInit();
    }

  }

  isImage(name) {
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }





  // delete albums------------------------------------

  delete(_id) {
    console.log("delete wali id>>>", _id);
    this.deleteID = _id

    // console.log("Id to be deleted of address===>>>>", val);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Image!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted!", "Deleted Successfully.", "success").then(
          (delete_service) => {
            this.obj1 = {
              album_ids: this.deleteID,
              // album_media_id: val,
            };
            this.CustomerService.deleteMyAlbumData(this.obj1).subscribe((data) => {
              console.log(data);
              console.log("length inside function>>>", this.albumLength);
              if (this.albumLength == 1) {
                this.router.navigate(["/my-albums"]);
              } else {
                this.ngOnInit();
              }
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Image is safe :)", "error");
      }
    });
  }


  // edit album -------------------------------------------------------------------
  editAlbum(id: any) {
    console.log("formmmm>>>.", this.albumForm);
    console.log("id edit >>>>>>>>>>.", id);

    this.editedId=id
    console.log("this.edited id>>>>", this.editedId);
    
    this.newdata = this.data.filter((res) => {
      return res._id == id
    })
    console.log("edit hone wala data >>>", this.newdata)
    this.albumName = this.newdata[0].album_name
    console.log("this.albumName>>>", this.albumName);

    this.image = this.newdata[0].album_cover_image
    console.log("this.image>>>>", this.image);

    this.albumForm.patchValue({
      'album_name': this.albumName,
      'album_cover_image': this.image.value
    })

  }

  edited() {
    console.log("edit hone wali id>>>>>>>>>>",  this.editedId);

    const formData = new FormData();
    formData.append('album_id', this.editedId)
    formData.append('album_name', this.albumForm.get('album_name').value);

    if (this.editFiledata != null) {
      formData.append('album_cover_image', this.editFiledata);
    }

    this.CustomerService.editUserAlbum(formData).subscribe(res => {
      console.log("edited response >>>>>>>",res);
      
      document.getElementById("modelClose1").click();
      this.toastr.success("Album Edited sucessfully",)
      this.ngOnInit()
    })

  }

  // details data---------------------------------------------------
  albumDetail(_id) {
    console.log("album detailssssss>>>", _id);
    this._id = _id

    var obj = {
      album_id: this._id,
    };

    this.CustomerService.getAlbumDetail(obj).subscribe((res) => {
      console.log("Album Detail Response======:", res)
      this.detail = res.result;
      console.log("this.details>>>>>>>>>>", this.detail);

      this.albumLength = this.detail.album_images.length;
      console.log("Album Detail::", this.detail);
      console.log("Length of the images", this.albumLength);
    })
  }



  // checkBox-------------------------------------------
  checkBoxClick(event) {
    console.log("check box event>>>", event);

    const checked = event.target.checked

    console.log('--------------', event.target.checked)
    this.checked=event.target.checked
    
    if (checked == true) {
      this.moveItemsArray?.push(event.target.id)
    } else {
      const index = this.moveItemsArray?.indexOf(event.target.id)
      this.moveItemsArray?.splice(index, 1)
    }
    console.log('--------ARRAY------', this.moveItemsArray)
  }



  // multipleDelete album data-----------------
  multipleDelete() {
    if (this.moveItemsArray.length == 0) {
      this.toastr?.error('Please Select at least one item')
      return
    } else {

      var obj = {
        album_ids: this.moveItemsArray

      }
      this.CustomerService.deleteMyAlbumData(obj).subscribe(res => {
        if (res.code == 200 || res.code == '200') {
          this.toastr.success('Album Deleted,Successfully...')
          this.ngOnInit();
        }
      })
    }
  }



  // upload image for add album-----------------------

  uploadAddImage(e) {

    if (e.target.files.length > 0) {
      const files = e.target.files;
      this.filedata = e.target.files[0];
    }
  }

  // upload image for edit album----------------
  uploadEditImage(e) {
    if (e.target.files.length > 0) {
      const files = e.target.files;
      this.editFiledata = e.target.files[0];

    }


  }





}
