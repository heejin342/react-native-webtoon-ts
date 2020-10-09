import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Right,
  Body,
  Text,
  Spinner,
} from 'native-base';
import styled from 'styled-components/native';
import {WebView} from 'react-native-webview';
import {mainColor} from '../utils/color';

const WebtoonContents = styled(Content)`
  padding-left: 10px;
  padding-right: 10px;
`;
//flex 디자인 개구리
const WebtoonView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// const WebtoonCard = styled(Card)`
//   width: 48%;
// `;

const WebtoonImage = styled.Image`
  width: 100%;
  height: 100;
`;

const WebtoonButton = styled.TouchableOpacity`
  width: 48%;
`;

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<
    {title: string; url: string; image: string}[]
  >([]);
  const [select, setSelect] = useState(1);
  const [url, setUrl] = useState<string | null>(null);

  const sitelist: {
    site: '네이버' | '다음' | '카카오';
    value: number;
    url: '/naver' | '/daum' | '/kakao';
  }[] = [
    {site: '네이버', value: 1, url: '/naver'},
    {site: '다음', value: 2, url: '/daum'},
    {site: '카카오', value: 3, url: '/kakao'},
  ];

  const getWebtoomInfo = useCallback(
    async (value: number) => {
      try {
        const site = sitelist.find((s) => s.value === value);
        const baseurl = 'http://localhost:8080';
        const {data} = await axios.get(`${baseurl}${site?.url}`);
        setList(data.webtoonlist);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
    [sitelist],
  );

  const handleSelectSite = (value: number) => {
    setSelect(value);
    setLoading(true);
    getWebtoomInfo(value);
  };

  useEffect(() => {
    getWebtoomInfo(1);
  }, [getWebtoomInfo]);

  return (
    <Container>
      <Header>
        <Left>
          {url ? (
            <Button
              transparent
              onPress={() => {
                setUrl(null);
              }}>
              <Text>돌아가기</Text>
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                handleSelectSite(select === 1 ? 2 : 1);
              }}>
              <Text style={{color: mainColor}}>
                {select === 1 ? '다음' : '네이버'}
              </Text>
            </Button>
          )}
        </Left>
        <Body>
          <Title>웹툰목록</Title>
        </Body>
        <Right />
      </Header>
      {url ? (
        <WebView source={{uri: url}} />
      ) : (
        <WebtoonContents>
          {loading ? (
            <Spinner />
          ) : (
            <WebtoonView>
              {list.map((value, index) => (
                <WebtoonButton
                  key={index}
                  onPress={() => {
                    setUrl(value.url);
                  }}>
                  <Card>
                    <CardItem header>
                      <WebtoonImage
                        source={{uri: value.image}}
                        resizeMode="contain"
                      />
                    </CardItem>
                    <CardItem style={{justifyContent: 'center'}}>
                      <Text>{value.title}</Text>
                    </CardItem>
                  </Card>
                </WebtoonButton>
              ))}
            </WebtoonView>
          )}
        </WebtoonContents>
      )}
    </Container>
  );
};

export default Home;
