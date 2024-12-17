export const QueryCustomer = `
  {
    name
    email
    bio
    avatar {
      url
      alt
    }
    banner {
      url
      alt
    }
  }
`;

export const QueryVenue = `
 {
    id
    name
    description
    media {
      url
      alt
    }
    price
    maxGuests
    rating
    created
    updated
    meta {
      wifi
      parking
      breakfast
      pets
    }
    location {
      address
      city
      zip
      country
      continent
      lat
      lng
    }
    owner {
      name
      email
      bio
      avatar {
        url
        alt
      }
      banner {
        url
        alt
      }
    }
  }



`;

export const QueryOwner = `
    {
        name
        email
        bio
        avatar {
        url
        alt
        }
        banner {
        url
        alt
        }
    }
    `;

export const QueryBooking = `
    {
      id
      dateFrom
      dateTo
      guests
      created
      updated
      customer {
        name
        email
        bio
        avatar {
          url
          alt
        }
        banner {
          url
          alt
        }
      }
      venue {
        id
        name
        description
        media {
          url
          alt
        }
        price
        maxGuests
        rating
        meta {
          wifi
          parking
          breakfast
          pets
        }
        location {
          address
          city
          zip
          country
          continent
          lat
          lng
        }
        owner {
          name
          email
          bio
          avatar {
            url
            alt
          }
          banner {
            url
            alt
          }
        }
      }
    }
  `;

export const SearchQuery = (query: string) =>
  `/holidaze/venues/search?q=${query}`;
