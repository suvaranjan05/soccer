const schedule = require('node-schedule');
const Reminder = require('../models/Reminder');
const notificationController = require('../controllers/notificationController');

const scheduleRecurringReminders = () => {
    const job = schedule.scheduleJob('* * * * *', async () => { // Runs every minutes
        try {
            const currentDateTime = new Date();
            // console.log(`Job running at: ${currentDateTime}`);

            const reminders = await fetchActiveReminders(currentDateTime);

            for (const reminder of reminders) {
                if (!reminder.stop) {
                    await sendReminderNotifications(reminder);
                    await updateNextReminderDateTime(reminder);
                }
            }

            // console.log('Scheduled recurring reminders sent successfully');
        } catch (error) {
            console.error('Error sending scheduled recurring reminders:', error);
        }
    });
};

const fetchActiveReminders = async (currentDateTime) => {
    const reminders = await Reminder.find({
        startDateTime: { $lte: currentDateTime }, // Check if startDateTime is less than or equal to currentDateTime
        stop: false
    }).exec();
    return reminders;
};

const sendReminderNotifications = async (reminder) => {
    try {
        const message = `Reminder: ${reminder.message}`;
        for (const recipientId of reminder.recipients) {
            if (!reminder.finishedFor.includes(recipientId)) {
                await notificationController.createNotification(recipientId, message, '/dashboard', 'reminder');
            }
        }
    } catch (error) {
        console.error('Error sending reminder notification:', error);
    }
};

const updateNextReminderDateTime = async (reminder) => {
    try {
        const { repeat } = reminder;
        if (repeat && repeat.type) {
            const nextReminderDateTime = calculateNextReminderDateTime(reminder.startDateTime, repeat);
            await Reminder.findByIdAndUpdate(reminder._id, { $set: { startDateTime: nextReminderDateTime } });
        }
    } catch (error) {
        console.error('Error updating next reminder date:', error);
    }
};

const calculateNextReminderDateTime = (currentDateTime, repeat) => {
    switch (repeat.type) {
        case 'minute':
            return new Date(currentDateTime.getTime() + repeat.every * 60000);
        case 'hourly':
            return new Date(currentDateTime.getTime() + repeat.every * 3600000);
        case 'daily':
            return new Date(currentDateTime.getTime() + 24 * 3600000);
        case 'weekly':
            return new Date(currentDateTime.getTime() + 7 * 24 * 3600000);
        case 'weekdays':
            const currentDayOfWeek = currentDateTime.getDay();
            const weekdays = repeat.weekdays.map(day => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(day));
            const nextDay = weekdays.find(day => day > currentDayOfWeek) || weekdays[0] + 7;
            return new Date(currentDateTime.getTime() + (nextDay - currentDayOfWeek) * 24 * 3600000);
        case 'monthly':
            return new Date(currentDateTime.getFullYear(), currentDateTime.getMonth() + repeat.every, currentDateTime.getDate(), currentDateTime.getHours(), currentDateTime.getMinutes());
        case 'yearly':
            return new Date(currentDateTime.getFullYear() + repeat.every, currentDateTime.getMonth(), currentDateTime.getDate(), currentDateTime.getHours(), currentDateTime.getMinutes());
        default:
            return null;
    }
};

scheduleRecurringReminders();

module.exports = {
    scheduleRecurringReminders,
};
