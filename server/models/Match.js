const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Free', 'Share', 'WinnerPayLess'], required: true },
    fees: {
        fieldFee: { type: Number, default: 0 },
        refFee: { type: Number, default: 0 },
        titleFee: { type: Number, default: 0 },
        joiningFee: { type: Number, default: 0 }
    },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    status: { type: String, enum: ['Open', 'Scheduled', 'Ongoing', 'Completed', 'Canceled'], default: 'Open' },
    maxTeams: { type: Number, default: 2 },
    pendingTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    confirmedTeams: [{
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        color: { type: String },
        jersey: { type: String },
        number: { type: String }
    }],
    pendingPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    confirmedPlayers: [{
        player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
    }],
    description: { type: String },
    photos: [{ type: String }],
    referee: { type: mongoose.Schema.Types.ObjectId, ref: 'Referee' },
    field: { type: mongoose.Schema.Types.ObjectId, ref: 'Field' },
    playerNeed: { type: Number },
    reports: [{
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        referee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: { type: String },
        redCards: [{ player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, count: { type: Number } }],
        yellowCards: [{ player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, count: { type: Number } }],
        arrivalOnTime: { type: Boolean },
        confirmedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: { type: String },
        weatherCancellation: { type: Boolean, default: false }
    }],
    cancellation: {
        requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        reason: { type: String },
        penaltyFee: { type: Number },
        substituteTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
    },
    documents: [{
        type: { type: String, enum: ['Receipt', 'Contract'] },
        url: { type: String },
        partiesInvolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
