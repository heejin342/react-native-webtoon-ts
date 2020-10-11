import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from './screen/Home';
import Search from './screen/Search';
import Counter from './screen/Counter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mainColor} from './utils/color';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducer';

const store = createStore(rootReducer);

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
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={screenOptions}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="웹툰" component={Home} />
          <Tab.Screen name="검색" component={Search} />
          <Tab.Screen name="카운터" component={Counter} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
