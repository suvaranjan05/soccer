const mongoose = require('mongoose');

const teamManagerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],  // Reference to the Team model
    fullName: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    email: { type: String },
    avatar: { type: String, default: "https://bit.ly/broken-link" },
    occupation: { type: String },
    address: { type: String },
    experienceYears: { type: Number, default: 0 },
    achievements: [{ achievement: String, date: Date }],
    comments: [{ comment: String, commenter: mongoose.Schema.Types.ObjectId }],
    // Added attributes for virtual currency and levels
    zGold: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],  // List of players managed
}, { timestamps: true });

const TeamManager = mongoose.model('TeamManager', teamManagerSchema);

module.exports = TeamManager;
