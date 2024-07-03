const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    postalCode: { type: String, required: true },
    gate: { type: String },
    photo: { type: String },
    link: { type: String },
    fee: { type: Number },
    shower: { type: Boolean, default: false },
    showerRating: { type: Number },
    toilet: { type: Boolean, default: false },
    toiletRating: { type: Number },
    rating: { type: Number },
    facilitiesRating: { type: Number },
    review: { type: String },
    childrenPlayground: { type: Boolean, default: false },
    childrenPlaygroundRating: { type: Number },
    foodCourtNearby: { type: Boolean, default: false },
    foodCourtNearbyRating: { type: Number },
    whereToEatAndDrink: { type: String },
    whereToEatAndDrinkRating: { type: Number },
    deposit: { type: Number },
    paymentStatus: { type: String, enum: ['Paid', 'Unpaid', 'Pending'] },
    areas: [{ type: String }],
    instructionOrNote: { type: String }
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
