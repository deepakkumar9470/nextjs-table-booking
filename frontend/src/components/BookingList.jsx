"use client";

import { deleteBooking, getBookings } from "@/lib/actions";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "./Loader";

export default function BookingList({ bookings }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [bookingList, setBookingList] = useState(bookings);

  const handleDeleteBooking = async (id) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await deleteBooking(id);
      if (response.success) {
        toast.success(response.message || "Booking deleted successfully");
        setBookingList((prev) => prev.filter((booking) => booking._id !== id));
        await getBookings();
      } else {
        toast.error(response.message || "Failed to delete booking");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 cursor-pointer">
        {!bookingList ? (
          <Loader />
        ) : (
          bookingList?.map((booking) => (
            <li
              key={booking._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                    {booking.name}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      {booking.guests} guests
                    </p>
                    <Trash
                      className={`cursor-pointer ${
                        isDeleting ? "opacity-50 pointer-events-none" : ""
                      }`}
                      size={16}
                      color="#ff4242"
                      onClick={() => handleDeleteBooking(booking._id)}
                    />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      {booking.contact}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <p>
                      {new Date(booking.bookingDate).toLocaleDateString()} at{" "}
                      {booking.bookingTime}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
