import React from 'react';
import {Pressable} from 'react-native';
import {COLORS} from '../../utils';
import Indecator from '../Indecator/Indecator';
import AppText from '../text/Text';
import styles from './style';
const CustomButton = ({
  text,
  onPress,
  borderColor,
  backgroundColor,
  textColor,
  style,
  loading,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {backgroundColor: backgroundColor, borderColor: borderColor},
        styles.container,
        style,
      ]}>
      {loading ? (
        <Indecator size={20} color={COLORS.white} />
      ) : (
        <AppText
          style={[styles.text, {color: textColor ? textColor : 'white'}]}>
          {text}
        </AppText>
      )}
    </Pressable>
  );
};

export default CustomButton;
