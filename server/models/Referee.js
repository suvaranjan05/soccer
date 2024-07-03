const mongoose = require('mongoose');

const refereeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
    fullName: { type: String },
    dateOfBirth: { type: Date },
    occupation: { type: String },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    avatar: { type: String, default: "https://bit.ly/broken-link" },
    address: { type: String },
    experienceYears: { type: Number, default: 0 },
    achievements: [{ achievement: String, date: Date }],
    comments: [{ comment: String, commenter: mongoose.Schema.Types.ObjectId }],
    fee: { type: Number, default: 0 },
    matchesOfficiated: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    zGold: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
}, { timestamps: true });

const Referee = mongoose.model('Referee', refereeSchema);

module.exports = Referee;
