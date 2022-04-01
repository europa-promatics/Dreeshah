import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellerdiscountsComponent } from './sellerdiscounts.component';

const routes: Routes = [{ path: '', component: SellerdiscountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerdiscountsRoutingModule { }
