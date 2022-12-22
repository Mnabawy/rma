import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {t} from 'i18next';
import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';
import Input from '../../../components/input/input';
import Phone from '../../../components/phoneInput/PhoneInput';
import CustomButton from '../../../components/button/Button';
import {TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import ChangePassword from './ChangePassword';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import Toast from '../../../components/Toast/Toast';
import * as authActions from '../../../redux/actions/auth';
const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const EditProfile = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImages] = useState([]);
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.auth.userData);
  const location = useSelector(state => state.auth.location);
  const [toast, setToast] = useState({visible: false, text: ''});
  const dispatch = useDispatch();
  console.log(selectedImage[0]);
  const [loading, setLoading] = useState(false);

  const openGallary = async () => {
    var data = new FormData();
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      console.log('image', image.path);
      data.append('images[]', {
        uri: image.path,
        name: `dalel-images-multi-${new Date()}`,
        type: image.mime,
      });
    });
    // console.log('datas', data);
    try {
      axios({
        url: `${BASE_URL}/upload`,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      }).then(res => {
        if (res.data.success) {
          setSelectedImages(res.data.data);
          console.log('success image uploaded', res.data.data);
        }
      });
    } catch (error) {
      console.log('upload images error: ', error);
    }
  };

  const onSubmitHandler = values => {
    setLoading(true);
    const {name, last_name, phone_number, email} = values;
    const data = {
      name,
      last_name,
      phone_number,
      email,
      image: selectedImage[0],
      lat: location?.lat,
      lng: location?.lng,
      location_description: location?.addressName,
    };
    try {
      axios({
        url: `${BASE_URL}/auth/update_profile`,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        data,
      }).then(res => {
        if (res.data.success) {
          console.log('profile updated success: ', res.data.data);

          // update user's data
          dispatch(authActions.setUserData(res.data.data));
          navigation.goBack();
        } else {
          setToast({visible: true, text: res.data.error});
          setTimeout(() => {
            setToast({visible: false});
          }, 3000)();
        }
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        name: user?.name,
        last_name: user?.last_name,
        email: user?.email,
        phone_number: user?.phone_number,
      }}
      // validationSchema={schema}
      onSubmit={values => onSubmitHandler(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <View style={{flex: 1, backgroundColor: COLORS.white}}>
          {toast.visible && <Toast text={toast.text} />}
          <StatusBar backgroundColor={COLORS.white} />
          <ScrollView
            contentContainerStyle={{paddingHorizontal: 10, marginVertical: 20}}>
            <View style={{paddingBottom:100}}>
              <AppText style={{fontSize: 16, color: COLORS.black}}>
                {t('profilePicture')}
              </AppText>
              <AppText style={{fontSize: 14}}>{t('selectAvatar')}</AppText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginVertical: 10,
                }}>
                {/* {user.picture ? (
                ) : (
              )} */}
                {/* <TouchableOpacity onPress={openGallary}>
                    <Image source={require('../../../../assets/photo.png')} />
                  </TouchableOpacity> */}
                <Image
                  source={{uri: user.picture}}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 50,
                    marginHorizontal: 10,
                  }}
                />
                <TouchableOpacity onPress={openGallary}>
                  <Image source={require('../../../../assets/photo.png')} />
                </TouchableOpacity>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 0.48}}>
                  <Input
                    value={values.name}
                    onChangeText={handleChange('name')}
                    label={t('firstName')}
                    placeholder={t('enterFirstName')}
                  />
                </View>
                <View style={{flex: 0.48}}>
                  <Input
                    value={values.last_name}
                    onChangeText={handleChange('last_name')}
                    label={t('lastName')}
                    placeholder={t('enterLastName')}
                  />
                </View>
              </View>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                label={t('email')}
                placeholder={t('enterEmail')}
              />

              <Phone
                value={values.phone_number}
                onChangeText={handleChange('phone_number')}
                style={{marginTop: 20}}
                label={t('numberPhone')}
              />
              <AppText style={{color: COLORS.black}}>{t('location')}</AppText>
              <AppText>{location?.addressName?.slice(0, 70)}</AppText>
              <TouchableOpacity
                onPress={() =>
                  navigation.getParent().navigate('HomeStack', {
                    screen: 'Map',
                  })
                }
                style={{width: '100%', marginTop: 10}}>
                <Image
                  style={{width: '100%'}}
                  source={require('../../../../assets/mapWithPointer.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              height: 77,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
            }}>
            <CustomButton
              loading={loading}
              text={t('save')}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
