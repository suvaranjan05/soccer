const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/middleware');


router.get('/', authMiddleware, notificationController.getUserNotifications);
router.put('/:id/mark-seen', authMiddleware, notificationController.markNotificationAsSeen);
router.delete('/', authMiddleware, notificationController.deleteAllUserNotifications);
router.get('/unread-count', authMiddleware, notificationController.countUserUnreadNotifications);
router.delete('/:id', authMiddleware, notificationController.deleteOneNotification);



module.exports = router;
