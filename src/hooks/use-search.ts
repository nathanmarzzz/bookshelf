import React, {useCallback, useMemo, useState} from 'react'

import {search, SearchResult} from '../data/books'


type SearchOptions = 'title' | 'author' | 'isbn'


type Props = {
    text: string,
    searchBy: SearchOptions,
    language: string
}


const filterSearch = (data: SearchResult[], language = 'eng') => {
    console.log('[filterSearch] data: ', data)

    const res = data.find((book) => book?.language?.length == 1 && book.language.includes(language))
    console.log('[filterSearch] filter res: ', res)

}

export const useSearch = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    const fetch = useCallback(async () => {
        setLoading(true)
        search(props.text).then(
            (res) => {
                console.log('data: ', res)

                filterSearch(res, props.language)
            }
        ).catch(
            (err) => console.error('ERROR: ', err)
        ).finally(() => setLoading(false))
    }, [props])

    


    return { fetch, loading }
}