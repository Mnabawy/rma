import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';
import {t} from 'i18next';

const SuccessServiceSelected = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SuppllierHome');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AppText style={{AlignText: 'center', fontSize: 28, color: COLORS.black}}>
        {t('success')}
      </AppText>
      <AppText style={{AlignText: 'center', fontSize: 16, color: COLORS.black}}>
        {t('successRequestSent')}
      </AppText>
    </View>
  );
};

export default SuccessServiceSelected;

const styles = StyleSheet.create({});
