import Axios from 'axios';
import React, {useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomWebView from '../components/CustomWebView';
import {useSelector, useDispatch} from 'react-redux';
import {siteChange, getUrl} from '../reducer/site';
import {RootState} from '../reducer';

FontAwesome.loadFont();

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const {siteList, selectSite, url, search} = useSelector(
    (state: RootState) => state.site,
  );
  const input = useRef<TextInput>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.buttonBox}>
        {siteList.map((site) => (
          <TouchableOpacity
            key={site.value}
            onPress={() => {
              dispatch(siteChange(site.value));
            }}>
            <Text style={{color: selectSite === site.value ? 'pink' : 'black'}}>
              {site.site}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        ref={input}
        style={style.searchBar}
        defaultValue={search}
        onSubmitEditing={async (e) => {
          const {text} = e.nativeEvent;
          if (text) {
            if (selectSite === 1) {
              const {data} = await Axios.post('http://localhost:8080/search', {
                search: text,
                selectSite,
              });
              dispatch(getUrl(data.url, text));
            } else {
              dispatch(
                getUrl(
                  `http://m.webtoon.daum.net/m/webtoon/search?q=${text}`,
                  text,
                ),
              );
            }
          } else Alert.alert('검색어를 입력하세요.');
        }}
      />
      {url ? (
        <View style={{flex: 1, width: '100%', marginTop: 10}}>
          <CustomWebView url={url} />
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
