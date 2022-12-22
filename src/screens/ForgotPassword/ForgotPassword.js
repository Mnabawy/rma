import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/input/input';
import {Formik} from 'formik';
import {t} from 'i18next';
import {COLORS} from '../../utils/colors';
import CustomButton from '../../components/button/Button';
import style from './style';
import PhoneInput from '../../components/phoneInput/PhoneInput';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {ErrorToast} from 'react-native-toast-message';
import {useLanguage} from '../../utils/useLanguage';

const schema = yup.object({
  phone_number: yup.string().min(9).max(9).required(t('required')),
});

const ForgotPassword = ({navigation}) => {
  const {selectedLanguage} = useLanguage();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState({
    visible: false,
    text: '',
  });

  const lang = selectedLanguage;

  const forgetPassword = async data => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/forget_password`, data, {
        'Content-Type': 'application/json',
        locale: lang,
      });

      console.log('forgot passwword res: ', res.data);

      // if success = true
      if (res.data.success) {
        setError({visible: false});
        navigation.navigate('VerifyCode', {
          screen: 'ForgotPassword',
          code: res.data.data.code,
          phone_number: data.phone_number,
        });
      } else {
        setError({
          visible: true,
          text: res.data.error,
        });
      }
      setLoading(false);
      // navigate to verify code with code as a parameter
    } catch (error) {
      console.log('forgot password error: ', error);
    }
  };

  const onSubmit = values => {
    forgetPassword(values);
  };
  return (
    <Formik
      validationSchema={schema}
      initialValues={{phone_number: ''}}
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
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop:40
          }}>
          <ScrollView contentContainerStyle={style.container}>
            {/* toast  */}
            {error.visible && (
              <ErrorToast
                contentContainerStyle={{
                  position: 'absolute',
                  top: 30,
                  left: 10,
                  borderColor: 'red',
                }}
                // style={{position: }}
                text1={error.text}
              />
            )}
            {/* logo */}
            <View style={style.logo}>
              <Image
                style={{width: 120, height: 120, margin: 10}}
                source={require('../../../assets/password.png')}
              />
            </View>
            {/* text */}
            <View style={style.textContainer}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                {t('forgetPassword')}
              </Text>
              <Text style={{marginTop: 10}}> {t('forgetBody')}</Text>
            </View>
            {/* input & button */}
            <View>
              <PhoneInput
                error={errors.phone_number}
                label={t('phoneNumber')}
                value={values.phone}
                // onBlur={handleBlur('phone_number')}
                onChangeText={handleChange('phone_number')}
              />
            </View>
            <CustomButton
              loading={loading}
              style={{marginTop: 20}}
              onPress={handleSubmit}
              text={t('next')}
            />
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default ForgotPassword;
