const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');
const authMiddleware = require(".././middleware/middleware")


router.get('/profile', authMiddleware, playerController.getPlayerProfile);
router.put('/basic-info-update', authMiddleware, playerController.playerBasicInfoUpdate);
router.put('/update-strength', authMiddleware, playerController.playerStrengthUpdate);
router.post('/check-player-team', authMiddleware, playerController.isPlayerInATeam);
router.post('/search-players', authMiddleware, playerController.findPlayersByKeyword);
router.get('/team-invitations', authMiddleware, playerController.fetchTeamInvitations);
router.post('/reject-invitation', authMiddleware, playerController.rejectTeamInvitation);
router.post('/accept-invitation', authMiddleware, playerController.acceptTeamInvitation);
router.get('/all-players', authMiddleware, playerController.getAllPlayers);
router.post('/search-all-players', authMiddleware, playerController.getPlayersBySearch);
router.post('/check-player-manager', authMiddleware, playerController.checkPlayerBelongsToManager);
router.post('/send-join-req-team', authMiddleware, playerController.SendJoinReqToTeam);
router.get('/contract-offers', authMiddleware, playerController.getPlayerContractOffers);
router.post('/accept-contract', authMiddleware, playerController.acceptContractOffer);
router.post('/reject-contract', authMiddleware, playerController.rejectContractOffer);
router.get('/get-player/:playerId', authMiddleware, playerController.getPlayerById);

module.exports = router;