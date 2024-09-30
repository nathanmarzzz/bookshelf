import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from './list';
import { useSearch } from '../../hooks/use-search';
import { SearchBar } from './searchbar';
import { windowHeight, windowWidth } from '../../utils/platform/platform';

export const Search = () => {
  const [value, setValue] = useState<string>('');

  const { data, debounceFetch, loading } = useSearch({
    text: value,
    searchBy: 'title',
    language: 'eng', // should be global config
  });

  const handleBlur = useCallback(() => {
    debounceFetch();
  }, [value, debounceFetch]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar value={value} setValue={setValue} handleBlur={handleBlur} />
      </View>

      {data?.length && value ? (
        <View style={styles.listContainer}>
          <List data={data ?? []} loading={loading} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: windowWidth,
    backgroundColor: '#2eab34',
    position: 'absolute',
    top: 0,
    flexDirection: 'column',
    display: 'flex',
  },
  searchContainer: {
    justifyContent: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: windowHeight * 0.125,
  },
  loading: {},
  empty: {},
});
