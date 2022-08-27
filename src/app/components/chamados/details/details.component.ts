import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public chamado: Chamado

  constructor(@Inject(MAT_DIALOG_DATA)  chamado: Chamado) {
    this.chamado = chamado;
   }

  ngOnInit(): void {
  }

}
