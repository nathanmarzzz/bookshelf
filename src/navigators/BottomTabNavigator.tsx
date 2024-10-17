import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import { Home } from '../views/home';
import { Search } from '../components/search/search';
import { Profile } from '../views/profile';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <Search />,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon source="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          // header: () => <Search />,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon source="account" size={size} color={color} />
          ),
          tabBarActiveTintColor: 'black',
        }}
      />

      {/* <BottomTab.Screen name="Settings" component={Settings} /> */}
    </BottomTab.Navigator>
  );
};
