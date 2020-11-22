import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppStack';
import Axios from 'axios';
import AsyncStroage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Loading'>;
}

const Loading: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const loginCheck = async () => {
      const token = await AsyncStroage.getItem('token');
      try {
        if (token) {
          const {data} = await Axios.post('http://localhost:8080/sign-check', {
            token,
          });
          console.log(data);
          if (data.success) {
            navigation.replace('Home');
          }
        } else {
          navigation.replace('Login');
        }
      } catch (err) {
        console.log(err);
        navigation.replace('Login');
        await AsyncStroage.removeItem('token');
      }
    };
    loginCheck();
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>로딩중</Text>
    </View>
  );
};

export default Loading;
