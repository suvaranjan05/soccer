const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/middleware");

// Routes
router.get('/get-header-data', authMiddleware, userController.getUserHeader);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile-update', authMiddleware, userController.profileUpdate);
router.post('/add-currency', authMiddleware, userController.addCurrency);
router.post('/get-balance', authMiddleware, userController.getBalance);

module.exports = router;
