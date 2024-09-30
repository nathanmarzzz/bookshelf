import { useCallback, useEffect, useState } from 'react';

import { search, SearchResult } from '../data/books';

import { debounce } from 'lodash';

type SearchOptions = 'title' | 'author' | 'isbn';

type Props = {
  text: string;
  searchBy: SearchOptions;
  language: string;
};

export const useSearch = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SearchResult[] | null>([]);

  const fetch = useCallback(async () => {
    if (!props.text) {
      return;
    }
    setLoading(true);
    search(props.text)
      .then(res => {
        setData(res);
      })
      .catch(err => console.error('[use search] catch ERROR: ', err))
      .finally(() => setLoading(false));
  }, [props.text]);

  const callFetch = useCallback(() => {
    if (!loading) {
      fetch();
    }
  }, [loading, fetch]);

  const debounceFetch = debounce(
    () => {
      callFetch();
    },
    200,
    { leading: true, trailing: true },
  );

  useEffect(() => {
    debounceFetch();
  }, [props.text]);

  return { data, debounceFetch, loading };
};
