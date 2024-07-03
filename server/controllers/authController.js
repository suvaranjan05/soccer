const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TeamManager = require('../models/TeamManager');
const Notification = require('../models/Notification');
const Player = require('../models/Player');
const Referee = require('../models/Referee');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY);

        let responseUser;

        if (user.role === 'player') {
            responseUser = await Player.findOne({ user: user._id }).populate('user', 'userName role');
        } else if (user.role === 'team-manager') {
            responseUser = await TeamManager.findOne({ user: user._id }).populate('user', 'userName role');
        } else if (user.role === 'referee') {
            responseUser = await Referee.findOne({ user: user._id }).populate('user', 'userName role');
        } else {
            responseUser = user;  // Handle other roles if necessary
        }

        const count = await Notification.countDocuments({ user: user._id, read: false });

        // Send response
        res.status(200).json({
            token,
            msg: "login Successfull",
            user: {
                _id: responseUser.user._id,
                userName: responseUser.user.userName,
                role: user.role,
                zGold: responseUser.zGold,
                diamond: responseUser.diamond,
                avatar: responseUser.avatar,
                level: user.role === 'player' ? responseUser.level : undefined
            },
            role: responseUser.user.role,
            unreadNotificationsCount: count,
            _id: responseUser._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    try {
        // Destructure request body
        const { email, password, role, userName } = req.body;

        console.log(email, password, role, userName);

        // Input validation
        if (!email || !password || !role || !userName) {
            return res.status(400).json({ msg: 'Missing required fields' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already registered' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create and save the User
        const user = new User({
            email,
            password: hashedPassword,
            role,
            userName
        });
        await user.save();

        // Create associated Player or TeamManager document based on role
        if (role === 'player') {
            const player = new Player({ user: user._id });
            await player.save();
        } else if (role === 'team-manager') {
            const teamManager = new TeamManager({ user: user._id });
            await teamManager.save();
        } else if (role === 'referee') {
            const referee = new Referee({ user: user._id });
            await referee.save();
        }

        // Send response
        res.status(201).json({ msg: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const checkUser = async (req, res) => {
    const { email, userName } = req.body;


    try {
        // Check if a user with the given email exists
        const userByEmail = await User.findOne({ email });
        if (userByEmail) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // Check if a user with the given username exists
        const userByUsername = await User.findOne({ userName });
        if (userByUsername) {
            return res.status(400).json({ msg: "Username already taken" });
        }

        // If neither email nor username exists
        return res.status(200).json({ msg: "You can register with this Email and Username" });
    } catch (error) {
        console.error("Check User Error:", error.message);
        return res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    login, register, checkUser
};
