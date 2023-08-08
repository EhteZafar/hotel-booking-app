const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    roomNumber: [{number: Number, unavailableDates: {type: [Date]}}],
},{timestamps: true}
);

module.exports = mongoose.model('Room', roomSchema);