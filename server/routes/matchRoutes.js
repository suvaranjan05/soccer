const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middleware/middleware');

router.get('/all-matches', authMiddleware, matchController.getAllMatches);
router.post('/create-match', authMiddleware, matchController.createMatch);
router.post('/add-team-to-match', authMiddleware, matchController.addTeamToMatch);
router.post('/add-player-to-match', authMiddleware, matchController.addPlayerToMatch);
router.post('/remove-team-from-match', authMiddleware, matchController.removeTeamFromMatch);
router.post('/remove-player-from-match', authMiddleware, matchController.removePlayerFromMatch);
router.put('/update-confirm-team/:matchId', authMiddleware, matchController.updateConfirmTeam);
router.post('/team-join-req-send', authMiddleware, matchController.teamJoinReqToMatch);
router.post('/team-join-req-reject', authMiddleware, matchController.rejectTeamJoinReq);
router.post('/player-join-req-reject', authMiddleware, matchController.rejectPlayerJoinReq);
router.post('/player-join-req-send', authMiddleware, matchController.playerJoinReqToMatch);
router.get('/:matchId', authMiddleware, matchController.getMatchDetails);

module.exports = router;
