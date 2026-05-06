import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../model/User.model';
import { Auth } from '../service/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public user = new User();
  authService=inject(Auth);
  err:any;
  confirmPassword?: string;
  myForm!: FormGroup;
  loading:boolean=false;
  constructor(private formBuilder: FormBuilder, private router: Router,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onRegister()
{
this.loading=true;
this.authService.registerUser(this.user).subscribe({
next:(res)=>{
this. authService.setRegistredUser(this.user);
this.loading=false;
this.toastr.success('veillez confirmer votre email', 'Confirmation');
this.router.navigate(["/verifEmail"]);
},
error:(err:any)=>{
if(err.status===400){
  this.loading=false;
this.err= err.error.message;
}
}
}
)
}
}
