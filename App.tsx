import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Home } from './src/views/home';
import { BookInfo } from './src/views/bookinfo';

import { store } from './src/store/store';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => null,
            }}
          />

          {/* @ts-ignore -- for now not sure how to define component with route props */}
          <Stack.Screen name="Book Info" component={BookInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
