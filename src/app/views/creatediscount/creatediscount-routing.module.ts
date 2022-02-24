import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatediscountComponent } from './creatediscount.component';

const routes: Routes = [{ path: '', component: CreatediscountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatediscountRoutingModule { }
