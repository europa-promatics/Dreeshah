import { Component, OnInit } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-seller-edit-profile',
  templateUrl: './seller-edit-profile.component.html',
  styleUrls: ['./seller-edit-profile.component.scss']
})
export class SellerEditProfileComponent implements OnInit {

	value: number = 50;
   options: Options = {
    floor: 0,
    ceil: 100
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
