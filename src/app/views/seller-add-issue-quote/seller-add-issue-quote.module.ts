import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerAddIssueQuoteRoutingModule } from './seller-add-issue-quote-routing.module';
//import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SellerAddIssueQuoteRoutingModule,
    //CKEditorModule,
    FormsModule,
  ]
})
export class SellerAddIssueQuoteModule { }

