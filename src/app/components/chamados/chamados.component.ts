import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Chamado } from 'src/app/models/chamado';
import { ChamadosService } from 'src/app/services/chamados.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit {
  chamados$: Observable<Chamado[]> = EMPTY;

  constructor(private chamadosService: ChamadosService)
   {}

  displayedColumns: string[] = [
    'id',
    'titulo',
    'status',
    'prioridade',
    'observacoes',
    'acoes',
  ];

  ngOnInit(): void {
    this.chamados$ = this.chamadosService.findAll();
  }
}
