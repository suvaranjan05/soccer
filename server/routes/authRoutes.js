const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/register', authController.register);
router.post('/check-user', authController.checkUser);
router.post('/login', authController.login);
router.post('/', userController.getUserHeader);

module.exports = router;