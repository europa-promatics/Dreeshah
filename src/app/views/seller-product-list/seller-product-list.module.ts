import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerProductListRoutingModule } from './seller-product-list-routing.module';

import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerProductListRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class SellerProductListModule { }
