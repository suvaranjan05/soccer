const User = require("../models/User");
const Referee = require("../models/Referee");


const getRefereeProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const referee = await Referee.findOne({ user: userId }).populate("user", "userName email role");

        const { _id, userName, role, email } = referee.user;
        let responseData = { _id, userName, role, email };

        responseData.fullName = referee.fullName;
        responseData.avatar = referee.avatar;
        responseData.dateOfBirth = referee.dateOfBirth;
        responseData.address = referee.address;
        responseData.age = referee.age;
        responseData.gender = referee.gender;
        responseData.phone = referee.phone;
        responseData.occupation = referee.occupation;
        responseData.zGold = referee.zGold;
        responseData.diamond = referee.diamond;

        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


const refereeBasicInfoUpdate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, dateOfBirth, age, gender, phone, occupation, address } = req.body;

        if (!fullName || !dateOfBirth || !age || !gender || !phone || !occupation || !address) {
            return res.status(404).json({ msg: 'All fields are required' });
        }

        const referee = await Referee.findOne({ user: userId })

        if (!referee) {
            return res.status(404).json({ msg: 'Team Manager not found' });
        }

        referee.fullName = fullName;
        referee.dateOfBirth = dateOfBirth;
        referee.age = age;
        referee.gender = gender;
        referee.phone = phone;
        referee.occupation = occupation;
        referee.address = address;

        // Save the updated user (unchanged)
        await referee.save();

        res.json({ msg: 'Refereer Profile updated successfully' });
    } catch (error) {
        console.log('Error updating profile:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getAllReferees = async (req, res) => {
    try {
        // Find all referees and populate user details
        const referees = await Referee.find()
            .populate({
                path: 'user',
                select: 'userName'
            })
            .select('_id avatar fee user');

        res.status(200).json(referees);
    } catch (error) {
        console.error('Error fetching all referees:', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getRefereeProfile, refereeBasicInfoUpdate, getAllReferees
};
