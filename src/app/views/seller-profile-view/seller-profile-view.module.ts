import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerProfileViewRoutingModule } from './seller-profile-view-routing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerProfileViewRoutingModule,
    MatSlideToggleModule
  ]
})
export class SellerProfileViewModule { }
