import Axios from 'axios';
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';

const Search: React.FC = () => {
  const input = useRef<TextInput>(null);
  const [selectSite, setSelectSite] = useState(1);
  const [url, setUrl] = useState<string | null>(null);
  const siteList = [
    {name: '네이버', value: 1},
    {name: '다음', value: 2},
  ];
  useEffect(() => {
    input.current?.focus();
  }, []);
  console.log(url);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.buttonBox}>
        {siteList.map((site) => (
          <TouchableOpacity
            key={site.value}
            onPress={() => {
              setSelectSite(site.value);
            }}>
            <Text style={{color: selectSite === site.value ? 'pink' : 'black'}}>
              {site.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        ref={input}
        style={style.searchBar}
        onSubmitEditing={async (e) => {
          const {text} = e.nativeEvent;
          if (text) {
            const {data} = await Axios.post('http://localhost:8080/search', {
              search: text,
              selectSite,
            });
            setUrl(data.url);
          } else Alert.alert('검색어를 입력하세요.');
        }}
      />
      {url ? (
        <View style={{flex: 1, width: '100%', marginTop: 10}}>
          <WebView source={{uri: url}} />
        </View>
      ) : (
        <View>
          <Text>검색해주세요</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchBar: {borderWidth: 1, borderColor: 'black', width: '90%', padding: 10},
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  a: {
    color: 'red',
  },
});
export default Search;
