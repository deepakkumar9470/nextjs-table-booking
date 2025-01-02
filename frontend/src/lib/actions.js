'use server'

export async function getBookings() {
 const res = await fetch("http://localhost:5000/api/booking");
 const data = await res.json();
 return data;
}

export async function addBooking(formData) {
  try {
    const bookingRes = await fetch('http://localhost:5000/api/booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!bookingRes.ok) {
      throw new Error(`Failed to add booking: ${bookingRes.statusText}`);
    }

    const data = await bookingRes.json();
    
    return { success: true, message: 'Booking added successfully', data };
  } catch (error) {
    return { success: false, message: error.message };
  }
}



export async function deleteBooking(bookingId) {
  try {
    const bookingRes = await fetch(`http://localhost:5000/api/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!bookingRes.ok) {
      const errorData = await bookingRes.json();
      return { success: false, message: errorData.message || "Failed to delete booking" };
    }

    return { success: true, message: "Booking deleted successfully" };
  } catch (error) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}
