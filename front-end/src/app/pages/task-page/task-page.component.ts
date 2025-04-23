import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../../shared.module';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    SharedModule
  ],
  providers: [TaskService],
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  tasks: any[] = []; // Array para armazenar as tarefas
  displayedColumns: string[] = ['id', 'title', 'description', 'actions']; // Define as colunas da tabela

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data; // Armazena as tarefas no array
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas:', err);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.snackBar.open('Tarefa deletada com sucesso!', 'Fechar', { duration: 3000 });
        this.fetchTasks(); // Atualiza a lista de tarefas após a exclusão
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
        this.snackBar.open('Erro ao deletar tarefa!', 'Fechar', { duration: 3000 });
      }
    });
  }
}