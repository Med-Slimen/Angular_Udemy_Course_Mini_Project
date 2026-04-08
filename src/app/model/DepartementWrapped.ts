import { Departement } from './Departemet.model';
export class DepartementWrapper{
_embedded!: { departements: Departement[]};
}