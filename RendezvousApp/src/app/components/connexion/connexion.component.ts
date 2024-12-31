import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../utilisateur.service'; // Import du service Utilisateur
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ConnexionComponent implements OnInit {
  public email: string = '';
  public motDePasse: string = '';
  public message: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {}

  // Méthode pour vérifier l'authentification
  connecter(): void {
    this.utilisateurService.getUtilisateurs().subscribe(
      (utilisateurs) => {
        const utilisateurTrouve = utilisateurs.find(u => u.email === this.email && u.motDePasse === this.motDePasse);
        
        if (utilisateurTrouve) {
          this.utilisateurService.setUtilisateurId(utilisateurTrouve.id); // Sauvegarder l'ID
          // Rediriger selon le rôle
          if (utilisateurTrouve.role === 'professionnel') {
            this.router.navigate(['/choix-professionnel']);
            this.message = 'Connexion réussie en tant que professionnel';
          } else {
            this.router.navigate(['/rendezvous-client']);
            this.message = 'Connexion réussie en tant que client';
          }
        } else {
          this.message = 'Email ou mot de passe incorrect.';
        }
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        this.message = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
  
}
