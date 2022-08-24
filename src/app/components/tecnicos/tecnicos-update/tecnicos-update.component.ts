import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnicos-update',
  templateUrl: './tecnicos-update.component.html',
  styleUrls: ['./tecnicos-update.component.css'],
})
export class TecnicosUpdateComponent implements OnInit {
  public tecnico: Tecnico = {
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
    private service: TecnicoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id: string | null = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.service.findById(Number.parseInt(id)).subscribe((tecnico) => {
        this.tecnico = tecnico;
        this.initializePerfis(<string[]>this.tecnico.perfis)
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
        this.tecnico.perfis = this.perfis;
        return;
      }
    }
    this.perfis.push(perfil);
    this.checked[perfil]= true;
    this.tecnico.perfis = this.perfis;
    
    
  }

  update(form: NgForm) {
    if (form.valid) {
      this.service.update(this.tecnico).subscribe({
        next: (res) => {
          this.toastr.success('Técnico editado com sucesso!', 'Sucesso');
          this.router.navigate(['/tecnicos']);
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
