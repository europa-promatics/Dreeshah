import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    MatAutocompleteModule
    
  ]
})
export class HeaderModule { }
