import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerOrderManagementRoutingModule } from './seller-order-management-routing.module';
import { MaterialModule } from '../material.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerOrderManagementRoutingModule,
    MatSortModule
  ]
})
export class SellerOrderManagementModule { }
