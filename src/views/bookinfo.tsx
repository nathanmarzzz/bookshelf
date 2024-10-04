import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextLayoutEventData,
  Pressable,
} from 'react-native';
import { SearchResult } from '../data/books';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteParams } from '../../types/generics';
import { ImageContainer } from '../components/lib/ImageContainer';

type BookRoute = RouteParams<{ book: SearchResult; img_url: string }>;

type Props = {
  navigation: NativeStackNavigationProp<any>;
  route: BookRoute;
};

/**
 *
 * @param props nav and route for book deets
 * @returns
 *
 * this page will have
 *
 * pic, title, author,
 * author info (date of birth, date of death?) --> should be clickable and nav to author page
 * descriptions
 *
 * reviews (add your own, send to a friend to review / request review from friend) -- allow public vs private
 * comments -- always public
 * - friends
 * - most recent
 *
 * discussions
 * clubs around this book (ability to start a club)
 *  - IP
 *  - then most recent
 *
 */
const DESCRIPTION_NUMBER_OF_LINES = 3;
const SHOW_ALL_LINES = 0;
export const BookInfo = ({ navigation, route }: Props) => {
  const { book, img_url } = route.params;

  const [descriptionTruncated, setDescriptionTruncatd] =
    useState<boolean>(false);

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const descriptionRef = useRef(null);

  const handleTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    // might need to calc expected line height with this
    const { lines } = event.nativeEvent;
    if (lines.length == DESCRIPTION_NUMBER_OF_LINES) {
      setDescriptionTruncatd(true);
    }
  };

  const handleExpandPress = useCallback(
    () => setDescriptionExpanded(!descriptionExpanded),
    [descriptionExpanded],
  );

  return (
    <View style={styles.container}>
      {/* pic, book info, your/friend  status info */}
      <View style={styles.rowContainer}>
        {/* cover img -- edition specific */}
        <View style={[styles.imgContainer, { flex: img_url ? 0.35 : 0.35 }]}>
          <ImageContainer width={150} height={150} img_url={img_url} />
        </View>

        {/* book info */}
        <View style={styles.right}>
          <Text style={styles.title}>{book.volumeInfo.title}</Text>
          <Text style={styles.subtitle}>{book.volumeInfo.authors}</Text>

          {/* page info */}
          <Text style={styles.subtitle}>
            {book.volumeInfo.pageCount + ' pages'}
          </Text>

          {/* publishing info */}
          <Text style={styles.subtitle}>{book.volumeInfo.publisher}</Text>
          <Text style={styles.subtitle}>{book.volumeInfo.publishedDate}</Text>

          {/* TODO : status section */}
          <Pressable onPress={() => {}}>
            <Text>TODO Status</Text>
          </Pressable>

          {/* update progress */}
          <Pressable onPress={() => {}}>
            <Text>TODO update progress</Text>
          </Pressable>
        </View>
      </View>

      {/* description info */}
      <View style={styles.additionalInfoContainer}>
        {/* generes */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Genres: </Text>
          {/* maybe move this to its own block */}
          <Text style={styles.subtitle}>{book.volumeInfo.categories}</Text>
        </View>

        {/* description */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description </Text>

          <Text
            ref={descriptionRef}
            style={styles.subtitle}
            numberOfLines={
              descriptionExpanded ? SHOW_ALL_LINES : DESCRIPTION_NUMBER_OF_LINES
            }
            onTextLayout={handleTextLayout}
            ellipsizeMode="tail">
            {book.volumeInfo.description}
          </Text>

          {/* if description is truncated, add epand/hide option */}
          {descriptionTruncated && (
            <Text onPress={handleExpandPress} style={{ fontWeight: '600' }}>
              {descriptionExpanded ? 'Read less' : 'Read more...'}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    margin: '2%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    left: 0,
  },
  right: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    flex: 0.65,
    top: '5%',
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
    marginTop: '1%',
  },
  additionalInfoContainer: { justifyContent: 'center', margin: '2%' },
  sectionContainer: {
    justifyContent: 'center',
    margin: '2%',
  },
  sectionTitle: { fontWeight: '600' },
});
