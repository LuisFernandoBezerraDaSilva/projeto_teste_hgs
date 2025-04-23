import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';

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
export class TaskFormPageComponent extends BasePageComponent implements OnInit {
  title: string = '';
  description: string = '';
  taskId: string | null = null;

  constructor(
    private taskService: TaskService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    // Obtém os parâmetros da URL via queryParams
    this.route.queryParams.subscribe(params => {
      this.taskId = params['taskId'] || null;
      this.title = params['title'] || '';
      this.description = params['description'] || '';
    });
  }

  saveTask(): void {
    const userId = this.storageService.getUserId();
    if (!userId) {
      this.snackBar.open('Erro: Usuário não autenticado!', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.taskId) {
      // Atualiza a tarefa existente (PUT)
      this.taskService.updateTask(this.taskId, {
        title: this.title,
        description: this.description,
        userId: userId
      }).subscribe({
        next: (response: any) => {
          console.log('Tarefa atualizada com sucesso', response);
          this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/tasks']);
        },
        error: (err: any) => {
          console.error('Erro ao atualizar tarefa', err);
          this.snackBar.open('Erro ao atualizar tarefa!', 'Fechar', { duration: 3000 });
        }
      });
    } else {
      // Cria uma nova tarefa (POST)
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
}