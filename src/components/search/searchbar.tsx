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
 *
 * mvp
 *  - search and show results in scollable list
 *
 * later
 *  - show recent search results (ig)
 *  - auto complete searching
 */
export const SearchBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={props.value}
        onChangeText={props.setValue}
        style={styles.searchbar}
        clearButtonMode="always"
        // autoFocus={true}
        onBlur={props.handleBlur}
        autoComplete="name"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight * 0.125,
    backgroundColor: '#2eab34',
    position: 'absolute',
    top: 0,
  },
  searchbar: {
    width: '90%',
    height: '27%',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    top: windowHeight * 0.035,
    padding: '2%',
  },
  text: {
    color: 'black',
  },
});
