import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


declare var $;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

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
        localStorage.clear();
       
        this.router.navigate(['/login'])
        
      }




    }
