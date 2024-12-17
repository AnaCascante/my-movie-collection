import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  meLocalStorage,
  removeLocalStorage,
} from '../../services/localStorage';
import VenueList from '../../components/VenueList';
import CreateVenue from '../../components/CreateVenue';
import BookingList from '../../components/BookingList';
import VenueListProfile from '../../components/VenueListProfile';
import ProfileEdit from '../../components/ProfileEdit';
import { updateUserProfile } from '../../services/Bookings';
import { API_KEY } from '../../services/Registration';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  _count?: {
    booking?: number;
    venue?: number;
  };
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCreatingVenue, setIsCreatingVenue] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = meLocalStorage('user');
    console.log('🚀 ~ useEffect ~ storedUser:', storedUser);
    const storedToken = meLocalStorage('token');

    if (!storedUser || !storedToken) {
      navigate('/login');
    } else {
      // Fetch user profile data
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${storedUser.name}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedToken}`,
                'X-Noroff-API-Key': API_KEY,
              },
            }
          );

          if (!response.ok) {
            throw new Error('Error fetching user profile');
          }

          const userProfileData = await response.json();

          // Update user state with fetched data
          const updatedUser = {
            ...storedUser.data,
            ...userProfileData.data,
          };

          setUser(updatedUser);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          alert('Failed to load user profile. Please try again later.');
        }
      };

      fetchUserProfile();
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div
        className="relative h-48 bg-cover bg-center sm:h-64 md:h-72 lg:h-80"
        style={{
          backgroundImage: `url(${user.banner?.url || 'https://via.placeholder.com/150'})`,
        }}
      >
        {/* Avatar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
          <img
            src={user.avatar?.url || 'https://via.placeholder.com/100'}
            alt={user.avatar?.alt || 'User Avatar'}
            className="h-24 w-24 rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32 md:h-40 md:w-40"
          />
        </div>
      </div>

      {/* User Info Section */}
      <div className="mt-16 px-4 text-center md:mt-24">
        <h1 className="text-2xl font-semibold">{user.name || 'Username'}</h1>
        <p className="text-gray-600">{user.email || 'user@example.com'}</p>
        <p className="mt-2 text-gray-700">
          {user.bio || 'This user has no bio.'}
        </p>

        {/* Edit Profile Button */}
        <button
          onClick={() => setIsEditingProfile((prev) => !prev)}
          className="mt-4 rounded bg-yellow-600 px-6 py-2 text-white hover:bg-yellow-500"
        >
          {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
        </button>

        {isEditingProfile && (
          <ProfileEdit
            name={user.name}
            profile={{
              avatar: user.avatar,
              banner: user.banner,
              venueManager: user.venueManager,
              bio: 'hi',
            }}
            updateUserProfile={updateUserProfile}
          />
        )}

        {/* Booking and Venue Counts */}
        <div className="mt-4">
          {user.name && <BookingList userName={user.name} />}
          {user.name && user.venueManager && (
            <VenueListProfile userName={user.name} />
          )}
        </div>

        {/* Venues List if Venue Manager */}
        {user.venueManager && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Create a New Venue</h2>

            {/* Form to createvenue*/}
            {isCreatingVenue ? (
              <CreateVenue />
            ) : (
              <>
                <VenueList userId={user.id} venues={[]} />

                <button
                  onClick={() => setIsCreatingVenue(true)}
                  className="mt-4 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-500"
                >
                  Create New Venue
                </button>
              </>
            )}
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            removeLocalStorage('token');
            removeLocalStorage('role');
            removeLocalStorage('user');
            navigate('/login');
          }}
          className="mb-4 mt-8 rounded bg-red-600 px-6 py-2 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
