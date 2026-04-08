import { Injectable } from '@angular/core';
import { Projet } from '../model/project.model';
import { Departement } from '../model/Departemet.model';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DepartementWrapper } from '../model/DepartementWrapped';
import { Auth } from './auth';
const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  /*
  projets : Projet[];
  depart:Departement[];*/
  projet!:Projet;
  projetsRecherche!:Projet[];
  apiURL : string ='http://localhost:8080/projets/api';
  apiURLDep:string = 'http://localhost:8080/projets/dep';
  constructor(private http : HttpClient,private authService : Auth) {
    /*
    this.depart=[{idDepart:1,nomDepart:"Informatique"},{idDepart:2,nomDepart:"Marketing"},{idDepart:3,nomDepart:"Finance"},{idDepart:4,nomDepart:"Design"}]
    this.projets=[
      {
        idProjet:1,nomProjet:"Creation app mobile",nomClient:"Ahmed",dateDeb:new Date("04/12/2025"),Depart:this.depart[0],emailClient:"Ahmed01@gmail.com"
      },
      {
        idProjet:2,nomProjet:"Création du maquettes UI/UX",nomClient:"Mohamed",dateDeb:new Date("12/25/2025"),Depart:this.depart[3],emailClient:"Mohamed@gmail.com"
      },
      {
        idProjet:3,nomProjet:"Gestion du budget, comptabilité, facturation",nomClient:"Tijani",dateDeb:new Date("01/10/2025"),Depart:this.depart[2],emailClient:"Tijani@gmail.com"
      }
  ];*/
  }
  getProjets():Observable<Projet[]>{
    
    return this.http.get<Projet[]>(this.apiURL+"/all");
  }
  /*
  addProjet(projet : Projet):void{
    this.projets.push(projet);
  }
  supprimerProjet(projet : Projet):void{
    const index =this.projets.indexOf(projet);
    if (index >-1) {
      let conf=confirm("vous etes sur ?")
      if (conf) {
        this.projets.splice(index,1);
      }
    }
  }
  findProjet(id : number):Projet{
    this.projet=this.projets.find(p=>p.idProjet==id)!;
    return this.projet;
  }
  updateProjet(nwProjet : Projet) : void{
    const index=this.projets.findIndex(p=>p.idProjet==nwProjet.idProjet);
    if (index>-1) {
      this.projets.splice(index,1,nwProjet);
    }
  }
  listerDepartement():Departement[]{
    return this.depart;
  }
  consulterDepart(id: number):Departement{
    return this.depart.find(dep => dep.idDepart==id)!;
  }
  rechercheParDepartement(idDepart : number):Projet[]{
    this.projetsRecherche=[];
    this.projets.forEach(curr=>{
      if (curr.Depart.idDepart==idDepart) {
        this.projetsRecherche.push(curr);
      }
    })
    return this.projetsRecherche;
  }*/
 addProjet( proj: Projet):Observable<Projet>{
  
  return this.http.post<Projet>(this.apiURL+"/addproj", proj);
}
supprimerProjet(id : number) {
  const url = `${this.apiURL}/delproj/${id}`;
  
  return this.http.delete(url);
}
findProjet(id: number): Observable<Projet> {
  const url = `${this.apiURL}/getbyid/${id}`;
  
  return this.http.get<Projet>(url);
}
updateProjet(prod :Projet) : Observable<Projet>
{
  
  return this.http.put<Projet>(this.apiURL+"/updateproj", prod);
}
/*
listerDepartement():Observable<Departement[]>{
return this.http.get<Departement[]>(environment.apiURL+"/dep");
}*/
listerDepartement():Observable<DepartementWrapper>{
  
  return this.http.get<DepartementWrapper>(this.apiURLDep);
}
rechercherParDepartement(idDep: number):Observable< Projet[]> {
  
  const url = `${this.apiURL}/projDeps/${idDep}`;
  return this.http.get<Projet[]>(url);
}
rechercherParNom(nom: String):Observable< Projet[]> {
const url = `${this.apiURL}/projByName/${nom}`;
return this.http.get<Projet[]>(url);
}

addDepartement( dep: Departement):Observable<Departement>{
return this.http.post<Departement>(this.apiURLDep, dep, httpOptions);
}

}
