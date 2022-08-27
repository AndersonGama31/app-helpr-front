import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadosCreateComponent } from './chamados-create/chamados-create.component';
import { ChamadosUpdateComponent } from './chamados-update/chamados-update.component';

import { ChamadosComponent } from './chamados.component';

const routes: Routes = [
  { path: '', component: ChamadosComponent },
  {
    path: 'new',
    component: ChamadosCreateComponent,
  },
  {
    path: 'edit/:id',
    component: ChamadosUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChamadosRoutingModule {}
