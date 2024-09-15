
const open_lib_url = 'https://openlibrary.org';
const search_url = `${open_lib_url}/search`

const headers = new Headers({
    "User-Agent": "midshelf/1.0 (nathan.zadkovsky@gmail.com)"
});

const options = {
    method: 'GET',
    headers: headers
}
/**
 * will be to get your books in each category
 * returns: {title and authors minimum}
 */
export const books = () => {
    // todo
}

/**
 * will be used to fetch book meta data
 * @param bookdId string 
 */
export const meta = (bookdId: string) => {
    // todo
}

/**
 * will be to add a book to your shelf
 */
export const updateShelf = () => {
    // todo
}




export type SearchResult = {
    author_name: string[],
    key: string,
    title: string,
    language?: string[]
}


/**
 * will be to search books 
 * @param title -- should be text/value to be more generic
 */
export const search = (title = 'brothers karamazov'): Promise<SearchResult[]> => {
    const search_title = title.replace(' ', '+')
    const url = search_url + `.json?q=${search_title}&fields=key,title,author_name,language&lang=en`

    console.log("[seach] ", title)
    return fetch(url, options).then(
        (res) => res.json()
    ).then( (res) => {
        return res.docs ?? []
    }).catch(
        (err) => {
            console.error('ERROR:', err)
            return null
        }
    )
}
