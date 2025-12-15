const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');

const router = express.Router();

// Rota para registrar um novo cliente
router.route('/register').post(registerUser);

// Rota para fazer o login
router.post('/login', authUser);

module.exports = router;