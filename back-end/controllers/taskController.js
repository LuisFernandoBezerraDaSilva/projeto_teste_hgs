const BaseController = require('./baseController');
const TaskService = require('../services/taskService');

class TaskController extends BaseController {
  constructor(service) {
    super(service);
  }
}

const taskService = new TaskService();
module.exports = new TaskController(taskService);