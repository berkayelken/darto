import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authCookiePath = "DARTO_AUTH_CREDENTIALS"
  authorizationHeader = "Authorization"
  email = ""
  password = ""


  constructor(
    private httpClient: HttpClient, private router: Router, @Inject(DOCUMENT) private document: Document) { }

  login() {
    let plainToken = this.email + ":" + this.password
    let authToken = "Basic " + btoa(plainToken)
    let headers = new HttpHeaders().set(this.authorizationHeader, authToken)
    this.httpClient.post("/api/auth/login", {}, {headers: headers}).subscribe(res => {
      this.setCookie(res)
      this.router.navigate(['/art-gallery'])
  })
    
  }
  
  private setCookie(authResponse: any) {
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
