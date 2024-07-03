const mongoose = require('mongoose');

// Define the Coach schema
const coachSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://bit.ly/broken-link",
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    coachingLicense: {
        type: String,
    },
    experienceYears: {
        type: Number,
        default: 0,
    },
    teamsCoached: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    achievements: [{
        title: String,
        date: Date,
    }],
    comments: [{
        comment: String,
        commenter: mongoose.Schema.Types.ObjectId,
    }],
    zGold: {
        type: Number,
        default: 0,
    },
    diamond: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    endorsements: [{
        endorsement: String,
        endorser: mongoose.Schema.Types.ObjectId,
    }],
    certifications: [{
        title: String,
        institution: String,
        date: Date,
    }],
    skills: [{
        skill: String,
        level: Number,
    }],
    socialInteractionHistory: [{
        interaction: String,
        date: Date,
    }],
    paymentHistory: [{
        item: String,
        amount: Number,
        date: Date,
    }],
    shoppingHistory: [{
        item: String,
        amount: Number,
        date: Date,
    }],
    recurringFees: [{
        period: String,
        amount: Number,
        markedAsDone: Boolean,
    }],
}, { timestamps: true });

// Create the Coach model
const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;
