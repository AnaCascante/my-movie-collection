import React, { useEffect, useState } from 'react';
import BookingCard from '../BookingCard';
import { BookingByProfile, BookingData } from '../../services/Bookings';

interface BookingListProps {
  userName: string;
}

const BookingList: React.FC<BookingListProps> = ({ userName }) => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await BookingByProfile(userName);
        setBookings(response);
      } catch (error) {
        setError('Error fetching bookings. Please try again later.');
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userName]);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Your Bookings</h2>
      <p className="mb-4">
        You have {bookings.length}{' '}
        {bookings.length === 1 ? 'booking' : 'bookings'}.
      </p>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="col-span-full my-4 text-center">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default BookingList;
