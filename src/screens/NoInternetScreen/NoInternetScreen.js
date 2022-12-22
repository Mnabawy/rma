import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  I18nManager,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {COLORS} from '../../utils';
import {useTranslation} from 'react-i18next';

const NoInternetScreen = ({navigation, networkState}) => {
  const {i18n} = useTranslation();
  const lan = i18n.language;
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <StatusBar hidden />
      {!networkState ? (
        <ImageBackground
          style={{width: '100%', height: '100%', backgroundColor: 'white'}}
          resizeMode="cover">
          <Image
            source={require('../../../assets/logo.png')}
            style={{
              marginTop: 70,
              width: '20%',
              height: '20%',
              backgroundColor: 'white',
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Image
            source={require('../../../assets/wifi-off.png')}
            style={{
              width: '40%',
              height: '30%',
              tintColor: COLORS.darkGray,
              backgroundColor: 'white',
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              // fontFamily: 'DinNextMedium',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            {lan == 'ar'
              ? 'فشل الاتصال بالانترنت'
              : 'Network connection Failed'}
          </Text>

          {loading ? (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.borderColor,
                width: '70%',
                borderRadius: 20,
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <ActivityIndicator
                color="white"
                size={30}
                style={{
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.borderColor,
                width: '70%',
                borderRadius: 20,
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1300);
              }}>
              <Text
                style={{
                  // fontFamily: 'DinNextBold',
                  alignSelf: 'center',
                  color: '#fff',
                  fontSize: 15,
                  padding: 10,
                }}>
                {lan == 'ar' ? 'أعد المحاولة' : 'Retry'}
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{width: '100%', height: '100%', alignItems: 'center'}}
          source={require('../../../assets/splash2.png')}
          resizeMode="stretch">
          {/* <Image
                            source={require("../../../assets/logo.png")}
                            style={{ width: "50%", height: "50%", resizeMode: "contain", alignSelf: "center" }}
                        /> */}
          {/* <CirclesLoader color={COLORS.primar} /> */}
        </ImageBackground>
      )}
    </View>
  );
};

export default NoInternetScreen;
