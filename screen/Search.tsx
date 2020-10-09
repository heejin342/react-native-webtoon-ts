import React from 'react';
import {View, Text} from 'react-native';

const Search: React.FC<{title: string}> = ({title, children}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{title}</Text>
      {children}
    </View>
  );
};

export default Search;
