import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../../components/text/Text';

import {COLORS} from '../../../utils/colors';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import CustomButton from '../../../components/buttonColored/Button';
import {Formik} from 'formik';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import CustomToast from '../../../components/Toast/Toast';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import RNRestart from 'react-native-restart';
import {useSelector} from 'react-redux';
import {useLanguage} from '../../../utils/useLanguage';
import {useKeyboard} from '../../../utils';

const schema = yup.object({
  name: yup.string().min(3).required(t('required')),
  email: yup.string().required(t('required')).email(t('enterValidEmail')),
  message: yup.string().min(20).required(t('required')),
});

const CallUs = () => {
  const {selectedLanguage} = useLanguage();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({visible: false, text: ''});
  const lang = selectedLanguage;
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // keypoard ios
  const keyboardHeight = useKeyboard();
  const getPhone = async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/settings`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          'code[]': 'contact_number',
        },
      }).then(res => {
        if (res.data.success) {
          setPhone(res?.data?.data[0]?.value.slice(1));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getAddress = async () => {
    try {
      await axios({
        url: `${BASE_URL}/settings`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          'code[]': 'address_en',
        },
      }).then(res => {
        if (res.data.success) {
          console.log('addresssssss: ', res.data);
          setLocation(res?.data?.data[0]?.value);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log('social links api issue', err);
    }
  };

  const getEmail = async () => {
    setLoading(true);
    try {
      await axios({
        url: `${BASE_URL}/settings`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          'code[]': 'contact_form_email',
        },
      }).then(res => {
        if (res.data.success) {
          setEmail(res?.data?.data[0]?.value);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log('social links api issue', err);
    }
  };

  useEffect(() => {
    getPhone();
    getEmail();
    getAddress();
  }, []);

  const submitHandler = async values => {
    console.log('here');
    setLoading(true);
    const data = values;
    try {
      await axios({
        url: `${BASE_URL}/contact_us`,
        method: 'post',
        data,
      }).then(res => {
        if (res.data.success) {
          setToast({visible: true});
        }
        (() => {
          setTimeout(() => {
            setToast({visible: false});
          }, 3000);
        })();
      });
    } catch (err) {
      console.log('call us api issue', err);
    }
    setLoading(false);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={schema}
      onSubmit={values => submitHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        resetForm,
      }) => (
        <>
          <StatusBar backgroundColor={COLORS.darkGold} />
          <View
            style={{
              backgroundColor: COLORS.darkGold,
              paddingHorizontal: 10,
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              paddingBottom: 15,
            }}>
            {toast.visible && (
              <View style={{backgroundColor: COLORS.darkGold}}>
                <CustomToast text={t('thanksForFeedback')} />
              </View>
            )}
            <View style={{alignItems: 'center', marginVertical: 0}}>
              <Image
                source={require('../../../../assets/callUs.png')}
                style={{width: 100, height: 100}}
                resizeMode="contain"
              />
            </View>
            <AppText
              style={{
                color: COLORS.white,
                fontSize: 18,
                textAlign: 'center',
                marginTop: 5,
              }}>
              {t('callUs')}
            </AppText>
            <View style={{marginTop: 10}}>
              <AppText
                style={{opacity: 0.5, fontSize: 14, color: COLORS.white}}>
                {t('location')}
              </AppText>
              <AppText style={{fontSize: 16, color: COLORS.white}}>
                {location}
              </AppText>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 0.5}}>
                <AppText
                  style={{opacity: 0.5, fontSize: 14, color: COLORS.white}}>
                  {t('email')}
                </AppText>
                <AppText style={{fontSize: 16, color: COLORS.white}}>
                  {email}
                </AppText>
              </View>

              <View style={{flex: 0.5}}>
                <AppText
                  style={{opacity: 0.5, fontSize: 14, color: COLORS.white}}>
                  {t('phone')}
                </AppText>
                <AppText style={{fontSize: 16, color: COLORS.white}}>
                  (+20) {phone}
                </AppText>
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
            }}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingTop: 20,
                // flex: 1,
              }}>
              <View style={{paddingBottom: keyboardHeight}}>
                <Input
                  error={errors.name}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  label={t('name')}
                  placeholder={t('enterName')}
                />
                <Input
                  error={errors.email}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  label={t('email')}
                  placeholder={t('enterEmail')}
                />
                <Input
                  error={errors.message}
                  value={values.message}
                  onChangeText={handleChange('message')}
                  label={t('message')}
                  placeholder={t('enterMessage')}
                />

                <View style={{marginTop: 40}}>
                  <CustomButton
                    loading={loading}
                    text={t('send')}
                    onPress={() => {
                      handleSubmit();
                      // await resetForm(); // hides the toast
                    }}
                    backgroundColor={COLORS.primary}
                    textColor={COLORS.white}
                    borderColor={COLORS.primary}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </>
      )}
    </Formik>
  );
};

export default CallUs;

const styles = StyleSheet.create({});
