import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss']
})
export class SellerSidebarComponent implements OnInit {

  constructor() { }

   ngOnInit(): void {
    $(document).ready(function(){
        $("#sb-drp-down").click(function(){
            $(".sidebar-submenu").slideToggle("fast");
          });
        });
    $("#sb-drp-down").click(function(){
     $(this).toggleClass("down")  ; 
    })
  }
}
