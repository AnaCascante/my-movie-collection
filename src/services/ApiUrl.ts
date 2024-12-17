export const BaseUrl = '';/* add baseapiurl*/

export const ApiUrls = { /*add here needed endpoints- see exemple*/
  Login: `${BaseUrl}/auth/login`,
  Register: `${BaseUrl}/auth/register`,
  Venues: `${BaseUrl}/holidaze/venues`,
  Bookings: `${BaseUrl}/holidaze/bookings`,
  Users: `${BaseUrl}/holidaze/profiles`,
  Me: `${BaseUrl}/me`,
  Venue: (id: string) => `${BaseUrl}/holidaze/venues/${id}`,
  Booking: (id: string) => `${BaseUrl}/holidaze/bookings/${id}`,
  User: (id: string) => `${BaseUrl}/holidaze/profiles/${id}`,
  UserBookings: (name: string) =>
    `${BaseUrl}/holidaze/profiles/${name}/bookings`,
  UserVenues: (name: string) => `${BaseUrl}/holidaze/profiles/${name}/venues`,
  VenueBookings: (id: string) => `${BaseUrl}/holidaze/venues/${id}/bookings`,
};
