import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/AppStack';
import {mainColor} from '../utils/color';
import Axios from 'axios';
import AsyncStroage from '@react-native-async-storage/async-storage';
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}
const Login: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#000',
          width: '90%',
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="email"
        autoCapitalize="none"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#000',
          width: '90%',
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="pw"
        secureTextEntry
        onChangeText={(text) => {
          setPw(text);
        }}
      />

      <TouchableOpacity
        style={{
          width: '90%',
          backgroundColor: mainColor,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
        onPress={async () => {
          try {
            if (email && pw) {
              const {data} = await Axios.post('http://localhost:8080/sign-in', {
                email,
                pw,
              });
              if (data.success) {
                await AsyncStroage.setItem('token', data.token);
                navigation.replace('Home');
              }
            }
          } catch (err) {
            Alert.alert(err.response.data.message);
          }
        }}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
