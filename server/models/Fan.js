const mongoose = require('mongoose');

const fanSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    favoriteTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    favoritePlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    interactionHistory: [{
        type: String,
        interaction: String,  // Interaction description
        date: { type: Date, default: Date.now }
    }],
    contact: {
        email: { type: String },
        phone: { type: String },
        address: { type: String }
    }
}, { timestamps: true });

const Fan = mongoose.model('Fan', fanSchema);

module.exports = Fan;
