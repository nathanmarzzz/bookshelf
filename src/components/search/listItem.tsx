import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SearchResult } from '../../data/books';

type Props = {
  book: SearchResult;
  // nav_url: string;
};

export const ListItem = (props: Props) => {
  const img_url =
    props.book.volumeInfo?.imageLinks?.thumbnail ??
    props.book.volumeInfo?.imageLinks?.smallThumbnail ??
    '';

  // react native won't display links from insecure urls
  const uri = img_url ? img_url.replace('http', 'https') : '';
  return (
    <View style={styles.container}>
      {/* img */}
      {uri ? (
        <View style={styles.imgContainer}>
          <Image source={{ uri: uri }} style={styles.img} />
        </View>
      ) : (
        <View style={styles.noImgContainer}>
          <Text style={styles.noImg}>?</Text>
        </View>
      )}

      {/* title */}
      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.volumeInfo.title}
        </Text>
        <Text style={styles.author}>
          {props.book.volumeInfo.authors.join()}
        </Text>
      </View>
    </View>
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
    flex: 0.15,
  },
  img: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  noImgContainer: {
    flex: 0.1,
    backgroundColor: 'grey',
    width: 50,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: '4%',
  },
  noImg: {
    color: 'white',
    justifyContent: 'center',
    fontWeight: '600',
    textAlign: 'center',
  },
});
