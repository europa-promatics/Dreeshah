import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/customer.service'


declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {

		limit_val=10
		offset_val=0
		length
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
	        items: 1
	      }
	    },
	}

	
  constructor(
	public CustomerService: CustomerService,
  ) { }

  ngOnInit(): void {

	// var obj={
	// 	limit : this.limit_val,
	// 	offset : this.offset_val
	// }


	// this.CustomerService.professionalList(obj).subscribe(res =>{
	// 	console.log("Reponse of the Professional list>>>>>>",res)
	// 	this.length=res.total_counts
	// })
  	
  	$('.click').click(function() {
	if ($('span').hasClass("fa-star")) {
			$('.click').removeClass('active')
		setTimeout(function() {
			$('.click').removeClass('active-2')
		}, 30)
			$('.click').removeClass('active-3')
		setTimeout(function() {
			$('span').removeClass('fa-star')
			$('span').addClass('fa-star-o')
		}, 15)
	} else {
		$('.click').addClass('active')
		$('.click').addClass('active-2')
		setTimeout(function() {
			$('span').addClass('fa-star')
			$('span').removeClass('fa-star-o')
		}, 150)
		setTimeout(function() {
			$('.click').addClass('active-3')
		}, 150)
		$('.info').addClass('info-tog')
		setTimeout(function(){
			$('.info').removeClass('info-tog')
		},1000)
	}
})

  }

  getPageSizeOptions() {
    return [1,2,3];
    }

 paginationOptionChange(evt) {
    console.log("evthrm",evt)
    this.offset_val = (evt.pageIndex * evt.pageSize)
    this.limit_val = evt.pageSize
    console.log("Offset Value>>>",this.offset_val)
    console.log("Limit Value>>>>",this.limit_val)
  var obj={
   
    limit : this.limit_val,
    offset: this.offset_val
    
  }
  this.CustomerService.professionalList(obj).subscribe(res =>{
	console.log("Reponse of the Professional list>>>>>>",res)
	
})


}


}
