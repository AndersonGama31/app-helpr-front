import { NgModule } from '@angular/core';
import { HomeModule } from 'src/app/components/home/home.module';
import { LoginModule } from 'src/app/components/login/login.module';
import { NavBarModule } from 'src/app/components/nav-bar/nav-bar.module';
import { TecnicosModule } from 'src/app/components/tecnicos/tecnicos.module';



@NgModule({
  exports:[
    HomeModule,
    LoginModule,
    TecnicosModule,
    NavBarModule
  ]
})
export class PagesModule { }
