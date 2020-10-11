import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increase, decrease} from '../reducer/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const {
    counter: {count},
    site: {site},
  } = useSelector((state) => state);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(increase());
        }}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(decrease());
        }}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
