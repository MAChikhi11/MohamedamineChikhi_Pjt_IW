import { Component, OnInit } from '@angular/core';
import { DisponibiliteService } from '../../disponibilite.service';
import { RendezVousService } from '../../rendezvous.service';
import { UtilisateurService } from '../../utilisateur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rendezvous-client',
  templateUrl: './rendezvous-client.component.html',
  styleUrls: ['./rendezvous-client.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RendezvousClientComponent implements OnInit {

  disponibilites: any[] = [];
  rendezvous: any[] = [];
  clientId: number | null = null;  // Utilisateur connecté
  filtreProfessionnelId: number | null = null;
  filtreDate: string | null = null;

  constructor(
    private disponibiliteService: DisponibiliteService,
    private rendezVousService: RendezVousService,
    private utilisateurService: UtilisateurService,
    private router :Router
  ) {}

  ngOnInit(): void {
    this.clientId = this.utilisateurService.getUtilisateurId();
    this.loadDisponibilites();
    this.loadRendezVous();
  }

  loadDisponibilites(): void {
    this.disponibiliteService.getAllDisponibilites().subscribe(
      (data) => {
        this.disponibilites = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des disponibilités', error);
      }
    );
  }

  loadRendezVous(): void {
    // On récupère tous les rendez-vous sans filtrer côté API
    this.rendezVousService.getAllRendezVous().subscribe(
      (data) => {
        const utilisateurId = this.utilisateurService.getUtilisateurId();

        // Si l'utilisateur est un client, on filtre par clientId
        if (this.clientId) {
          this.rendezvous = data.filter(rendezVous => rendezVous.clientId === this.clientId);
        }
        // Si l'utilisateur est un professionnel, on filtre par professionnelId
        else {
          this.rendezvous = data.filter(rendezVous => rendezVous.professionnelId === utilisateurId);
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des rendez-vous', error);
      }
    );
  }

  reserverRendezVous(disponibilite: any): void {
    const newRendezVous = {
      clientId: this.clientId,
      professionnelId: disponibilite.professionnelId,
      date: disponibilite.date,
      heure: disponibilite.heureDebut,
      statut: 'en attente'
    };

    this.rendezVousService.saveRendezVous(newRendezVous).subscribe(
      () => {
        this.loadRendezVous();  // Rechargement des rendez-vous après réservation
        alert('Rendez-vous réservé');
      },
      (error) => {
        console.error('Erreur lors de la réservation du rendez-vous', error);
      }
    );
  }

  supprimerRendezVous(rendezVousId: number): void {
    this.rendezVousService.deleteRendezVous(rendezVousId).subscribe(
      () => {
        this.loadRendezVous();  // Rechargement des rendez-vous après suppression
        alert('Rendez-vous supprimé');
      },
      (error) => {
        console.error('Erreur lors de la suppression du rendez-vous', error);
      }
    );
  }

  filterRendezVous(): any[] {
    return this.rendezvous.filter((rendezVous) => {
      const matchesProfessionnel = this.filtreProfessionnelId
        ? rendezVous.professionnelId === this.filtreProfessionnelId
        : true;
      const matchesDate = this.filtreDate ? rendezVous.date === this.filtreDate : true;
      return matchesProfessionnel && matchesDate;
    });
  }

  // Méthode de déconnexion
  deconnecter(): void {
    this.router.navigate(['/connexion']);  // Redirige vers la page de connexion
  }
}

