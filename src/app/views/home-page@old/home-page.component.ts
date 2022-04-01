import { Component, OnInit } from '@angular/core';
import counterUp from 'counterup2';

declare var $;

import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  heroOpt: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    animateOut: 'fadeOut',
    URLhashListener: true,
    autoplayHoverPause: true,
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

  constructor() { }

  ngOnInit(): void {


    const el = document.querySelector('.countern')
    const elo = document.querySelector('.counterno')
    const elp = document.querySelector('.counternp')
    const elq = document.querySelector('.counternq')

    counterUp(el, {
      duration: 1000,
      delay: 16,
    })
    counterUp(elo, {
      duration: 1000,
      delay: 16,
    })
    counterUp(elp, {
      duration: 1000,
      delay: 16,
    })
    counterUp(elq, {
      duration: 1000,
      delay: 16,
    })
    // var waypoint = new waypoint({
    //   element: document.getElementById('thing'),
    //   handler: function(direction) {
    //     alert('You have scrolled to a thing')
    //   }
    // })
    $(document).ready(function () {
      $(".img-gradient").click(function () {
        $(".ad-sec-thumb").hide();
        $(".ad-thum-info").show();
      });
    });
    $(document).ready(function () {
      $(".btn-close").click(function () {
        $(".ad-thum-info").hide();
        $(".ad-sec-thumb").show();

      });
    });
  }

}

