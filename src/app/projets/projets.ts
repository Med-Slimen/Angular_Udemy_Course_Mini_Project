import { Component, OnInit } from '@angular/core';
import { Projet } from '../model/project.model';
import { DatePipe } from '@angular/common';
import { ProjetService } from '../service/projectService';
import { RouterLink } from '@angular/router';
import { Auth } from '../service/auth';

@Component({
  selector: 'app-projet',
  imports: [DatePipe,RouterLink],
  templateUrl: './projets.html',
})
export class ProjetsComponent implements OnInit {
   projets!: Projet[];
  constructor(private ProjetService : ProjetService,public auth:Auth){
  }
  /*
  supprimerProjet(projet : Projet):void{
    this.ProjetService.supprimerProjet(projet);
  }*/
  ngOnInit(): void {
    this.chargerProjets();
  }
  chargerProjets():void{
    this.ProjetService.getProjets().subscribe(projs => {
    console.log(projs);
    this.projets = projs;
    })
  }
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
