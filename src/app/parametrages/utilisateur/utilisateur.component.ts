import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur } from './utilisateur';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UtilAddEditComponent } from './util-add-edit/util-add-edit.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {


  displayedColumns: string[] = [ 'nom', 'prenom','adresse','email', 'tel','role', 'login','password','specialite','actions'];
  
  public utilisateurs: MatTableDataSource<Utilisateur> = new MatTableDataSource<Utilisateur>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  hide = true;
  constructor(private _dialog: MatDialog, private utilisateurService: UtilisateurService,  private toastService: NgToastService) {}

  ngOnInit(): void {
    this.getAllUtilisateur();
  }

  openAddEditUtilForm() {
    const DialogRef = this._dialog.open(UtilAddEditComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllUtilisateur();
        }
      }
    });
  }


  getAllUtilisateur() {
    const roles = ['ADMIN', 'TECH'];
    roles.forEach(role => {
      this.utilisateurService.getUtilisateursByRole(role).subscribe({
        next: (response: Utilisateur[]) => {
          console.log("user", response)
          if (!this.utilisateurs) {
            this.utilisateurs = new MatTableDataSource<Utilisateur>([]);
          }
          // Ajoute les utilisateurs du rôle courant à la source de données
          response.forEach(utilisateur => this.utilisateurs.data.push(utilisateur));
          this.utilisateurs.sort = this.sort;
          this.utilisateurs.paginator = this.paginator;
        },
        error: (error: any) => {
          alert(error.message);
        }
      });
    });
  }
  
 
  
      
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.utilisateurs.filter = filterValue.trim().toLowerCase();

    if (this.utilisateurs.paginator) {
      this.utilisateurs.paginator.firstPage();
    }
  }

  OndeleteUtilisateur(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Utilisateur supprimé avec succès", summary: "Succès", duration: 3000 });
          this.getAllUtilisateur();
          window.location.reload(); // Recharge la page
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }
  
  openEditForm(utilisateur: Utilisateur): void {
    const dialogRef = this._dialog.open(UtilAddEditComponent, {
      data: utilisateur 
      
    });
  
    this.utilisateurService.updateUtilisateur(utilisateur, utilisateur.id, utilisateur.nom.toString(),utilisateur.prenom.toString(),utilisateur.email.toString(),utilisateur.password.toString(),utilisateur.login.toString(),utilisateur.role.toString(),utilisateur.adresse.toString(),utilisateur.tel.toString(),utilisateur.raisonSocial.toString(),utilisateur.mf.toString(),utilisateur.specialite.toString())
        this.getAllUtilisateur();
      
        dialogRef.afterClosed().subscribe({
          next: (val) => {
            if (val) {
              this.getAllUtilisateur();
            }
          },
        });
      }
   







    }


