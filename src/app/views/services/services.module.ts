import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatTimepickerModule } from 'mat-timepicker';
import { ServicesRoutingModule } from './services-routing.module';
import { MaterialModule } from '../../material.module';
import { MatTimepickerModule } from 'mat-timepicker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatTimepickerModule,
    MaterialModule
  ]
})
export class ServicesModule { }
