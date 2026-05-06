import { Departement } from "./Departemet.model";
import { Image } from "./image.model";

export class Projet{
    idProjet? : number;
    nomProjet?: String;
    nomClient?:String;
    dateDeb?:Date;
    departement!:Departement;
    emailClient!:String;
    imageStr!:string;
    images!: Image[];

}