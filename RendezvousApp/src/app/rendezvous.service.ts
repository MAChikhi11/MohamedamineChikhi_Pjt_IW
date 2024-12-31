import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private apiUrl = 'http://localhost:8083/rendezvous'; // URL de ton API

  constructor(private http: HttpClient) { }

  // Récupérer tous les rendez-vous sans filtrer côté API
  getAllRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un rendez-vous
  saveRendezVous(rendezVous: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rendezVous);
  }

  // Supprimer un rendez-vous
  deleteRendezVous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un rendez-vous
  updateRendezVous(id: number, updatedRendezVous: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedRendezVous);
  }
}
