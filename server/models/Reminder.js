const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who created the reminder
    recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // The users who will receive the reminder
    }],
    message: { type: String, required: true }, // The message content of the reminder
    startDateTime: { type: Date, required: true }, // The start date and time for the reminder
    stop: { type: Boolean, default: false }, // Boolean flag to manually stop the reminder
    repeat: {
        type: { type: String, enum: ['minute', 'hourly', 'daily', 'weekly', 'weekdays', 'monthly', 'yearly'] }, // Repeat type
        every: { type: Number }, // Interval for repetition
        weekdays: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }] // Selected weekdays for weekly repeat
    },
    finishedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users for whom the reminder is finished
    createdAt: { type: Date, default: Date.now } // Timestamp of when the reminder was created
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
