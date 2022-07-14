import { Component, OnInit } from '@angular/core';
import counterUp from 'counterup2';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { StarRatingComponent } from 'ng-starrating';
declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  userData:any;
	heroOpt: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    animateOut: 'fadeOut',
	    URLhashListener:true,
        autoplayHoverPause:true,
        startPosition: 'URLHash',
	    navText: ['<i class="far fa-long-arrow-left"></i>', '<i class="far fa-long-arrow-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      940: {
	        items: 1
	      }
	    },
	    nav: true
	}


	room_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    margin: 10,
	    nav: true,
	    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      },
	      740: {
	        items: 4
	      },
	      940: {
	        items: 6
	      }
	    },
	}
	trp_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    margin: 10,
	    nav: true,
	    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      },
	      740: {
	        items: 4
	      },
	      940: {
	        items: 6
	      }
	    },
	}

	rjp_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    margin: 10,
	    nav: true,
	    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      },
	      740: {
	        items: 4
	      },
	      940: {
	        items: 6
	      }
	    },
	}
	style_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    margin: 10,
	    nav: true,
	    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 2
	      }
	    },
	}

	news_slider: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    margin: 15,
	    nav: true,
	    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	    responsive: {
	      0: {
	        items: 1
	      },
	      400: {
	        items: 1
	      },
	      740: {
	        items: 3
	      },
	      940: {
	        items: 3
	      }
	    },
	}

	testimonial: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    animateOut: 'fadeOut',
	    navText: ['<i class="fas fa-long-arrow-left"></i>', '<i class="fas fa-long-arrow-right"></i>'],
		stagePadding: 0,
	    responsive: {
	      0: {
	        items: 1
	      },
	      940: {
	        items: 5
	      },
		  1020: {
	        items: 6
	      }
	    },
	    nav: true
	}

	sliderData
	prodData
	productArr
	imgpath=environment.homeImg;
	imgPathProduct=environment.prodImg;
	dataHomeSection2
	dataHomeSection4
	dataHomeSectionApp
	testimonialsData
	catalogueData
	footerData
	limit_val=10
	offset_val =0
	topProfessionals: any;


	constructor(
	public CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {

	var list={
		limit:10,
		offset:0
	}

	this.CustomerService.productList(list).subscribe(res =>{
		console.log("List of the Products>>>>>>>",res)
		this.prodData=res.products;
		this.productArr =this.prodData.slice(0,4)
		//this.count=res.total_counts;
		console.log("List of the Products with slice>>>>>>>",this.productArr)
		//console.log(this.count)
		// this.config = {
		//   itemsPerPage: 10,
		//   currentPage: 1,
		//   totalItems: this.count
		// };
	  })

	this.CustomerService.getHomeSliderData().subscribe(res => {
		console.log("Data Of the Slider is>>>>",res)
		 this.sliderData=res.result
		 console.log("Data of the Slider is>>>>>",this.sliderData)
		 
	   })

	this.CustomerService.getHomeSectionTwo().subscribe(res => {
		console.log("Data Of the Home Section Two is>>>>",res)
		 this.dataHomeSection2=res.result
		 console.log("Data of the Home Section Two is>>>>>",this.dataHomeSection2)
		 
	   })
	
	this.CustomerService.getHomeSectionFour().subscribe(res => {
		console.log("Data Of the Home Section four is>>>>",res)
		 this.dataHomeSection4=res.result
		 console.log("Data of the Home Section four is>>>>>",this.dataHomeSection4)
		 
	   })

	this.CustomerService.getHomeSectionAPPStore().subscribe(res => {
		console.log("Data Of the Home Section App Store is>>>>",res)
		 this.dataHomeSectionApp=res.result
		 console.log("Data of the Home Section App Store is>>>>>",this.dataHomeSectionApp)
		 
	   })

	this.CustomerService.getHomeSectionTestimonials().subscribe(res => {
		console.log("Data Of the Home Section Testimonials is>>>>",res)
		 this.testimonialsData=res.result
		 console.log("Data of the Home Section Testimonials is>>>>>",this.testimonialsData)
		 
	   })

	   
	this.CustomerService.getHomeSectionCatalogue().subscribe(res => {
		console.log("Data Of the Home Section Catalogue is>>>>",res)
		 this.catalogueData=res.result
		 console.log("Data of the Home Section Catalogue is>>>>>",this.catalogueData)
		 
	   })

	this.CustomerService.getHomeSectionFooter().subscribe(res => {
		console.log("Data Of the Home Section Footer>>>>",res)
		 this.footerData=res.result
		 console.log("Data of the Home Section Footer>>>>>",this.footerData)
		 
	   })

	   var obj={
		limit : this.limit_val,
		offset : this.offset_val
	}


	this.CustomerService.professionalList().subscribe(res =>{
		console.log("Reponse of the Professional list>>>>>>",res)
		//this.length=res.total_counts
	})

	// this.getTopratedProfessionals()

	// this.CustomerService.getHomeSectionCatalogue().subscribe(res => {
	// 	console.log("Data Of the Home Section Catalogue is>>>>",res)
	// 	 this.catalogueData=res.result
	// 	 console.log("Data of the Home Section Catalogue is>>>>>",this.catalogueData)
		 
	//    })


	const el = document.querySelector( '.countern' )
	const elo = document.querySelector( '.counterno' )
	const elp = document.querySelector( '.counternp' )
	const elq = document.querySelector( '.counternq' )

	counterUp( el, {
	    duration: 1000,
	    delay: 16,
	} )
	counterUp( elo, {
	    duration: 1000,
	    delay: 16,
	} )
	counterUp( elp, {
	    duration: 1000,
	    delay: 16,
	} )
	counterUp( elq, {
	    duration: 1000,
	    delay: 16,
	} )
	// var waypoint = new waypoint({
	//   element: document.getElementById('thing'),
	//   handler: function(direction) {
	//     alert('You have scrolled to a thing')
	//   }
	// })
		$(document).ready(function(){
      $(".img-gradient").click(function(){
        $(".ad-sec-thumb").hide();
        $(".ad-thum-info").show();
      });
    });
  		$(document).ready(function(){
      $(".btn-close").click(function(){
        $(".ad-thum-info").hide();
        $(".ad-sec-thumb").show();

      });
    });

     $(function() {
	    $(window).on("scroll", function() {
	        if($(window).scrollTop() > 50) {
	            $(".header").addClass("cstm_active");
	        } else {
	            //remove the background property so it comes transparent again (defined in your css)
	           $(".header").removeClass("cstm_active");
	        }
	    });
	});

    $(document).ready(function(){
        // $("#exampleModal").modal('show');
    });
  }

onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
  hideModel(){
  	console.log("insude click")
  	$("#exampleModal").modal('hide');

	}

	// getTopratedProfessionals()
	// {
	// 	this.CustomerService.getTopratedProfessionals().subscribe(res => {
	// 		console.log("Data Of the Home Section App Store is>>>>",res)
	// 		 this.topProfessionals=res.data.data
	// 		 console.log("Data of topProfessionals is>>>>>",res)
			 
	// 	   })	
	// }
}
