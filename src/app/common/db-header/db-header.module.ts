import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DbHeaderRoutingModule } from './db-header-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DbHeaderRoutingModule
  ],
  exports:[
    DbHeaderModule
  ]
})
export class DbHeaderModule { }
