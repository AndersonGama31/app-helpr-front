import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadosService } from 'src/app/services/chamados.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

type DataSection = {
  title: string;
  value: number;
};

@Component({
  selector: 'app-chamados-update',
  templateUrl: './chamados-update.component.html',
  styleUrls: ['./chamados-update.component.css'],
})
export class ChamadosUpdateComponent implements OnInit {
  public statusList: DataSection[] = [
    { title: 'Aberto', value: 0 },
    { title: 'Em andamento', value: 1 },
    { title: 'Encerrado', value: 2 },
  ];

  public prioridadeList: DataSection[] = [
    { title: 'Baixa', value: 0 },
    { title: 'Média', value: 1 },
    { title: 'Alta', value: 2 },
  ];

  public clienteList: Cliente[] = [];
  public tecnicoList: Tecnico[] = [];
  public formChamado!: FormGroup;
  public chamado: Chamado = {
    titulo: '',
    status: NaN,
    prioridade: NaN,
    cliente: NaN,
    tecnico: NaN,
    observacoes: '',
  };

  constructor(
    private toastr: ToastrService,
    private service: ChamadosService,
    private cliente: ClienteService,
    private tecnico: TecnicoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeClientes();
    this.initializeTecnicos();
    this.initializeField();
  }
  initializeField(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(Number.parseInt(id)).subscribe((chamado => {
        this.chamado = chamado;
      }))
    }
  }

  initializeClientes(): void {
    this.cliente.findAll().subscribe((clientes) => {
      this.clienteList = clientes;
    });
  }

  initializeTecnicos(): void {
    this.tecnico.findAll().subscribe((tecnicos) => {
      this.tecnicoList = tecnicos;
    });
  }

  update(form: NgForm): void {
    if (this.formChamado.valid) {
      this.service.update(this.chamado).subscribe({
        next: (res) => {
          this.toastr.success('Chamado cadastrado com sucesso!', 'Sucesso');
          this.router.navigate(['/chamados']);
        },
        error: (err) => {
          switch (err.status) {
            case 403:
              return this.toastr.error('Ação não permitida');
            case 409:
              return this.toastr.error(err.error.message);
            default:
              return this.toastr.error(
                `Um erro aconteceu: ${err.error.message ?? ''}`
              );
          }
        },
      });
    } else {
      this.toastr.error('Dados inválidos', 'Erro');
    }
  }
}
