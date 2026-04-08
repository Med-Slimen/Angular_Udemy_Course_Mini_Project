import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../service/projectService';
import { Projet } from '../model/project.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-recherche-par-nom',
  imports: [DatePipe,FormsModule,CommonModule,RouterLink],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {
  nomProjet!: String;
  projets!: Projet[];
  allProjets!: Projet[];
  searchTerm!: string;
  IdDepart!:number;
  constructor(private projetService : ProjetService,public auth:Auth){
    }
ngOnInit(): void {
  this.projetService.getProjets().subscribe(proj => {
      console.log(proj);
      this.allProjets = proj;
    })
}
onKeyUp(filterText : string){
this.projets = this.allProjets.filter(item =>
item.nomProjet?.toLowerCase().includes(filterText));
}
supprimerProjet(projet : Projet):void{
    // this.projetService.supprimerProjet(projet);
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.projetService.supprimerProjet(projet.idProjet!).subscribe(() => {
    console.log("projet supprimé");
    });
    //
    this.projetService.rechercherParDepartement(projet.idProjet!).subscribe(projs=>
      this.projets=projs
    )
  }
}
