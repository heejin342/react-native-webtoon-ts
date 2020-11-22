import 'react-native-gesture-handler';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Search from '../screen/Search';
import Counter from '../screen/Counter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mainColor} from '../utils/color';

Ionicons.loadFont();

const Tab = createBottomTabNavigator();

const TabScreen = () => {
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
      } else if (route.name === 'MY') {
        iconName = 'man';
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
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="웹툰" component={Home} />
      <Tab.Screen name="검색" component={Search} />
      <Tab.Screen name="MY" component={Counter} />
    </Tab.Navigator>
  );
};

export default TabScreen;
