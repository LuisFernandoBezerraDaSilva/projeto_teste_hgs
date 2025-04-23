const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController'); // Importa o UserController

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('Esta é uma rota protegida');
});

router.post('/login', (req, res) => authController.login(req, res));

router.get('/task', authenticateToken, (req, res) => taskController.getAll(req, res));

router.post('/task', authenticateToken, (req, res) => taskController.create(req, res)); 
router.get('/task', authenticateToken, (req, res) => taskController.getAll(req, res)); 
router.get('/task/:id', authenticateToken, (req, res) => taskController.getOne(req, res)); 
router.put('/task/:id', authenticateToken, (req, res) => taskController.update(req, res)); 
router.delete('/task/:id', authenticateToken, (req, res) => taskController.delete(req, res)); 

router.get('/users', authenticateToken, (req, res) => userController.getAll(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.get('/users/:id', authenticateToken, (req, res) => userController.getOne(req, res));
router.put('/users/:id', authenticateToken, (req, res) => userController.update(req, res));
router.delete('/users/:id', authenticateToken, (req, res) => userController.delete(req, res));
router.get('/users/username/:username', authenticateToken, (req, res) => userController.getUserByUsername(req, res));


module.exports = router;