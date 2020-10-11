import React, {useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

FontAwesome.loadFont();

const CustomWebView: React.FC<{url: string}> = ({url}) => {
  const webView = useRef<WebView>(null);
  return (
    <>
      <WebView source={{uri: url}} ref={webView} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          height: 35,
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            webView.current?.goBack();
          }}>
          <FontAwesome name="hand-o-left" size={25} />
        </TouchableOpacity>
        <View style={{width: 1, borderWidth: 1}} />
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            webView.current?.goForward();
          }}>
          <FontAwesome name="hand-o-right" size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CustomWebView;
