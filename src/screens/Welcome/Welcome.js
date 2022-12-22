import React, {useEffect, useState} from 'react';
import {
  Button,
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScreenOne from './Screen1';
import ScreenTwo from './Screen2';
import ScreenThree from './Screen3';

import Swiper from '../../components/react-native-swiper';
import {t} from 'i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import axios from 'axios';
const isRTL = false;
import {BASE_URL} from '../../utils/config';
import Indecator from '../../components/Indecator/Indecator';

import AppText from '../../components/text/Text';
import {useLanguage} from '../../utils/useLanguage';
import {useDispatch} from 'react-redux';

const Welcome = ({navigation}) => {
  const {selectedLanguage} = useLanguage();
  const lang = selectedLanguage;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const getData = async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/introduction_app`,
        method: 'get',
        headers: {
          locale: lang,
          Accept: 'application/json',
        },
      }).then(res => {
        if (res.data.success) {
          setData(res.data.data);
          console.log('intro data: ', res.data.data);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('introduction data error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('length', data.length);
  return (
    <View style={{width: '100%', height: '100%'}}>
      {data?.length > 0 && (
        <Swiper
          onIndexChanged={index => setIndex(index)}
          loop={false}
          index={0}
          showsPagination={true}
          paginationStyle={{
            position: 'absolute',
            justifyContent: 'flex-end',
            bottom: 180,
          }}
          activeDotStyle={{
            width: 20,
          }}
          activeDotColor="white"
          showsButtons={true}
          nextButton={
            index === data?.length - 1 ? (
              <Icon
                onPress={() =>
                  index === data?.length - 1 && navigation.navigate('SignIn')
                }
                name="arrowright"
                style={{
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  borderRadius: 50,
                  padding: 10,
                  backgroundColor: COLORS.white,
                }}
              />
            ) : (
              <Icon
                // onPress={() => index === 2 && navigation.navigate('SignIn')}
                name="arrowright"
                style={{
                  fontSize: 20,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  borderRadius: 50,
                  padding: 10,
                  backgroundColor: COLORS.white,
                }}
              />
            )
          }
          prevButton={
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <AppText style={{color: COLORS.white}}>{t('skip')}</AppText>
            </Pressable>
          }
          buttonWrapperStyle={{
            top: 340,
            paddingHorizontal: 20,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          }}>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <ScreenOne
                  // onIndexChanged={onIndexChanged}
                  key={item.id}
                  title={item.title}
                  url={lang === 'ar' ? item.image : item.imageEn}
                  introduction={item.introduction}
                />
              </View>
            );
          })}
        </Swiper>
      )}
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
