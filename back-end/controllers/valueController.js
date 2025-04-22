const BaseController = require('./baseController');
const ValueService = require('../services/valueService');

class TaskController extends BaseController {
  constructor(service) {
    super(service);
  }
}

const valueService = new ValueService();
module.exports = new TaskController(valueService);