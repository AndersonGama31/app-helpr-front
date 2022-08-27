import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosComponent } from './chamados.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ChamadosCreateComponent } from './chamados-create/chamados-create.component';
import { ChamadosUpdateComponent } from './chamados-update/chamados-update.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ChamadosComponent,
    ChamadosCreateComponent,
    ChamadosUpdateComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ChamadosRoutingModule,
    MaterialModule,
    FormsModule,
    NavBarModule,
    PipesModule,
    ReactiveFormsModule
  ],
  exports:
  [
    ChamadosComponent,
    ChamadosCreateComponent,
    ChamadosUpdateComponent
  ]
})
export class ChamadosModule { }
