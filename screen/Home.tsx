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
import {mainColor} from '../utils/color';
import CustomWebView from '../components/CustomWebView';
import {useSelector, useDispatch} from 'react-redux';
import {getUrl, siteChange} from '../reducer/site';
import {RootState} from '../reducer';

const WebtoonContents = styled(Content)`
  padding-left: 10px;
  padding-right: 10px;
`;
const WebtoonView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const WebtoonImage = styled.Image`
  width: 100%;
  height: 100px;
`;

const WebtoonButton = styled.TouchableOpacity`
  width: 48%;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {siteList, selectSite, url} = useSelector(
    (state: RootState) => state.site,
  );
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<
    {title: string; url: string; image: string}[]
  >([]);

  const getWebtoomInfo = useCallback(
    async (value: number) => {
      try {
        const site = siteList.find((s) => s.value === value);
        const baseurl = 'http://localhost:8080';
        const {data} = await axios.get(`${baseurl}${site?.url}`);
        setList(data.webtoonlist);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    },
    [siteList],
  );

  const handleSelectSite = (value: number) => {
    dispatch(siteChange(value));
    setLoading(true);
  };

  useEffect(() => {
    getWebtoomInfo(selectSite);
  }, [getWebtoomInfo, selectSite]);

  return (
    <Container>
      <Header>
        <Left>
          {url ? (
            <Button
              transparent
              onPress={() => {
                dispatch(getUrl(null));
              }}>
              <Text>돌아가기</Text>
            </Button>
          ) : (
            <Button
              transparent
              onPress={() => {
                handleSelectSite(selectSite === 1 ? 2 : 1);
              }}>
              <Text style={{color: mainColor}}>
                {selectSite === 1 ? '다음' : '네이버'}
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
        <CustomWebView url={url} />
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
                    dispatch(getUrl(value.url, value.title));
                  }}>
                  <Card>
                    <CardItem header>
                      <WebtoonImage
                        source={{uri: value.image}}
                        resizeMode="contain"
                      />
                    </CardItem>
                    <CardItem>
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
