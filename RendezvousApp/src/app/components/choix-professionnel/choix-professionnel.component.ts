import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix-professionnel',
  templateUrl: './choix-professionnel.component.html',
  styleUrls: ['./choix-professionnel.component.css'],
  standalone: true
})
export class ChoixProfessionnelComponent {

  constructor(private router: Router) {}

  // Rediriger vers la page des disponibilités
  allerVersDisponibilites(): void {
    this.router.navigate(['/disponibilite']);
  }

  // Rediriger vers la page des rendez-vous professionnels
  allerVersRendezVous(): void {
    this.router.navigate(['/rendezvous-professionel']);
  }
}
