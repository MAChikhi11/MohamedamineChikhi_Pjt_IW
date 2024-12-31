import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {

  private apiUrl = 'http://localhost:8082/disponibilites'; // URL de votre API

  constructor(private http: HttpClient) { }

  // Récupérer toutes les disponibilités
  getAllDisponibilites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Utilise l'API existante pour récupérer toutes les disponibilités
  }

  // Récupérer une disponibilité par ID
  getDisponibiliteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // Récupère une disponibilité par son ID
  }

  // Ajouter une nouvelle disponibilité
  addDisponibilite(disponibilite: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, disponibilite); // Envoie une nouvelle disponibilité à l'API
  }

  // Mettre à jour une disponibilité existante
  updateDisponibilite(id: number, disponibilite: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, disponibilite); // Met à jour une disponibilité par son ID
  }

  // Supprimer une disponibilité par ID
  deleteDisponibilite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Supprime une disponibilité par son ID
  }
}
