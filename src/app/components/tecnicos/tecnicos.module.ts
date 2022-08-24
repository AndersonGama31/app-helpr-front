import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosRoutingModule } from './tecnicos-routing.module';
import { TecnicosComponent } from './tecnicos.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { TecnicosCreateComponent } from './tecnicos-create/tecnicos-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicosUpdateComponent } from './tecnicos-update/tecnicos-update.component';


@NgModule({
  declarations: [
    TecnicosComponent,
    TecnicosCreateComponent,
    TecnicosUpdateComponent
  ],
  imports: [
    CommonModule,
    TecnicosRoutingModule,
    MaterialModule,
    NavBarModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    TecnicosComponent,
    TecnicosCreateComponent
  ]
})
export class TecnicosModule { }
