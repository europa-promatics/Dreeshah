import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCatalogueRoutingModule } from './add-catalogue-routing.module';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddCatalogueRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AddCatalogueModule { }
