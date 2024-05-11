import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';
import { Specialite } from '../../specialite/specialite';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../assets/environments/environment';
import { AuthService } from '../../../login/auth.service';
import { TypeUser } from '../../../login/model'

@Component({
  selector: 'app-util-add-edit',
  templateUrl: './util-add-edit.component.html',
  styleUrls: ['./util-add-edit.component.css']
})
export class UtilAddEditComponent implements OnInit {
  private apiServerUrl = environment.apiBaseUrl;
  specialites!: Specialite[];
  cloture = ["ADMIN", "TECH"];
  hide = true;
  utilForm: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _fb: FormBuilder,
    private authService:AuthService,
    private utilisateurService: UtilisateurService,
    private _dialogRef: MatDialogRef<UtilAddEditComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Utilisateur
  ) {
    this.utilForm = this._fb.group({
      id:0,
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      role: [TypeUser.ADMIN, Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      raisonSocial:null,
      mf:null,
      specialite:[''],
    });

    this.utilForm.get('role')?.valueChanges.subscribe(() => {
      this.onRoleChange();
    });
   
  }

  ngOnInit(): void {
    console.log(this.data);
    this.utilForm.patchValue(this.data);
  
    // Check if the password is null, set it to an empty string if it is
    if (this.utilForm.get('password')?.value === null) {
      this.utilForm.get('password')?.setValue('');
    }
  
    this.getSpecialites().subscribe((specialites) => {
      this.specialites = specialites;
    });
  }
  
//   this.utilForm.value?.utilisateur, this.data.id,
//   this.utilForm.value.nom, this.utilForm.value.prenom, this.utilForm.value.adresse, 
//  this.utilForm.value.email, this.utilForm.value.tel, this.utilForm.value.login,
//   this.utilForm.value.password, this.utilForm.value.role,this.utilForm.value.raisonSocial,
//   this.utilForm.value.mf, this.utilForm.value.specialite
update(user: Utilisateur) {
  if (!this.utilForm.value.password) {
    user.password = this.data.password;
}
  this.utilisateurService.updateUtilisateur1(user).subscribe({
    next: (val: any) => {
      console.log("updated", val);
      alert('Utilisateur modifié avec succès');
      this._dialogRef.close(true);
    },
    
    error: (err: any) => {
      console.error(err);
      alert('Erreur lors de la modification de l\'utilisateur : ' + err.message);
    }
  });
}

onFormSubmit() {
  if (this.utilForm.valid) {
    if (this.data) {
      console.log(this.data, "test");
      // Call update with data.id and utilForm.value as arguments
      this.update(this.utilForm.value);
    } else {
      this.authService.register(this.utilForm.value).subscribe({
        next: (val: any) => {
          alert('Utilisateur ajouté avec succès');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          alert('Erreur lors de l\'ajout de l\'utilisateur : ' + err.message);
        }
      });
    }
  } else {
    alert('Veuillez remplir tous les champs correctement');
  }
}

  

  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(this.apiServerUrl + '/specialites/all');
  }

  onRoleChange(): void {
    const roleControl = this.utilForm.get('role');
    const specialiteControl = this.utilForm.get('specialite');
  
    if (roleControl && specialiteControl) {
      if (roleControl.value === 'ADMIN') { // Utiliser les valeurs de l'énumération
        specialiteControl.setValue('Aucune spécialité');
        specialiteControl.disable(); // Désactiver le champ spécialité
      } else {
        specialiteControl.enable(); // Réactiver le champ spécialité si nécessaire
      }
    }
  }
  
}





