import 'react-native-gesture-handler';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducer';
import AppStack from './navigation/AppStack';
import {NavigationContainer} from '@react-navigation/native';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
