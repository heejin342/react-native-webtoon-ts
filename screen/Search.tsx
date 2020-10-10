import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from 'react-native';

const Search: React.FC = () => {
  const input = useRef<TextInput>(null);
  const [webtoonTitle, setWebtoonTitle] = useState<string | null>(null);
  const [selectSite, setSelectSite] = useState(1);
  const siteList = [
    {name: '네이버', value: 1},
    {name: '다음', value: 2},
  ];
  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.buttonBox}>
        {siteList.map((site) => (
          <TouchableHighlight
            onPress={() => {
              setSelectSite(site.value);
            }}>
            <Text
              key={site.value}
              style={{color: selectSite === site.value ? 'pink' : 'black'}}>
              {site.name}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
      <TextInput
        ref={input}
        style={style.searchBar}
        onChangeText={(text) => {
          setWebtoonTitle(text);
        }}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
