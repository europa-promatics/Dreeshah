import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-ph-sidebar',
  templateUrl: './ph-sidebar.component.html',
  styleUrls: ['./ph-sidebar.component.scss']
})
export class PhSidebarComponent implements OnInit {

  constructor(  private router: Router) { }

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
  logout() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
