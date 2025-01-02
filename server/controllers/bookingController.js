import BookingModel from '../models/Booking.js';
import asyncHandler from 'express-async-handler';

/********** Creating new boobking *********/
export const createBooking = asyncHandler(async (req, res) => {
    try {
        const { name, contact, bookingDate, bookingTime, guests } = req.body;
        if (!name || !contact || !bookingDate || !bookingTime || !guests) {
            return res.status(400).json("All fields are required")
        }
        const isBooked = await BookingModel.findOne({ bookingDate })
        if (isBooked) {
            return res.status(400).json("Slot already booked")
        }

        const newBooking = new BookingModel({
            name,
            contact,
            bookingDate: bookingDate || Date.now(),
            bookingTime: bookingTime,
            guests: guests,
        });
        const savedBooking = await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create Booking" });
    }
});

/********** Getting all boobkings *********/
export const getAllBookings = asyncHandler(async (req, res) => {
    try {
        const allBookings = await BookingModel.find({})
            .sort({ createdAt: -1 });
        res.status(200).json({ message: "Bookings fetched successfully", bookings: allBookings });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings" });
    }
});

/********** Getting boobking task by id *********/
export const getBookingById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Invalid booking ID" });
    }
    try {


        const singleBooking = await BookingModel.findById(id)

        if (!singleBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ singleBooking });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch single task" });
    }
});




/********** Deleting single boobking by id *********/
export const deleteTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const task = await BookingModel.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Booking not found" });
        }
        await BookingModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Booking" });
    }
});   