const Match = require('../models/Match');
const Team = require('../models/Team');
const Player = require('../models/Player');

const createMatch = async (req, res) => {
    try {
        const userId = req.user._id;

        const { referee, date, location, type, field, fees, description, photos, playerNeed } = req.body;

        // Validate required fields
        if (!referee || !date || !location || !type || !field || !playerNeed || !description || !fees || !photos) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Create a new match document
        const newMatch = new Match({
            referee,
            date,
            location,
            type,
            field,
            fees,
            description,
            photos,
            playerNeed,
            createdBy: userId,
        });

        // Save the new match document to the database
        await newMatch.save();

        // Send success response
        res.status(201).json({ msg: 'Match created successfully', matchId: newMatch._id });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getMatchDetails = async (req, res) => {
    try {

        const matchId = req.params.matchId;

        const match = await Match.findById(matchId)
            .select('date location type fees status pendingTeams maxTeams confirmedTeams pendingPlayers confirmedPlayers description photos referee field playerNeed createdBy')
            .populate({
                path: 'pendingTeams',
                select: 'name avatar _id'
            })
            .populate({
                path: 'confirmedTeams.team',
                select: 'name avatar _id'
            })
            .populate({
                path: 'pendingPlayers',
                select: 'user avatar _id',
                populate: {
                    path: 'user',
                    select: 'userName _id'
                }
            })
            .populate({
                path: 'confirmedPlayers.player',
                select: 'user avatar _id fullName',
                populate: {
                    path: 'user',
                    select: 'userName _id'
                }
            })
            .populate({
                path: 'referee',
                select: 'user avatar _id fee',
                populate: {
                    path: 'user',
                    select: 'userName _id'
                }
            })
            .populate({
                path: 'field',
                select: 'name photo fee _id'
            });

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        res.status(200).json(match);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getAllMatches = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not specified

        const startIndex = (page - 1) * limit;

        // Get the total count of all matches
        const totalCount = await Match.countDocuments();

        // Find all matches with pagination
        const matches = await Match.find()
            .select('_id photos description date type status createdBy')
            .skip(startIndex)
            .limit(limit)
            .lean();

        // Extract the first photo from the photos array
        matches.forEach(match => {
            match.photo = match.photos.length > 0 ? match.photos[0] : null;
            delete match.photos;
        });

        // Prepare the response object
        const results = {
            totalCount,
            matches,
        };

        // Check if there is a next page
        if (startIndex + limit < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(results);
    } catch (error) {
        console.log('Error fetching all matches:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const addTeamToMatch = async (req, res) => {
    try {
        const userId = req.user._id;  // The ID of the logged-in user
        const { matchId, teamId } = req.body;

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to add teams to this match' });
        }

        // Check if the number of confirmed teams is less than the maximum allowed teams
        if (match.confirmedTeams.length >= match.maxTeams) {
            return res.status(400).json({ msg: 'Maximum number of teams reached' });
        }

        // Check if the team is already confirmed for the match
        const teamExists = match.confirmedTeams.some((confirmedTeam) => String(confirmedTeam.team) === String(teamId));

        if (teamExists) {
            return res.status(400).json({ msg: 'Team is already confirmed for this match' });
        }

        // Check if the team is in the pending teams array and remove it if it is
        match.pendingTeams = match.pendingTeams.filter(pendingTeam => String(pendingTeam) !== String(teamId));

        // Fetch the team by ID
        const team = await Team.findById(teamId).select('name avatar _id');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Add the team to the confirmedTeams array
        match.confirmedTeams.push({ team: team._id });

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Team added to match successfully', addedTeam: team });
    } catch (error) {
        console.error('Error adding team to match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const updateConfirmTeam = async (req, res) => {
    try {
        const { teamId, number, jersey, color } = req.body;
        const matchId = req.params.matchId;
        console.log(teamId);

        // Find the match
        const match = await Match.findById(matchId);
        if (!match) {
            return res.status(404).json({ msg: "Match not found" });
        }

        // Check if the logged-in user is the creator of the match
        if (match.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ msg: "You are not authorized to update this match" });
        }

        // Find the team in the confirmed teams array
        const teamIndex = match.confirmedTeams.findIndex(teamObj => teamObj.team.toString() === teamId);
        if (teamIndex === -1) {
            return res.status(404).json({ msg: "Team not found in confirmed teams" });
        }

        // Update the team details (color, jersey, number)
        match.confirmedTeams[teamIndex].color = color;
        match.confirmedTeams[teamIndex].jersey = jersey;
        match.confirmedTeams[teamIndex].number = number;

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: "Team details updated successfully", match });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const addPlayerToMatch = async (req, res) => {
    try {
        const userId = req.user._id;  // The ID of the logged-in user
        const { matchId, playerId } = req.body;

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to add players to this match' });
        }

        // Check if the number of confirmed players is less than the required number of players
        if (match.confirmedPlayers.length >= match.playerNeed) {
            return res.status(400).json({ msg: 'Player requirement already fulfilled' });
        }

        // Check if the player is already confirmed for the match
        const playerExists = match.confirmedPlayers.some((confirmedPlayer) => String(confirmedPlayer.player) === String(playerId));

        if (playerExists) {
            return res.status(400).json({ msg: 'Player is already confirmed for this match' });
        }

        // Check if the player is in the pending players array and remove them if they are
        match.pendingPlayers = match.pendingPlayers.filter(pendingPlayer => String(pendingPlayer) !== String(playerId));

        // Fetch the player by ID
        const player = await Player.findById(playerId).select('fullName user avatar _id').populate("user", "userName _id");

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Add the player to the confirmedPlayers array
        match.confirmedPlayers.push({ player: player._id });

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Player added to match successfully', addedPlayer: player });
    } catch (error) {
        console.error('Error adding player to match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const removeTeamFromMatch = async (req, res) => {
    try {
        const userId = req.user._id;  // The ID of the logged-in user
        const { matchId, teamId } = req.body;

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to remove teams from this match' });
        }

        // Check if the team is confirmed for the match
        const teamIndex = match.confirmedTeams.findIndex((confirmedTeam) => String(confirmedTeam.team) === String(teamId));

        if (teamIndex === -1) {
            return res.status(404).json({ msg: 'Team not found in confirmed teams' });
        }

        // Remove the team from the confirmedTeams array
        match.confirmedTeams.splice(teamIndex, 1);

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Team removed from match successfully' });
    } catch (error) {
        console.error('Error removing team from match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const removePlayerFromMatch = async (req, res) => {
    try {
        const userId = req.user._id;  // The ID of the logged-in user
        const { matchId, playerId } = req.body;

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to remove players from this match' });
        }

        // Check if the player is confirmed for the match
        const playerIndex = match.confirmedPlayers.findIndex((confirmedPlayer) => String(confirmedPlayer.player) === String(playerId));

        if (playerIndex === -1) {
            return res.status(404).json({ msg: 'Player not found in confirmed players' });
        }

        // Remove the player from the confirmedPlayers array
        match.confirmedPlayers.splice(playerIndex, 1);

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Player removed from match successfully' });
    } catch (error) {
        console.error('Error removing player from match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const teamJoinReqToMatch = async (req, res) => {
    try {
        const { teamId, matchId } = req.body;

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Fetch the team by ID
        const team = await Team.findById(teamId).select('name avatar _id');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the team is already in pending teams
        const teamInPending = match.pendingTeams.some(pendingTeam => String(pendingTeam) === String(teamId));

        // Check if the team is already in confirmed teams
        const teamInConfirmed = match.confirmedTeams.some(confirmedTeam => String(confirmedTeam.team) === String(teamId));

        if (teamInPending || teamInConfirmed) {
            return res.status(400).json({ msg: 'Team has already requested to join or is confirmed for this match' });
        }

        // Add the team to the pendingTeams array
        match.pendingTeams.push(team._id);

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Team join request added successfully', pendingTeam: team });
    } catch (error) {
        console.error('Error adding team join request to match:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const playerJoinReqToMatch = async (req, res) => {
    try {
        const { playerId, matchId } = req.body;
        console.log(playerId, matchId);

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Fetch the player by ID
        const player = await Player.findById(playerId).select('user avatar _id');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already in pending players
        const playerInPending = match.pendingPlayers.some(pendingPlayer => String(pendingPlayer) === String(playerId));

        // Check if the player is already in confirmed players
        const playerInConfirmed = match.confirmedPlayers.some(confirmedPlayer => String(confirmedPlayer.player) === String(playerId));

        if (playerInPending || playerInConfirmed) {
            return res.status(400).json({ msg: 'Player has already requested to join or is confirmed for this match' });
        }

        // Add the player to the pendingPlayers array
        match.pendingPlayers.push(player._id);

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Player join request added successfully', pendingPlayer: player });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const rejectTeamJoinReq = async (req, res) => {
    try {
        const { matchId, teamId } = req.body;
        const userId = req.user._id; // The ID of the logged-in user

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to reject team requests for this match' });
        }

        // Check if the team is in the pending teams array
        const teamInPending = match.pendingTeams.some(pendingTeam => String(pendingTeam) === String(teamId));

        if (!teamInPending) {
            return res.status(400).json({ msg: 'Team is not in pending requests for this match' });
        }

        // Remove the team from the pendingTeams array
        match.pendingTeams = match.pendingTeams.filter(pendingTeam => String(pendingTeam) !== String(teamId));

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Team join request rejected successfully' });
    } catch (error) {
        console.error('Error rejecting team join request:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};


const rejectPlayerJoinReq = async (req, res) => {
    try {
        const { matchId, playerId } = req.body;
        const userId = req.user._id; // The ID of the logged-in user

        // Fetch the match by ID
        const match = await Match.findById(matchId);

        if (!match) {
            return res.status(404).json({ msg: 'Match not found' });
        }

        // Check if the logged-in user is the creator of the match
        if (String(match.createdBy) !== String(userId)) {
            return res.status(403).json({ msg: 'You are not authorized to reject player requests for this match' });
        }

        // Check if the player is in the pending players array
        const playerInPending = match.pendingPlayers.some(pendingPlayer => String(pendingPlayer) === String(playerId));

        if (!playerInPending) {
            return res.status(400).json({ msg: 'Player is not in pending requests for this match' });
        }

        // Remove the player from the pendingPlayers array
        match.pendingPlayers = match.pendingPlayers.filter(pendingPlayer => String(pendingPlayer) !== String(playerId));

        // Save the updated match
        await match.save();

        res.status(200).json({ msg: 'Player join request rejected successfully' });
    } catch (error) {
        console.error('Error rejecting player join request:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    createMatch,
    getMatchDetails,
    getAllMatches,
    addTeamToMatch,
    updateConfirmTeam,
    addPlayerToMatch,
    removeTeamFromMatch,
    removePlayerFromMatch,
    teamJoinReqToMatch,
    playerJoinReqToMatch,
    rejectTeamJoinReq,
    rejectPlayerJoinReq
};
