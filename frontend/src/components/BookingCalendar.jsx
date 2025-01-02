"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BookingCalendar({ bookings }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getBookingsForDate = (bookings, date) => {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate.toISOString().split("T")[0] === formattedDate;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <ChevronLeft
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        />
        
       
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <ChevronRight 
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        />
        
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-semibold text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {emptyDays.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="bg-white dark:bg-gray-800 h-24 sm:h-32"
          />
        ))}
        {days.map((day) => {
          const dayBookings = getBookingsForDate(bookings, day);
          return (
            <div
              key={day}
              className="bg-white dark:bg-gray-800 h-24 sm:h-32 p-2"
            >
              <div className="font-semibold text-gray-700 dark:text-gray-300">
                {day}
              </div>
              {dayBookings.length > 0 && (
                <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                  {dayBookings.length} booking
                  {dayBookings.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
