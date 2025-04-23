const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const taskSchema = require('../schemas/taskSchema'); 
const prisma = new PrismaClient();

class TaskService extends BaseService {
  constructor() {
    super(prisma.task, taskSchema);
  }

  async getAll(token) {
    try {
      const user = await prisma.user.findFirst({
        where: { token },
      });

      if (!user) {
        throw new Error('Usuário não encontrado ou token inválido');
      }

      const tasks = await this.model.findMany({
        where: { userId: user.id },
      });

      return tasks;
    } catch (e) {
      console.log(e);
      throw new Error('Erro ao buscar tarefas do usuário');
    }
  }
}

module.exports = TaskService;