const User = require("../models/User");
const Player = require("../models/Player");
const TeamManager = require("../models/TeamManager");
const Team = require("../models/Team");
const { createNotification } = require("../controllers/notificationController")

const getPlayerProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        // const userId = req.body.userId;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const player = await Player.findOne({ user: userId }).populate("user", "userName email role");

        const { _id, userName, role, email } = player.user;
        let responseData = { _id, userName, role, email };

        responseData.fullName = player.fullName;
        responseData.avatar = player.avatar;
        responseData.dateOfBirth = player.dateOfBirth;
        responseData.address = player.address;
        responseData.age = player.age;
        responseData.gender = player.gender;
        responseData.phone = player.phone;
        responseData.occupation = player.occupation;
        responseData.zGold = player.zGold;
        responseData.diamond = player.diamond;
        responseData.level = player.level;
        responseData.selfRating = player.selfRating;

        res.status(200).json(responseData);
    } catch (error) {
        console.error("getUserHeader Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const getPlayerById = async (req, res) => {
    const { playerId } = req.params;

    try {
        // Find the player by ID and select the required fields
        const player = await Player.findById(playerId).select(
            'fullName avatar dateOfBirth address age gender phone zGold diamond selfRating preferredWing value matches'
        );

        // If the player is not found, return a 404 response
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Send the player data as response
        res.status(200).json(player);
    } catch (error) {
        console.error('Error fetching player details:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};


const playerBasicInfoUpdate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, dateOfBirth, age, gender, phone, occupation, address } = req.body;

        if (!fullName || !dateOfBirth || !age || !gender || !phone || !occupation || !address) {
            return res.status(404).json({ msg: 'All fields are required' });
        }

        // Find the user by ID (unchanged)
        const player = await Player.findOne({ user: userId })

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Update username and avatar (unchanged)
        player.fullName = fullName;
        player.dateOfBirth = dateOfBirth;
        player.age = age;
        player.gender = gender;
        player.phone = phone;
        player.occupation = occupation;
        player.address = address;

        // Save the updated user (unchanged)
        await player.save();

        res.json({ msg: 'Player Profile updated successfully' });
    } catch (error) {
        console.log('Error updating profile:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const playerStrengthUpdate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { striker, winger, midfielder, wingDefender, centralBack } = req.body;

        if (!striker || !winger || !midfielder || !wingDefender || !centralBack) {
            return res.status(404).json({ msg: 'All fields are required' });
        }

        // Find the user by ID (unchanged)
        const player = await Player.findOne({ user: userId })

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Update username and avatar (unchanged)
        player.selfRating.striker = striker;
        player.selfRating.winger = winger;
        player.selfRating.midfielder = midfielder;
        player.selfRating.wingDefender = wingDefender;
        player.selfRating.centralBack = centralBack;


        // Save the updated user (unchanged)
        await player.save();

        res.json({ msg: 'Player Strength updated successfully' });
    } catch (error) {
        console.log('Error updating profile:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const isPlayerInATeam = async (req, res) => {
    try {
        const { playerId } = req.body;
        console.log(playerId);

        if (!playerId) {
            return res.status(400).json({ msg: "Player ID is required in the request body" });
        }

        // Check if the player exists
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ msg: "Player not found" });
        }

        // Check if the player is part of any team
        const team = await Team.findOne({ players: playerId });

        if (team) {
            return res.status(200).json({ msg: "Player is in a team", team: team.name, playerInATeam: true, teamId: team._id });
        } else {
            return res.status(200).json({ msg: "Player is not in any team", playerInATeam: false });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const findPlayersByKeyword = async (req, res) => {
    try {
        const { keyword } = req.body;

        if (!keyword) {
            return res.status(400).json({ msg: "Keyword is required in the request body" });
        }

        // Perform case-insensitive search for players matching the keyword in their userName
        const players = await Player.find()
            .populate({
                path: 'user',
                match: { userName: { $regex: keyword, $options: 'i' } },
                select: 'userName'
            })
            .select('userName avatar team')
            .lean();

        // Filter out players where who are not platform player
        const filteredPlayers = players.filter(player => player.user);

        // Add 'alreadyInATeam' field to each player based on the 'team' field
        const playersWithTeamInfo = filteredPlayers.map(player => ({
            ...player,
            alreadyInATeam: !!player.team // true if team field has a value, false otherwise
        }));

        res.status(200).json(playersWithTeamInfo);
    } catch (error) {
        console.error("Error finding players by keyword:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const fetchTeamInvitations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the player by the user ID
        const player = await Player.findOne({ user: userId })
            .select('teamInvitations')
            .populate({
                path: 'teamInvitations',
                select: 'name avatar'
            });

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        res.status(200).json(player.teamInvitations);
    } catch (error) {
        console.error('Error fetching team invitations:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
};

const rejectTeamInvitation = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id;

        // Find the player by user ID
        const player = await Player.findOne({ user: userId }).populate('user', 'userName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the invitation exists
        const invitationIndex = player.teamInvitations.indexOf(teamId);
        if (invitationIndex === -1) {
            return res.status(400).json({ msg: 'Team invitation not found' });
        }

        // Remove the team invitation
        player.teamInvitations.splice(invitationIndex, 1);
        await player.save();

        // Find the team managers of the team
        const teamManagers = await TeamManager.find({ teams: teamId }).populate('user', 'email');

        // Create notifications for all team managers
        const notificationPromises = teamManagers.map(async (manager) => {
            const message = `Player ${player.user.userName} has rejected the invitation to join your team.`;
            const redirectUrl = `/team/${teamId}/invitations`;

            await createNotification(manager.user._id, message, redirectUrl, 'social');
        });

        await Promise.all(notificationPromises);

        res.status(200).json({ msg: 'Team invitation rejected successfully' });
    } catch (error) {
        console.error('Error rejecting team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const acceptTeamInvitation = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user._id;

        // Find the player by user ID
        const player = await Player.findOne({ user: userId }).populate('user', 'userName');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the invitation exists
        const invitationIndex = player.teamInvitations.indexOf(teamId);
        if (invitationIndex === -1) {
            return res.status(400).json({ msg: 'Team invitation not found' });
        }

        // Check if the player is already in a team
        if (player.team) {
            return res.status(400).json({ msg: 'Player is already in a team' });
        }

        // Add the player to the team
        player.team = teamId;
        player.teamInvitations.splice(invitationIndex, 1); // Remove the accepted invitation
        await player.save();

        // Add the player to the team's players array if not already included
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        if (!team.players.includes(player._id)) {
            team.players.push(player._id);
            await team.save();
        } else {
            return res.status(400).json({ msg: 'Player is already in the team' });
        }

        // Notify the team managers
        const teamManagers = await TeamManager.find({ teams: teamId }).populate('user', 'email');

        const notificationPromises = teamManagers.map(async (manager) => {
            const message = `Player ${player.user.userName} has accepted the invitation to join your team.`;
            const redirectUrl = `/team/${teamId}`;

            await createNotification(manager.user._id, message, redirectUrl, 'social');
        });

        await Promise.all(notificationPromises);

        res.status(200).json({ msg: 'Team invitation accepted successfully' });
    } catch (error) {
        console.error('Error accepting team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllPlayers = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not specified

    try {
        // Count total documents in the collection
        const totalCount = await Player.countDocuments();

        // Calculate skip value
        const skip = (page - 1) * limit;

        // Fetch players with pagination and selected fields
        const players = await Player.find({})
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'user',
                select: 'userName'
            })
            .populate({
                path: 'team',
                select: 'name'
            })
            .select('fullName avatar user team')
            .lean(); // Convert Mongoose document to plain JavaScript object

        // Construct response object
        const response = {
            players,
            totalCount,
        };

        // Check if there is a next page
        if (skip + limit < totalCount) {
            response.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (skip > 0) {
            response.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getPlayersBySearch = async (req, res) => {
    const { keyword } = req.body; // Assuming keyword is received in req.body
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not specified

    try {
        // Prepare regex pattern to match case-insensitive keyword in fullName
        const regex = new RegExp(keyword, 'i');

        // Count total documents matching the search criteria
        const totalCount = await Player.countDocuments({ fullName: regex });

        // Calculate skip value
        const skip = (page - 1) * limit;

        // Fetch players matching the search criteria with pagination and selected fields
        let players = [];
        if (totalCount > 0) {
            players = await Player.find({ fullName: regex })
                .skip(skip)
                .limit(limit)
                .populate({
                    path: 'user',
                    select: 'userName'
                })
                .populate({
                    path: 'team',
                    select: 'name'
                })
                .select('fullName avatar user team')
                .lean(); // Convert Mongoose document to plain JavaScript object
        }

        // Construct response object
        const response = {
            players,
            totalCount,
        };

        // Check if there is a next page
        if (skip + limit < totalCount) {
            response.next = {
                page: page + 1,
                limit: limit,
            };
        }

        // Check if there is a previous page
        if (skip > 0) {
            response.previous = {
                page: page - 1,
                limit: limit,
            };
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error searching players:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const checkPlayerBelongsToManager = async (req, res) => {
    const { playerId, managerId } = req.body;

    try {
        // Find the manager by ID
        const manager = await TeamManager.findById(managerId).select('players');

        // If the manager is not found, assume player does not belong to the manager
        if (!manager) {
            return res.status(200).json({ belongsToManager: false });
        }

        // Check if the player's ID is in the manager's players array
        const playerExists = manager.players.includes(playerId);

        // Respond with the result
        res.status(200).json({ belongsToManager: playerExists });
    } catch (error) {
        console.error('Error checking player-manager relationship:', error);
        res.status(200).json({ belongsToManager: false });
    }
};

const SendJoinReqToTeam = async (req, res) => {
    const { teamId } = req.body;
    const userId = req.user._id;

    try {
        // Find the player by user ID and check if they are already in a team
        const player = await Player.findOne({ user: userId }).populate("user", "userName").select('user team');

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already in a team
        if (player.team) {
            return res.status(400).json({ msg: 'You are already in a team' });
        }

        // Find the team by ID and select only the joinRequests and managers fields
        const team = await Team.findById(teamId).select('joinRequests managers');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the player has already sent a join request to this team
        if (team.joinRequests.includes(player._id)) {
            return res.status(400).json({ msg: 'Join request already sent' });
        }

        // Add the player's ID to the team's joinRequests array
        team.joinRequests.push(player._id);
        await team.save();

        // Find team managers and send notifications
        const managers = await TeamManager.find({ _id: { $in: team.managers } }).select('user');
        for (const manager of managers) {
            await createNotification(manager.user._id, `Player ${player.user.userName} has requested to join your team.`, '/team/player-join-requests', 'social');
        }

        res.status(200).json({ msg: 'Join request sent successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const acceptContractOffer = async (req, res) => {
    const { teamId, playerId } = req.body;

    try {
        // Find the player
        const player = await Player.findById(playerId).populate('user', 'userName');
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player has a contract offer from the specified team
        const contractOfferIndex = player.contractOffers.findIndex(offer => offer.team.toString() === teamId);
        if (contractOfferIndex === -1) {
            return res.status(404).json({ msg: 'Contract offer not found for this team' });
        }

        // Get the contract offer object to be accepted
        const contractOffer = player.contractOffers[contractOfferIndex];

        // Assign the contract offer to player's contract
        player.contract = {
            team: contractOffer.team,
            role: contractOffer.role,
            period: contractOffer.period,
            borrowFee: contractOffer.borrowFee,
            sellingFee: contractOffer.sellingFee,
            commissionOnRenting: contractOffer.commissionOnRenting,
            commissionOnWinning: contractOffer.commissionOnWinning,
            jerseyNumber: contractOffer.jerseyNumber
        };

        // Remove the accepted contract offer from player's contractOffers array
        player.contractOffers.splice(contractOfferIndex, 1);

        // Save the updated player document
        await player.save();

        // Find all team managers for the specified team
        const teamManagers = await TeamManager.find({ teams: teamId }).populate('user', 'email');

        // Create notifications for each team manager
        const notificationPromises = teamManagers.map(async (manager) => {
            const message = `Player ${player.user.userName} has accepted the Team Contract`;
            const redirectUrl = `/team/${teamId}`;

            await createNotification(manager.user._id, message, redirectUrl, 'social');
        });

        // Wait for all notifications to be created
        await Promise.all(notificationPromises);

        res.status(200).json({ msg: 'Contract offer accepted successfully' });
    } catch (error) {
        console.error('Error accepting contract offer:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const rejectContractOffer = async (req, res) => {
    const { teamId } = req.body;
    const playerId = req.params.playerId;

    try {
        // Find the player
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player has a contract offer from the specified team
        const contractOfferIndex = player.contractOffers.findIndex(offer => offer.team.toString() === teamId);
        if (contractOfferIndex === -1) {
            return res.status(404).json({ msg: 'Contract offer not found for this team' });
        }

        // Remove the rejected contract offer from player's contractOffers array
        player.contractOffers.splice(contractOfferIndex, 1);

        // Save the updated player document
        await player.save();

        res.status(200).json({ msg: 'Contract offer rejected successfully' });
    } catch (error) {
        console.error('Error rejecting contract offer:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getPlayerContractOffers = async (req, res) => {
    const userId = req.user._id;

    try {

        const player = await Player.findOne({ user: userId }).lean();

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        const populatedContractOffers = await Promise.all(player.contractOffers.map(async (offer) => {
            const team = await Team.findById(offer.team).select('name avatar').lean();
            return { ...offer, team };
        }));

        res.status(200).json({ contractOffers: populatedContractOffers });
    } catch (error) {
        console.error('Error fetching contract offers:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    getPlayerProfile, playerBasicInfoUpdate, playerStrengthUpdate, isPlayerInATeam, findPlayersByKeyword, fetchTeamInvitations, rejectTeamInvitation, acceptTeamInvitation, getAllPlayers, getPlayersBySearch, getPlayerById, checkPlayerBelongsToManager, SendJoinReqToTeam, acceptContractOffer, rejectContractOffer, getPlayerContractOffers
};
