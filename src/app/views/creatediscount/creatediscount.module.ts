import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatediscountRoutingModule } from './creatediscount-routing.module';
import { CreatediscountComponent } from './creatediscount.component';


@NgModule({
  declarations: [CreatediscountComponent],
  imports: [
    CommonModule,
    CreatediscountRoutingModule
  ]
})
export class CreatediscountModule { }
