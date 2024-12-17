import React from 'react';
import { BookingData, DeleteBooking } from '../../services/Bookings';

interface BookingCardProps {
  booking: BookingData;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        if (!booking.id) {
          return;
        }

        await DeleteBooking(booking.id);
        alert('Booking deleted successfully.');
      } catch (error) {
        alert('Failed to delete booking. Please try again later.');
      }
    }
  };

  return (
    <div className="relative mb-6 flex flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
      <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Booking for Venue:{' '}
        <span className="text-blue-600">{booking.venueId || 'N/A'}</span>
      </h3>

      <div className="flex flex-col space-y-3">
        <div className="flex justify-between rounded-md bg-gray-100 p-2">
          <span className="font-semibold text-gray-700">Date From:</span>
          <span className="text-gray-600">
            {new Date(booking.dateFrom).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between rounded-md bg-gray-100 p-2">
          <span className="font-semibold text-gray-700">Date To:</span>
          <span className="text-gray-600">
            {new Date(booking.dateTo).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between rounded-md bg-gray-100 p-2">
          <span className="font-semibold text-gray-700">Guests:</span>
          <span className="text-gray-600">{booking.guests}</span>
        </div>

        {booking.created && (
          <div className="flex justify-between rounded-md bg-gray-100 p-2">
            <span className="font-semibold text-gray-700">Created On:</span>
            <span className="text-gray-600">
              {new Date(booking.created).toLocaleDateString()}
            </span>
          </div>
        )}

        {booking.updated && (
          <div className="flex justify-between rounded-md bg-gray-100 p-2">
            <span className="font-semibold text-gray-700">Updated On:</span>
            <span className="text-gray-600">
              {new Date(booking.updated).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Full Width Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white transition-transform hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete Booking
      </button>
    </div>
  );
};

export default BookingCard;
