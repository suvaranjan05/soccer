const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // only for platform player..non-platform player have no user field.
    fullName: { type: String },
    dateOfBirth: { type: Date },
    age: { type: Number },
    gender: { type: String },
    phone: { type: String },
    occupation: { type: String },
    jobContractEnd: { type: Date },
    address: { type: String },
    avatar: { type: String, default: "https://bit.ly/broken-link" },
    introduction: { type: String },
    preferredWing: { type: String, enum: ['LW', 'RW'], default: 'LW' },
    selfRating: {
        striker: { type: Number, default: 0 },
        winger: { type: Number, default: 0 },
        midfielder: { type: Number, default: 0 },
        wingDefender: { type: Number, default: 0 },
        centralBack: { type: Number, default: 0 }
    },
    teamInvitations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    }],
    yearsPlaying: { type: Number, default: 0 },
    hoursPerWeek: { type: Number, default: 0 },
    titles: [{ type: String }],
    titlesWithTeam: [{ teamName: String, title: String }],
    contract: {
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
        role: String,
        period: {
            startDate: { type: Date },
            endDate: { type: Date }
        },
        borrowFee: Number,
        sellingFee: Number,
        commissionOnRenting: Number,
        commissionOnWinning: Number,
        jerseyNumber: Number
    },
    contractOffers: [],
    value: { type: Number, default: 0 },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null },
    bankTopUp: { type: Number, default: 0 },
    zGold: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    watchingTime: { type: Number, default: 0 },
    playingTime: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ comment: String, commenter: mongoose.Schema.Types.ObjectId }],
    ratings: [{ rating: Number, rater: mongoose.Schema.Types.ObjectId }],
    endorsements: [{ endorsement: String, endorser: mongoose.Schema.Types.ObjectId }],
    skills: {
        smartPlayer: { type: Number, default: 0 },
        goodPassing: { type: Number, default: 0 },
        goodRunner: { type: Number, default: 0 },
        goodDefender: { type: Number, default: 0 },
        goodSkills: { type: Number, default: 0 },
        aggressive: { type: Number, default: 0 },
        goodPressing: { type: Number, default: 0 }
    },
    analysis: {
        topSpeed: { value: Number, date: Date },
        goals: { value: Number, date: Date },
        assists: { value: Number, date: Date },
        topShootingSpeed: { value: Number, date: Date },
        travelDistance: { value: Number, date: Date },
        successPasses: { value: Number, date: Date },
        failedPasses: { value: Number, date: Date },
        discussionPoints: { type: Number, default: 0 }
    },
    schedule: [{ date: Date, description: String }],
    socialInteractionHistory: [{ interaction: String, date: Date }],
    paymentHistory: [{ item: String, amount: Number, date: Date }],
    shoppingHistory: [{ item: String, amount: Number, date: Date }],
    payForSuggestions: [{ item: String, amount: Number, date: Date }]
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
