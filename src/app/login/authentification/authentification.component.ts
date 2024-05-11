import { Component } from '@angular/core';
import { AuthenticationRequest, RegisterRequest, TypeUser } from '../model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {





  registerRequest: RegisterRequest = {
    id:0,
    nom:'',
    prenom:'',
    email:'',
    adresse:'',
    tel:'',
    login:'',
    password:'',
    role: TypeUser.CLIENT,
    raisonSocial:'',
    mf:'',
    specialite:''
  };


  constructor(private authService: AuthService,private router: Router ,private _snackBar: MatSnackBar) { }





  register() {


    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          // Gérer la réponse de l'inscription ici
          // Par exemple, rediriger l'utilisateur ou afficher un message de succès
          console.log('Inscription réussie. Token reçu : ', response);
          this.handleRegistrationSuccess(response);
        },
        error: (error) => {
          // Gérer les erreurs ici
          // Par exemple, afficher un message d'erreur à l'utilisateur
          console.error('Erreur lors de l\'inscription : ', error);
          this.handleRegistrationError(error);
        }
      });
  }

  private handleRegistrationSuccess(response: any) {
    // Implémentez la logique de succès ici
    // Par exemple : this.router.navigate(['/home']);
  }

  private handleRegistrationError(error: any) {
    // Implémentez la logique d'erreur ici
    // Par exemple : this.errorMessage = 'Erreur lors de l\'inscription';
  }




  authenticationRequest: AuthenticationRequest = {

    login: '',
    password: ''
  };

  login() {
    this.authService.authenticate(this.authenticationRequest)
      .subscribe({
        next: (response) => {
          localStorage.removeItem('client')
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('role');
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response.id);
          const id = localStorage.getItem('userId')
          console.log("id",id);
          // Gérer la réponse de l'authentification ici
          // Par exemple, rediriger l'utilisateur ou afficher un message de succès
          console.log('Authentification réussie. Token reçu : ', response);
          this.router.navigate(['dashboard'])
          },
        error: (error) => {
          console.error('Erreur lors de l\'authentification : ', error);
        }
      });
  }

}


