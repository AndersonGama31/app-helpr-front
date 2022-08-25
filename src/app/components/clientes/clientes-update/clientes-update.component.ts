import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-update',
  templateUrl: './clientes-update.component.html',
  styleUrls: ['./clientes-update.component.css'],
})
export class ClientesUpdateComponent implements OnInit {
  public cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
  };
  private perfis: number[] = [];
  public checked: boolean[] = [false, false, false];

  constructor(
    private toastr: ToastrService,
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(Number.parseInt(id)).subscribe((cliente) => {
        this.cliente = cliente;
        this.initializePerfis(<string[]>this.cliente.perfis)
      });
    }
  }

  initializePerfis(perfis: string[]): void {
    for (let perfil of perfis) {
      switch (perfil) {
        case 'ADMIN':
          this.perfis.push(0);
          break;
        case 'TECNICO':
          this.perfis.push(1);
          break;
        case 'CLIENTE':
          this.perfis.push(2);
          break;
      }
    }
  }

  addPerfil(perfil: number): void {
    for (let i = 0; i < this.perfis.length; i++) {
      if (this.perfis[i] === perfil) {
        this.perfis.splice(i, 1);
        this.checked[perfil]= false;        
        this.cliente.perfis = this.perfis;
        return;
      }
    }
    this.perfis.push(perfil);
    this.checked[perfil]= true;
    this.cliente.perfis = this.perfis;
    
    
  }

  update(form: NgForm) {
    if (form.valid) {
      this.service.update(this.cliente).subscribe({
        next: (res) => {
          this.toastr.success('Técnico editado com sucesso!', 'Sucesso');
          this.router.navigate(['/clientes']);
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
