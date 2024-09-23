import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  authorizationHeader = "Authorization"
  email = ""
  password = ""


  constructor(
    private httpClient: HttpClient, private router: Router, private app: AppComponent) { }

  login() {
    let plainToken = this.email + ":" + this.password
    let authToken = "Basic " + btoa(plainToken)
    let headers = new HttpHeaders().set(this.authorizationHeader, authToken)
    this.httpClient.post("/api/auth/login", {}, { headers: headers }).subscribe(res => {
      this.app.setCookie(res)
      this.router.navigate(['/art-gallery'])
    })
  }

}
