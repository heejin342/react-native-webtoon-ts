import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const Counter: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={async () => {
          navigation.replace('Login');
          await AsyncStorage.removeItem('token');
        }}>
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
