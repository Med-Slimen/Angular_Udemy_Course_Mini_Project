import { Component, OnInit } from '@angular/core';
import { Departement } from '../model/Departemet.model';
import { ProjetService } from '../service/projectService';
import { UpdateDepartments } from '../update-departments/update-departments';

@Component({
  selector: 'app-listes-departements',
  imports: [UpdateDepartments],
  templateUrl: './listes-departements.html',
  styles: ``
})
export class ListesDepartements implements OnInit {
  departements! : Departement[];
  updatedDep : Departement={idDepart:null,nomDepart:''};
  ajout:boolean=true;
  constructor(private projetService : ProjetService) { }
  ngOnInit(): void {
  console.log("ngOnInit du composant UpdateDepartments ",this.updatedDep);
  this.chargerDepartements();
}
chargerDepartements(){
  this.projetService.listerDepartement().
  subscribe(deps => {this.departements = deps._embedded.departements;
  console.log(deps);
  });
}
  updatedDepartement(dep : Departement){
    this.projetService.addDepartement(dep).
    subscribe( ()=> this.chargerDepartements());
  }
  updateDep(dep:Departement){
    this.updatedDep=dep;
    this.ajout=false;
  }
}
