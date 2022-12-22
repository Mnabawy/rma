import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import Button from '../../../components/buttonColored/Button';
import TouchableText from '../../../components/TouchableText/TouchableText';
import InputDatePicker from '../../../components/DatePicker/DatePicker';

const StartDate = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingTop: 50,
      }}>
      <AppText style={{fontSize: 18, marginBottom: 15, color: COLORS.black}}>
        {t('selectStartDate')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('selectStartDateBody')}
      </AppText>

      <View>
        <InputDatePicker
          label={t('startDay')}
          placeholder={t('enterReceiveCode')}
          value={date}
          onChange={date => setDate(date)}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          height: 77,
          marginTop: 40,
        }}>
        <Button
          onPress={() => navigation.navigate('SuppllierHome')}
          styles={{
            paddingVertical: 15,
            paddingHorizontal: 0,
          }}
          backgroundColor={COLORS.primary}
          textColor={COLORS.white}
          borderColor={COLORS.primary}
          text={t('confirmstartday')}
        />
      </View>
    </View>
  );
};

export default StartDate;
