import React, { useEffect, useState } from 'react';
import { FetchVenues, Venue } from '../../services/VenuesService';
import VenueCard from '../../components/VenueCard';
import { SearchBar } from '../../components/SearchBar';

const HomePage: React.FunctionComponent = (): JSX.Element => {
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await FetchVenues();
        setVenues(venues);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log('venues', venues);

  return (
    <div className="flex-grow bg-gray-100">
      <SearchBar />

      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <VenueCard
            key={venue.id}
            id={venue.id}
            name={venue.name}
            media={venue.media[0]}
            city={venue.location.city}
            country={venue.location.country}
            price={venue.price}
            rating={venue.rating}
            meta={venue.meta}
            isDetailed={false}
            description={venue.description}
            maxGuests={venue.maxGuests}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
