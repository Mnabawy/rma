import {Formik} from 'formik';
import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {I18nManager, Image, ScrollView, Text, View} from 'react-native';
import CustomButton from '../../components/button/Button';
import TouchableText from '../../components/TouchableText/TouchableText';
import {COLORS} from '../../utils/colors';
import style from './style';
// import OtpInput from '../../components/otp/OtpInput';
import {SuccessToast} from 'react-native-toast-message';
import OTPInput from '../../components/@twotalltotems/react-native-otp-input';

import axios from 'axios';
import {ErrorToast} from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import * as authActions from '../../redux/actions/auth';
import {BASE_URL} from '../../utils/config';
import {useTranslation} from 'react-i18next';

const schema = yup
  .object({
    code: yup.string().max(4).required(t('required')),
  })
  .required();

const VerifyCode = ({route, navigation}) => {
  const {i18n} = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {screen} = route.params;
  const [phone_number, setPhoneNumber] = useState('');

  const [error, setError] = useState({
    visible: false,
    text: '',
    code: '',
  });

  const [toastCode, setToastCode] = useState({
    visible: true,
    code: '',
  });

  useEffect(() => {
    setPhoneNumber(route?.params.phone_number);
    setToastCode({visible: true, code: route?.params.code});
  }, []);

  //start handle api
  const lang = i18n.language;

  const verifyCode = async code => {
    if (screen === 'CreateAccount') {
      const data = {code, phone_number};
      setLoading(true);
      try {
        const res = await axios.post(`${BASE_URL}/auth/verify_account`, data, {
          headers: {
            locale: lang,
            'Content-Type': 'application/json',
          },
        });

        if (res.data.success) {
          dispatch(authActions.setUserData(res.data.data));

          // check for what screen he come from
          if (screen === 'CreateAccount') {
            navigation.navigate('Map');
          }
        } else {
          setError({visible: true, text: res.data.error});
          setTimeout(() => {
            setError({visible: false});
          }, 2000)();
        }
        setLoading(false);
      } catch (error) {
        console.log('verifyCode error: ', error);
      }
    }
    if (screen === 'ForgotPassword') {
      // check if the entered code === code came from the forgot password screen
      const {screen, phone_number, code: resCode} = route.params;
      console.log('code', code);
      console.log('res code', resCode);
      if (resCode === code) {
        setError({visible: false});
        navigation.navigate('NewPassword', {
          code: code,
          phone_number,
        });
      } else {
        setError({visible: true, text: 'Code must match'});
      }
    }
  };

  const resendCodeHandler = async () => {
    console.log('phone_number', phone_number);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/resend_code`,
        {phone_number: phone_number},
        {
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('res data', res.data);
      if (res.data.success) {
        console.log('resend code success');
        setToastCode({visible: true, code: res.data.data.code});
        setError({visible: false});
      } else {
        setError({
          visible: true,
          text: res.data.error,
        });
        setToastCode({
          visible: false,
        });
      }
    } catch (error) {
      console.log('verifyCode resend code error: ', error);
    }
  };

  const onSubmit = values => {
    verifyCode(values.code);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{code: ''}}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleBlur,
        errors,
        handleSubmit,
        values,
        setFieldValue,
      }) => (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          <ScrollView contentContainerStyle={style.container}>
            {/* logo */}

            {toastCode.visible && (
              <View
                style={{
                  top: 1,
                  position: 'absolute',
                  elevation: 200,
                  zIndex: 100,
                  alignSelf: 'center',
                }}>
                <SuccessToast text1={toastCode.code} />
              </View>
            )}
            {error.visible && <ErrorToast text1={error.text} />}
            <View style={style.logo}>
              <Image
                style={{width: 120, height: 120, margin: 10}}
                source={require('../../../assets/verifyCode.png')}
              />
            </View>
            {/* text */}
            <View style={style.textContainer}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {t('entercode')}
              </Text>
              <Text style={{marginTop: 10}}> {t('sentviasms')}</Text>
            </View>
            {/* input & button */}
            <View>
              <View style={{alignItems: 'center'}}>
                <OTPInput
                  style={{width: '80%', height: 100}}
                  value={values.code}
                  onCodeChanged={value => setFieldValue('code', value)}
                  pinCount={4}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    width: 60,
                    height: 60,
                    padding: 10,
                    borderRadius: 10,
                    color: COLORS.black,
                    fontSize: 26,
                  }}
                  // value={values.code}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />
              </View>
              {errors.code && (
                <View>
                  <Text style={{color: COLORS.red}}>{errors.code}</Text>
                </View>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 10,
                  flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    marginHorizontal: 5,
                    fontSize: 14,
                  }}>
                  {t('didnnotrecieveit')}
                </Text>
                <TouchableText
                  text={t('clickHere')}
                  onPress={resendCodeHandler}
                />
                {/* <Text>')}</Text> */}
              </View>
              <CustomButton
                loading={loading}
                onPress={handleSubmit}
                text={t('send')}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default VerifyCode;
