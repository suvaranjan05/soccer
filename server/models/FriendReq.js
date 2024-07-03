const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const FriendRequest = mongoose.model('FriendReq', friendRequestSchema);

module.exports = FriendRequest;
