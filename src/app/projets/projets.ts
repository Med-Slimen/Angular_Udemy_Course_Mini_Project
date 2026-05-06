import { Component, inject, OnInit } from '@angular/core';
import { Projet } from '../model/project.model';
import { DatePipe } from '@angular/common';
import { ProjetService } from '../service/projectService';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';
import { Image } from '../model/image.model';
import { KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
@Component({
  selector: 'app-projet',
  imports: [DatePipe,RouterLink],
  templateUrl: './projets.html',
})
export class ProjetsComponent implements OnInit {
   projets!: Projet[];
   apiurl:string='http://localhost:8080/projets/api';
   isAdmin:boolean=false;
   private keycloak = inject(Keycloak);
  constructor(private ProjetService : ProjetService,public auth:Auth){
  }
  /*
  supprimerProjet(projet : Projet):void{
    this.ProjetService.supprimerProjet(projet);
  }*/
  ngOnInit(): void {
    this.isAdmin=this.keycloak.hasRealmRole('ADMIN');
    this.chargerProjets();
  }
  
  chargerProjets(){
this.ProjetService.getProjets().subscribe(projs => {
this.projets = projs;
this.projets.forEach((projet) => {
if (projet.images && projet.images.length > 0) { // ✅ check first
    projet.imageStr = 'data:' + projet.images[0].type + ';base64,' + projet.images[0].image;
}
});
});
}
/*
chargerProjets(){
this.ProjetService.getProjets().subscribe(projs => {
this.projets = projs;
});
}*/
  supprimerProjet(p: Projet)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.ProjetService.supprimerProjet(p.idProjet!).subscribe(() => {
    console.log("projet supprimé");
    this.chargerProjets();
    });
  }
}
