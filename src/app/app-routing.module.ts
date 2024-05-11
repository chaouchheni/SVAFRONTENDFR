import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './authGuard/AuthGuard'; // Assuming the AuthGuard file path is correct
import {AuthentificationComponent} from './login/authentification/authentification.component';
import {SocieteComponent} from './parametrages/societe/societe.component';
import {SpecialiteComponent} from './parametrages/specialite/specialite.component';
import {UtilisateurComponent} from './parametrages/utilisateur/utilisateur.component';
import {ListeClientComponent} from './liste-client/liste-client.component';
import {AjouterClientComponent} from './liste-client/ajouter-client/ajouter-client.component';
import {AjouterContratComponent} from './Contrat/ajouter-contrat/ajouter-contrat.component';
import {ListeContratComponent} from './Contrat/liste-contrat/liste-contrat.component';
import {AjouterDemandeComponent} from './Demande_intervention/ajouter-demande/ajouter-demande.component';
import {ListeDemandeComponent} from './Demande_intervention/liste-demande/liste-demande.component';
import {ListeInterventionComponent} from './Interventions/liste-intervention/liste-intervention.component';
import {AjouterInterventionComponent} from './Interventions/ajouter-intervention/ajouter-intervention.component';
import {AjouterFactureComponent} from './Facture/ajouter-facture/ajouter-facture.component';
import {ListeFactureComponent} from './Facture/liste-facture/liste-facture.component';
import {ListeIntervPieceComponent} from './IntervPiece/liste-interv-piece/liste-interv-piece.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SecureInnerPagesGuard} from "./authGuard/SecureInnerPagesGuard";
import {ListInterventionTechComponent} from "./Interventions/list-intervention-tech/list-intervention-tech.component";

const routes: Routes = [
  {path: 'login', component: AuthentificationComponent},
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {path: '', component: SidenavComponent, outlet: 'sidebar'},
      {path: 'societe', component: SocieteComponent, canActivate: [AuthGuard]},
      {path: 'specialite', component: SpecialiteComponent, canActivate: [AuthGuard]},
      {path: 'utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard]},
      {path: 'liste_client', component: ListeClientComponent, canActivate: [AuthGuard]},
      {path: 'ajouter_client', component: AjouterClientComponent, canActivate: [AuthGuard]},
      {path: 'update_client/:id', component: AjouterClientComponent, canActivate: [AuthGuard]},
      {path: 'ajouter_contrat', component: AjouterContratComponent, canActivate: [AuthGuard]},
      {path: 'liste_contrat', component: ListeContratComponent, canActivate: [AuthGuard]},
      {path: 'update_contrat/:numcontrat', component: AjouterContratComponent, canActivate: [AuthGuard]},
      {path: 'ajouter_demande', component: AjouterDemandeComponent, canActivate: [AuthGuard]},
      {path: 'liste_demande', component: ListeDemandeComponent, canActivate: [AuthGuard]},
      {path: 'update_demande/:numDem', component: AjouterDemandeComponent, canActivate: [AuthGuard]},
      {path: 'ajouter_intervention', component: AjouterInterventionComponent, canActivate: [AuthGuard]},
      {path: 'liste_interventions', component: ListeInterventionComponent, canActivate: [AuthGuard]},
      {path: 'liste_interventionstech', component: ListInterventionTechComponent, canActivate: [AuthGuard]},
      {path: 'update_intervention/:id', component: AjouterInterventionComponent, canActivate: [AuthGuard]},
      {path: 'ajouter_facture', component: AjouterFactureComponent, canActivate: [AuthGuard]},
      {path: 'liste_facture', component: ListeFactureComponent, canActivate: [AuthGuard]},
      {path: 'update_facture/:id', component: AjouterFactureComponent, canActivate: [AuthGuard]},
      {path: 'liste_intervpiece', component: ListeIntervPieceComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
