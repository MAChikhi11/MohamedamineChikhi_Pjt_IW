import { Component, OnInit } from '@angular/core';
import { RendezVousService } from '../../rendezvous.service';
import { UtilisateurService } from '../../utilisateur.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-professionnel',
  templateUrl: './rendezvous-professionel.component.html',
  styleUrls: ['./rendezvous-professionel.component.css'],
  imports: [CommonModule]
})
export class RendezvousProfessionnelComponent implements OnInit {

  rendezvous: any[] = [];
  professionnelId: number | null = null;

  constructor(
    private rendezVousService: RendezVousService,
    private utilisateurService: UtilisateurService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.professionnelId = this.utilisateurService.getUtilisateurId();
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    // On récupère tous les rendez-vous, sans filtrer côté API
    this.rendezVousService.getAllRendezVous().subscribe(
      (data) => {
        // Si un professionnel est connecté, on filtre les rendez-vous par professionnelId
        if (this.professionnelId) {
          this.rendezvous = data
            .filter((rendezVous) => rendezVous.professionnelId === this.professionnelId)  // Filtrage par ID du professionnel
            .filter((rendezVous) => rendezVous.statut === 'en attente');  // On garde uniquement ceux avec le statut "en attente"
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }

  updateStatutRendezVous(rendezVousId: number, newStatut: string): void {
    // Récupérer les informations complètes du rendez-vous avant de modifier le statut
    const rendezVousToUpdate = this.rendezvous.find(rendezVous => rendezVous.id === rendezVousId);

    if (rendezVousToUpdate) {
      // Conserver les informations existantes et ne mettre à jour que le statut
      const updatedRendezVous = {
        ...rendezVousToUpdate,  // Conserve toutes les propriétés du rendez-vous
        statut: newStatut       // Modifie uniquement le statut
      };

      // Appel à l'API pour mettre à jour le statut
      this.rendezVousService.updateRendezVous(rendezVousId, updatedRendezVous).subscribe(
        () => {
          this.loadRendezVous();  // Recharger les rendez-vous après mise à jour
          alert('Rendez-vous mis à jour');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du rendez-vous', error);
        }
      );
    }
  }
  // Méthode de déconnexion
  deconnecter(): void {
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }
}
