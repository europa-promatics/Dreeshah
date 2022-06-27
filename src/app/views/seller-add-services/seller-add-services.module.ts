import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addproject } from './addproject';
import { SellerAddServicesRoutingModule } from './seller-add-services-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerAddServicesRoutingModule,
    addproject,
    BrowserAnimationsModule,
    MatFormFieldModule
  ]
})
export class SellerAddServicesModule { }
