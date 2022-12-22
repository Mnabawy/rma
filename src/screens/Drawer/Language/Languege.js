import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {t} from 'i18next';
import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';
import LanguageButton from './LanguageButton';
import CustomButton from '../../../components/buttonColored/Button';
import {useLanguage} from '../../../utils/useLanguage';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Languege = ({route}) => {
  const {onChageLanguage} = useLanguage();
  const {local} = route?.params;
  const [en, setEn] = useState(local == 'en');
  const [ar, setAr] = useState(local == 'ar');

  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 40,
      }}>
      <AppText style={{fontSize: 16, color: COLORS.black}}>
        {t('selectLanguage')}
      </AppText>
      <AppText style={{marginBottom: 20}}>{t('selectLanguageBody')}</AppText>

      <LanguageButton
        onPress={() => {
          setAr(value => !value);
          setEn(value => !value);
        }}
        icon={<Image source={require('../../../../assets/arabic.png')} />}
        title={t('arabic')}
        selected={ar}
      />

      <LanguageButton
        onPress={() => {
          setEn(value => !value);
          setAr(value => !value);
        }}
        icon={<Image source={require('../../../../assets/english.png')} />}
        title={t('english')}
        selected={en}
      />

      <View style={{marginTop: 40, width: '100%'}}>
        <CustomButton
          text={t('save')}
          onPress={() => onChageLanguage(ar ? 'ar' : 'en')}
          backgroundColor={COLORS.primary}
          textColor={COLORS.white}
          borderColor={COLORS.primary}
        />
      </View>
    </View>
  );
};

export default Languege;

const styles = StyleSheet.create({});
