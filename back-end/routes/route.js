const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('Esta é uma rota protegida');
});

router.post('/login', (req, res) => authController.login(req, res));

router.get('/task', authenticateToken, (req, res) => taskController.getAll(req, res));

module.exports = router;