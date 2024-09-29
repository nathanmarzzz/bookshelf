import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from './list';
import { useSearch } from '../../hooks/use-search';
import { SearchBar } from './searchbar';
import { windowHeight, windowWidth } from '../../utils/platform/platform';

export const Search = () => {
  console.log('in searchhhhhh');
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

      {data?.length ? (
        <View style={styles.listContainer}>
          <Text>list here</Text>
          <List data={data ?? []} loading={loading} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight * 0.095,
    backgroundColor: 'red',
    // flex: 2,
    // display: 'flex',
    // flexDirection: 'column',
  },
  searchContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderColor: 'grey',
    borderWidth: 1,
    margin: '2%',
  },
  listContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    margin: '2%',
  },
  loading: {},
  empty: {},
});
