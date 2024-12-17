import { useState, useEffect, ChangeEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { FetchVenues, Venue } from '../../services/VenuesService';

export const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venues = await FetchVenues();
        setVenues(venues);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Whoops, something went wrong');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(search.toLowerCase()) ||
          venue.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVenues(filtered);
    }
  }, [search]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex items-center space-x-2">
      <BiSearch className="text-2xl text-primary" />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
        className="border-b border-secondary bg-transparent p-2 focus:outline-none"
      />
      {filteredVenues.length > 0 && (
        <ul className="w-full rounded-md border border-gray-200 bg-white">
          {filteredVenues.map((venue) => (
            <li
              key={venue.id}
              onClick={() => navigate(`/venue/${venue.id}`)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {venue.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
