import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { ClientesCreateComponent } from './clientes-create/clientes-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ClientesUpdateComponent } from './clientes-update/clientes-update.component';


@NgModule({
  declarations: [
    ClientesComponent,
    ClientesCreateComponent,
    ClientesUpdateComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    NavBarModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    ClientesComponent,
    ClientesCreateComponent
  ]
})
export class ClientesModule { }
