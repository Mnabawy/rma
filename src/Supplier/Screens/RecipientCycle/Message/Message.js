import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import AppText from '../../../../components/text/Text.js';
import {COLORS} from '../../../../utils';

const Message = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}>
      <AppText style={{fontSize: 18, color: COLORS.black, textAlign: 'center'}}>
        {t('messageHeader')}
      </AppText>
      <AppText
        style={{
          color: COLORS.black,
          paddingHorizontal: 10,
          marginTop: 15,
          textAlign: 'center',
        }}>
        {t('messageBody')}
      </AppText>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
