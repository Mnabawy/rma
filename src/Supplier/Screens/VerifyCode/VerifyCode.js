import {
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
// import Input from '../../components/input/input';
import {Formik} from 'formik';
import {t} from 'i18next';
import {COLORS} from '../../../utils/colors';
import CustomButton from '../../../components/button/Button';
import style from './style';
import TouchableText from '../../../components/TouchableText/TouchableText';
// import OtpInput from '../../../components/otp/OtpInput';
import OTPInput from '../../../components/@twotalltotems/react-native-otp-input';

import AppText from '../../../components/text/Text';
import {StatusBar} from 'react-native';
import CustomProgress from '../../../components/Progress/Progress';
import {Dimensions} from 'react-native';
import Header from '../../components/Header';

const width = Dimensions.get('screen').width;

const VerifyCode = ({route, navigation}) => {
  console.log('verify code Supplier ');
  const {screen} = route.params;
  console.log('screen from verifyCode', screen);

  const submitHandler = () => {
    // navigate based on screen's name
    navigation.navigate('DefineServicesSupplier');
  };

  return (
    <Formik initialValues={{code: ''}} onSubmit={values => submitHandler()}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
          <CustomProgress
            borderWidth={0}
            progress={0.5}
            color={COLORS.primary}
            width={width}
          />
          <Header navigation={navigation} />
          <ScrollView contentContainerStyle={style.container}>
            {/* logo */}
            <View style={style.logo}>
              <Image source={require('../../../../assets/verifyCode.png')} />
            </View>
            {/* text */}
            <View style={style.textContainer}>
              <AppText style={{fontSize: 24, color: COLORS.black}}>
                {t('entercode')}
              </AppText>
              <AppText style={{marginTop: 10}}> {t('sentviasms')}</AppText>
            </View>
            {/* input & button */}
            <View>
              <View style={{alignItems: 'center'}}>
                <OTPInput
                  style={{width: '80%', height: 100}}
                  pinCount={4}
                  code={values.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                  // onCodeChanged = {code => { this.setState({code})}}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    width: 60,
                    height: 60,
                    padding: 10,
                    borderRadius: 10,
                    color: COLORS.black,
                    fontSize: 26,
                  }}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeChanged={code => {
                    setFieldValue('code', code);
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 10,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    marginHorizontal: 5,
                    fontSize: 14,
                  }}>
                  {t('didnnotrecieveit')}
                </Text>
                <TouchableText text={t('clickHere')} />
                {/* <Text>')}</Text> */}
              </View>
              <CustomButton onPress={handleSubmit} text={t('send')} />
            </View>
          </ScrollView>
        </>
      )}
    </Formik>
  );
};

export default VerifyCode;
