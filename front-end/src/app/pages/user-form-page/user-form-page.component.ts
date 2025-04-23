import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user-form-page',
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
      UserService,
      StorageService
  ],
  templateUrl: './user-form-page.component.html',
  styleUrls: ['./user-form-page.component.scss']
})
export class UserFormPageComponent extends BasePageComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  createUser(): void {
    console.log('Criar conta chamada');
    this.userService.createUser({ username: this.username, password: this.password }).subscribe({
      next: (response: any) => {
        console.log('Conta criada com sucesso', response);
        this.snackBar.open('Conta criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Erro ao criar conta', err);
        this.snackBar.open('Erro ao criar conta!', 'Fechar', { duration: 3000 });
      }
    });
  }
}