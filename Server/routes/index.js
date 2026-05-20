const express = require('express');
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');

const router = express.Router();

// Auth routes
router.post('/auth/login', (req, res) => loginController.login(req, res));
router.post('/auth/register', (req, res) => loginController.register(req, res));
router.get('/auth/current-user', (req, res) => loginController.getCurrentUser(req, res));

// User routes (опционально)
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUserById(req, res));
router.post('/users', (req, res) => userController.createUser(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;