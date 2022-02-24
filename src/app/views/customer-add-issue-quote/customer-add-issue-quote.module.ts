import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerAddIssueQuoteRoutingModule } from './customer-add-issue-quote-routing.module';
//import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomerAddIssueQuoteRoutingModule,
    //CKEditorModule,
    FormsModule,
  ]
})
export class CustomerAddIssueQuoteModule { }
