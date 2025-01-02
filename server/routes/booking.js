import express from 'express';
import { createBooking, deleteTaskById, getAllBookings, getBookingById } from '../controllers/bookingController.js';
const router = express.Router();

// Create Booking
// @ /api/booking/create 
router.post('/create',createBooking);

// Get Bookings
// @ /api/booking
router.get('/',getAllBookings);

//Get Single booking
// @ /api/booking/123
router.get('/:id',getBookingById);

// Delete booking
// @ /api/booking124
router.delete('/:id', deleteTaskById);

export default router;