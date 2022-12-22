import {t, use} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  NativeModules,
  Platform,
} from 'react-native';
import {Button} from 'react-native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header/Header';
import TouchableText from '../../components/TouchableText/TouchableText';
import {COLORS} from '../../utils';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {SearchInput} from '../../components/searchInput/SearchInput';
import AppText from '../../components/text/Text';
const carouselItem = require('../../../assets/HomeCarosel.json');
const servicesItems = require('../../../assets/serviceCarosel.json');

import {SwiperFlatList} from 'react-native-swiper-flatlist';

import Icon from 'react-native-vector-icons/EvilIcons';

import {BASE_URL} from '../../utils/config';

const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};

import axios from 'axios';
import Indecator from '../../components/Indecator/Indecator';
import {useDispatch, useSelector} from 'react-redux';
import NoData from '../../components/NoData';
import {useLanguage} from '../../utils/useLanguage';
import {useTranslation} from 'react-i18next';
import {localNotification} from '../../utils/localPushcontroller';
import * as goTohomeActions from '../../redux/actions/goToHome';

const Home = () => {
  const {StatusBarManager} = NativeModules;

  const {i18n} = useTranslation();
  const location = useSelector(state => state.auth.location);
  const orderData = useSelector(state => state.order.orderData);

  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedLanguage = i18n.language;
  const [nodata, setNodata] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}/homepage`, {
        headers: {
          locale: selectedLanguage,
          Accept: '*/*',
        },
      })
      .then(res => {
        if (res.data.success) {
          setNodata(false);
          setServices(res.data.data.services);
          setSlides(res.data.data.slides);
        } else {
          setNodata(true);
        }
      })
      .catch(error => console.log('home error:', error));
    setLoading(false);
  };

  const route = useRoute();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'Home') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
    dispatch(goTohomeActions.goToHome());
  }, [refreshing]);

  const renderItemCarosel = ({item}) => {
    return (
      <TouchableOpacity key={item.id} style={{width: 300, padding: 10}}>
        <Image
          source={{
            uri: selectedLanguage === 'en' ? item.content_en : item.content,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        ...Platform.select({
          ios: {
            marginTop: StatusBarManager.HEIGHT,
          },
        }),
      }}>
      <Header navigation={navigation} location={location} />
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <View
          style={{
            backgroundColor: COLORS.lightGray,
            borderColor: COLORS.white,
            marginHorizontal: 20,
            flexDirection: 'row-reverse', //rtl
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            height: 40,
            borderRadius: 10,
            marginBottom: 20,
          }}>
          <Icon name="search" size={30} color={COLORS.black} />
          <Text>{t('searchForServices')}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View
          style={{
            width: Dimensions.get('screen').width,
            height: 135,
            marginBottom: 40,
          }}>
          <SwiperFlatList
            paginationActiveColor={COLORS.primary}
            paginationStyle={{bottom: -30}}
            paginationStyleItemActive={{width: 24, height: 8}}
            paginationStyleItemInactive={{width: 8, height: 8}}
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination
            data={slides}
            renderItem={item => renderItemCarosel(item)}
          />
        </View>

        {/* <Button
          title="click here"
          onPress={() => {
            localNotification();
          }}
        /> */}
        {/* Services Sections */}
        <View>
          {services &&
            (!nodata ? (
              <SwiperFlatList
                vertical={true}
                style={styles.serviceFlatList}
                data={services}
                // horizontal
                renderItem={outerItem => {
                  // console.log('outerItem', outerItem);
                  return (
                    <View style={{marginVertical: 10}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            ...Platform.select({
                              ios: {
                                fontFamily: 'Poppins-Medium.ttf',
                              },
                            }),
                            fontFamily: 'Poppins-Medium',
                            fontSize: 16,
                            color: COLORS.black,
                          }}>
                          {outerItem['item'].name}
                        </Text>
                        <TouchableText
                          text={t('all')}
                          onPress={() => {
                            navigation.navigate('HomeStack', {
                              screen: 'Categories',
                              params: {
                                title: outerItem['item'].name,
                                service_id: outerItem['item'].id,
                              },
                            });
                          }}
                        />
                      </View>
                      <ScrollView
                        horizontal
                        contentContainerStyle={{
                          paddingVertical: 10,
                          // justifyContent: 'flex-start',
                          // width: '100%',
                          // borderWidth: 1,
                          // backgroundColor: 'red',
                          // flex: 1,
                          flexGrow: 1,
                        }}>
                        {outerItem.item['children'].map((item, index) =>
                          false ? (
                            <Indecator
                              key={index}
                              size={35}
                              color={COLORS.primary}
                            />
                          ) : (
                            <View style={{direction: 'rtl'}}>
                              <TouchableOpacity
                                key={index}
                                onPress={() =>
                                  navigation.navigate('HomeStack', {
                                    screen: 'ServiceDetails',
                                    params: {
                                      id: item?.id,
                                    },
                                  })
                                }
                                style={{
                                  // borderWidth:1,
                                  padding: 0,
                                  margin: 5,
                                  marginHorizontal: -5,
                                  alignItems: 'center',
                                  // borderWidth: 1,
                                  width: 150,
                                  height: 120,
                                }}>
                                {/* <View style={{}}> */}
                                <Image
                                  source={{
                                    uri:
                                      selectedLanguage === 'ar'
                                        ? item.image_ar
                                        : item.image_en,
                                  }}
                                  style={{
                                    width: '80%',
                                    height: '90%',
                                    borderRadius: 8,
                                  }}
                                />
                                <AppText style={{}}>{item.name}</AppText>
                                {/* </View> */}
                              </TouchableOpacity>
                            </View>
                          ),
                        )}
                      </ScrollView>
                    </View>
                  );
                }}
              />
            ) : (
              <NoData />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  carosel: {
    maxHeight: 300,
    paddingRight: 20,
  },
  footer: {},
  footerText: {},
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  serviceFlatList: {
    // justifyContent: 'center',
    // borderWidth:1
  },
  servicesImage: {
    width: 100,
    height: 100,
  },
});
