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
  currentPage=10
  currentIndex=0
  length =0
  imgpath=environment.albumImg;
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
  modalClose =false
  detail: any;
  albumLength: number;
  deleteID: any;
  _id: any;

  constructor(public CustomerService: CustomerService,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,) { 


    this.albumForm = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],

      
    }  ) ;
  }

  
onSelect(event) {
  console.log(event);
 
  //this.files.push(event.addedFiles[0]);
  this.files.push(...event.addedFiles);
  console.log("added files consoles======",event.addedFiles[0])
  if(this.files.length==0){
    this.isTouch=false
  }else{
    this.isTouch=true
  }
  // this.isTouch = true;
  this.media=this.files;
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
    this.currentPage=10
    this.currentIndex=0

    $(document).ready(function(){
      $("#add-address-btn").click(function(){
        $(".add-address-form").toggle();
      });
    });

    $('#btnSave').click(function() {
      $('#StudentModal').modal('hide');
   });

    this.CustomerService.serviceList().subscribe(res =>{		
			//console.log("SubCategoriesReponse:",res)
      this.catdata=res.data
      console.log("SubCategoriesReponse:",this.catdata)
			//console.log("Value of the sub categories is:",this.data[0].name)		
		  })

      this.obj1={
        limit_val:this.reqData.limit,
        offset_val:	this.reqData.offset
        // limit_val :16,
        // offset_val :0
      }

      this.CustomerService.getAlbumList(this.obj1).subscribe(res =>{		
        //console.log("Album List:",res)
        this.data=res.result
        this.length= this.data.length
        console.log("Length of the items is======",this.length)
        console.log("Album List::",this.data)
                    
        })

       

  }
  submit(){
    this.submit_button = true;
    
    if (!this.albumForm.valid  ) {
      this.toastr.error("Please fill required fields")
      this.modalClose = false
       return
    }else{
      this.modalClose = true
  
      let obj={
        album_name: this.name
      }
            
          this.CustomerService.addUserAlbum(obj).subscribe(res => {
            document.getElementById("modelClose").click();
            console.log(res.album_name)
            this.albumName=res.album_name
            console.log(this.albumName,'this.albumName');
            
            this.toastr.success("Album added sucessfully",)
            this.ngOnInit()
          })
      
    }


  }

  getPageSizeOptions() {
    return [1,2,3];
    }

  paginationOptionChange(evt) {
    console.log("evthrm",evt)
  this.reqData.offset = (evt.pageIndex * evt.pageSize).toString()
  this.reqData.limit = evt.pageSize

  this.obj1={
   
    offset_val:this.reqData.offset,
    limit_val:this.reqData.limit
    
  }
//   // console.log(this.reqData)
this.CustomerService.getAlbumList(this.obj1).subscribe(res =>{		
  //console.log("Album List:",res)
  this.data=res.result
 // this.length= this.data.length
  console.log("Album List::",this.data)
              
  })


}

refresh(){
  this.ngOnInit()
}

search(filterValue: string) {
  // this.dataSource.filter = filterValue.trim().toLowerCase();
  //this.filterValue = filterValue.trim().toLowerCase();
  console.log("Value to be search===>>>",filterValue)
  var obj = {
  search: filterValue,
  //limit:this.reqData.limit,
  //offset:(this.config.currentPage-1)*10
  
  }
  if(obj.search){
    this.CustomerService.searchAlbum(obj).subscribe(res => {
      console.log('filterResponse for the album======',res)
      if (res) {
        this.data=res.result;       
      }else{
        this.toastr.error(res.message)
      }
      })
  }else{
    this.ngOnInit();
  }
  
  }

  isImage(name){
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }





  // delete albums------------------------------------

  delete(_id) {
    console.log("delete wali id>>>",_id);
    this.deleteID=_id

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
              album_id: this.deleteID
              // album_media_id: val,
            };
            this.CustomerService.deleteAlbum(this.obj1).subscribe((data) => {
              console.log(data);
              console.log("length inside function>>>", this.albumLength);
              if (this.albumLength == 1) {
                this.router.navigate(["/my-albums"]);
              } else {
                this.ngOnInit();
              }

              //this.toastr.success("Service deleted sucessfully")
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Image is safe :)", "error");
      }
    });
  }


  // edit album -------------------------------------------------------------------
  edited(_id){
    console.log("edit hone wali id>>>>>>>>>>",_id);
    
    var obj = {
      album_name: this.name
    }

    this.CustomerService.editUserAlbum(obj).subscribe(res => {
      document.getElementById("modelClose").click();
      console.log(res.album_name)
      this.albumName = res.album_name
      console.log(this.albumName, 'this.albumName');

      this.toastr.success("Album added sucessfully",)
      this.ngOnInit()
    })

  }

  // details data---------------------------------------------------
  albumDetail(_id){
    console.log("album detailssssss>>>",_id);
    this._id=_id
    
    var obj = {
      album_id: this._id,
    };
  
    this.CustomerService.getAlbumDetail(obj).subscribe((res) => {
      console.log("Album Detail Response======:",res)
      this.detail = res.result;
      console.log("this.details>>>>>>>>>>",this.detail);
      
      this.albumLength = this.detail.album_images.length;
      console.log("Album Detail::", this.detail);
      console.log("Length of the images", this.albumLength);
    })
  }



}
