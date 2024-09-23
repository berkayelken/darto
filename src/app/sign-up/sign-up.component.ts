import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  authorizationHeader = "Authorization"
  userTypeHeader = "user-type"
  type = "COLLECTOR"
  email = ""
  password = ""
  rePassword = ""

  constructor(
    private httpClient: HttpClient, private router: Router, private app: AppComponent) { }


  signUp() {
    if (this.password !== this.rePassword || !this.password || this.password.length > 6) {
      alert("Passwords are not matched!")
      return
    }
    let plainToken = this.email + ":" + this.password
    let authToken = "Basic " + btoa(plainToken)
    let headers = new HttpHeaders().set(this.authorizationHeader, authToken).set(this.userTypeHeader, this.type)
    this.httpClient.post("/api/auth/register", {}, { headers: headers }).subscribe(res => {
      this.app.setCookie(res)
      this.router.navigate(['/art-gallery'])
    })
  }
}
