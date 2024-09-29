import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { SearchData } from '../../data/books';

type Props = {
  book: SearchData;
  // nav_url: string;
};

export const ListItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.book.title}</Text>
      <Text style={styles.author}>{props.book.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: '2%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    padding: '2%',
    width: 'auto',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, fontWeight: '500', color: 'grey', marginTop: '1%' },
});
