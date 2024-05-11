
export interface RegisterRequest {
    id:0,
    nom:String;
    prenom:String;
     email:String;
    adresse:String;
    tel:String;
    login:String;
    password:String;
    role:TypeUser;
    raisonSocial:string;
    mf:string;
    specialite:string;
    }
  
    export interface AuthenticationRequest {
      
      login: string;
      password: string;
    }
  
  
  export interface AuthenticationResponse {
     
      token: string;
      id:string;
      role:string;
    }
  
    // Déclarez l'énumération dans un fichier TypeScript
  export enum TypeUser {
    TECH = 'TECH',
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
   
  }
  
  
  
  
    