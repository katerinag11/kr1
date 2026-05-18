const express = require('express');
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/auth/login', loginController.login);
router.post('/auth/register', loginController.register);
router.get('/auth/me', authenticateToken, loginController.getCurrentUser);

module.exports = router;