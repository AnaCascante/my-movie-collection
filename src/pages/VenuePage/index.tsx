import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchVenueById, Venue } from '../../services/VenuesService';
import VenueCard from '../../components/VenueCard';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FcCalendar } from 'react-icons/fc';
import { BookVenue } from '../../services/Bookings';

const VenuePage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | [Date, Date]>(
    new Date()
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const token = localStorage.getItem('token');

  const handleDateChange = (date: Date | Date[]) => {
    if (Array.isArray(date)) {
      setSelectedDate(date as [Date, Date]);
    } else {
      setSelectedDate([date, date]);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    const getVenue = async () => {
      try {
        const fetchedVenue = await FetchVenueById(id);
        setVenue(fetchedVenue);
      } catch (error) {
        console.error(error);
      }
    };
    getVenue();
  }, [id]);

  const handleBooking = async () => {
    if (!token) {
      alert(
        'You need to be a registered user to book a venue. Please log in or register.'
      );
      return;
    }

    if (!venue || !selectedDate) {
      return;
    }

    const [dateFrom, dateTo] = Array.isArray(selectedDate)
      ? selectedDate
      : [selectedDate, selectedDate];

    const bookingData = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests: 1,
      venueId: id,
    };

    console.log('Booking data:', bookingData);

    try {
      const data = await BookVenue(bookingData);
      if (data.success) {
        setShowCalendar(false);
        alert('Venue booked successfully');
      } else {
        alert(data?.error);
      }
    } catch (error) {
      console.error('Error booking the venue:', error);
      alert('Failed to book the venue');
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="mx-auto flex w-full max-w-md items-center justify-center p-4 sm:max-w-lg md:max-w-2xl md:p-6 lg:max-w-3xl lg:p-8 xl:max-w-5xl">
        <VenueCard
          key={venue.id}
          id={venue.id}
          name={venue.name}
          description={venue.description}
          media={
            venue.media.length > 0
              ? { url: venue.media[0].url, alt: venue.media[0].alt }
              : undefined
          }
          city={venue.location.city}
          country={venue.location.country}
          price={venue.price}
          rating={venue.rating}
          meta={venue.meta}
          isDetailed={true}
          maxGuests={venue.maxGuests}
        />
      </div>
      <div
        className={`Calendar-toggle Calendar-container flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-all duration-300 ${
          showCalendar
            ? 'mt-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'
            : 'w-auto'
        }`}
        onClick={toggleCalendar}
      >
        <span className="ml-2 text-lg font-bold text-primary underline">
          Book your stay
        </span>
        <FcCalendar size={50} />

        {showCalendar && (
          <div className="mt-4 block w-full">
            <div
              className="overflow-hidden rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <Calendar
                onChange={(value) => handleDateChange(value as Date | Date[])}
                value={selectedDate}
                selectRange={true}
                tileClassName={({ date }) => {
                  if (date.getDay() === 0 || date.getDay() === 6) {
                    return 'bg-red-200';
                  }
                }}
                className="w-full"
              />
            </div>
            <button
              className="mx-auto mt-4 flex items-center justify-center rounded bg-primary p-4 py-2 text-lg font-bold text-secondary"
              onClick={handleBooking}
            >
              Book now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuePage;
