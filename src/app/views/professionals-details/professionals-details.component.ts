import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { map } from 'rxjs/operators';
import { CustomerService } from 'src/app/shared/customer.service';
import { environment } from 'src/environments/environment';

declare var $;
@Component({
  selector: 'app-professionals-details',
  templateUrl: './professionals-details.component.html',
  styleUrls: ['./professionals-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfessionalsDetailsComponent implements OnInit {
  profileUrl=environment.profileUrl
  items: GalleryItem[];
  professionalId: any;
<<<<<<< Updated upstream
  professional:any;
=======
  professional: any;
>>>>>>> Stashed changes
  length: any;
  constructor(public gallery: Gallery,private route:ActivatedRoute,private customerService: CustomerService) { }

  ngOnInit() {

    this.professionalId=this.route.snapshot.paramMap.get('_id')
    console.log( this.professionalId)

    this.getprofessional( this.professionalId)
     // 1. Create gallery items
    this.items = data.map(item =>
      new ImageItem({ src: item.srcUrl, 
                      thumb: item.previewUrl,  
                      text: item.text, 
                      download:item.download, 
                      share:item.share,
                      title:item.title,
                      saves:item.saves,
                      shares:item.shares,
                      rate:item.rate,
                      photographerName:item.photographerName,
                      photographerRate:item.photographerRate,
                      ProfName:item.ProfName,
                      profRate:item.profRate,


                    })
    );

    // Load items into the lightbox
    this.basicLightboxExample();

    // Load item into different lightbox instance
    // With custom gallery config
    this.withCustomGalleryConfig();

  	$(document).ready(function(){
      $("#cmt-btn").click(function(){
        $(".comment-form").toggle();
      });
    });
    $('.moreless-button').click(function() {
       $('.moretext').slideToggle();
       if ($('.moreless-button').text() == "Read more") {
         $(this).text("Read less")
       } else {
         $(this).text("Read more")
       }
     });
  }

  getprofessional(a){
    const obj= {
      id:a
    }
    this.customerService.getprofessional(obj).subscribe(res =>{
      console.log("Reponse of the Professional >>>>>>",res)
      this.professional=res['data'][0]
      console.log("mmmmmmmmmmm", this.professional)
      this.length=res.total_counts
    })
  }


 basicLightboxExample() {
    this.gallery.ref().load(this.items);
  }
withCustomGalleryConfig() {

    // 2. Get a lightbox gallery ref
    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    // (Optional) Set custom gallery config to this lightbox
    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // 3. Load the items into the lightbox
    lightboxGalleryRef.load(this.items);
  }

}
const data = [
   {
    srcUrl: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Kitchen",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",

  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Dinning Room",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/04/18/08/50/kitchen-1336160_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Bath",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2017/06/13/22/42/kitchen-2400367_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Bedroom",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/05/26/04/17/home-1416381_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/05/26/04/17/home-1416381_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Living",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/02/26/22/22/kitchen-1224845_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/02/26/22/22/kitchen-1224845_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Corridor",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Home & Office",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },
  {
    srcUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    previewUrl: 'https://cdn.pixabay.com/photo/2016/12/30/08/00/kitchen-1940176_960_720.jpg',
    text:"fa fa-thumbs-up",
    download:"fa fa-download",
    share:"fa fa-share-alt",
    title:"Home Bar",
    saves:"2111",
    shares:"3000",
    rate:"$30",
    photographerName: "James Wilson",
    photographerRate: "$35",
    ProfName:"Grace Lawerence",
    profRate:"$45",
  },




];
