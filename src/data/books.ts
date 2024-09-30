import { getUUID } from '../utils/utils';
import { db_client } from '../api/local_db';

// const open_lib_url = 'https://openlibrary.org';
// const search_url = `${open_lib_url}/search`;

import { BOOK_API_KEY } from '@env';

const books_api_key = BOOK_API_KEY;

// api endpoints
const google_book_url = 'https://www.googleapis.com/books/v1';
const gsearch = 'volumes?q=';

/**
 *
 * @param name name of book to search
 * @param author optional -- name of author to search
 * @returns - url for search request to google books api
 */
const gsearch_url_builder = (name: string, author = '') => {
  const g_name = name.replace(' ', '+');
  const g_author = author.replace(' ', '+');
  let url = `${google_book_url}/${gsearch}`;

  if (g_name) {
    url += g_name;
  }
  if (g_author) {
    url += `+inauthor:${g_author}`;
  }

  return url + `&key=${books_api_key}`;
};

const headers = new Headers({
  'User-Agent': 'midshelf/1.0 (nathan.zadkovsky@gmail.com)',
});

const options = {
  method: 'GET',
  headers: headers,
};

/** ---------------------- schema ntoes for db design -------------------- */
type BookStatus = 'Read' | 'Reading' | 'DNF' | 'Want to Read';

type Review = {
  id: string;
  book_id: string;
  user_id: string;

  review: string; // actua review
  stars: number;
  status: BookStatus;
};

type Book = {
  id: string;
  name: string;

  author: string;
  // author_id: string; // do we want this for easier lookup?

  description: string;
  translated_by: string;

  reviews: Review[];
};

type Shelf = {
  [shelf_name in BookStatus]: Book[];
};

type User = {
  id: string; // uuid
  name: string;
  user_name: string;
  bio: string;

  shelf: Shelf;
  friends: User[]; // must be mutual

  genres: string;
  favorites: Book[];
};

type ShelfItem = {
  id: string;
  status: BookStatus;

  date_added: number | null; // ??
  date_started: number | null;
  date_finished: number | null;

  // ref to reviews
  review_id: string | null;
};

/**
 * what split of relational vs non relation do we want to maintain?
 *
 * user -> shelf -> shelf_name -> shelf_items (book + review)
 *  - reqs:
 *      - need to be able to click and get book meta data
 *      - need to find review data for books easily across users
 *          - should include curr_user review + friends reviews THEN others
 *      - be able to pull and update book data for users
 *
 * to keep in mind:
 *  - should include nav options for discussions (book_id)
 *  - should include link to book clubs / groups (book_id)
 */

/**
 * will be to get your books in each category
 * returns: {title and authors minimum}
 */
export const books = () => {
  // todo
};

/**
 * will be used to fetch book meta data
 * @param bookdId string
 *
 * - includes book data from from book api
 * - includes users book data
 *  - read status
 *
 * later:
 *  - book data from users
 *  - bok reviews
 */
export const meta = (bookdId: string) => {
  // todo
};

/**
 * will be to add a book to your shelf
 * and update its status
 */
export const updateShelf = () => {
  // todo
  // const;
};

// format for app after user searches for books
export type SearchData = {
  title: string;
  author: string;
  img_url?: string; // not yet -- need to figure out
  languages: string[];
  id: string;
};

/** ---- data retured from google api volume api ---- */
export type IndustryIdentifiers = {
  type: 'ISBN_10' | 'ISBN_13';
  identifier: string;
};

export type ImageLinked = {
  thumbnail: string;
  smallThumbnail: string;
};

export type ReadingModes = { text: boolean; image: true };

export type VolumeInfo = {
  authors: string[];
  categories: string[]; // genres
  description: string;
  imageLinks: ImageLinked;
  industryIdentifiers: IndustryIdentifiers[];
  language: string;
  printType: string;
  maturityRating: string;
  pageCount: number;
  previewLink: string;
  publishedDate: string; // ex: yyyy-mm-dd
  publisher: string;
  readingModes: ReadingModes;
  title: string;
  subtitle?: string;
};

export type AccessModeInfo = { isAvailable: boolean; acsTokenLink?: string };

export type AccessInfo = {
  country: string;
  epud: AccessModeInfo;
  pdf: AccessModeInfo;
};

export type SearchInfo = {
  textSnippet: string;
};
// api res from open ilb api result
export type SearchResult = {
  accessInfo: AccessInfo;
  id: string;
  etag: string;
  kind: string; // e.g. book#volume
  searchInfo: SearchInfo; // description
  selfLink: string; // link to GET by id -- e.g. "https://www.googleapis.com/books/v1/volumes/dZK3DwAAQBAJ"
  volumeInfo: VolumeInfo;
};

/**
 * will be to search books
 * @param title -- should be text/value to be more generic
 */
export const search = (title = ''): Promise<SearchResult[] | null> => {
  const url = gsearch_url_builder(title);

  return fetch(url, options)
    .then(res => res.json())
    .then(res => {
      return res.items ?? [];
    })
    .catch(err => {
      console.error('ERROR:', err);
      return null;
    });
};
