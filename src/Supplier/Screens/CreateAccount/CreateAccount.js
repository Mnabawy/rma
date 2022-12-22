import {
  Dimensions,
  I18nManager,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import {COLORS} from '../../../utils/colors';
import CheckBox from '../../../components/checkBox/CheckBox';
// import { CheckBox } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import TouchableText from '../../../components/TouchableText/TouchableText';
import CustomButton from '../../../components/button/Button';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Progress from '../../../components/Progress/Progress';
import Button from '../../../components/buttonColored/Button';
import {ErrorToast} from 'react-native-toast-message';
import AppText from '../../../components/text/Text';

import {FloatingLabelInput} from 'react-native-floating-label-input';
// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from '../../../components/phoneInput/PhoneInput';
import {Formik} from 'formik';
import Header from '../../components/Header';
import ScreenWrpper from '../../../components/ScreenWrpper/ScreenWrpper';

import {schema} from './schema';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import Toast from '../../../components/Toast/Toast';

const CreateAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [isRepeatPasswordSecure, setIsRepeatPasswordSecure] = useState(false);
  const [error, setError] = useState({
    visible: false,
    text: '',
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const width = Dimensions.get('screen').width;

  const isRTL = false;
  // ui
  // formik
  // submit values

  const submitHandler = async values => {
    console.log('values: ', values);
    const {name, last_name, phone_number, password, password_confirmation} =
      values;

    const data = {
      name,
      last_name,
      phone_number,
      password,
      password_confirmation,
    };
    try {
      await axios({
        url: `${BASE_URL}/auth/supplier/register`,
        method: 'post',
        data: data,
      }).then(res => {
        if (res.data.success) {
          setError({visible: false});
          // store data
          dispatch(authActions.setUserData(res.data.data));
          dispatch(authActions.setToken(res.data.data.token));
          // navigate
          console.log('navigate');
          navigation.navigate('VerifyCodeSupplier', {
            screen: 'CreateAccount',
          });
        } else {
          setError({visible: true, text: res.data.error});
        }
      });
    } catch (error) {
      console.log('register supplier error: ', error);
    }
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
      onSubmit={values => submitHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <ScreenWrpper background={COLORS.white} style={{flex: 1}}>
          <ScrollView>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <Progress
              borderWidth={0}
              progress={0.25}
              color={COLORS.primary}
              width={width}
            />
            <Header navigation={navigation} />
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                paddingTop: 40,
              }}>
              {error.visible && <Toast error text={error.text} />}
              <AppText
                style={{
                  fontSize: 20,
                  color: COLORS.black,
                  textAlign: 'center',
                }}>
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
                    error={errors.name}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label={t('firstName')}
                    placeholder={t('enterFirstName')}
                  />
                </View>
                <View style={{flex: 0.48}}>
                  <Input
                    error={errors.last_name}
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    label={t('lastName')}
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
                iconPosition={isRTL ? 'left' : 'right'}
              />
              <Input
                error={errors.password_confirmation}
                value={values.password_confirmation}
                onChangeText={handleChange('password_confirmation')}
                label={t('repeatPassword')}
                placeholder={t('repeatPassword')}
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
                iconPosition={isRTL ? 'left' : 'right'}
              />

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  text={t('agreeToTerms')}
                  value={values.checked}
                  onValueChange={value => setFieldValue('checked', value)}
                />
                <View style={{marginTop: 7, marginHorizontal: -20}}>
                  <TouchableText text={t('privacyPolicy')} />
                </View>
              </View>
              <Text style={styles.error}>{errors.checked}</Text>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginTop: 25,
                }}>
                <Button
                  onPress={handleSubmit}
                  styles={{marginHorizontal: 0}}
                  text={t('createAccountBtn')}
                  backgroundColor={COLORS.primary}
                  textColor={COLORS.white}
                  borderColor={COLORS.white}
                />
              </View>
            </View>
          </ScrollView>
        </ScreenWrpper>
      )}
    </Formik>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
    marginTop: -20,
  },
});
