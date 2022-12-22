import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  I18nManager,
  ActionSheetIOS,
  Alert,
  ScrollView,
} from 'react-native';

import {COLORS, widthDevice, normalize} from '../../utils';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-easy-action-sheet';
// import {t} from '../../i18n';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {t} from 'i18next';

export const UploadNotes = ({
  setNote,
  setUploadImages,
  oneImage,
  icon_Image = true,
  ref,
}) => {
  const [images, setImages] = useState([]);
  const sheetRef = useRef(null);

  const _delete = index => {
    Alert.alert('DELETE', 'Are you sure to delete this image?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => delete_index(index)},
    ]);
  };

  const delete_index = index_ => {
    setImages(images.filter((item, index) => index !== index_));
  };

  const showActionSheet = () => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Open camera', 'Choose from gallary', 'Cancel'],
          cancelButtonIndex: 2,
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          buttonIndex == 0
            ? openCamera()
            : buttonIndex == 1
            ? openGallary()
            : null;
        },
      );
    } else sheetRef.current.show();
  };

  useEffect(() => {
    setUploadImages(images);
    console.log({images});
  }, [images]);

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
    }).then(image => {
      oneImage
        ? setImages(image.data)
        : setImages(prev => [...prev, image.data]);
    });
  };

  const openGallary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: oneImage ? false : true,
      includeBase64: true,
    }).then(images_ => {
      if (oneImage) setImages([images_.data]);
      else {
        if (images_.length > 0) {
          images_.map(async (item, index) => {
            setImages(prev => [...prev, item.data]);
          });
        }
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <ActionSheet
        androidHeaderHeight={0}
        ref={sheetRef}
        options={[
          t('openCamera'),
          t('choosefromGallary'),
          <Text style={{color: 'red'}}>{t('cancel')}</Text>,
        ]}
        cancelButtonIndex={2}
        onPress={index => {
          index == 0 ? openCamera() : index == 1 ? openGallary() : null;
        }}
      />

      <View style={styles.space_row}>
        <Text style={{color: '#000', fontSize: normalize(16)}}>
          {t('notes')}
        </Text>

        {icon_Image && (
          <TouchableOpacity onPress={showActionSheet}>
            <Image
              source={require('../../../assets/camera.png')}
              style={{width: normalize(26), height: normalize(26)}}
            />
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        ref={ref}
        placeholder={t('WriteHere')}
        style={styles.input}
        onChangeText={setNote}
        multiline
      />

      <View style={{}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{alignSelf: 'flex-start'}}>
          {images.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  _delete(index);
                }}
                style={{marginEnd: 8}}
                key={index.toString()}>
                <FastImage
                  source={{uri: `data:image/jpg;base64,${item}`}}
                  style={styles.img}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    alignSelf: 'center',
    width: widthDevice - normalize(32),
    borderRadius: normalize(8),
    padding: normalize(16),
    marginVertical: hp(1.5),
  },
  space_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    color: COLORS.BLACK + 80,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: normalize(16),
    padding: 0,
    paddingVertical: normalize(15),
  },
  img: {
    width: wp(15),
    height: wp(15),
    borderRadius: 4,
  },
});
