import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Projet } from '../model/project.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjetService } from '../service/projectService';
import { Departement } from '../model/Departemet.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-update-projet',
  imports: [FormsModule, DatePipe, ReactiveFormsModule],
  templateUrl: './update-projet.html',
})
export class UpdateProjet implements OnInit {
  currentProjet: Projet = new Projet();
  depart?: Departement[];
  updatedDepartId!: number;
  myForm!: FormGroup;
  projets!: Projet[];
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  constructor(
    private ProjetService: ProjetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit(): void {
    /*
    this.projets=this.ProjetService.getProjets();
    this.depart=this.ProjetService.listerDepartement();
    const idc=this.activatedRoute.snapshot.params["id"];
    this.currentProjet=this.ProjetService.findProjet(idc);*/
    /*
    this.ProjetService.listerDepartement().
    subscribe(dep => {this.depart = dep._embedded.departements;
    console.log(dep);
    });
    this.ProjetService.findProjet(this.activatedRoute.snapshot.params['id']).
    subscribe( proj =>{ this.currentProjet = proj;
      this.updatedDepartId = this.currentProjet.departement.idDepart!;
console.log(this.currentProjet)
     } ) ;*/
       /*
    this.ProjetService.listerDepartement().subscribe((cats) => {
      this.depart = cats._embedded.departements;
      console.log(cats);
    });
    this.ProjetService.findProjet(this.activatedRoute.snapshot.params['id']).subscribe((proj) => {
      this.currentProjet = proj;
      this.updatedDepartId = this.currentProjet.departement.idDepart!;
      this.ProjetService.loadImage(this.currentProjet.image.idImage).subscribe((img: Image) => {
        this.myImage = 'data:' + img.type + ';base64,' + img.image;
      });
    });*/

this.ProjetService.listerDepartement().
subscribe(cats => {this.depart = cats._embedded.departements;
});
this.ProjetService.findProjet(this.activatedRoute.snapshot.params['id'])
.subscribe( proj =>{ this.currentProjet = proj;
this.updatedDepartId = this.currentProjet.departement.idDepart!;
} ) ;



    this.myForm = this.formBuilder.group({
      idProjet: ['', [Validators.required]],
      nomProjet: ['', [Validators.required, Validators.minLength(3)]],
      nomClient: ['', [Validators.required]],
      emailClient: ['', [Validators.required, Validators.email]],
      dateDeb: ['', [Validators.required]],
      idDepart: ['', [Validators.required]],
    });
  }

  //updateProduit(): void {
    /*
    this.currentProjet.departement = this.depart!.find(
      (dep) => dep.idDepart == this.updatedDepartId,
    )!;
    this.ProjetService.updateProjet(this.currentProjet).subscribe((prod) => {
      this.router.navigate(['projets']);
    });*/
    /*
    this.currentProjet.departement = this.depart!.find(
      (dep) => dep.idDepart == this.updatedDepartId,
    )!;
    //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.ProjetService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe(
        (img: Image) => {
          this.currentProjet.image = img;
          this.ProjetService.updateProjet(this.currentProjet).subscribe((prod) => {
            this.router.navigate(['projets']);
          });
        },
      );
    } else {
      this.ProjetService.updateProjet(this.currentProjet).subscribe((prod) => {
        this.router.navigate(['projets']);
      });
    }
  }*/
 updateProduit() {
this.currentProjet.departement = this.depart!.find(dep => dep.idDepart ==
this.updatedDepartId)!;
this.ProjetService
.updateProjet(this.currentProjet)
.subscribe((prod) => {
this.router.navigate(['projets']);
});
}

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
onAddImageProduit() {
this.ProjetService
.uploadImageProd(this.uploadedImage,
this.uploadedImage.name,this.currentProjet.idProjet!)
.subscribe( (img : Image) => {
this.currentProjet.images.push(img);
});
}
supprimerImage(img: Image){
let conf = confirm("Etes-vous sûr ?");
if (conf)
this.ProjetService.supprimerImage(img.idImage).subscribe(() => {
//supprimer image du tableau currentProjet.images
const index = this.currentProjet.images.indexOf(img, 0);
if (index > -1) {
this.currentProjet.images.splice(index, 1);
}
});
}
}
