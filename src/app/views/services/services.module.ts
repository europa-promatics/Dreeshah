import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatTimepickerModule } from 'mat-timepicker';
import { ServicesRoutingModule } from './services-routing.module';
import { MaterialModule } from '../../material.module';
import { MatTimepickerModule } from 'mat-timepicker';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MatTimepickerModule,
    MaterialModule,
    GooglePlaceModule,
    BrowserModule,
  ]
})
export class ServicesModule { }
