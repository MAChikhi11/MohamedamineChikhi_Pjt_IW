import { Component, OnInit } from '@angular/core';
import { DisponibiliteService } from '../../disponibilite.service';
import { UtilisateurService } from '../../utilisateur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilte.component.html',
  styleUrls: ['./disponibilte.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class DisponibilteComponent implements OnInit {
  disponibilites: any[] = [];
  newDisponibilite = { date: '', heureDebut: '', heureFin: '' };
  selectedDisponibilite: any = null; // Pour gérer la sélection de la disponibilité à modifier
  message: string = '';

  constructor(
    private disponibiliteService: DisponibiliteService,
    private utilisateurService: UtilisateurService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.loadDisponibilites();
  }

  // Charger les disponibilités pour le professionnel connecté
  loadDisponibilites(): void {
    const professionnelId = this.utilisateurService.getUtilisateurId();
    if (professionnelId) {
      this.disponibiliteService.getAllDisponibilites().subscribe(
        (disponibilites) => {
          this.disponibilites = disponibilites.filter(d => d.professionnelId === professionnelId);
        },
        (error) => {
          console.error('Erreur lors de la récupération des disponibilités', error);
        }
      );
    }
  }

  // Ajouter une nouvelle disponibilité
  addDisponibilite(): void {
    const professionnelId = this.utilisateurService.getUtilisateurId();
    if (professionnelId) {
      const newDisponibilite = {
        ...this.newDisponibilite,
        professionnelId: professionnelId
      };
      this.disponibiliteService.addDisponibilite(newDisponibilite).subscribe(
        (disponibilite) => {
          this.disponibilites.push(disponibilite);
          this.message = 'Disponibilité ajoutée avec succès';
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la disponibilité', error);
          this.message = 'Une erreur est survenue';
        }
      );
    }
  }

  // Supprimer une disponibilité
  deleteDisponibilite(id: number): void {
    this.disponibiliteService.deleteDisponibilite(id).subscribe(
      () => {
        this.disponibilites = this.disponibilites.filter(d => d.id !== id);
        this.message = 'Disponibilité supprimée avec succès';
      },
      (error) => {
        console.error('Erreur lors de la suppression de la disponibilité', error);
        this.message = 'Une erreur est survenue';
      }
    );
  }

  // Ouvrir le formulaire de modification pour la disponibilité sélectionnée
  editDisponibilite(disponibilite: any): void {
    this.selectedDisponibilite = { ...disponibilite }; // Cloner la disponibilité pour modification
  }

  // Mettre à jour la disponibilité
  updateDisponibilite(): void {
    if (this.selectedDisponibilite) {
      this.disponibiliteService.updateDisponibilite(this.selectedDisponibilite.id, this.selectedDisponibilite).subscribe(
        (disponibilite) => {
          const index = this.disponibilites.findIndex(d => d.id === disponibilite.id);
          if (index !== -1) {
            this.disponibilites[index] = disponibilite;
          }
          this.message = 'Disponibilité mise à jour avec succès';
          this.selectedDisponibilite = null; // Fermer le formulaire
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la disponibilité', error);
          this.message = 'Une erreur est survenue';
        }
      );
    }
  }
   // Méthode de déconnexion
   deconnecter(): void {
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }
}
