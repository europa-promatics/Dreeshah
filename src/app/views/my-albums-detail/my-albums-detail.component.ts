import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../shared/customer.service";
import { environment } from "src/environments/environment.prod";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
} from "@angular/forms";
import { ConsultantHeaderModule } from "src/app/common/consultant-header/consultant-header.module";
declare var $;

@Component({
  selector: "app-my-albums-detail",
  templateUrl: "./my-albums-detail.component.html",
  styleUrls: ["./my-albums-detail.component.scss"],
})
export class MyAlbumsDetailComponent implements OnInit {
  submit_button;
  id;
  data;
  media: File[] = [];
  detail;
  imgpath = environment.albumImg;
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
  imageFull
  selectedUser: any;
  moveItemsArray: any[];
  _id: any;
  checked: any;

  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.ImageForm = this.formBuilder.group({
      media: [null, Validators.compose([Validators.required])],
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

  ngOnInit(): void {
    this.moveItemsArray = []
    console.log("formmmmmmm showwww>>>>>",this.ImageForm);
    
    $(document).ready(function () {
      $("#add-address-btn").click(function () {
        $(".add-address-form").toggle();
      });
    });

    $("#btnSave").click(function () {
      $("#StudentModal").modal("hide");
    });
    this.id = this.route.snapshot.paramMap.get("id");
    this.data = this.route.snapshot.paramMap.get("name");
    console.log(this.data);

    var obj = {
      album_id: this.id,
    };

    this.CustomerService.getAlbumDetail(obj).subscribe((res) => {
      console.log("Album Detail Response======:",res)
      this.detail = res.result;
      console.log("this.details>>>>>>>>>>",this.detail);
      
      this.albumLength = this.detail.album_images.length;
      console.log("Album Detail::", this.detail);
      console.log("Length of the images", this.albumLength);
    });

    // Gallery image hover
    $(".img-wrapper").hover(
      function () {
        $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
      },
      function () {
        $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
      }
    );

    // Lightbox
    var $overlay = $('<div id="overlay"></div>');
    var $image = $("<img>");
    var $prevButton = $(
      '<div id="prevButton"><i class="fa fa-chevron-left"></i></div>'
    );
    var $nextButton = $(
      '<div id="nextButton"><i class="fa fa-chevron-right"></i></div>'
    );
    var $exitButton = $(
      '<div id="exitButton"><i class="fa fa-times"></i></div>'
    );

    // Add overlay
    $overlay
      .append($image)
      .prepend($prevButton)
      .append($nextButton)
      .append($exitButton);
    $("#gallery").append($overlay);

    // Hide overlay on default
    $overlay.hide();

    // When an image is clicked
    $(".img-overlay").click(function (event) {
      // Prevents default behavior
      event.preventDefault();
      // Adds href attribute to variable
      var imageLocation = $(this).prev().attr("href");
      // Add the image src to $image
      $image.attr("src", imageLocation);
      // Fade in the overlay
      $overlay.fadeIn("slow");
    });

    // When the overlay is clicked
    $overlay.click(function () {
      // Fade out the overlay
      $(this).fadeOut("slow");
    });

    // When next button is clicked
    $nextButton.click(function (event) {
      // Hide the current image
      $("#overlay img").hide();
      // Overlay image location
      var $currentImgSrc = $("#overlay img").attr("src");
      // Image with matching location of the overlay image
      var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
      // Finds the next image
      var $nextImg = $($currentImg.closest(".image").next().find("img"));
      // All of the images in the gallery
      var $images = $("#image-gallery img");
      // If there is a next image
      if ($nextImg.length > 0) {
        // Fade in the next image
        $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
      } else {
        // Otherwise fade in the first image
        $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
      }
      // Prevents overlay from being hidden
      event.stopPropagation();
    });

    // When previous button is clicked
    $prevButton.click(function (event) {
      // Hide the current image
      $("#overlay img").hide();
      // Overlay image location
      var $currentImgSrc = $("#overlay img").attr("src");
      // Image with matching location of the overlay image
      var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
      // Finds the next image
      var $nextImg = $($currentImg.closest(".image").prev().find("img"));
      // Fade in the next image
      $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
      // Prevents overlay from being hidden
      event.stopPropagation();
    });

    // When the exit button is clicked
    $exitButton.click(function () {
      // Fade out the overlay
      $("#overlay").fadeOut("slow");
    });
  }

  onSelect(event) {
    console.log(event);

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
    console.log(this.files);
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

    this.CustomerService.editAlbumDetail(formData).subscribe((res) => {
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
              album_id: this.detail._id,
              album_media_id: val,
            };
            this.CustomerService.deleteAlbum(this.obj1).subscribe((data) => {
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

  submitImages() {
    this.submit_button = true;
    if (this.files.length==0) {
      this.toastr.error("Please select image/video files");
      return;
    } else {
      document.getElementById("modelClose").click();

      var formData = new FormData();
     //formData.append("description", this.description);
     this.files.map(val=>{
      formData.append("album_images", val);
     })
      
      formData.append("album_id", this.detail._id);
      this.CustomerService.addUserAlbumMedia(formData).subscribe((res) => {
        
        this.toastr.success("Album added sucessfully");
        this.files=[];
        this.ngOnInit();
      });
    }
  }
  isImage(name) {
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }
  openImage(image) {
    this.imageFull = environment.albumImg + image;
    document.getElementById('openModalButton').click();
  }


  // multiple delete-------------------------------------------------------
  checkBoxClick(event) {
    console.log("check boc event>>>",event);
    
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
  

  multipleDelete() {
    if (this.moveItemsArray.length == 0) {
      this.toastr.error('Please Select at least one item')
      return
    } else {
     
        var obj = {
          album_media_ids:this.moveItemsArray,
          album_id:this.detail._id
        }
        this.CustomerService.deleteAlbumData(obj).subscribe(res => {
          if (res.code == 200 || res.code == '200') {
            this.toastr.success('Item Removed From Album')
            this.ngOnInit();
          }
        })
    }
  }


  
}
