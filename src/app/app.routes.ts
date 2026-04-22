import { Routes } from '@angular/router';
import { ProjetsComponent } from './projets/projets';
import { AddProjet } from './add-projet/add-projet';
import { UpdateProjet } from './update-projet/update-projet';
import { RechercheParDepartement } from './recherche-par-departement/recherche-par-departement';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { produitGuard } from './guard/produit-guard';
import { ListesDepartements } from './listes-departements/listes-departements';
import { Register } from './register/register';
import { VerifEmailComponent } from './verif-email-component/verif-email-component';

export const routes: Routes = [
    {path : "projets" , component:ProjetsComponent},
    {path : "AddProjet" , component:AddProjet,canActivate:[produitGuard]},
    {path : "UpdateProjet/:id" , component:UpdateProjet,canActivate:[produitGuard]},
    {path:"rechercheParDepartement",component:RechercheParDepartement},
    {path: "rechercheParNom", component : RechercheParNom},
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: "listeDepartements", component : ListesDepartements,canActivate:[produitGuard]},
    {path:'register',component:Register},
    {path:'verifEmail',component:VerifEmailComponent},
    {path: "", redirectTo: "projets", pathMatch: "full"}
];
