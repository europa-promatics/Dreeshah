import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddProjectRoutingModule } from './add-project-routing.module';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProjectComponent } from './add-project.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
@NgModule({
  declarations: [AddProjectComponent],
  imports: [
    TagInputModule,
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    AddProjectRoutingModule,FormsModule, ReactiveFormsModule,MatRadioModule
  ]
})
export class AddProjectModule { }
