import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dropdown from '../../../components/Dropdown/Dropdown';
import UploadPhoto from '../../../components/UploadPhotoInput/UploadPhoto';
import {useState} from 'react';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import {COLORS} from '../../../utils/colors';
import DatePicker from '../../../components/DatePicker/DatePicker';
import HomeStackHeader from '../HomeStackHeader';
import BouncyCheckBox from '../../../components/checkBoxRounded/CheckBox';

const BookService = ({navigation, route, onPress}) => {
  const [note, setNote] = useState('');
  const [images, setImages] = useState('');
  const [evening, setEvening] = useState(false);
  const [morning, setMorning] = useState(false);
  const [night, setNight] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        height: Dimensions.get('screen').height,
        // marginTop: 50,
      }}>
      <HomeStackHeader
        title="Book"
        navigation={navigation}
        onPress={onPress}
        route={route}
      />
      <View style={{backgroundColor: COLORS.white, flex: 1, paddingTop: 10}}>
        <Dropdown label={t('subjectService')} />
        <UploadPhoto placeholder={t('placeholder')} label={t('label')} />
        <Input label={t('location')} value="Test Location" />
        <Input label={t('detailsaAddress')} value="Test Location" />
        <Text style={styles.text}>{t('timeWork')}</Text>
        <View style={styles.dateContainer}>
          <View style={{flex: 0.45}}>
            <DatePicker label={t('startDay')} />
          </View>
          <View style={{flex: 0.45}}>
            <DatePicker label={t('endDay')} />
          </View>
        </View>

        <Text style={styles.text}>{t('exPeriod')}</Text>

        {/* <Check */}

        <View style={styles.checkboxContainer}>
          <BouncyCheckBox
          
            boxType="circle"
            textStyle={{color: COLORS.black}}
            value={morning}
            onValueChange={value => setMorning(value)}
            text={t('morning')}
          />
          <BouncyCheckBox
            textStyle={{color: COLORS.black}}
            containerStyle={{marginHorizontal: 30}}
            boxType="circle"
            value={evening}
            onValueChange={value => setEvening(value)}
            text={t('evening')}
          />
          <BouncyCheckBox
            textStyle={{color: COLORS.black}}
            boxType="circle"
            value={night}
            onValueChange={value => setNight(value)}
            text={t('night')}
          />
        </View>
        {/* <CustomCheckBox boxType="circle" value="evening" text={t('evening')} /> */}
      </View>
    </ScrollView>
  );
};

export default BookService;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'poppins-regular',
    color: COLORS.textColor,
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
