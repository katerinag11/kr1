const express = require('express');
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');
const bookingsController = require('../controllers/BookingsController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/auth/login', (req, res) => loginController.login(req, res));
router.post('/auth/register', (req, res) => loginController.register(req, res));
router.post('/bookings', (req, res) => bookingsController.createBooking(req, res)); // 👈 Заявки может оставить кто угодно


router.get('/auth/me', authenticateToken, (req, res) => loginController.getCurrentUser(req, res));


router.get('/admin/bookings', authenticateToken, isAdmin, (req, res) => bookingsController.getAllBookings(req, res));
router.put('/admin/bookings/:id', authenticateToken, isAdmin, (req, res) => bookingsController.updateBookingStatus(req, res));
router.delete('/admin/bookings/:id', authenticateToken, isAdmin, (req, res) => bookingsController.deleteBooking(req, res));

router.get('/admin/users', authenticateToken, isAdmin, (req, res) => userController.getAllUsers(req, res));
router.delete('/admin/users/:id', authenticateToken, isAdmin, (req, res) => userController.deleteUser(req, res));

module.exports = router;