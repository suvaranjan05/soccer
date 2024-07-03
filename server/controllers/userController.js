const User = require("../models/User");
const Player = require("../models/Player");
const TeamManager = require("../models/TeamManager");
const Notification = require('../models/Notification');
const Referee = require("../models/Referee");


const getUserHeader = async (req, res) => {
    try {
        const userId = req.user._id;
        // const userId = req.body.userId;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        let responseUser;

        // Check if user is a player
        if (user.role === "player") {
            responseUser = await Player.findOne({ user: userId }).populate("user", "userName");
        }
        // Check if user is a team manager
        else if (user.role === "team-manager") {
            responseUser = await TeamManager.findOne({ user: userId }).populate("user", "userName");
        }

        else if (user.role === "referee") {
            responseUser = await Referee.findOne({ user: userId }).populate("user", "userName");
        }
        // Handle other roles if necessary

        const count = await Notification.countDocuments({ user: user._id, read: false });

        // Send response
        const { _id, userName } = responseUser.user;
        let responseData = { _id, userName };

        // Add additional fields based on role
        if (user.role === "player") {
            responseData.zGold = responseUser.zGold;
            responseData.diamond = responseUser.diamond;
            responseData.avatar = responseUser.avatar;
            responseData.level = responseUser.level;
            responseData.unreadNotificationsCount = count;
        } else if (user.role === "team-manager") {
            responseData.avatar = responseUser.avatar;
            responseData.zGold = responseUser.zGold;
            responseData.diamond = responseUser.diamond;
            responseData.unreadNotificationsCount = count;
        } else if (user.role === "referee") {
            responseData.avatar = responseUser.avatar;
            responseData.unreadNotificationsCount = count;
        }
        // Handle other roles if necessary

        res.status(200).json(responseData);
    } catch (error) {
        console.error("getUserHeader Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        // const userId = req.body.userId;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        let responseUser;

        if (user.role === "team-manager") {
            responseUser = await TeamManager.findOne({ user: userId }).populate("user", "userName email role");
        } else if (user.role === "referee") {
            responseUser = await Referee.findOne({ user: userId }).populate("user", "userName email role");
        }
        // Handle other roles if necessary
        console.log(responseUser);
        // Send response
        const { _id, userName, role } = responseUser.user;
        let responseData = { _id, userName, role };

        // Add additional fields based on role
        // if (user.role === "team-manager") {
        responseData.fullName = responseUser.fullName;
        responseData.avatar = responseUser.avatar;
        responseData.dateOfBirth = responseUser.dateOfBirth;
        responseData.age = responseUser.age;
        responseData.gender = responseUser.gender;
        responseData.phone = responseUser.phone;
        responseData.occupation = responseUser.occupation;
        responseData.zGold = responseUser.zGold;
        responseData.diamond = responseUser.diamond;
        // }

        res.status(200).json(responseData);
    } catch (error) {
        console.error("getUserHeader Error:", error.message);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

const profileUpdate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { userName, avatar } = req.body;

        // Find existing user with the new username excluding the current user
        const existingUser = await User.findOne({ userName, _id: { $ne: userId } });

        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Find the user by ID (unchanged)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update username and avatar (unchanged)
        user.userName = userName || user.userName;


        if (user.role === "team-manager") {
            const manager = await TeamManager.findOne({ user: userId });
            manager.avatar = avatar || manager.avatar
            await manager.save();
        } else if (user.role === "player") {
            const player = await Player.findOne({ user: userId });
            player.avatar = avatar || player.avatar;
            await player.save();
        } else if (user.role === "referee") {
            const referee = await Referee.findOne({ user: userId });
            referee.avatar = avatar || referee.avatar;
            await referee.save();
        } else {
            return res.status(400).json({ msg: 'Unavailable' });
        }

        await user.save();
        // Save the updated user (unchanged)
        res.json({ msg: 'Profile updated successfully' });
    } catch (error) {
        console.log('Error updating profile:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Controller function to add currency to user account
const addCurrency = async (req, res) => {
    const { currencyType, quantity, userRole } = req.body;
    const userId = req.user._id;

    try {
        // Validate input data
        if (!currencyType || !quantity || !userRole) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Determine the model to use based on userRole
        let UserModel;
        if (userRole === 'player') {
            UserModel = Player;
        } else if (userRole === 'team-manager') {
            UserModel = TeamManager;
        } else {
            return res.status(400).json({ msg: 'Invalid user role' });
        }

        // Find the user by userId in the respective model
        const user = await UserModel.findOne({ user: userId });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update the currency based on currencyType
        if (currencyType === 'zgold') {
            user.zGold += parseInt(quantity);
        } else if (currencyType === 'diamond') {
            user.diamond += parseInt(quantity);
        } else {
            return res.status(400).json({ msg: 'Invalid currency type' });
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ msg: 'Currency added successfully', user });
    } catch (error) {
        console.error('Error adding currency:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getBalance = async (req, res) => {

    const userId = req.user._id;
    const { userRole } = req.body;

    try {

        let UserModel;
        if (userRole === 'player') {
            UserModel = Player;
        } else if (userRole === 'team-manager') {
            UserModel = TeamManager;
        } else {
            return res.status(400).json({ msg: 'Invalid user role' });
        }

        // Find the user by userId in the respective model
        const user = await UserModel.findOne({ user: userId });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const balance = {
            zgold: user.zGold,
            diamond: user.diamond
        }

        res.status(200).json({ msg: 'Balance Fetch successfully', balance });
    } catch (error) {
        console.error('Error adding currency:', error.message);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = {
    getUserHeader, getUserProfile, profileUpdate, addCurrency, getBalance
};
