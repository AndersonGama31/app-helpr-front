import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRoutingModule } from './chamados-routing.module';
import { ChamadosComponent } from './chamados.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from '../nav-bar/nav-bar.module';


@NgModule({
  declarations: [
    ChamadosComponent
  ],
  imports: [
    CommonModule,
    ChamadosRoutingModule,
    MaterialModule,
    FormsModule,
    NavBarModule,
    ReactiveFormsModule
  ],
  exports:
  [
    ChamadosComponent
  ]
})
export class ChamadosModule { }
