import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {

  clienteList: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'dataCriacao', 'update', 'delete'];
  dataSource = new MatTableDataSource<Cliente>(this.clienteList);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private service: ClienteService;

  constructor(service: ClienteService, private toastr: ToastrService) {
    this.service = service;
  }

  ngOnInit(): void {
    this.initializeTable();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  initializeTable(): void {
    this.service.findAll().subscribe(clientes => {
      this.clienteList = clientes;
      this.dataSource = new MatTableDataSource<Cliente>(this.clienteList);
      this.dataSource.paginator = this.paginator;
    });
  }
  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: res => {
       this.toastr.success("Técnico deletado com sucesso!", "Sucesso")
        this.initializeTable();
      }
    })
  }

}