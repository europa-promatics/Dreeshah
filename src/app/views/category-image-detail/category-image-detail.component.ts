import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  OnDestroy,
  Renderer2,
} from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';

import {
  Gallery,
  GalleryItem,
  ImageItem,
  ThumbnailsPosition,
  ImageSize,
} from "@ngx-gallery/core";
import { map } from "rxjs/operators";
import { DOCUMENT } from "@angular/common";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { CustomerService } from "../../shared/customer.service";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { environment } from "src/environments/environment";
import { getElement } from "@amcharts/amcharts4/core";

const data = [];

@Component({
  selector: "app-category-image-detail",
  templateUrl: "./category-image-detail.component.html",
  styleUrls: ["./category-image-detail.component.scss"],
})
export class CategoryImageDetailComponent implements OnInit {
  subCatalogueId;
  questionList
  userData
  QuestionAnsForm: FormGroup;
  albumImg = [];
  imgpath = environment.homeImg;
  profileUrl = environment.profileUrl;

  constructor(
    public gallery: Gallery,
    public gallery1: Gallery,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService,   public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private location: Location
  ) {}
  heroOpt: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    animateOut: "fadeOut",
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.subCatalogueId = this.route.snapshot.paramMap.get("id");
    this.userData = localStorage['userData'] != null ? JSON.parse(localStorage['userData']) : null;
    this.getCataloguesAccToSubSubCategory();
    this.createForm();
    this.getCatalogueQuestionAnswer()
  }
  getCataloguesAccToSubSubCategory() {
    let obj = {
      sub_sub_category_id: "",
    };
    this.customerService.getCataloguesAccToSubSubCategory(obj).subscribe(
      (res) => {
        // this.cataguesAlbum=res.data
        this.albumImg = res.data.find((i) => i._id == this.subCatalogueId);
        console.log("albumImg",this.albumImg);
      }
    );
  }
  createForm(){
    this.QuestionAnsForm = this.formBuilder.group({
      'question': [null, [Validators.required]],

      
    }  ) ;
  }
  
  submit() {
    let obj = {
      user_id: this.route.snapshot.paramMap.get('id'),
      catalogue_id: this.subCatalogueId,
      question: this.QuestionAnsForm.get('question').value,
    };
    this.customerService.addCatalogueQuestion(obj).subscribe((res) => {
      document.getElementById("closeModal").click();
      this.QuestionAnsForm.reset()
      let data = res;
      this.ngOnInit()
    });
  }

  getCatalogueQuestionAnswer(){
   let obj={
    user_catalogue_id:this.subCatalogueId
   }
   this.customerService.getCatalogueQuestionAnswer(obj).subscribe((res)=>{
     console.log("Question List",res)
     this.questionList =res.data.question_answer
   })
  }
  
  isImage(name){
    return name.match(/.(jpg|jpeg|png|gif)$/i);
  }
}
