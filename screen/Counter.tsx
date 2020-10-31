import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../reducer';
import {increase, decrease} from '../reducer/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const {
    counter: {count},
  } = useSelector((state: RootState) => state);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(increase(count));
        }}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(decrease(count));
        }}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
