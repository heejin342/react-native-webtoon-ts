import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import Search from './screen/Search';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mainColor} from './utils/color';

Ionicons.loadFont();

const Tab = createBottomTabNavigator();

const App = () => {
  const screenOptions = ({
    route,
  }: {
    route: RouteProp<Record<string, object | undefined>, string>;
    navigation: any;
  }): BottomTabNavigationOptions => ({
    tabBarIcon: ({focused, color, size}) => {
      let iconName: string = '';

      if (route.name === '웹툰') {
        iconName = focused
          ? 'chatbubble-ellipses'
          : 'chatbubble-ellipses-outline';
      } else if (route.name === '검색') {
        iconName = 'search';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  });

  const tabBarOptions = {
    activeTintColor: mainColor,
    inactiveTintColor: 'gray',
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        tabBarOptions={tabBarOptions}
        initialRouteName="검색">
        <Tab.Screen name="웹툰" component={Home} />
        <Tab.Screen name="검색" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
