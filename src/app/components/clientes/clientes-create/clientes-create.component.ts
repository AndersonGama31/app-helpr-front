import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.css'],
})
export class ClientesCreateComponent implements OnInit {
  public cliente: Cliente = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
  };
  private perfis: number[] = [];

  constructor(
    private toastr: ToastrService,
    private service: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addPerfil(perfil: number): void {
    for (let i = 0; i < this.perfis.length; i++) {
      if (this.perfis[i] === perfil) {
        this.perfis.splice(i, 1);
        this.cliente.perfis = this.perfis;
        return;
      }
    }
    this.perfis.push(perfil);
    this.cliente.perfis = this.perfis;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.service.insert(this.cliente).subscribe({
        next: (res) => {
          this.toastr.success('Técnico cadastrado com sucesso!', 'Sucesso');
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
