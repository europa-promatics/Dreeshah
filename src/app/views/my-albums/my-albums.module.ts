import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAlbumsRoutingModule } from './my-albums-routing.module';
import {MatTabsModule} from '@angular/material/tabs'; 

import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyAlbumsRoutingModule,
    MatTabsModule
  ]
})
export class MyAlbumsModule { }
