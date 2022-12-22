import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ModalPortal, Modal, ModalTitle} from 'react-native-modals';
import {t} from 'i18next';
import {Dimensions} from 'react-native';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import Input from '../../../components/input/input';
import Button from '../../../components/buttonColored/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../../redux/actions/auth';

const width = Dimensions.get('screen').width;

const schema = yup.object({
  // oldpassword: yup.string().min(6).required(t('required')),
  password: yup.string().min(6).required(t('required')),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], t('Passwordsmustmatch')),
});

const ChangePassword = ({visible, setVisible, onPress, phone_number, code}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [close, setClose] = useState(visible);
  const onSubmitHandler = async values => {
    const {password, password_confirmation} = values;
    const data = {password, password_confirmation};
    console.log(data);
    // if (!code) {
    //   alert(t('youdonnothavecode'));
    // } else {
    await axios({
      method: 'post',
      url: `${BASE_URL}/auth/update_profile`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: data,
    })
      .then(res => {
        if (res.data.success) {
          setVisible(false);
          // update the user data
          dispatch(authActions.setUserData(res.data.data));
        } else {
          console.log('fail', res.data);
        }
      })
      .catch(err => {
        console.log('profile change password err:', err);
      });
    // }
  };
  return (
    <Formik
      validateOnChange
      validationSchema={schema}
      initialValues={{password: '', password_confirmation: ''}}
      onSubmit={values => onSubmitHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <Modal
          visible={visible}
          modalStyle={{
            width,
            flex: 1,
            marginTop: '40%',
            padding: 10,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingBottom: 100}}>
              <TouchableOpacity onPress={onPress}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('../../../../assets/close.png')}
                />
              </TouchableOpacity>
              <ModalTitle
                textStyle={{
                  fontSize: 24,
                }}
                style={{
                  backgroundColor: COLORS.white,
                  borderBottomWidth: 0,
                }}
                title={t('changePassowrd')}
              />
              <AppText style={{textAlign: 'center', fontSize: 14}}>
                {t('enterPassword')}
              </AppText>
              {/* <Input
              value={values.oldpassword}
              onChangeText={handleChange('oldpassword')}
              label={t('oldPassword')}
              placeholder={t('enterPassword')}
              />
              {errors.oldpassword && (
                <Text style={styles.error}>{errors.oldpassword}</Text>
              )} */}
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                label={t('newPassword')}
                placeholder={t('enterPassword')}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <Input
                value={values.password_confirmation}
                onChangeText={handleChange('password_confirmation')}
                label={t('repeatNewPassword')}
                placeholder={t('enterPassword')}
              />
              {errors.password_confirmation && (
                <Text style={styles.error}>{errors.password_confirmation}</Text>
              )}
              <Button
                styles={{marginVertical: 20}}
                text={t('save')}
                backgroundColor={COLORS.primary}
                borderColor={COLORS.primary}
                textColor={COLORS.white}
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        </Modal>
      )}
    </Formik>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  error: {
    color: COLORS.red,
  },
});
