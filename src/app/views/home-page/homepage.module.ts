import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DbHeaderModule } from 'src/app/common/db-header/db-header.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    DbHeaderModule
  ]
})
export class HomepageModule { }
