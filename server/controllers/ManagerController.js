const User = require("../models/User");
const Player = require("../models/Player");
const TeamManager = require("../models/TeamManager");
const Team = require("../models/Team");
const Reminder = require("../models/Reminder");

const getManagerProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const manager = await TeamManager.findOne({ user: userId }).populate("user", "userName email role");

        const { _id, userName, role, email } = manager.user;
        let responseData = { _id, userName, role, email };

        responseData.fullName = manager.fullName;
        responseData.avatar = manager.avatar;
        responseData.dateOfBirth = manager.dateOfBirth;
        responseData.address = manager.address;
        responseData.age = manager.age;
        responseData.gender = manager.gender;
        responseData.phone = manager.phone;
        responseData.occupation = manager.occupation;
        responseData.zGold = manager.zGold;
        responseData.diamond = manager.diamond;

        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const managerBasicInfoUpdate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, dateOfBirth, age, gender, phone, occupation, address } = req.body;

        if (!fullName || !dateOfBirth || !age || !gender || !phone || !occupation || !address) {
            return res.status(404).json({ msg: 'All fields are required' });
        }

        const teamManager = await TeamManager.findOne({ user: userId })

        if (!teamManager) {
            return res.status(404).json({ msg: 'Team Manager not found' });
        }

        teamManager.fullName = fullName;
        teamManager.dateOfBirth = dateOfBirth;
        teamManager.age = age;
        teamManager.gender = gender;
        teamManager.phone = phone;
        teamManager.occupation = occupation;
        teamManager.address = address;

        // Save the updated user (unchanged)
        await teamManager.save();

        res.json({ msg: 'Team Manager Profile updated successfully' });
    } catch (error) {
        console.log('Error updating profile:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const addPlayer = async (req, res) => {
    const {
        fullName,
        age,
        dateOfBirth,
        gender,
        phone,
        striker,
        winger,
        midfielder,
        wingDefender,
        centralBack,
        avatar,
        preferredWing
    } = req.body;

    try {
        // Define the required balance for creating a player
        // const requiredBalance = {
        //     zGold: 1500,
        //     diamond: 2,
        // };

        // console.log(req.user._id);

        // Find the team manager by user ID
        const teamManager = await TeamManager.findOne({ user: req.user._id });

        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        // Check if the team manager has enough balance
        // if (teamManager.zGold < requiredBalance.zGold || teamManager.diamond < requiredBalance.diamond) {
        //     return res.status(400).json({ msg: 'Insufficient zGold or diamond balance' });
        // }

        // Deduct the required balance from the team manager's account
        // teamManager.zGold -= requiredBalance.zGold;
        // teamManager.diamond -= requiredBalance.diamond;

        // Create new Player instance
        const newPlayer = new Player({
            fullName,
            age,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            phone,
            selfRating: {
                striker,
                winger,
                midfielder,
                wingDefender,
                centralBack
            },
            avatar, // Assuming avatar is already a URL provided in req.body
            preferredWing,
        });

        // Save new player to database
        await newPlayer.save();

        // Add the new player's ID to the team manager's players array
        teamManager.players.push(newPlayer._id);

        // Save the updated team manager document
        await teamManager.save();

        // Respond with success msg
        return res.status(201).json({ msg: 'Player created successfully', playerId: newPlayer._id });
    } catch (error) {
        console.error('Error creating player:', error);
        return res.status(500).json({ msg: 'Failed to create player', error: error.msg });
    }
};

const getMyPlayers = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the team manager by user ID and populate the players array with full Player details
        const teamManager = await TeamManager.findOne({ user: userId }).populate({
            path: 'players',
            select: 'avatar fullName team zGold matches diamond level',
            populate: {
                path: 'team',
                select: 'name',
            }
        });

        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        // Extract the populated players from teamManager
        const players = teamManager.players;

        // Map players to format the response as required
        const playersWithTeamInfo = players.map(player => {
            const playerInfo = {
                ...player.toObject(), // Convert Mongoose document to plain JavaScript object
                alreadyInATeam: !!player.team, // true if team field has a value, false otherwise
            };

            // If player.team exists and is not null, include only team.name
            if (playerInfo.team && playerInfo.team.name) {
                playerInfo.team = {
                    name: playerInfo.team.name
                };
            } else {
                delete playerInfo.team; // Remove team field if null or undefined
            }

            return playerInfo;
        });

        res.status(200).json(playersWithTeamInfo);
    } catch (error) {
        console.error('Error fetching manager players:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getManagerTeams = async (req, res) => {
    try {
        // Find the manager by user ID
        const manager = await TeamManager.findOne({ user: req.user._id }).populate({
            path: 'teams',
            select: 'name avatar wins matches'
        });

        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        // Extract the teams
        const { teams } = manager;

        // Send response with the populated teams
        res.status(200).json({ teams });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the teams' });
    }
};

const managerPlayerUpdate = async (req, res) => {
    const { playerId } = req.params;
    const { fullName, dateOfBirth, age, gender, phone, preferredWing, selfRating, avatar } = req.body;
    const userId = req.user._id;

    try {
        // Find the manager and check if they have the player
        const manager = await TeamManager.findOne({ user: userId });

        if (!manager) {
            return res.status(404).json({ msg: 'Manager not found' });
        }

        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player belongs to the manager
        if (!manager.players.includes(playerId)) {
            return res.status(403).json({ msg: 'You do not have permission to update this player' });
        }

        // Update player information
        player.fullName = fullName || player.fullName;
        player.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : player.dateOfBirth;
        player.age = age || player.age;
        player.gender = gender || player.gender;
        player.phone = phone || player.phone;
        player.preferredWing = preferredWing || player.preferredWing;
        player.avatar = avatar || player.avatar;
        player.selfRating = selfRating || player.selfRating;

        await player.save();

        res.status(200).json({ msg: 'Player updated successfully', player });
    } catch (error) {
        console.error('Error updating player:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const sendContractOfferToPlayer = async (req, res) => {
    const { team, role, period, borrowFee, sellingFee, commissionOnRenting, commissionOnWinning, jerseyNumber } = req.body;
    const managerUserId = req.user._id;
    const playerId = req.params.playerId;

    try {
        // Check if the manager exists and manages the team
        const teamManager = await TeamManager.findOne({ user: managerUserId });
        if (!teamManager) {
            return res.status(404).json({ msg: 'Team manager not found' });
        }

        if (!teamManager.teams.includes(team)) {
            return res.status(403).json({ msg: 'You do not manage this team' });
        }

        // Find the player to whom we want to send the contract offer
        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Check if the player already has a team in their contract
        if (player.contract.team) {
            return res.status(400).json({ msg: 'Player already has a Team Contract' });
        }

        // Check if there is already a contract offer from the same team
        const existingOffer = player.contractOffers.find(offer => offer.team.toString() === team);
        if (existingOffer) {
            return res.status(404).json({ msg: 'Contract offer from this team already exists' });
        }

        // Construct the contract offer object
        const contractOffer = {
            team,
            role,
            period,
            borrowFee,
            sellingFee,
            commissionOnRenting,
            commissionOnWinning,
            jerseyNumber
        };

        // Push the contract offer to player's contractOffers array
        player.contractOffers.push(contractOffer);

        // Save the updated player document
        await player.save();

        res.status(200).json({ msg: 'Contract offer sent successfully', player });
    } catch (error) {
        console.error('Error sending contract offer:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getManagerTeamsForReminder = async (req, res) => {
    try {
        const userId = req.user._id;

        const manager = await TeamManager.findOne({ user: userId })
            .populate({
                path: 'teams',
                select: 'name avatar players',
                populate: {
                    path: 'players',
                    select: 'user fullName avatar',
                    populate: {
                        path: 'user',
                        select: 'userName',
                    }
                }
            });

        if (!manager) {
            return res.status(404).json({ error: 'Manager not found' });
        }

        // Extract the teams
        const { teams } = manager;

        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching manager teams:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const markReminderAsFinishedForUser = async (req, res) => {
    try {
        const { reminderId, userId } = req.body;
        const managerId = req.user._id;

        const reminder = await Reminder.findOne({ _id: reminderId, sender: managerId });

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found or you do not have permission to modify it' });
        }

        if (!reminder.finishedFor.includes(userId)) {
            reminder.finishedFor.push(userId);
            await reminder.save();
        }

        res.status(200).json({ msg: 'Reminder marked as finished for the user' });
    } catch (error) {
        console.error('Error marking reminder as finished:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getManagerReminders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the manager by user ID
        const manager = await TeamManager.findOne({ user: userId });

        if (!manager) {
            return res.status(404).json({ msg: 'Manager not found' });
        }

        // Fetch reminders created by the manager
        const reminders = await Reminder.find({ sender: userId }).sort({ createdAt: -1 });

        const populateFields = async (userIds) => {
            const players = await Player.find({ user: { $in: userIds } }).populate('user', 'userName');
            return players.map(player => ({
                _id: player.user._id,
                userName: player.user.userName,
                avatar: player.avatar,
            }));
        };

        // Populate the reminders
        const populatedReminders = await Promise.all(reminders.map(async (reminder) => {
            const sender = await TeamManager.findOne({ user: reminder.sender }).populate('user', 'userName');
            const populatedRecipients = await populateFields(reminder.recipients);
            const populatedFinishedFor = await populateFields(reminder.finishedFor);

            return {
                ...reminder.toObject(),
                sender: {
                    _id: sender.user._id,
                    userName: sender.user.userName,
                    avatar: sender.avatar,
                },
                recipients: populatedRecipients,
                finishedFor: populatedFinishedFor,
            };
        }));

        res.status(200).json(populatedReminders);
    } catch (error) {
        console.error('Error fetching manager reminders:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    managerBasicInfoUpdate, getManagerProfile, addPlayer, getMyPlayers, getManagerTeams, managerPlayerUpdate, sendContractOfferToPlayer, getManagerTeamsForReminder, getManagerReminders, markReminderAsFinishedForUser
};
