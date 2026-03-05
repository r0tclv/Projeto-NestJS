import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. Importe o FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule] // 2. Adicione aqui! Isso resolve o erro do ngModel
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.http.post('http://localhost:3000/login', {
      email: this.email,
      password: this.password
    })
    .subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}