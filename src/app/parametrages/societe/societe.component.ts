import { Component, OnInit, ViewChild } from '@angular/core';
import { Societe } from './societe';
import { SocieteService } from './societe.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SocAddEditComponent } from './soc-add-edit/soc-add-edit.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrl: './societe.component.css'
})
export class SocieteComponent implements OnInit {

   //societe
   displayedColumns: string[] = [ 'raisonSocial', 'adresse','email','tel', 'mf','actions'];
   public societes: MatTableDataSource<Societe> = new MatTableDataSource<Societe>();
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   constructor(private _dialog: MatDialog, private sociétéService: SocieteService,  private toastService: NgToastService) {}
 
   ngOnInit(): void {
     this.getAllSociétés();
   }
 
   openAddEditSocForm() {
     const DialogRef = this._dialog.open(SocAddEditComponent);
     DialogRef.afterClosed().subscribe({
       next: (val) => {
         if (val) {
           this.getAllSociétés();
         }
       }
     });
   }
 
   getAllSociétés() {
     this.sociétéService.getAllSocietes().subscribe({
       next: (response: Societe[]) => {
         this.societes = new MatTableDataSource<Societe>(response); // Utilisation de l'instanciation correcte de MatTableDataSource
         this.societes.sort = this.sort;
         this.societes.paginator = this.paginator;
       
         console.log(this.societes);
       },
       error: (error: any) => {
         alert(error.message);
       }
     });
   }
       
   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.societes.filter = filterValue.trim().toLowerCase();
 
     if (this.societes.paginator) {
       this.societes.paginator.firstPage();
     }
   }
 
   OndeleteSociete(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette société ?")) {
      this.sociétéService.deleteSociete(id).subscribe({
        next: () => {
          this.toastService.success({ detail: "Société supprimée avec succès", summary: "Succès", duration: 3000 });
          this.getAllSociétés();
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error({ detail: error.message, summary: "Erreur", duration: 3000 });
        }
      });
    }
  }
   openEditForm(societe: Societe): void {
     const dialogRef = this._dialog.open(SocAddEditComponent, {
       data: societe // Passer la société à l'écran d'édition
       
     });
   
     this.sociétéService.updateSociete(societe, societe.id, societe.raisonSocial.toString(),societe.adresse.toString(),societe.email.toString(),societe.mf.toString(),societe.mf.toString())
         this.getAllSociétés();
       
         dialogRef.afterClosed().subscribe({
           next: (val) => {
             if (val) {
               this.getAllSociétés();
             }
           },
         });
       }
       //specialite
       
 
 
 
 
 
 
 
     }


