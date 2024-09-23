import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'darto-project';

    authCookiePath = "DARTO_AUTH_CREDENTIALS"

    constructor(@Inject(DOCUMENT) private document: Document) { }

  setCookie(authResponse: any) {
    let d: Date = new Date();
    d.setTime(d.getTime() + authResponse.expiresAt);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = `; path=${this.authCookiePath}`;
    this.document.cookie = `token=${authResponse.token}; ${expires}${cpath}`;
    this.document.cookie = `email=${authResponse.email}; ${expires}${cpath}`;
    this.document.defaultView?.localStorage.setItem("token", authResponse.token)
    let time = d.getTime()
    this.document.defaultView?.localStorage.setItem("expiresAt", time ? time.toString() : '0')
  }
}
