import { Book, Shelf } from './books';
import { base_url_local } from './constants';

export type User = {
  id: string; // uuid
  name: string; // same as user name
  email: string;
  bio: string;

  shelf: Shelf;
  friends: User[]; // must be mutual

  genres: string;
  favorites: Book[];
};

const headers = new Headers({
  'User-Agent': 'midshelf/1.0',
  'Content-Type': 'application/json',
});

const user_url = `${base_url_local}/user`;

// Posts
const login_url = user_url + '/login';
const register_url = user_url + '/register';

// will get user by id

// login or register
export const user = async (
  payload: {
    name: string;
    email: string;
    password: string;
  },
  type: 'login' | 'register',
): Promise<{ msg: string; error: string | null }> => {
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  };

  console.log('[user] payload ', payload);
  try {
    const url = type == 'login' ? login_url : register_url;
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error('[user] ' + error);
    return { msg: '[user] Error', error: error?.message ?? '' };
  }
};
/**
 * will be used to search for users to add as friends or follow
 */
export const search = () => {};

/**
 * request friend / follow
 */
export const request = () => {};
