import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Projet } from '../model/project.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjetService } from '../service/projectService';
import { Departement } from '../model/Departemet.model';

@Component({
  selector: 'app-update-projet',
  imports: [FormsModule,DatePipe,ReactiveFormsModule],
  templateUrl: './update-projet.html',
})
export class UpdateProjet implements OnInit {
  currentProjet:Projet=new Projet();
  depart?:Departement[];
  updatedDepartId!:number;
  myForm!:FormGroup;
  projets!:Projet[];
  constructor(private ProjetService : ProjetService,private activatedRoute : ActivatedRoute,private router : Router,private formBuilder : FormBuilder){

  }
  ngOnInit(): void {
    /*
    this.projets=this.ProjetService.getProjets();
    this.depart=this.ProjetService.listerDepartement();
    const idc=this.activatedRoute.snapshot.params["id"];
    this.currentProjet=this.ProjetService.findProjet(idc);*/
    this.ProjetService.listerDepartement().
    subscribe(dep => {this.depart = dep._embedded.departements;
    console.log(dep);
    });
    this.ProjetService.findProjet(this.activatedRoute.snapshot.params['id']).
    subscribe( proj =>{ this.currentProjet = proj;
      this.updatedDepartId = this.currentProjet.departement.idDepart!;
console.log(this.currentProjet)
     } ) ;
    
    this.myForm=this.formBuilder.group({
      idProjet : ['',[Validators.required]],
      nomProjet : ['',[Validators.required,Validators.minLength(3)]],
      nomClient : ['',[Validators.required]],
      emailClient:['',[Validators.required,Validators.email]],
      dateDeb : ['',[Validators.required]],
      idDepart : ['',[Validators.required]],
    })
  }
  updateProduit():void{
    this.currentProjet.departement = this.depart!.
    find(dep => dep.idDepart == this.updatedDepartId)!;
    this.ProjetService.updateProjet(this.currentProjet).subscribe(prod => {
    this.router.navigate(['projets']); }
    );

  }
}
