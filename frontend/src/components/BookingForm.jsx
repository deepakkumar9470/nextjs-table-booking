"use client";

import { useState } from "react";
import AddTableBooking from "./AddTableBooking";

const BookingForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Booking
      </button>
      {isModalOpen && (
        <AddTableBooking
          openTaskAddModal={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default BookingForm;
