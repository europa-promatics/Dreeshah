import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerAddProductRoutingModule } from './seller-add-product-routing.module';

// import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerAddProductRoutingModule,
    // CKEditorModule,
    FormsModule,
    NgxDropzoneModule
  ]
})
export class SellerAddProductModule { }
