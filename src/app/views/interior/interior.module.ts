import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteriorRoutingModule } from './interior-routing.module';
import {MatTabsModule} from '@angular/material/tabs'; 

import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InteriorRoutingModule,
    MatTabsModule
  ]
})
export class InteriorModule { }
