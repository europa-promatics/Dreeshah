import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddGiftRoutingModule } from './add-gift-routing.module';
import { AddGiftComponent } from './add-gift.component';


@NgModule({
  declarations: [AddGiftComponent],
  imports: [
    CommonModule,
    AddGiftRoutingModule
  ]
})
export class AddGiftModule { }
