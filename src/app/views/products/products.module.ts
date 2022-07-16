import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ProductsRoutingModule } from './products-routing.module';
import { DateAgoPipeModule } from 'src/pipes/date-ago.pipe.module'
import { DateToTimeAgoPipe } from 'date-ago-pipe/date-to-time-ago.pipe';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    DateToTimeAgoPipe,
   DateAgoPipeModule,
    CommonModule,
    ProductsRoutingModule,
    TimeAgoPipe
  ]
})
export class ProductsModule { }
