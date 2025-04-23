const BaseController = require('./baseController');
const TaskService = require('../services/taskService');

class TaskController extends BaseController {
  constructor(service) {
    super(service);
  }

  async getAll(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const tasks = await this.service.getAll(token); // Passa o token para o serviço
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar tarefas do usuário' });
    }
  }
}

const taskService = new TaskService();
module.exports = new TaskController(taskService);