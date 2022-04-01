import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPrivilegesRoutingModule } from './staff-privileges-routing.module';
import { GrantPrivelegeComponent } from './grant-privelege/grant-privelege.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';


@NgModule({
  declarations: [GrantPrivelegeComponent, EditStaffComponent],
  imports: [
    CommonModule,
    StaffPrivilegesRoutingModule
  ]
})
export class StaffPrivilegesModule { }
