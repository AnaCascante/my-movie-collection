import { ApiUrls } from './ApiUrl';

export const mailRegex = /^[a-zA-Z0-9._%+-]+@stud.noroff\.no$/;
export const API_KEY = import.meta.env.VITE_API_KEY;

export interface UserData {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  data?: any;
  accessToken?: string;
  token?: string;
  user?: UserData;
  result?: any;
  success?: boolean;
  venueManager?: boolean;
}

export interface RegisterResponse {
  data: {
    accessToken?: string;
    token?: string;
    user?: UserData;
    result?: any;
    success?: boolean;
    venueManager?: boolean;
  };
}

export const RegisterUser = async (
  data: UserData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(ApiUrls.Register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('HTTP error, status = ' + response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed registration', error);
    return {
      data: {
        success: false,
        result: null,
      },
    };
  }
};

console.log('RegisterUser', RegisterUser);

export const LoginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await fetch(ApiUrls.Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY,
      },

      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network not responding');
    }
    const result: LoginResponse = await response.json();

    return result;
  } catch (error) {
    console.error('Unable to Login', error);
    throw error;
  }
};
