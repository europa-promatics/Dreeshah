import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerEditProductRoutingModule } from './seller-edit-product-routing.module'; 

import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerEditProductRoutingModule,
    NgxDropzoneModule,
    FormsModule
  ]
})
export class SellerEditProductModule { }
