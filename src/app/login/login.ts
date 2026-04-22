import { Component, OnInit } from '@angular/core';
import { User } from '../model/User.model';
import { FormsModule } from '@angular/forms';
import { Auth } from '../service/auth';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styles: ``,
})
export class Login implements OnInit {
  user = new User();
  err : number=0;
  message : string = "login ou mot de passe erronés..";
  constructor(private authService: Auth, private router: Router) {}
  ngOnInit(): void {}
  /*
  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    if (isValidUser) this.router.navigate(['/']);
    else this.erreur=1;
  }*/
 onLoggedin(){
    this.authService.login(this.user).subscribe({
    next: (data) => {
    let jwToken = data.headers.get('Authorization')!;
    this.authService.saveToken(jwToken);
    this.router.navigate(['/']);
    },
    error: (err: any) => {
    this.err = 1;
    if (err.error.errorCause=='disabled') this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur";
    }
    });
  }

}
