import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/service/clientes`)
  }
  findById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/service/clientes/${id}`)
  }
  insert(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/service/clientes`, cliente);
  }
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/service/clientes/${id}`);
  }
  update(cliente : Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/service/clientes/${cliente.id}`, cliente);
  }
}
