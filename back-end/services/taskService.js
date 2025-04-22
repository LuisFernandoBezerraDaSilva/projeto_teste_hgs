const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const taskSchema = require('../schemas/taskSchema'); // Atualize o nome do schema, se necessário
const prisma = new PrismaClient();

class TaskService extends BaseService {
  constructor() {
    super(prisma.task, taskSchema);
  }

  async getAllTasksByUserId(userId) {
    try {
      const tasks = await this.model.findMany({
        where: { userId: Number(userId) },
      });
      return tasks;
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao buscar tarefas do usuário');
    }
  }
}

module.exports = TaskService;