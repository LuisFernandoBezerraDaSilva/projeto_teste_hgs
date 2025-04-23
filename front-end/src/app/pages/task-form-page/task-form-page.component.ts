import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-task-form-page',
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
  providers: [TaskService],
  templateUrl: './task-form-page.component.html',
  styleUrls: ['./task-form-page.component.scss']
})
export class TaskFormPageComponent extends BasePageComponent {
  title: string = '';
  description: string = '';

  constructor(
    private taskService: TaskService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  saveTask(): void {
    const userId = this.storageService.getUserId();
    if (!userId) {
      this.snackBar.open('Erro: Usuário não autenticado!', 'Fechar', { duration: 3000 });
      return;
    }
  
    console.log('Salvar tarefa chamada');
    this.taskService.createTask({ 
      title: this.title, 
      description: this.description, 
      userId: userId 
    }).subscribe({
      next: (response: any) => {
        console.log('Tarefa criada com sucesso', response);
        this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/tasks']); 
      },
      error: (err: any) => {
        console.error('Erro ao criar tarefa', err);
        this.snackBar.open('Erro ao criar tarefa!', 'Fechar', { duration: 3000 });
      }
    });
  }
}