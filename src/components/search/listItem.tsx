import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SearchResult } from '../../data/books';
import { useNavigation } from '@react-navigation/native';
import { ImageContainer } from '../lib/ImageContainer';

type Props = {
  book: SearchResult;
};

export const ListItem = (props: Props) => {
  const navigation = useNavigation<any>();

  const img_url =
    props.book.volumeInfo?.imageLinks?.thumbnail ??
    props.book.volumeInfo?.imageLinks?.smallThumbnail ??
    '';

  // react native won't display links from insecure urls
  const uri = img_url ? img_url.replace('http', 'https') : '';
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('Book Info', {
          book: props.book,
          img_url: uri ?? '',
        });
      }}>
      {/* img */}
      <View style={(styles.imgContainer, { flex: uri ? 0.15 : 0.1 })}>
        <ImageContainer width={50} height={50} img_url={uri} />
      </View>

      {/* title */}
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.volumeInfo.title}
        </Text>
        <Text style={styles.author}>
          {props.book.volumeInfo.authors.join()}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: '1%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2%',
  },
  textContainer: {
    padding: '2%',
    marginLeft: '2%',
    width: '100%',
    alignSelf: 'flex-end',
    flex: 1,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, fontWeight: '500', color: 'grey', marginTop: '1%' },
  imgContainer: {
    marginHorizontal: '2%',
    alignSelf: 'flex-start',
  },
});
