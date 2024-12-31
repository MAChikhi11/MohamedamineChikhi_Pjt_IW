import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../utilisateur.service'; // Importez le service
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class InscriptionComponent implements OnInit {
  public nom: string = '';
  public prenom: string = '';
  public email: string = '';
  public motDePasse: string = '';
  public role: string = 'client'; // Valeur par défaut
  public message: string = '';
  public roles = ['client', 'professionnel']; // Liste des rôles disponibles

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  ngOnInit(): void {}

  inscrire(): void {
    // Vérifier si l'email existe déjà dans la base de données
    this.utilisateurService.getUtilisateurs().subscribe(
      (utilisateurs) => {
        const utilisateurExistant = utilisateurs.find(u => u.email === this.email);
        if (utilisateurExistant) {
          // Si l'utilisateur existe déjà
          this.message = "L'utilisateur existe déjà, veuillez vous connecter.";
          // Redirection vers la page de connexion après 3 secondes
          setTimeout(() => {
            this.router.navigate(['/connexion']);
          }, 3000);
        } else {
          // Si l'utilisateur n'existe pas, on peut l'ajouter
          const nouvelUtilisateur = { nom: this.nom, prenom: this.prenom, email: this.email, motDePasse: this.motDePasse, role: this.role };
          this.utilisateurService.ajouterUtilisateur(nouvelUtilisateur).subscribe(
            () => {
              this.message = "Inscription réussie! Vous allez être redirigé vers la page de connexion.";
              // Redirection vers la page de connexion après 3 secondes
              setTimeout(() => {
                this.router.navigate(['/connexion']);
              }, 3000);
            },
            error => {
              console.error('Erreur lors de l\'inscription', error);
              this.message = 'Une erreur est survenue lors de l\'inscription, veuillez réessayer.';
            }
          );
        }
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
        this.message = 'Une erreur est survenue, veuillez réessayer.';
      }
    );
  }
}
