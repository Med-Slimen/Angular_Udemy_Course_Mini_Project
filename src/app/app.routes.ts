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
import { UserProfile } from './user-profile/user-profile';
import { canActivateAuthRole } from './guard/auth-role-guard';

export const routes: Routes = [
    {path : "projets" , component:ProjetsComponent},
    {path : "AddProjet" , component:AddProjet,canActivate: [canActivateAuthRole],data: { role: 'ADMIN' }},
    {path : "UpdateProjet/:id" , component:UpdateProjet,canActivate: [canActivateAuthRole],data: { role: 'ADMIN' }},
    {path:"rechercheParDepartement",component:RechercheParDepartement},
    {path: "rechercheParNom", component : RechercheParNom},
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: "listeDepartements", component : ListesDepartements,canActivate: [canActivateAuthRole],data: { role: 'ADMIN' }},
    {path:'register',component:Register},
    {path:'verifEmail',component:VerifEmailComponent},
    { path: 'profile', component: UserProfile },
    {path: "", redirectTo: "projets", pathMatch: "full"}
];
