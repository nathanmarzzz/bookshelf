import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { BookInfo } from './src/views/bookinfo';

import { store } from './src/store/store';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/views/login';
import { BottomTabNavigator } from './src/navigators/BottomTabNavigator';

const Stack = createNativeStackNavigator();
const title = 'bookShelf';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: title,
            }}
          />

          <Stack.Screen
            name="BottomTab"
            component={BottomTabNavigator}
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
