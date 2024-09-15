import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {Searchbar} from 'react-native-paper'
import { windowWidth } from "../../utils/platform/platform";
import { useSearch } from "../../hooks/use-search";
import { debounce } from "lodash";


type Props = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    search: (val: string) => void
}
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
    const [value, setValue] = useState<string>('')

    console.log("[SearchBar] init ", props.value)

    return (
        <Searchbar
            placeholder="Search for books..."
            onChangeText={(val) => console.log("[searchbar] on change ", val)}
            // onChange={(e) => setValue(e.nativeEvent.text)}
            value={props.value}
            style={styles.searchbar}
            icon={() => null} // add icons
            textAlign="left"
            inputStyle={styles.text}
            placeholderTextColor={'grey'}
            // onBlur={() => setValue()}
        />
    )

}


const styles = StyleSheet.create({
    searchbar: {
    width: windowWidth * .8,
    height: '85%',
    alignSelf: 'center',
    alignContent: 'center',
    margin: '.5%',
    // backgroundColor: 'grey'
    },
    text: {
        color: 'black'
    }
})