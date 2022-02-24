import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGiftComponent } from './add-gift.component';

const routes: Routes = [{ path: '', component: AddGiftComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddGiftRoutingModule { }
