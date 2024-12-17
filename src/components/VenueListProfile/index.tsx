import React, { useEffect, useState } from 'react';
import { VenueByProfile, VenueData } from '../../services/Bookings'; // Make sure to import FetchVenueByProfile
import VenueCardProfile from '../VenueCardProfile';

interface VenueListProps {
  userName: string;
}

const VenueListProfile: React.FC<VenueListProps> = ({ userName }) => {
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        // Call the FetchVenueByProfile function with the name prop
        const response = await VenueByProfile(userName);
        setVenues(response);
      } catch (error) {
        setError('Error fetching venues. Please try again later.');
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [name]); // Ensure that the effect runs when name changes

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Available Venues</h2>
      <p className="mb-4">
        {venues.length > 0
          ? `There ${venues.length === 1 ? 'is' : 'are'} ${venues.length} ${venues.length === 1 ? 'venue' : 'venues'} available.`
          : 'No venues available at the moment.'}
      </p>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <VenueCardProfile key={venue.id} venue={venue} />
          ))
        ) : (
          <p className="col-span-full my-4 text-center">No venues found</p>
        )}
      </div>
    </div>
  );
};

export default VenueListProfile;
