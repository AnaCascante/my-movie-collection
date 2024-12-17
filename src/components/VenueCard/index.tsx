import { Link } from 'react-router-dom';
import { Media } from '../../services/VenuesService';
import Norway from '../../assets/Norway.png';
import { VenueData } from '../../services/Bookings';

interface VenueCardProps extends VenueData {
  country?: string;
  city?: string;
  isDetailed?: boolean; // Determines if the card is a small preview or a full page
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  description,
  media = [], // Default to an empty array if no media
  location,
  price,
  rating,
  meta,
  isDetailed,
}) => {
  const mediaItems: Media[] = Array.isArray(media) ? media : [media];
  const mediaItem = mediaItems.length > 0 ? mediaItems[0] : null;

  return (
    <div
      className={`relative flex flex-col items-center ${
        isDetailed ? 'w-full p-6 lg:p-12' : 'w-full max-w-sm p-4'
      } rounded-lg bg-white shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl`}
    >
      {/* Image Section */}
      {mediaItem ? (
        <img
          src={mediaItem.url}
          alt={mediaItem.alt}
          className={`w-full rounded-t-lg object-cover ${
            isDetailed ? 'h-96' : 'h-48'
          }`}
        />
      ) : (
        <img
          src={Norway}
          alt="Missing image"
          className={`w-full rounded-t-lg object-cover ${
            isDetailed ? 'h-96' : 'h-48'
          }`}
        />
      )}

      {/* Content Section */}
      <div className="w-full p-4">
        <h2
          className={`text-gray-800 ${isDetailed ? 'text-3xl' : 'text-xl'} font-semibold`}
        >
          {name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {location?.city || 'Not specified'},{' '}
          {location?.country || 'Not specified'}
        </p>

        <p
          className={`text-gray-800 ${isDetailed ? 'mt-4 text-2xl' : 'mt-2 text-lg'} font-bold`}
        >
          ${price} per night
        </p>
        <p className="text-md mt-1 text-gray-800">Rating: {rating || 0}/5</p>

        {/* Description for detailed view */}
        {isDetailed && description && (
          <p className="mt-4 text-gray-600">
            {description || 'No description available'}
          </p>
        )}

        {/* Meta Information for detailed view */}
        {isDetailed && meta && (
          <div className="mt-4 space-y-2 text-gray-600">
            {meta.wifi && <p>🌐 Free WiFi</p>}
            {meta.parking && <p>🅿️ Free Parking</p>}
            {meta.breakfast && <p>🍳 Breakfast Included</p>}
            {meta.pets && <p>🐾 Pets Allowed</p>}
          </div>
        )}

        {/* Dynamic Guest Input for Detailed View */}
        {isDetailed ? (
          <div className="mt-6 flex items-center">
            <label className="mr-4 font-semibold text-gray-700">Guests:</label>
            <input
              type="number"
              min="1"
              max="10"
              className="w-16 rounded-lg border p-2 text-center focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        ) : (
          <Link
            to={`/venue/${id}`}
            className="mt-4 inline-block w-full rounded-lg bg-blue-600 py-2 text-center text-white transition duration-300 hover:bg-blue-700"
          >
            View Venue
          </Link>
        )}
      </div>
    </div>
  );
};

export default VenueCard;
