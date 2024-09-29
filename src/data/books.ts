import { getUUID } from '../utils/utils';
import { db_client } from '../api/local_db';

const open_lib_url = 'https://openlibrary.org';
const search_url = `${open_lib_url}/search`;

// api endpoints
const search_book = 'search';
const update_shelf = 'update-shelf';
const book_metadata = 'book-metadata';

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

// api res from open ilb api result
export type SearchResult = {
  author_name: string[];
  key: string;
  title: string;
  language: string[];
};

/**
 * will be to search books
 * @param title -- should be text/value to be more generic
 */
export const search = (
  title = 'brothers karamazov',
): Promise<SearchData[] | null> => {
  console.log('[sarch api] title ', title);
  const search_title = title.replace(' ', '+');
  const url =
    search_url +
    `.json?q=${search_title}&fields=key,title,author_name,language&lang=en`;

  console.log('[seach] ', title, url);
  return fetch(url, options)
    .then(res => res.json())
    .then(res => {
      console.log('[seach] res', res);
      return filterSearch(res.docs ?? []);
    })
    .catch(err => {
      console.error('ERROR:', err);
      return null;
    });
};

/**
 *
 * @param data - resp from search res
 * @param language - default to englist -- will be sent as a provider value
 * @returns
 */
const filterSearch = (data: SearchResult[], language = 'eng'): SearchData[] => {
  console.log('[filterSearch] data: ', data);

  const res: SearchData[] = data
    .filter(
      book => book?.language?.length == 1 && book.language.includes(language),
    )
    .map(book => ({
      author: book.author_name?.join(', ') ?? '',
      title: book.title,
      languages: book.language ?? '',
      id: getUUID(),
    }));

  console.log('[filterSearch] filter res: ', res);
  return res;
};
