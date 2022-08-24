import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnicos-create',
  templateUrl: './tecnicos-create.component.html',
  styleUrls: ['./tecnicos-create.component.css'],
})
export class TecnicosCreateComponent implements OnInit {
  public tecnico: Tecnico = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
  };
  private perfis: number[] = [];

  constructor(
    private toastr: ToastrService,
    private service: TecnicoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addPerfil(perfil: number): void {
    for (let i = 0; i < this.perfis.length; i++) {
      if (this.perfis[i] === perfil) {
        this.perfis.splice(i, 1);
        this.tecnico.perfis = this.perfis;
        return;
      }
    }
    this.perfis.push(perfil);
    this.tecnico.perfis = this.perfis;
  }

  create(form: NgForm) {
    if (form.valid) {
      this.service.insert(this.tecnico).subscribe({
        next: (res) => {
          this.toastr.success('Técnico cadastrado com sucesso!', 'Sucesso');
          this.router.navigate(['/tecnicos']);
        },
      });
    } else {
      this.toastr.error('Dados inválidos', 'Erro');
    }
  }
}
