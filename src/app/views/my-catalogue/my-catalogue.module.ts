import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCatalogueRoutingModule } from './my-catalogue-routing.module';

import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyCatalogueRoutingModule,
    MatSelectModule,

  ]
})
export class MyCatalogueModule { }
