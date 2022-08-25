import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesCreateComponent } from './clientes-create/clientes-create.component';
import { ClientesUpdateComponent } from './clientes-update/clientes-update.component';
import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path: "new",
    component: ClientesCreateComponent
  },
  {
    path: "edit/:id",
    component: ClientesUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
