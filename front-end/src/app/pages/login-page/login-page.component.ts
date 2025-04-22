import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { SharedModule } from '../../shared.module';
import { BasePageComponent } from '../base-page/base-page.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    SharedModule
  ],
  providers: [ 
    AuthService,
    StorageService
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent extends BasePageComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  login() {
    console.log('Login method called');
    const loginSubscription = this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.storageService.setToken(response.token);
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.error('Login failed', err);
        if (err.status === 401) {
          this.snackBar.open('Senha incorreta!', 'Fechar', { duration: 3000 });
        } else {
          this.snackBar.open('Erro ao fazer login!', 'Fechar', { duration: 3000 });
        }
      }
    });
  
    this.addSubscription(loginSubscription);
  }
}