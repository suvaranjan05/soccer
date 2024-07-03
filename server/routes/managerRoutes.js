const express = require('express');
const router = express.Router();
const managerController = require("../controllers/ManagerController");
const authMiddleware = require(".././middleware/middleware")

router.get('/profile', authMiddleware, managerController.getManagerProfile);
router.put('/basic-info-update', authMiddleware, managerController.managerBasicInfoUpdate);
router.post('/add-player', authMiddleware, managerController.addPlayer);
router.get('/get-players', authMiddleware, managerController.getMyPlayers);
router.get('/get-teams', authMiddleware, managerController.getManagerTeams);
router.get('/get-teams-for-reminder', authMiddleware, managerController.getManagerTeamsForReminder);
router.get('/created-reminders', authMiddleware, managerController.getManagerReminders);
router.post('/user-reminder-mark-read', authMiddleware, managerController.markReminderAsFinishedForUser);
router.put('/update-player/:playerId', authMiddleware, managerController.managerPlayerUpdate);
router.post('/send-contract-offer/:playerId', authMiddleware, managerController.sendContractOfferToPlayer);

module.exports = router;