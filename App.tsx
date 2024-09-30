import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Home } from './src/views/home';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from './src/components/search/search';
import { SearchBar } from 'react-native-screens';
import { windowHeight, windowWidth } from './src/utils/platform/platform';
import { SearchNav } from './src/components/headers/search';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />

          {/* <Stack.Screen name="Search" component={Search} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
