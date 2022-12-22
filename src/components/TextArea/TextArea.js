import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';
import {useTranslation} from 'react-i18next';

const TextArea = ({value, onChangeText, placeholder}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  return (
    <TextInput
      style={{
        backgroundColor: COLORS.lighterGray,
        borderWidth: 1,
        borderColor: COLORS.darkGray,
        borderRadius: 8,
        textAlignVertical: 'top',
        textAlign: lang === 'en' ? 'left' : 'right',
        padding: 5,
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline
      numberOfLines={4}
      minHeight={70}
    />
  );
};

export default TextArea;
