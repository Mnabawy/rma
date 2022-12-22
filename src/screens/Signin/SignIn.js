/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  I18nManager,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button as NativeButton,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {t} from 'i18next';
import {COLORS} from '../../utils/colors';
import style from './style';
import TouchableText from '../../components/TouchableText/TouchableText';
import Button from '../../components/button/Button';
import {Formik} from 'formik';
import Input from '../../components/input/input';
import AppText from '../../components/text/Text';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from '../../components/phoneInput/PhoneInput';
import Icon from 'react-native-vector-icons/Feather';
import * as authActions from '../../redux/actions/auth';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {SUPPLIER, USER} from '../../redux/actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ASYNCUSERDATA} from '../../redux/actions/types';
import {useNavigation} from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import {CommonActions} from '@react-navigation/native';
import CustomToast from '../../components/Toast/Toast';
import {useLanguage} from '../../utils/useLanguage';
import ChangeLanguage from '../../components/changeLanguageBtn';
import * as welcomeActions from '../../redux/actions/welcome';

const schema = yup
  .object({
    phone_number: yup.string().min(9).max(11).required(t('required')),
    password: yup.string().min(6).required(t('required')),
  })
  .required();

const SignIn = () => {
  const {selectedLanguage, onChageLanguage} = useLanguage();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const isRTL = selectedLanguage === 'ar';
  const [toast, setToast] = useState({
    visible: false,
    text: '',
  });

  const token = useSelector(state => state.auth);

  // console.log('token from signin: ', token);

  const AccountType = useSelector(state => state.auth.userType);
  console.log('userType', AccountType);

  //start handle api
  const lang = selectedLanguage;

  const [data, setData] = useState([]);

  const login = async ({phone_number, password}) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {phone_number, password},
        {
          headers: {
            locale: lang,
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.data.success) {
        // set token
        console.log('login data ', res.data.data);
        // console.log('state', navigation.getState());
        // RNRestart.Restart();
        // allways got to user's home
        dispatch(authActions.userType(USER));
        // navigate
        dispatch(authActions.setToken(res.data.data.token));
        dispatch(authActions.setUserData(res.data.data));
        dispatch(authActions.login());
        // change user role bases on resbonse
        console.log('roles: ', res.data);

        const {roles} = res?.data;
        // if (roles) {
        //   // if (roles.includes('member')) {
        //   //   dispatch(authActions.userType(USER));
        //   // } else {
        //   //   dispatch(authActions.userType(SUPPLIER));
        //   // }
        // }
      } else {
        setToast({
          visible: true,
          text: res.data.error,
        });
        (() => {
          setTimeout(() => setToast({visible: false}), 3000);
        })();
      }
      setLoading(false);
    } catch (error) {
      console.log('login data error: ', error);
    }
  };

  useEffect(() => {
    dispatch(welcomeActions.hasShowed());
  }, []);

  //end handle api

  const onSubmit = async values => {
    await login(values);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{phone_number: '', password: ''}}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}>
          {/* <ChangeLanguage lng="en" /> */}
          <ScrollView contentContainerStyle={style.container}>
            {toast.visible && <CustomToast error text={toast.text} />}
            {/* logo */}
            <View style={style.logoContainer}>
              <Image
                style={{width: 70, height: 70}}
                source={require('../../../assets/logo.png')}
              />
            </View>
            {/* text */}
            <View style={style.textContainer}>
              <AppText style={style.header}>{t('welcome')}</AppText>
              <AppText style={style.subHeader}>{t('signInToAccount')}</AppText>
              <AppText>{t('loginBody')}</AppText>
            </View>

            {/* inputs */}

            <PhoneInput
              error={errors.phone_number}
              value={values.phone_number}
              onChangeText={handleChange('phone_number')}
              label={t('phoneNumber')}
            />
            <Input
              error={errors.password}
              label={t('password')}
              placeholder={t('enterPassword')}
              secureTextEntry={isSecureEntry}
              value={values.password}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setIsSecureEntry(prev => !prev);
                  }}>
                  <Text>
                    {isSecureEntry ? (
                      <Icon name="eye" size={18} />
                    ) : (
                      <Icon name="eye-off" size={18} />
                    )}
                  </Text>
                </TouchableOpacity>
              }
              // iconPosition={'right'}
              // iconPosition='right'
              onChangeText={handleChange('password')}
            />

            <View
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <TouchableText
                text={t('forgotYourPassword')}
                onPress={() => navigation.navigate('ForgotPassword')}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Button
                text={t('login')}
                onPress={handleSubmit}
                loading={loading}
              />
              <View
                style={{
                  flexDirection: 'row',
                  ...style.centeText,
                }}>
                <AppText>{t('dontHaveAccount')} </AppText>

                <TouchableText
                  textstyle={{textDecorationLine: 'underline'}}
                  text={t('signUp')}
                  // onPress={() => console.log(navigation.getState().routeNames)}
                  onPress={() =>
                    navigation.navigate('UserAtuh', {
                      screen: 'Create',
                    })
                  }
                />
              </View>
              <View style={style.centeText}>
                <TouchableText
                  textstyle={{textDecorationLine: 'underline'}}
                  text={t('skipAndLogin')}
                  onPress={() => {
                    // set user type to user
                    dispatch(authActions.userType(USER));

                    // switch to home
                    dispatch(authActions.login());
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};
//
export default SignIn;
