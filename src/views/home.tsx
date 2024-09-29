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
    // backgroundColor: 'white'
    // flex: 1,
    // width: windowWidth,
    // height: windowHeight,
    // justifyContent: 'center',
    // position: 'absolute',
    // marginTop: windowHeight * 0.35,
  },
});
