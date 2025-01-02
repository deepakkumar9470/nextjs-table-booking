"use client";

import { addBooking, getBookings } from "@/lib/actions";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const AddTableBooking = ({ openTaskAddModal, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    bookingDate: "",
    bookingTime: "",
    guests: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedDate = formData.bookingDate;
      const response = await addBooking({
        ...formData,
        bookingDate: formattedDate,
      });
      if (response.success) {
        toast.success(response.data.message || "Table booked..");
        await getBookings();
        onClose();
      } else {
        toast.error("Slot already booked");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("An error occurred while adding the booking.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!openTaskAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-100 rounded-2xl shadow-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl text-blue-500 font-semibold mb-6">
            Book a Table
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              { name: "name", placeholder: "Enter name...", type: "text" },
              { name: "contact", placeholder: "Enter contact...", type: "text" },
              { name: "bookingDate", placeholder: "Select date", type: "date" },
              { name: "bookingTime", placeholder: "Select time", type: "time" },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-transparent text-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent text-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-3xl hover:bg-gray-700"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-3xl ${
                  isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-500"
                } text-white`}
                disabled={isLoading}
              >
                {isLoading ? <p><Loader/> Booking...</p> : "Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTableBooking;
