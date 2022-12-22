import React from 'react';
import {Pressable} from 'react-native';
import { COLORS } from '../../utils';
import Indecator from '../Indecator/Indecator';
import AppText from '../text/Text';
import style from './style';
const CustomButton = ({
  text,
  onPress,
  borderColor,
  backgroundColor,
  textColor,
  styles,
  loading,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {backgroundColor: backgroundColor, borderColor: borderColor},
        style.container,
        styles,
      ]}>
      {loading ? (
        <Indecator size={20} color={COLORS.white} />
      ) : (
        <AppText style={[style.text, {color: textColor}]}>{text}</AppText>
      )}
    </Pressable>
  );
};

export default CustomButton;
