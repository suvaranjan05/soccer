const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require(".././middleware/middleware")


router.post('/create-team', authMiddleware, teamController.createTeam);
router.post('/add-player', authMiddleware, teamController.addPlayerToTeam);
router.put('/update-team', authMiddleware, teamController.updateTeamInfo);
router.post('/send-invitation', authMiddleware, teamController.sendTeamInvitation);
router.get('/all-teams', authMiddleware, teamController.getAllTeams);
router.post('/search-teams', authMiddleware, teamController.getTeamsBySearch);
router.post('/check-team-manager', authMiddleware, teamController.checkTeamBelongsToManager);
router.post('/join-requests-accept', authMiddleware, teamController.TeamJoinRequestAccept);
router.post('/join-requests-reject', authMiddleware, teamController.TeamJoinRequestReject);
router.get('/player-join-requests', authMiddleware, teamController.getTeamJoinRequests);
router.post('/check-team-contract', authMiddleware, teamController.checkPlayerContract);

router.get('/get-team/:teamId', authMiddleware, teamController.getTeam);

module.exports = router;