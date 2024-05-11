import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Intervention} from "../intervention.model";
import {PieceRechange} from "../../PieceRechange/piece-rechange.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {InterventionService} from "../intervention.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-list-intervention-tech',
  templateUrl: './list-intervention-tech.component.html',
  styleUrl: './list-intervention-tech.component.css'
})
export class ListInterventionTechComponent implements OnInit{
  public dataSource!: MatTableDataSource<Intervention>;
  public interventions!: Intervention[];
  pieceRechanges: PieceRechange[] = [];

  displayedColumns: string[] = ['code', 'dateDeb', 'dateFin', 'duree', 'observation',
    'cloturer', 'montantHT', 'facturer', 'cause','technicien','client','pieceRechange',
    'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionService: InterventionService, private route: Router,  private toastService: NgToastService) { }

  ngOnInit() {
    this.getAllInterventionsTech(this.id);
    console.log(this.id);
  }
id = localStorage.getItem('userId')
  getAllInterventionsTech(id: any) {
    this.interventionService.getInterventionByIdUser(id)
      .subscribe({
        next: (res) => {
          console.log("test",res)
          localStorage.removeItem('client')
          localStorage.setItem('client',res.client)
          if (Array.isArray(res)) {
            this.interventions = res; // Assign array of interventions
          } else {
            this.interventions = [res]; // Wrap single intervention in an array
          }
          console.log("res",res);
          localStorage.setItem("a",res.client)
          this.dataSource = new MatTableDataSource<Intervention>(this.interventions); // Assign data to dataSource
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifier(id: number) {
    this.route.navigate(['update_intervention', id]);
  }
}
