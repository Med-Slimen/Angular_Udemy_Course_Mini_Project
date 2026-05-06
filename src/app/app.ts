import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './service/auth';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  ReadyArgs,
  typeEventArgs,
} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  public profile?: KeycloakProfile;
  authenticated = false;
  keycloakStatus: string | undefined;
  isAdmin:boolean=false;
  private readonly keycloak = inject(Keycloak);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);
  protected readonly title = signal('Projet');
  constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();
      this.keycloakStatus = keycloakEvent.type;
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }
  
  ngOnInit() {
     this.isAdmin=this.keycloak.hasRealmRole('ADMIN');
    /*
    this.authService.loadToken();
    if (this.authService.getToken() == null || this.authService.isTokenExpired())
      this.router.navigate(['/login']);*/
  }
  login() {
this.keycloak.login();
}
logout() {
this.keycloak.logout();
}
}
