import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Search } from '../components/search/search';
import { windowHeight, windowWidth } from '../utils/platform/platform';

/**
 *
 * should be made up of sections that contain:
 *  - user follwing/friend updates
 *  - recommended books
 *  - discussions
 *  - book club updates
 */
export const Home = () => {
  return (
    <View style={styles.container}>
      <Text>home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: windowWidth,
    height: windowHeight,
  },
});
