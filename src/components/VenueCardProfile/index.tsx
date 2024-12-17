import React, { useState } from 'react';
import { DeleteVenue, updateVenue, VenueData } from '../../services/Bookings';

interface VenueCardProps {
  venue: VenueData;
}

const VenueCardProfile: React.FC<VenueCardProps> = ({ venue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [venueDetails, setVenueDetails] = useState<VenueData>(venue);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        if (!venue.id) {
          return;
        }

        await DeleteVenue(venue.id);
        alert('Venue deleted successfully.');
        window.location.reload();
      } catch (error) {
        alert('Failed to delete venue. Please try again later.');
      }
    }
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateVenue(venueDetails.id!, venueDetails);

      alert('Venue updated successfully.');
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update venue. Please try again later.');
      console.error('Error updating venue:', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVenueDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="relative mb-6 flex flex-col rounded-lg border border-gray-300 bg-white p-6 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
      {isEditing ? (
        <>
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
            <input
              type="text"
              name="name"
              value={venueDetails.name}
              onChange={handleInputChange}
              className="w-full rounded-md border p-2 text-center"
              placeholder="Venue Name"
            />
          </h3>

          <textarea
            name="description"
            value={venueDetails.description}
            onChange={handleInputChange}
            placeholder="Venue Description"
            className="w-full rounded-md border p-2"
          />

          <div className="mt-4 flex flex-col space-y-3">
            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Max Guests:</span>
              <input
                type="number"
                name="maxGuests"
                value={venueDetails.maxGuests}
                onChange={handleInputChange}
                className="ml-2 rounded-md border p-2"
                placeholder="Max Guests"
              />
            </div>

            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={venueDetails.price}
                onChange={handleInputChange}
                className="ml-2 rounded-md border p-2"
                placeholder="Price"
              />
            </div>

            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Rating:</span>
              <input
                type="number"
                name="rating"
                value={venueDetails.rating}
                onChange={handleInputChange}
                className="ml-2 rounded-md border p-2"
                placeholder="Rating"
                step="0.1"
                max="5"
              />
            </div>
          </div>

          {/* Handle changes */}
          <button
            onClick={handleSave}
            className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-white transition-transform hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Save Venue
          </button>
        </>
      ) : (
        <>
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Venue:{' '}
            <span className="text-blue-600">
              {truncateText(venue.name || 'N/A', 9)}
            </span>
          </h3>
          <p className="text-gray-700">
            {truncateText(
              venue.description || 'No description available.',
              100
            )}{' '}
          </p>
          <div className="mt-4 flex flex-col space-y-3">
            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Max Guests:</span>
              <span className="text-gray-600">{venue.maxGuests}</span>
            </div>
            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Price:</span>
              <span className="text-gray-600">${venue.price}</span>
            </div>
            <div className="flex justify-between rounded-md bg-gray-100 p-2">
              <span className="font-semibold text-gray-700">Rating:</span>
              <span className="text-gray-600">{venue.rating}</span>
            </div>
          </div>

          {/* Update */}
          <button
            onClick={handleUpdate}
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-transform hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Venue
          </button>
        </>
      )}

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="mt-2 w-full rounded-md bg-red-600 px-4 py-2 text-white transition-transform hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Delete Venue
      </button>
    </div>
  );
};

export default VenueCardProfile;
