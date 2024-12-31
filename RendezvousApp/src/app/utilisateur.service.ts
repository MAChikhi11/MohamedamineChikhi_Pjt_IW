import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl = 'http://localhost:8081/utilisateurs'; // URL de votre API
  private utilisateurId: number | null = null;

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir tous les utilisateurs
  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour ajouter un utilisateur
  ajouterUtilisateur(utilisateur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, utilisateur);
  }

  // Sauvegarder l'ID de l'utilisateur connecté
  setUtilisateurId(id: number): void {
    this.utilisateurId = id;
  }

  // Récupérer l'ID de l'utilisateur connecté
  getUtilisateurId(): number | null {
    return this.utilisateurId;
  }
}
