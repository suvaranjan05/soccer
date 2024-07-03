const Notification = require('../models/Notification');

const createNotification = async (userId, message, redirectUrl, type) => {
    try {
        const notification = new Notification({
            user: userId,
            message,
            redirectUrl,
            type
        });
        await notification.save();
        console.log('Notification created successfully');
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};


const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const markNotificationAsSeen = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndUpdate(notificationId, { read: true });
        res.status(200).json({ msg: 'Notification marked as seen' });
    } catch (error) {
        console.error('Error marking notification as seen:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const deleteAllUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({ user: userId });
        res.status(200).json({ msg: 'All notifications deleted successfully' });
    } catch (error) {
        console.error('Error deleting notifications:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const countUserUnreadNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const count = await Notification.countDocuments({ user: userId, read: false });
        res.status(200).json({ unreadCount: count });
    } catch (error) {
        console.error('Error counting unread notifications:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const deleteOneNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        await Notification.findByIdAndDelete(notificationId);
        res.status(200).json({ msg: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    getUserNotifications,
    markNotificationAsSeen,
    deleteAllUserNotifications,
    countUserUnreadNotifications,
    deleteOneNotification,
    createNotification
};
