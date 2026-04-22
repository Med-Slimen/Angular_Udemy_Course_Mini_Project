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
  constructor(private formBuilder: FormBuilder, private router: Router) {}
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
this.authService.registerUser(this.user).subscribe({
next:(res)=>{
this. authService.setRegistredUser(this.user);
alert("veillez confirmer votre email");
this.router.navigate(["/verifEmail"]);
},
error:(err:any)=>{
if(err.status===400){
this.err= err.error.message;
}
}
}
)
}
}
