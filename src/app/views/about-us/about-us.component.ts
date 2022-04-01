import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomerService } from '../../shared/customer.service';
import { environment } from 'src/environments/environment.prod';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
	details
	aboutSection
	section2
	section3
	section4
	dataStory
	section6
	title
	description
	title2
	description2
	title3
	description3
	name
	designation
	image1
	title4
	image
	title6
	description5
	testimonialsData
	dataHomeSectionApp

	
	imgpath=environment.homeImg
	testimonial: OwlOptions = {
	    loop: true,
	    mouseDrag: false,
	    touchDrag: false,
	    pullDrag: false,
	    dots: false,
	    navSpeed: 700,
	    animateOut: 'fadeOut',
	    navText: ['<i class="fas fa-long-arrow-left"></i>', '<i class="fas fa-long-arrow-right"></i>'],
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
	

  constructor(public CustomerService: CustomerService,) { }

  ngOnInit(): void {

	this.CustomerService.getAboutUS().subscribe(res => {
		console.log("About Us Response======",res)
		this.details=res.data
		console.log("About Us Response======",this.details)
		//console.log("Order Detail List are Response======",this.OrderDetails)
		////this.toastr.success("Order Placed Successfull")
		
		
		this.aboutSection = JSON.parse(this.details.aboutus)
       this.section2 = JSON.parse(this.details.what_we_do)
       this.section3 =JSON.parse(this.details.message)
       this.section4 = JSON.parse(this.details.our_story)
     
        this.dataStory = JSON.parse(this.section4.history)
      
       console.log(">>>>>>>",this.dataStory)
   
       this.section6 = JSON.parse(this.details.our_location)
       this.title = this.aboutSection.title
       this.description = this.aboutSection.description
       this.title2 = this.section2.title
       this.description2 = this.section2.description
       this.title3 = this.section3.title
       this.description3 = this.section3.description
       this.name = this.section3.fullname
       this.designation = this.section3.designation
       this.image1 = this.details.message_image
       this.title4 = this.section4.title  
       this.image = this.details.our_service_image
       this.title6 = this.section6.title
       this.description5 = this.section6.description 
	  })

	  this.CustomerService.getHomeSectionTestimonials().subscribe(res => {
		console.log("Data Of the About Us Testimonials is>>>>",res)
		 this.testimonialsData=res.result
		 console.log("Data of the About Us Testimonials is>>>>>",this.testimonialsData)
		 
	   })

	   this.CustomerService.getHomeSectionAPPStore().subscribe(res => {
		console.log("Data Of the Home Section App Store is>>>>",res)
		 this.dataHomeSectionApp=res.result
		 console.log("Data of the Home Section App Store is>>>>>",this.dataHomeSectionApp)
		 
	   })

  }

}
