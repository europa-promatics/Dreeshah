import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerServiceListRoutingModule } from './seller-service-list-routing.module';
import { SellerServiceDetailComponent } from './seller-service-detail/seller-service-detail.component';


@NgModule({
  declarations: [SellerServiceDetailComponent],
  imports: [
    CommonModule,
    SellerServiceListRoutingModule
  ]
})
export class SellerServiceListModule { }
