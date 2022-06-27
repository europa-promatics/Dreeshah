import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerServiceListRoutingModule } from './seller-service-list-routing.module';
import { SellerServiceDetailComponent } from './seller-service-detail/seller-service-detail.component';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [SellerServiceDetailComponent],
  imports: [
    CommonModule,
    SellerServiceListRoutingModule,
    MatFormFieldModule
  ]
})
export class SellerServiceListModule { }
