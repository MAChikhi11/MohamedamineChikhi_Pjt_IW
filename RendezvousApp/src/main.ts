import { bootstrapApplication } from '@angular/platform-browser'; // Importation de bootstrapApplication
import { Route, RouterModule } from '@angular/router'; // Importation de Route et RouterModule
import { provideRouter } from '@angular/router'; // Fournir le routeur
import { provideHttpClient } from '@angular/common/http'; // Fournir le client HTTP
import { AppComponent } from './app/app.component'; // Importation du composant principal
import { ConnexionComponent } from './app/components/connexion/connexion.component'; // Importation du composant Connexion
import { InscriptionComponent } from './app/components/inscription/inscription.component'; // Importation du composant Inscription
import {ChoixProfessionnelComponent} from './app/components/choix-professionnel/choix-professionnel.component';
import { DisponibilteComponent } from './app/components/disponibilte/disponibilte.component';
import { RendezvousClientComponent } from './app/components/rendezvous-client/rendezvous-client.component';
import { RendezvousProfessionnelComponent  } from './app/components/rendezvous-professionel/rendezvous-professionel.component';
import  {DisponibiliteService} from './app/disponibilite.service';
import  {RendezVousService} from './app/rendezvous.service';
import  {UtilisateurService} from './app/utilisateur.service';
// Définition des routes
const routes: Route[] = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'choix-professionnel', component: ChoixProfessionnelComponent },
  { path: 'disponibilite', component: DisponibilteComponent },
  { path: 'rendezvous-client', component: RendezvousClientComponent },
  { path: 'rendezvous-professionel', component: RendezvousProfessionnelComponent },
  { path: '', redirectTo: '/connexion', pathMatch: 'full' } // Route par défaut
];

// Démarrage de l'application avec les routes et les composants standalone
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Fournir les routes à l'application
    provideHttpClient(), // Fournir le client HTTP si nécessaire
    DisponibiliteService,RendezVousService,UtilisateurService,RouterModule 
  ]
}).catch(err => console.error(err));
