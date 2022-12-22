import {
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {t} from 'i18next';
import Input from '../../components/input/input';
import {COLORS} from '../../utils/colors';
import CheckBox from '../../components/checkBox/CheckBox';
// import { CheckBox } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import TouchableText from '../../components/TouchableText/TouchableText';
import CustomButton from '../../components/button/Button';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {ErrorToast} from 'react-native-toast-message';

import Button from '../../components/buttonColored/Button';
import AppText from '../../components/text/Text';

import * as authActions from '../../redux/actions/auth';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';

import {FloatingLabelInput} from 'react-native-floating-label-input';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from '../../components/phoneInput/PhoneInput';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const schema = yup.object({
  name: yup
    .string()
    .min(3, value => `${t('mustBeAtLeast')} ${value.min} ${t('charachters')}`)
    .required(t('required')),
  last_name: yup
    .string()
    .min(3, value => `${t('mustBeAtLeast')} ${value.min} ${t('charachters')}`)
    .required(t('required')),
  phone_number: yup
    .string()
    .min(9, value => `${t('mustBeAtLeast')} ${value.min} ${t('charachters')}`)
    .max(9, value => `${t('maximum')} ${value.max} ${t('charachters')}`)
    .required(t('required')),
  password: yup
    .string()
    .min(6, value => `${t('mustBeAtLeast')} ${value.min} ${t('charachters')}`)
    .required(t('required')),
  checked: yup.bool().oneOf([true], t('required')),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], t('mustMatch')),
});

const CreateAccount = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [isRepeatPasswordSecure, setIsRepeatPasswordSecure] = useState(false);
  const [error, setError] = useState({
    visible: false,
    text: '',
  });

  const {i18n} = useTranslation();

  const lang = i18n.language;
  console.log('language: ', lang);

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);

  const createAccount = async values => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, values, {
        headers: {
          locale: lang,
          'Content-Type': 'application/json',
        },
      });
      if (res.data.success) {
        console.log('create account res.data', res.data);
        dispatch(authActions.setUserData(res.data.data));
        dispatch(authActions.setToken(res.data.data.token)); // needs to be checked
        // set comfirmed at in storage
        // await AsyncStorage.setItem('confirmed_at', res.data.data.confirmed_at);

        // navigate
        if (!res?.data?.data?.confirmed_at) {
          navigation.navigate('VerifyCode', {
            screen: 'CreateAccount',
            phone_number: values.phone_number,
            code: res.data.data.code,
          });
        } else if (res?.data?.data?.confirmed_at) {
          dispatch(authActions.login());
        }
      } else {
        // else handle error
        setError({visible: true, text: res.data.error});
        setTimeout(() => {
          setError({visible: false});
        }, 2000)();
        // console.log(res.data.error);
      }
    } catch (error) {
      console.log('CreateAccount data error: ', error);
    }
    setLoading(false);
  };

  //end handle api

  const onSubmit = async values => {
    console.log('values', values);
    await createAccount(values);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        last_name: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        checked: false,
      }}
      validationSchema={schema}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          {error.visible && (
            <View
              style={{
                alignSelf: 'center',
                position: 'absolute',
                zIndex: 100,
              }}>
              <ErrorToast text1={error.text} />
            </View>
          )}
          <AppText
            style={{fontSize: 20, color: COLORS.black, textAlign: 'center'}}>
            {t('createAccount')}
          </AppText>
          <AppText style={{fontSize: 14, textAlign: 'center'}}>
            {t('createAccountBody')}
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.48}}>
              <Input
                label={t('firstName')}
                error={errors.name}
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder={t('enterFirstName')}
              />
            </View>
            <View style={{flex: 0.48}}>
              <Input
                label={t('lastName')}
                error={errors.last_name}
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                placeholder={t('enterLastName')}
              />
            </View>
          </View>

          <PhoneInput
            error={errors.phone_number}
            value={values.phone_number}
            onChangeText={handleChange('phone_number')}
            style={{marginTop: 30}}
            label={t('numberPhone')}
          />

          <Input
            error={errors.password}
            value={values.password}
            onChangeText={handleChange('password')}
            label={t('password')}
            placeholder={t('enterPassword')}
            secureTextEntry={isSecureEntry}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry(prev => !prev);
                }}>
                <Text>
                  {isSecureEntry ? (
                    <FeatherIcon name="eye" size={18} />
                  ) : (
                    <FeatherIcon name="eye-off" size={18} />
                  )}
                </Text>
              </TouchableOpacity>
            }
            iconPosition={lang === 'en' ? 'left' : 'right'}
          />
          <Input
            error={errors.password_confirmation}
            value={values.password_confirmation}
            onChangeText={handleChange('password_confirmation')}
            label={t('repeatPassword')}
            placeholder={t('repeatPassword')}
            secureTextEntry={isSecureEntry2}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry2(prev => !prev);
                }}>
                <Text>
                  {isSecureEntry2 ? (
                    <FeatherIcon name="eye" size={18} />
                  ) : (
                    <FeatherIcon name="eye-off" size={18} />
                  )}
                </Text>
              </TouchableOpacity>
            }
            iconPosition={lang === 'en' ? 'left' : 'right'}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // borderWidth: 1,
              marginTop: 10,
            }}>
            <CheckBox
              containerStyle={{}}
              value={values.checked}
              onValueChange={value => setFieldValue('checked', value)}
            />
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -20,
              }}>
              <Text>{t('agreeToTerms')}</Text>
              <TouchableText text={t('privacyPolicy')} />
            </View>
          </View>
          <Text style={styles.error}>{errors.checked}</Text>

          <View
            style={{width: '100%', justifyContent: 'center', marginTop: 20}}>
            <Button
              loading={loading}
              onPress={handleSubmit}
              styles={{marginHorizontal: 0}}
              text={t('createAccountBtn')}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              borderColor={COLORS.white}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingTop: 14,
    fontSize: 12,
    marginTop: -20,
  },
});
