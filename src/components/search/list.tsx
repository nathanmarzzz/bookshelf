import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from './listItem';
import { SearchData } from '../../data/books';

type Props = {
  data: SearchData[];
  loading: boolean;
};

export const List = (props: Props) => {
  console.log('[list] init ', props.data.slice(0, 10));

  const renderItem = useCallback(({ item }: { item: SearchData }) => {
    if (!item.title || !item.author) {
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
