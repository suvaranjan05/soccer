const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');
const authMiddleware = require("../middleware/middleware");

// Routes
router.post('/create-reminder', authMiddleware, reminderController.createReminder);
router.patch('/stop/:id', authMiddleware, reminderController.stopReminder);
router.patch('/resume/:id', authMiddleware, reminderController.resumeReminder);
router.delete('/delete/:id', authMiddleware, reminderController.deleteReminder);
router.get('/', authMiddleware, reminderController.getUserReminders);


module.exports = router;
