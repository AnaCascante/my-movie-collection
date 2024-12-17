import React, { useState } from 'react';
import { createVenue, VenueData } from '../../services/Bookings';

const CreateVenue = () => {
  const [venueData, setVenueData] = useState<VenueData>({
    name: '',
    description: '',
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setVenueData((prevData) => ({
        ...prevData,
        meta: {
          ...prevData.meta,
          [name]: checked,
        },
      }));
    } else {
      setVenueData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createVenue(venueData);
    } catch (error) {
      console.error('Error submitting venue data:', error);
    }
  };

  return (
    <div className="mt-4 flex min-h-screen justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md"
      >
        {/* Name */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-700">Venue Name</label>
          <input
            type="text"
            name="name"
            value={venueData.name}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-700">Description</label>
          <textarea
            name="description"
            value={venueData.description}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-700">Price per Night</label>
          <input
            type="number"
            name="price"
            value={venueData.price}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        {/* Max Guests */}
        <div className="mb-4">
          <label className="mb-2 block text-gray-700">Max Guests</label>
          <input
            type="number"
            name="maxGuests"
            value={venueData.maxGuests}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        {/* Amenities (Meta) */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="wifi"
              checked={venueData?.meta?.wifi}
              onChange={handleChange}
              className="mr-2"
            />
            Wifi
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="parking"
              checked={venueData?.meta?.parking}
              onChange={handleChange}
              className="mr-2"
            />
            Parking
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="breakfast"
              checked={venueData?.meta?.breakfast}
              onChange={handleChange}
              className="mr-2"
            />
            Breakfast
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="pets"
              checked={venueData?.meta?.pets}
              onChange={handleChange}
              className="mr-2"
            />
            Pets Allowed
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-500"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
};

export default CreateVenue;
