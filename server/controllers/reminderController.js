const Reminder = require('../models/Reminder');
const Player = require('../models/Player');
const TeamManager = require('../models/TeamManager');


const createReminder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { recipients, message, eventType, startDateTime, repeat } = req.body;

        if (!recipients || !message || !eventType || !startDateTime || !repeat) {
            return res.status(400).json({ msg: 'Missing Required Field' });
        }

        const reminder = new Reminder({
            sender: userId,
            recipients,
            message,
            eventType,
            startDateTime,
            repeat,
            stop: false  // Assuming default for new reminders is not stopped
        });

        await reminder.save();
        res.status(201).json({ msg: 'Reminder created successfully', reminder });
    } catch (error) {
        console.error('Error creating reminder:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getUserReminders = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch reminders created by the manager
        const reminders = await Reminder.find({ recipients: userId }).sort({ createdAt: -1 });

        const populateFields = async (userIds) => {
            const players = await Player.find({ user: { $in: userIds } }).populate('user', 'userName');
            return players.map(player => ({
                _id: player.user._id,
                userName: player.user.userName,
                avatar: player.avatar,
            }));
        };

        // Populate the reminders
        const populatedReminders = await Promise.all(reminders.map(async (reminder) => {
            const sender = await TeamManager.findOne({ user: reminder.sender }).populate('user', 'userName');
            const populatedRecipients = await populateFields(reminder.recipients);
            const populatedFinishedFor = await populateFields(reminder.finishedFor);

            return {
                ...reminder.toObject(),
                sender: {
                    _id: sender.user._id,
                    userName: sender.user.userName,
                    avatar: sender.avatar,
                },
                recipients: populatedRecipients,
                finishedFor: populatedFinishedFor,
            };
        }));

        res.status(200).json(populatedReminders);
    } catch (error) {
        console.error('Error fetching manager reminders:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const deleteReminder = async (req, res) => {
    try {
        const reminderId = req.params.id;
        const userId = req.user._id;

        // Find the reminder by ID
        const reminder = await Reminder.findById(reminderId);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if the user is the sender of the reminder
        if (reminder.sender.toString() !== userId.toString()) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // Delete the reminder
        await Reminder.findByIdAndDelete(reminderId);

        res.status(200).json({ msg: 'Reminder deleted successfully' });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const stopReminder = async (req, res) => {
    try {
        const reminderId = req.params.id;
        const userId = req.user._id;

        // Find the reminder by ID
        const reminder = await Reminder.findById(reminderId);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if the user is the sender of the reminder
        if (reminder.sender.toString() !== userId.toString()) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // Stop the reminder
        reminder.stop = true;
        await reminder.save();

        res.status(200).json({ msg: 'Reminder stopped successfully' });
    } catch (error) {
        console.error('Error stopping reminder:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const resumeReminder = async (req, res) => {
    try {
        const reminderId = req.params.id;
        const userId = req.user._id;

        // Find the reminder by ID
        const reminder = await Reminder.findById(reminderId);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if the user is the sender of the reminder
        if (reminder.sender.toString() !== userId.toString()) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // Check if the reminder is already active
        if (!reminder.stop) {
            return res.status(400).json({ msg: 'Reminder is already active' });
        }

        // Resume the reminder
        reminder.stop = false;
        await reminder.save();

        res.status(200).json({ msg: 'Reminder resumed successfully' });
    } catch (error) {
        console.error('Error resuming reminder:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    createReminder,
    getUserReminders,
    deleteReminder,
    resumeReminder,
    stopReminder
};
