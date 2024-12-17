import React, { useState } from 'react';

interface Avatar {
  url: string;
  alt: string;
}

interface Banner {
  url: string;
  alt: string;
}

interface UserProfile {
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
}

// Url validation

const isValidURL = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z0-9\\-]+)\\.)+[a-z]{2,}|localhost|' + // domain name
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP address
      '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' + // IPv6
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$',
    'i'
  ); // port and path
  return !!pattern.test(url);
};

// Edit Profile Component
const ProfileEdit: React.FC<{
  name: string;
  profile: UserProfile;
  updateUserProfile: (name: string, profile: UserProfile) => Promise<boolean>;
}> = ({ name, profile, updateUserProfile }) => {
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile>(profile);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, [name]: value },
    }));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      banner: { ...prev.banner, [name]: value },
    }));
  };

  const handleVenueManagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      venueManager: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // filter out empty values

    const profileToUpdate: any = {
      bio: updatedProfile.bio || undefined,
      venueManager: updatedProfile.venueManager,
    };

    // Validate URLs

    if (isValidURL(updatedProfile.avatar.url)) {
      profileToUpdate.avatar = {
        url: updatedProfile.avatar.url,
        alt: updatedProfile.avatar.alt || undefined,
      };
    }

    if (isValidURL(updatedProfile.banner.url)) {
      profileToUpdate.banner = {
        url: updatedProfile.banner.url,
        alt: updatedProfile.banner.alt || undefined,
      };
    }

    try {
      const success = await updateUserProfile(name, profileToUpdate);
      if (success) {
        alert('Profile updated successfully');
        window.location.reload();
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md">
      <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="bio"
          value={updatedProfile.bio}
          onChange={handleInputChange}
          placeholder="Bio"
          className="w-full rounded border p-2"
        />

        <h3 className="font-semibold">Avatar</h3>
        <input
          type="text"
          name="url"
          value={updatedProfile.avatar.url}
          onChange={handleAvatarChange}
          placeholder="Avatar URL"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          name="alt"
          value={updatedProfile.avatar.alt}
          onChange={handleAvatarChange}
          placeholder="Avatar Alt Text"
          className="w-full rounded border p-2"
        />

        <h3 className="font-semibold">Banner</h3>
        <input
          type="text"
          name="url"
          value={updatedProfile.banner.url}
          onChange={handleBannerChange}
          placeholder="Banner URL"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          name="alt"
          value={updatedProfile.banner.alt}
          onChange={handleBannerChange}
          placeholder="Banner Alt Text"
          className="w-full rounded border p-2"
        />

        <h3 className="font-semibold">Venue Manager</h3>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={updatedProfile.venueManager}
            onChange={handleVenueManagerChange}
            className="mr-2"
          />
          <span>Is Venue Manager?</span>
        </label>

        <button
          type="submit"
          className="mt-4 block w-full rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
