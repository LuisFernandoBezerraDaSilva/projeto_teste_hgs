import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    SharedModule
  ],
  providers: [TaskService],
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {
  tasks: any[] = []; // Array para armazenar as tarefas

  constructor(private taskService: TaskService) {}

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
}