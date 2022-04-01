import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,	private toastr: ToastrService
  ) { 

  }
  canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(!localStorage.getItem('isLoggedIn')){
			console.log(localStorage.getItem('isLoggedIn'))
      this.toastr.error('Please Login')
			this.router.navigate(['/login'])
			return false
		}else{
			return true;
		}
	}
  // canActivate() {
  //   console.log(localStorage)
    
  //   if (localStorage.getItem('isLoggedIn')) {
  //     return true;
  //   }
  //   // return true;
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
