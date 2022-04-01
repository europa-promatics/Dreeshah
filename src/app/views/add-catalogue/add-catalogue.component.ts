import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomerService } from "src/app/shared/customer.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-add-catalogue",
  templateUrl: "./add-catalogue.component.html",
  styleUrls: ["./add-catalogue.component.scss"],
})
export class AddCatalogueComponent implements OnInit {
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" },
  ];

  submit_button;
  id;
  data;
  media: File[] = [];
  detail: [];
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
  QuestionAnsForm: FormGroup;
  questionList=[]
  reply=[];
  profileimage;
fnam
lnam
  constructor(
    public CustomerService: CustomerService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {this.createForm()}
  createForm(){
    this.QuestionAnsForm = this.formBuilder.group({
      'reply': [null, [Validators.required]],

      
    }  ) ;
  }
  ngOnInit(): void {
    this.getCatalogueQuestionAnswer()
    this.id = this.route.snapshot.paramMap.get("id");
    this.data = this.route.snapshot.paramMap.get("name");

    var obj = {
      catalogue_id: this.id,
    };

    this.CustomerService.userCatalogueDetail(obj).subscribe((res) => {
      console.log("cc",res)
      this.detail = res.data.album;
      this.profileimage = res.data.user_id.profile_image;
      this.fnam=res.data.user_id.first_name;
      this.lnam=res.data.user_id.last_name
    });

    // Gallery image hover
  }

  getCatalogueQuestionAnswer(){
    let obj={
     user_catalogue_id:this.route.snapshot.paramMap.get('id')
    }
    this.CustomerService.getCatalogueQuestionAnswer(obj).subscribe((res)=>{
      console.log("Question List",res)
      this.questionList =res.data.question_answer
    })
   }

   
  replyfunc(_id){
    var obj = {
      catalogue_id:this.route.snapshot.paramMap.get("id"),
      question_id:_id,
      answer:this.QuestionAnsForm.value.reply
  
//  search:this.name
      }
     console.log("onnnn", obj)
     this.CustomerService.replyCatalogueQuestionAnswer(obj).subscribe(data => {
           console.log("main data for reply is ====", data)
            this.reply = data.data
            this.QuestionAnsForm.reset()
         this.ngOnInit();
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

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  getMediaid(idOfImg) {
    this.idToBeReplaced = idOfImg;
  }

  edit() {
    var formData = new FormData();
    formData.append("catalogue_id", this.id);
    formData.append("album_id", this.idToBeReplaced);

    this.NewImgSelected.forEach((element) => {
      formData.append("album_image", element);
    });

    this.CustomerService.editCatalogue(formData).subscribe((res) => {
      this.toastr.success("Catalogue Media Updated sucessfully");
      formData = new FormData();
      this.ngOnInit();
    });
  }

  delete(val) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this Catalogue Media !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.obj1 = {
          album_id: val,
          catalogue_id: this.id,
        };
        this.CustomerService.deleteCatalogueAlbum(this.obj1).subscribe(
          (data) => {
            console.log(data);
            console.log("length inside function>>>", this.albumLength);
            if (this.albumLength == 1) {
              this.router.navigate(["/my-albums"]);
            } else {
              this.ngOnInit();
            }

            this.toastr.success("Catalogue Media deleted sucessfully");
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your Image is safe :)", "error");
      }
    });
  }
  
  isImage(name){
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }
}
