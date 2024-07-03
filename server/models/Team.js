const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    avatar: { type: String },
    photos: [{ type: String }],
    socialPages: {
        facebook: { type: String },
        tiktok: { type: String },
    },
    description: { type: String },
    email: { type: String },
    phone: { type: String },
    formation: { type: String },
    managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    viceCaptain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    homeField: { type: String },
    bankInfo: {
        paynowNumber: { type: String },
        bankCardNumber: { type: String },
        bankNumber: { type: String }
    },
    sponsor: {
        name: { type: String },
        period: {
            startDate: { type: Date },
            endDate: { type: Date }
        },
        contact: { type: String },
        amount: { type: String },
    },
    hoursPerWeek: { type: Number, default: 0 },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    ranking: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    bankTopUp: { type: Number, default: 0 },
    zGold: { type: Number, default: 0 },
    diamond: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    matches: { type: Number, default: 0 },
    fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ comment: String, commenter: mongoose.Schema.Types.ObjectId }],
    ratings: [{ rating: Number, rater: mongoose.Schema.Types.ObjectId }],
    endorsements: [{ endorsement: String, endorser: mongoose.Schema.Types.ObjectId }],
    successPasses: { type: Number, default: 0 },
    totalTravelDistance: { type: Number, default: 0 },
    matchDates: [{ date: Date, score: String }],
    fairPlayRating: { type: Number, default: 0 },
    strengthRating: { type: Number, default: 0 },
    arrivalTimes: [{ time: Date }],
    goodRunnerRating: { type: Number, default: 0 },
    goodDefenderRating: { type: Number, default: 0 },
    aggressiveRating: { type: Number, default: 0 },
    goodPressingRating: { type: Number, default: 0 },
    failedPasses: { type: Number, default: 0 },
    unavailableDates: [{ date: Date, description: String }],
    socialInteractionHistory: [{ interaction: String, date: Date }],
    paymentHistory: [{ item: String, amount: Number, date: Date }],
    shoppingHistory: [{ item: String, amount: Number, date: Date }],
    recurringFees: [{ period: String, amount: Number, member: mongoose.Schema.Types.ObjectId, markedAsDone: Boolean }],
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
