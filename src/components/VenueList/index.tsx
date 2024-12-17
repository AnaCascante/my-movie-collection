import { useEffect, useState } from 'react';
import { FetchVenues, Venue } from '../../services/VenuesService';

interface VenueListProps {
  venues: Venue[];
  userId: string;
}

const VenueList: React.FC<VenueListProps> = ({ venues: initialVenues }) => {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const venues = await FetchVenues();
        setVenues(venues);
      } catch (error) {
        setError('Not able to fetch venues');
        setLoading(false);
        console.error(error);
      }
    };
    fetchVenues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Venue List</h2>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <h3>{venue.name}</h3>
            <p>{venue.location.toString()}</p>
            <p>{venue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
