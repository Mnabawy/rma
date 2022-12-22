import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import {COLORS} from '../../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const isRtl = false;

const UploadPhoto = ({label, placeholder, onSelect, value, onChangeText}) => {
  const [image, setImage] = useState([]);
  const onPressHandler = async () => {
    // console.log('open image');
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    }).then(images => {
      onSelect(images);
    });
  };

  const {i18n} = useTranslation();
  const lang = i18n.language;

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          numberOfLines={3}
          multiline
          style={[
            styles.textInput,
            {
              textAlign: lang === 'en' ? 'left' : 'right',
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onPressHandler}>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="cover"
            source={require('../../../assets/camera.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.garay,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 30,
  },
  textView: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    alignSelf: isRtl ? 'flex-end' : 'flex-start',
    marginTop: -12,
    textAlign: isRtl ? 'right' : 'left',
  },
  textInput: {
    fontSize: 14,
    width: '90%',
  },
});
