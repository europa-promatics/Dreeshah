import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerdiscountsRoutingModule } from './sellerdiscounts-routing.module';
import { SellerdiscountsComponent } from './sellerdiscounts.component';


@NgModule({
  declarations: [SellerdiscountsComponent],
  imports: [
    CommonModule,
    SellerdiscountsRoutingModule
  ]
})
export class SellerdiscountsModule { }
