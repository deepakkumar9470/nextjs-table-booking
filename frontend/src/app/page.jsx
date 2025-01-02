import { getBookings } from '@/lib/actions'
import BookingForm from '@/components/BookingForm'
import BookingCalendar from '@/components/BookingCalendar'
import BookingList from '@/components/BookingList'

export default async function Home() {
  const { bookings } = await getBookings()

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bookings</h2>
          <BookingForm />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Calendar</h3>
            <BookingCalendar bookings={bookings} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Bookings</h3>
            <BookingList bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  )
}

