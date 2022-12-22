import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import style from './style';
import {t} from 'i18next';
import CustomInput from '../../components/input/input';
import {Formik} from 'formik';
import CustomButton from '../../components/button/Button';
import Input from '../../components/input/input';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {SuccessToast} from 'react-native-toast-message';

import * as authActions from '../../redux/actions/auth';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {ErrorToast} from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {useLanguage} from '../../utils/useLanguage';

const schema = yup.object({
  password: yup.string().min(6).required(t('required')),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const NewPassword = ({navigation, route}) => {
  const {selectedLanguage} = useLanguage();
  const [loading, setLoading] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [isRepeatPasswordSecure, setIsRepeatPasswordSecure] = useState(false);
  // navigation.navigate('ChangePasswordSuccess');

  const [error, setError] = useState({
    visible: false,
    text: '',
  });
  const isRTL = false;
  const lang = selectedLanguage;
  const updatePassword = async values => {
    const {phone_number, code} = route.params;
    const data = {
      phone_number: phone_number,
      code: code,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/update_password`, data, {
        headers: {
          locale: lang,
          'Content-Type': 'application/json',
        },
      });

      if (res.data.success) {
        navigation.navigate('ChangePasswordSuccess');
      } else {
        setError({visible: true, text: res.data.error});
      }
      setLoading(false);
    } catch (error) {
      console.log('update password error', error);
    }
  };

  const onSubmit = async values => {
    await updatePassword(values);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{password: '', password_confirmation: ''}}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <ScrollView contentContainerStyle={style.container}>
          {error.visible && <ErrorToast text1={error.text} />}
          <View style={style.txtContainer}>
            <Text style={style.header}>{t('createnNewPassword')}</Text>
            <Text>{t('createnNewPasswordBody')}</Text>
          </View>
          <View style={style.inputContainer}>
            <Input
              error={errors.password}
              onBlur={() => handleBlur('password')}
              label={t('newPassword')}
              placeholder={t('enterPassword')}
              secureTextEntry={isPasswordSecure}
              value={values.password}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setIsPasswordSecure(prev => !prev);
                  }}>
                  <Text>
                    {isPasswordSecure ? (
                      <Icon name="eye" size={18} />
                    ) : (
                      <Icon name="eye-off" size={18} />
                    )}
                  </Text>
                </TouchableOpacity>
              }
              iconPosition={isRTL ? 'left' : 'right'}
              onChangeText={value => setFieldValue('password', value)}
            />
            <Input
              error={errors.password_confirmation}
              label={t('repeatNewPassword')}
              placeholder={t('enterPassword')}
              secureTextEntry={isRepeatPasswordSecure}
              value={values.password_confirmation}
              icon={
                <TouchableOpacity
                  onPress={() => {
                    setIsRepeatPasswordSecure(prev => !prev);
                  }}>
                  <Text>
                    {isRepeatPasswordSecure ? (
                      <Icon name="eye" size={18} />
                    ) : (
                      <Icon name="eye-off" size={18} />
                    )}
                  </Text>
                </TouchableOpacity>
              }
              iconPosition={isRTL ? 'left' : 'right'}
              onChangeText={value =>
                setFieldValue('password_confirmation', value)
              }
            />
          </View>
          <View style={style.btnContainer}>
            <CustomButton onPress={handleSubmit} text={t('send')} />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default NewPassword;
