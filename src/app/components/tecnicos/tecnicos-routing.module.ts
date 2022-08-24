import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TecnicosCreateComponent } from './tecnicos-create/tecnicos-create.component';
import { TecnicosUpdateComponent } from './tecnicos-update/tecnicos-update.component';
import { TecnicosComponent } from './tecnicos.component';

const routes: Routes = [
  {
    path: '',
    component: TecnicosComponent,
  },
  {
    path: "new",
    component: TecnicosCreateComponent
  },
  {
    path: "edit/:id",
    component: TecnicosUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecnicosRoutingModule {}
