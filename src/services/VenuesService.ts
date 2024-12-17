import { ApiUrls } from './ApiUrl';

export interface MetaData {
  wifi?: boolean;
  parking?: boolean;
  breakfast?: boolean;
  pets?: boolean;
}

export interface Media {
  url: string;
  alt?: string;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Count {
  bookings: number;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: MetaData;
  location: Location;
  _count: Count;
}

export const FetchVenues = async (): Promise<Venue[]> => {
  const response = await fetch(ApiUrls.Venues);
  if (!response.ok) {
    throw new Error('Network not responding');
  }
  const result = await response.json();
  return result.data;
  try {
    // code that may throw an error
  } catch (error) {
    console.error(error);
  }
};

export const FetchVenueById = async (id: string): Promise<Venue> => {
  const response = await fetch(ApiUrls.Venues + `/${id}`);
  if (!response.ok) {
    throw new Error('Network not responding');
  }
  const result = await response.json();
  return result.data;
};
try {
  // code that may throw an error
} catch (error) {
  console.error(error);
}

// fetch med auth til profile med token og key
