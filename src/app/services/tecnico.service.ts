import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/service/tecnicos`)
  }
  findById(id: number): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/service/tecnicos/${id}`)
  }
  insert(tecnico: Tecnico) : Observable<Tecnico>{
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/service/tecnicos`, tecnico);
  }
  delete(id: number): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/service/tecnicos/${id}`);
  }
  update(tecnico : Tecnico): Observable<Tecnico>{
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/service/tecnicos/${tecnico.id}`, tecnico);
  }
}
