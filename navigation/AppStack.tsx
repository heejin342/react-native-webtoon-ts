import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabScreen from './TabScreen';
import Login from '../screen/Login';
import Loading from '../screen/Loading';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Loading: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Loading" mode="modal">
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={TabScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default MyStack;
