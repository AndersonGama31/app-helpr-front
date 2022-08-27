import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'app-chamados-create',
  templateUrl: './chamados-create.component.html',
  styleUrls: ['./chamados-create.component.css'],
})
export class ChamadosCreateComponent implements OnInit {
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
  public formChamado: FormGroup;
  private serviceCliente: ClienteService;
  private serviceTecnico: TecnicoService;

  constructor(
    serviceCliente: ClienteService,
    serviceTecnico: TecnicoService,
    formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: ChamadosService,
    private router: Router
  ) {
    this.serviceCliente = serviceCliente;
    this.serviceTecnico = serviceTecnico;
    this.formChamado = formBuilder.group({
      prioridade: ['', [Validators.required]],
      status: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      observacoes: ['', [Validators.required]],
      tecnico: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initializeClientes();
    this.initializeTecnicos();
  }

  initializeClientes(): void {
    this.serviceCliente.findAll().subscribe((clientes) => {
      this.clienteList = clientes;
    });
  }

  initializeTecnicos(): void {
    this.serviceTecnico.findAll().subscribe((tecnicos) => {
      this.tecnicoList = tecnicos;
    });
  }

  create(): void {
    if (this.formChamado.valid) {
      this.service.create(this.formChamado.value).subscribe({
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
