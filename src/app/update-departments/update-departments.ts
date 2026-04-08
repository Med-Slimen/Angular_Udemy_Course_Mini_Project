import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Departement } from '../model/Departemet.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-departments',
  imports: [FormsModule],
  templateUrl: './update-departments.html',
  styles: ``
})
export class UpdateDepartments {
  @Input()
  departement! : Departement;
  @Output()
  departementUpdated = new EventEmitter<Departement>();
  @Input()
  ajout!:boolean;
  saveDepartement(){
    this.departementUpdated.emit(this.departement);
  }
  
}
