import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UtilisateurService } from '../../parametrages/utilisateur/utilisateur.service';
import { AuthService } from '../../login/auth.service';
import { Utilisateur } from '../../parametrages/utilisateur/utilisateur';
import { TypeUser } from '../../login/model';

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css'] // Changed 'styleUrl' to 'styleUrls'
})
export class AjouterClientComponent implements OnInit  {
  cliForm!: FormGroup;
  public clientIdUpdate!:number;
  public isUpdateActive: boolean = false;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private authService:AuthService,
    private clientService: UtilisateurService,
    private toastService: NgToastService,
    private activatedRoute: ActivatedRoute,
   
   
  ){}
  ngOnInit(): void {
    this.cliForm = this._fb.group({
     
      nom: [''],
      prenom: [''],
     adresse: [''],
      email: [''],
      tel:[''],
      role:[TypeUser.CLIENT],
      login: [''],
      password: [''],
      raisonSocial:[''],
      mf: [''],
      specialite: null
    });
  

 
    this.activatedRoute.params.subscribe(val => {
      this.clientIdUpdate = val['id'];
      if (this.clientIdUpdate) {
        this.isUpdateActive = true;
        this.clientService.getUtilisateurById(this.clientIdUpdate).subscribe({
          next: (client) => {
            this.fillFormToUpdate(client);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
  onFormSubmit() {
    this.authService.register(this.cliForm.value).subscribe(
      res => {
        this.toastService.success({detail:"Success",summary:"client ajouté",duration:3000});
        this.router.navigate(['liste_client']);
        this.cliForm.reset();
      },
      
    );
  }
  modifier() {
    const client = this.cliForm.value;
    const id = this.clientIdUpdate;
    const {  nom,prenom,adresse,tel,role,email,password,login,mf,raisonSocial,specialite } = client;
  
    this.clientService.updateUtilisateur(client, id, nom,prenom,adresse,tel,role,email,password,login,mf,raisonSocial,specialite)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'Les détails du client ont été mis à jour avec succès', duration: 3000 });
        this.router.navigate(['liste_client']);
        this.cliForm.reset();
      });
  }
  fillFormToUpdate(clients: Utilisateur[]) {
    if (clients && clients.length > 0) {
      const client = clients[0]; // Prendre le premier élément du tableau
      this.cliForm.setValue({
        nom: client.nom,
        prenom: client.prenom,
        adresse: client.adresse,
        email: client.email,
        tel: client.tel,
        role: client.role,
        login: client.login,
        password: client.password,
        raisonSocial: client.raisonSocial,
        mf: client.mf,
        specialite: client.specialite
      });
    }
  }
  }