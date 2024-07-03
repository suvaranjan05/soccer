const Team = require('../models/Team');
const Coach = require('../models/Coach');
const User = require('../models/User');
const TeamManager = require('../models/TeamManager');
const Player = require('../models/Player');
const { createNotification } = require('../controllers/notificationController');

const createTeam = async (req, res) => {
    try {
        const {
            name,
            avatar,
            description,
            coach,
            bankInfo,
            sponsor,
            addedPlayers,
            formation
        } = req.body;

        // Check if the user is a team manager
        const manager = await TeamManager.findOne({ user: req.user._id });
        if (!manager) {
            return res.status(403).json({ msg: 'Only team managers can create teams' });
        }

        // Check if a team with the same name already exists
        const existingTeam = await Team.findOne({ name: name });
        if (existingTeam) {
            return res.status(400).json({ msg: 'A team with this name already exists' });
        }

        // Create a new coach if one is provided
        let myCoach;
        if (coach) {
            myCoach = new Coach({
                fullName: coach.name,
                avatar: coach.avatar,
                address: coach.address
            });
            await myCoach.save();
        }

        // Create a new team
        const newTeam = new Team({
            name: name,
            avatar: avatar,
            description: description,
            coach: myCoach ? myCoach._id : undefined, // Only assign if myCoach is defined
            formation: formation,
            bankInfo: {
                paynowNumber: bankInfo.paynowNumber,
                bankCardNumber: bankInfo.bankCardNumber,
                bankNumber: bankInfo.bankNumber
            },
            sponsor: {
                name: sponsor.name,
                contact: sponsor.contact,
                amount: sponsor.amount,
                period: {
                    startDate: new Date(sponsor.period.startDate),
                    endDate: new Date(sponsor.period.endDate)
                }
            },
            managers: [manager._id], // Include the manager's ID in the managers array
            players: addedPlayers
        });

        await newTeam.save();

        // Update the team manager's teams array with the new team ID
        manager.teams.push(newTeam._id);
        await manager.save();

        // Update each player's team field with the new team's ID
        for (let playerId of addedPlayers) {
            const player = await Player.findById(playerId);
            if (player) {
                player.team = newTeam._id;
                await player.save();
            }
        }

        res.status(201).json({ msg: 'Team created successfully', teamId: newTeam._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while creating the team' });
    }
};

const addPlayerToTeam = async (req, res) => {
    const { teamId, playerId } = req.body;

    try {
        // Step 1: Find the TeamManager by user ID
        const teamManager = await TeamManager.findOne({ user: req.user._id });

        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        // Step 2: Check if the team's managers array includes the managerId
        if (!teamManager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'Unauthorized access to team' });
        }

        // Step 3: Check if the player is already in a team
        const existingPlayer = await Player.findOne({ _id: playerId });

        if (!existingPlayer) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        if (existingPlayer.team) {
            return res.status(400).json({ msg: 'Player is already in a team' });
        }

        // Step 4: Add playerId to team.players array
        await Team.updateOne(
            { _id: teamId },
            { $push: { players: playerId } }
        );

        // Step 5: Update player's team field to store the teamId
        existingPlayer.team = teamId;
        await existingPlayer.save();

        res.status(200).json({ msg: 'Player added to team successfully' });
    } catch (error) {
        console.error('Error adding player to team:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getTeam = async (req, res) => {
    const { teamId } = req.params;

    try {
        // Find the team by teamId and populate necessary fields
        const team = await Team.findById(teamId)
            .populate({
                path: 'coach',
                select: 'fullName avatar address', // Assuming you want to select fullName and avatar of the coach
            })
            .populate({
                path: 'players',
                select: 'fullName avatar user contract', // Include 'user' field to access userName if available
                populate: {
                    path: 'user',
                    select: 'userName',
                    match: { userName: { $exists: true } } // Only populate if userName exists
                }
            })
            .select('name avatar description formation captains bankInfo sponsor zGold diamond wins managers');

        if (!team) {
            return res.status(404).json({ msg: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const updateTeamInfo = async (req, res) => {
    try {
        const {
            teamId,
            name,
            avatar,
            description,
            coach,
            bankInfo,
            sponsor,
            formation,
            coachId
        } = req.body;

        // console.log(req.body);

        // Find the team manager by the user ID
        const manager = await TeamManager.findOne({ user: req.user._id });
        if (!manager) {
            return res.status(403).json({ msg: 'Only team managers can update team information' });
        }

        // Find the team by ID
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the user is a manager of the team
        if (!team.managers.includes(manager._id)) {
            return res.status(403).json({ msg: 'You are not authorized to update this team' });
        }

        if (coachId !== team.coach.toHexString()) {
            return res.status(403).json({ msg: 'Coach is not found' });
        }

        const myCoach = await Coach.findById(coachId);

        if (myCoach) {
            return res.status(403).json({ msg: 'Coach is not found' });
        }

        // Update coach data
        myCoach.fullName = coach.fullName;
        myCoach.avatar = coach.avatar;
        myCoach.address = coach.address;

        // Update the team information
        team.name = name;
        team.avatar = avatar;
        team.description = description;
        team.formation = formation;
        team.bankInfo = bankInfo;
        team.sponsor = sponsor;

        // Save both coach and team
        await team.save();
        await myCoach.save();

        res.status(200).json({ msg: 'Team information updated successfully', team });
    } catch (error) {
        console.log('Error updating team information:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const removePlayerFromTeam = async (req, res) => {
    const { teamId, playerId } = req.body;

    try {
        // Step 1: Find the TeamManager by user ID
        const teamManager = await TeamManager.findOne({ user: req.user._id });

        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        // Step 2: Check if the team's managers array includes the managerId
        if (!teamManager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'Unauthorized access to team' });
        }

        // Step 3: Remove playerId from team.players array
        await Team.findByIdAndUpdate(teamId, { $pull: { players: playerId } });

        // Step 4: Update player's team field to null
        await Player.findByIdAndUpdate(playerId, { team: null });

        res.status(200).json({ msg: 'Player removed from team successfully' });
    } catch (error) {
        console.error('Error removing player from team:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const sendTeamInvitation = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;
        const userId = req.user._id; // Ensure you get the user's ID from the request

        // Find the manager by their user ID
        const manager = await TeamManager.findOne({ user: userId });

        if (!manager) {
            return res.status(404).json({ msg: 'Manager not found' });
        }

        if (!manager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'You are not the manager of this team' });
        }

        // Find the player by their ID
        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player is already in a team
        if (player.team) {
            return res.status(400).json({ msg: 'Player is already in a team' });
        }

        // Check if the team invitation already exists in the player's invitations
        if (player.teamInvitations.includes(teamId)) {
            return res.status(400).json({ msg: 'Team invitation already sent' });
        }

        // Add the new team invitation to the player's document
        player.teamInvitations.push(teamId);
        await player.save();

        // Get team name for the notification
        const team = await Team.findById(teamId).select('name');
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Create a notification for the player
        const message = `You have received an invitation to join the team ${team.name}.`;
        const redirectUrl = `/team-invitations`;

        await createNotification(player.user, message, redirectUrl, 'social');

        res.status(200).json({ msg: 'Team invitation added successfully' });
    } catch (error) {
        console.log('Error adding team invitation:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllTeams = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not specified

        const startIndex = (page - 1) * limit;

        // Get the total count of all teams
        const totalCount = await Team.countDocuments();

        // Find all teams with pagination
        const teams = await Team.find()
            .select('name avatar description _id players')
            .skip(startIndex)
            .limit(limit);

        // Prepare the response object
        const results = {
            totalCount,
            teams,
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
        console.log('Error fetching all teams:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const getTeamsBySearch = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 3; // Default to 3 items per page if not specified
        const { keyword } = req.body; // Get the search keyword

        const startIndex = (page - 1) * limit;

        // Create a case-insensitive regular expression for the search keyword
        const searchRegex = new RegExp(keyword, 'i');

        // Find teams matching the search keyword with pagination
        const teams = await Team.find({ name: searchRegex })
            .select('name avatar description _id players')
            .skip(startIndex)
            .limit(limit)
            .lean();

        // Get the total count of teams matching the search keyword
        const totalCount = await Team.countDocuments({ name: searchRegex });

        // Prepare the response object
        const results = {
            totalCount,
            teams,
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
        console.log('Error fetching teams by search:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const checkTeamBelongsToManager = async (req, res) => {
    const { teamId, managerId } = req.body;

    try {
        // Find the team by ID
        const team = await Team.findById(teamId).select('managers');

        // If the team is not found, assume team does not belong to the manager
        if (!team) {
            return res.status(200).json({ belongsToManager: false });
        }

        // Check if the manager's ID is in the team's managers array
        const managerExists = team.managers.includes(managerId);

        // Respond with the result
        res.status(200).json({ belongsToManager: managerExists });
    } catch (error) {
        console.error('Error checking team-manager relationship:', error);
        res.status(200).json({ belongsToManager: false });
    }
};

const getTeamJoinRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the manager based on the current user ID
        const manager = await TeamManager.findOne({ user: userId });

        if (!manager) {
            return res.status(404).json({ msg: 'Manager not found' });
        }

        // Find all teams managed by this manager that have join requests
        const teams = await Team.find({ managers: manager._id }).populate({
            path: 'joinRequests',
            select: 'avatar user',
            populate: {
                path: 'user',
                select: 'userName _id'
            }
        }).select('name joinRequests');

        // Filter out teams without any join requests
        const filteredTeams = teams.filter(team => team.joinRequests.length > 0);

        // Prepare the response data with join requests from filtered teams
        const response = filteredTeams.map(team => ({
            team: {
                name: team.name,
                _id: team._id,
            },
            joinRequests: team.joinRequests.map(player => ({
                player: {
                    user: {
                        userName: player.user.userName,
                        _id: player.user._id
                    },
                    _id: player._id,
                    avatar: player.avatar
                }
            }))
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching team join requests:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const TeamJoinRequestAccept = async (req, res) => {
    const { playerId, teamId } = req.body;
    const userId = req.user._id;



    try {
        // Check if the user is a manager
        const manager = await TeamManager.findOne({ user: userId });

        if (!manager) {
            return res.status(403).json({ msg: 'You are not authorized to perform this action' });
        }

        // Check if the manager manages the specified team
        if (!manager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'You do not manage this team' });
        }


        // Find the team and check if the join request exists
        const team = await Team.findById(teamId).select('joinRequests players name');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        const joinRequestIndex = team.joinRequests.indexOf(playerId);
        if (joinRequestIndex === -1) {
            return res.status(400).json({ msg: 'Join request not found' });
        }

        // Remove the playerId from the joinRequests array
        team.joinRequests.splice(joinRequestIndex, 1);

        // Add the playerId to the team's players array
        team.players.push(playerId);

        // Save the updated team
        await team.save();

        // Update the player's team field
        const player = await Player.findById(playerId).select('user');
        player.team = teamId;
        await player.save();

        // Create a notification for the player
        await createNotification(player.user, `You have been accepted to join the team ${team.name}.`, `/team/${teamId}`, 'social');

        res.status(200).json({ msg: 'Player join request accepted' });
    } catch (error) {
        console.error('Error accepting player join request:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const TeamJoinRequestReject = async (req, res) => {
    const { playerId, teamId } = req.body;

    try {
        // Check if the user is a manager
        const manager = await TeamManager.findOne({ user: req.user._id });

        if (!manager) {
            return res.status(403).json({ msg: 'You are not authorized to perform this action' });
        }

        // Check if the manager manages the specified team
        if (!manager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'You do not manage this team' });
        }

        // Find the team and check if the join request exists
        const team = await Team.findById(teamId).select('joinRequests name');

        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        const joinRequestIndex = team.joinRequests.indexOf(playerId);
        if (joinRequestIndex === -1) {
            return res.status(400).json({ msg: 'Join request not found' });
        }

        // Remove the playerId from the joinRequests array
        team.joinRequests.splice(joinRequestIndex, 1);

        // Save the updated team
        await team.save();

        // Find the player to notify
        const player = await Player.findById(playerId).select('user');

        // Create a notification for the player
        await createNotification(player.user, `Your request to join the team ${team.name} has been rejected.`, `/team/${teamId}`, 'social');

        res.status(200).json({ msg: 'Player join request rejected' });
    } catch (error) {
        console.error('Error rejecting player join request:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const makeCaptain = async (req, res) => {
    const { teamId, playerId } = req.body;
    const managerUserId = req.user._id;

    try {
        const teamManager = await TeamManager.findOne({ user: managerUserId });
        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        if (!teamManager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'You do not manage this team' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        if (!team.managers.includes(teamManager._id)) {
            return res.status(403).json({ msg: 'You are not authorized to perform this action' });
        }

        if (team.captain.toString() === playerId) {
            return res.status(400).json({ msg: 'Player is already the captain' });
        }

        if (team.viceCaptain.toString() === playerId) {
            return res.status(400).json({ msg: 'Player is already Vice-Captain' });
        }

        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        if (!team.players.includes(player._id)) {
            return res.status(403).json({ msg: 'Player is not in this team' });
        }

        await Team.findByIdAndUpdate(teamId, { captain: playerId });

        res.status(200).json({ msg: 'Player is now captain' });
    } catch (error) {
        console.error('Error making player captain:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const makeViceCaptain = async (req, res) => {
    const { teamId, playerId } = req.body;
    const managerUserId = req.user._id;

    try {
        const teamManager = await TeamManager.findOne({ user: managerUserId });
        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        if (!teamManager.teams.includes(teamId)) {
            return res.status(403).json({ msg: 'You do not manage this team' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        if (!team.managers.includes(teamManager._id)) {
            return res.status(403).json({ msg: 'You are not authorized to perform this action' });
        }

        if (team.captain.toString() === playerId) {
            return res.status(400).json({ msg: 'Player is already the captain' });
        }

        if (team.viceCaptain.toString() === playerId) {
            return res.status(400).json({ msg: 'Player is already Vice-Captain' });
        }

        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        if (!team.players.includes(player._id)) {
            return res.status(403).json({ msg: 'Player is not in this team' });
        }

        await Team.findByIdAndUpdate(teamId, { viceCaptain: playerId });

        // Step 9: Respond with success message
        res.status(200).json({ msg: 'Player is now vice-captain' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const checkPlayerContract = async (req, res) => {
    const { teamId, playerId } = req.body;

    try {
        // Find the player
        const player = await Player.findById(playerId).populate("user", "userName");
        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Find the team
        const team = await Team.findById(teamId).select('name avatar');
        if (!team) {
            return res.status(404).json({ msg: 'Team not found' });
        }

        // Check if the player is already in a contract
        if (player.contract.team) {
            const contractedTeam = await Team.findById(player.contract.team).select('name avatar');
            return res.status(200).json({
                isContract: true,
                player: {
                    fullName: player.fullName || null,
                    user: {
                        userName: player.user ? player.user.userName : null,
                    },
                    avatar: player.avatar,
                    contract: {
                        team: {
                            name: contractedTeam.name,
                            avatar: contractedTeam.avatar,
                        },
                        role: player.contract.role,
                        period: {
                            startDate: player.contract.period.startDate,
                            endDate: player.contract.period.endDate,
                        },
                        borrowFee: player.contract.borrowFee,
                        sellingFee: player.contract.sellingFee,
                        commissionOnRenting: player.contract.commissionOnRenting,
                        commissionOnWinning: player.contract.commissionOnWinning,
                        jerseyNumber: player.contract.jerseyNumber,
                    },
                },
            });
        }

        // Prepare the response object for player not in contract
        const response = {
            isContract: false,
            player: {
                fullName: player.fullName || null,
                user: {
                    userName: player.user ? player.user.userName : null,
                },
                avatar: player.avatar,
            },
            team: {
                name: team.name,
                avatar: team.avatar,
                _id: team._id,
            },
        };

        // Send the response
        res.status(200).json(response);
    } catch (error) {
        console.error('Error checking player contract:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    createTeam, addPlayerToTeam, getTeam, updateTeamInfo, removePlayerFromTeam, sendTeamInvitation, getAllTeams, getTeamsBySearch, checkTeamBelongsToManager, getTeamJoinRequests, TeamJoinRequestAccept, TeamJoinRequestReject, makeCaptain, makeViceCaptain, checkPlayerContract
};
