import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<any> {
  constructor(http: HttpClient, storageService: StorageService) {
    super(http, storageService);
  }

  // Método para obter todas as tarefas
  getAllTasks() {
    return this.getAll('task'); // Usa o endpoint 'task' para buscar todas as tarefas
  }
}