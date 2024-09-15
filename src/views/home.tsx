import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SearchBar } from "../components/search/searchbar";
import { useSearch } from "../hooks/use-search";
import { debounce } from "lodash";

/**
 * 
 * should be made up of sections that contain:
 *  - user follwing/friend updates
 *  - recommended books
 *  - discussions
 *  - book club updates
 */
export const Home = () => {
    const [value, setValue] = useState<string>('')

    const {fetch} = useSearch({
        text: value,
        searchBy: 'title',
        language: 'eng' // should be global config
    })

//    useEffect(() => { fetch()}, [])
    const search = useCallback(
        debounce(
            (text: string) => {
                fetch()
            }, 500
        ), []
    )

    const handleSearchchange  = useCallback( (val: string) => {
        setValue(val)
    }, [])

    return (
        <View style={styles.container}>
            <SearchBar value={value} setValue={setValue} search={search}
                 />
        </View>
    )
}


const styles = StyleSheet.create({
   container: {
    justifyContent: 'center',
    alignItems: 'center'
   }
})