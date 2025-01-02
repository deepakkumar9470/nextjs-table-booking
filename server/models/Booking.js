import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid contact number!`,
        },
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    bookingTime: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
    },


}, { timestamps: true })


const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;