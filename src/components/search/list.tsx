import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from './listItem';
import { SearchResult } from '../../data/books';

type Props = {
  data: SearchResult[];
  loading: boolean;
};

export const List = (props: Props) => {
  const renderItem = useCallback(({ item }: { item: SearchResult }) => {
    if (!item || !item.volumeInfo.title || !item.volumeInfo?.authors?.length) {
      return null;
    }

    return (
      <View>
        <ListItem book={item} />
      </View>
    );
  }, []);

  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={5}
      />
    </View>
  );
};
