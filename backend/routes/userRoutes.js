const express = require('express');
const { userLogin, userRegister } = require('../controller/userController');

const router = express.Router();

// Login Router
router.post('/login', userLogin);

// Register Router
router.post('/register', userRegister)

module.exports = router;