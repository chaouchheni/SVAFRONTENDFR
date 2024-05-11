import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../assets/environments/environment';
import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllutilisateur(): Observable<Utilisateur[]>{
      return this.http.get<Utilisateur[]> (`${this.apiServerUrl}/Utilisateur/all`)
     
  }
  public getUtilisateurById(id: number): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}Utilisateur/find/${id}`);
  }

  getUtilisateursByRole(role: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/Utilisateur/role/${role}`);
  }
   

  
  
  
    public updateUtilisateur(utilisateur: Utilisateur, id: number, nom: string,prenom: string, adresse: string, email: string, tel: string, password: string,login: string,role: string,raisonSocial:string,mf:string,specialite:string): Observable<Utilisateur> {
      // Inclure les paramètres dans le corps de la requête

      return this.http.put<Utilisateur>(`${this.apiServerUrl}/Utilisateur/update/${id}?nom=${nom}&prenom=${prenom}&email=${email}&tel=${tel}&adresse=${adresse}&password=${password}&login=${login}&role=${role}&raisonSocial=${raisonSocial}&mf=${mf}&specialite=${specialite}`, utilisateur);
    }
    public updateUtilisateur1(utilisateur: Utilisateur): Observable<Utilisateur> {
      // Just send the utilisateur object in the request body
      return this.http.put<Utilisateur>(`${this.apiServerUrl}/Utilisateur/update/${utilisateur.id}`, utilisateur);
    }
  
    public deleteUtilisateur(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/Utilisateur/delete/${id}`);
    }

    private hashPassword(password: string): string {
      // Hachage du mot de passe avec SHA256
      return CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    }
    }

 