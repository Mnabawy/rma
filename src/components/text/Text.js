import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';
import {useTranslation} from 'react-i18next';

const CustomText = ({style, children}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <Text
      style={[
        {
          fontFamily: 'Poppins-Regular',
          color: COLORS.black,
          textAlign: lang == 'ar' ? 'left' : 'right',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default CustomText;
