import React, { Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/platform/platform';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleBlur: () => void;
};

/**
 *
 * @param props
 * this is a search bar componenent
 *
 * this is used in the home page
 * and used to nav to search page
 *
 * mvp
 *  - search and show results in scollable list
 *
 * later
 *  - show recent search results (ig)
 *  - auto complete searching
 */
export const SearchBar = (props: Props) => {
  console.log('[SearchBar] init ', props.value);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={props.value}
        onChangeText={props.setValue}
        style={styles.searchbar}
        clearButtonMode="always"
        autoFocus={true}
        onBlur={props.handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  searchbar: {
    width: windowWidth * 0.9,
    height: '80%',
    alignSelf: 'center',
    alignContent: 'center',
    margin: '2%',
  },
  text: {
    color: 'black',
  },
});
