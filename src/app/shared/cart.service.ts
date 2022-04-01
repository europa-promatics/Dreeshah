import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartDataBehSub = new BehaviorSubject<any>("");
  public cartItemObseravle = this.cartDataBehSub.asObservable();

  

  constructor() { }
}
