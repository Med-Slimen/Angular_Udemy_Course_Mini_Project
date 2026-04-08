import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/project.model';
import { ProjetService } from '../service/projectService';
import { DatePipe } from '@angular/common';
import { Departement } from '../model/Departemet.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-recherche-par-departement',
  imports: [DatePipe,FormsModule,RouterLink],
  templateUrl: './recherche-par-departement.html',
  styles: ``
})
export class RechercheParDepartement implements OnInit {
  projets!:Projet[];
  departements?:Departement[];
  IdDepart!:number;
  constructor(private projetService : ProjetService,public auth:Auth){
  }
  ngOnInit(): void {
    this.projets=[];
    this.projetService.listerDepartement().
    subscribe(cats => {this.departements = cats._embedded.departements;
    console.log(cats);
    });
  }
  onChange():void{
    console.log(this.IdDepart);
    // this.projets=this.projetService.rechercheParDepartement(this.IdDepart);
    this.projetService.rechercherParDepartement(this.IdDepart).subscribe(projs=>
      this.projets=projs
    )
  }
  supprimerProjet(projet : Projet):void{
    // this.projetService.supprimerProjet(projet);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.projetService.supprimerProjet(projet.idProjet!).subscribe(() => {
    console.log("projet supprimé");
    });
    //
    this.projetService.rechercherParDepartement(this.IdDepart).subscribe(projs=>
      this.projets=projs
    )
  }
}
