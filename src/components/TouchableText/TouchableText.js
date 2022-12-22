import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from './style';
import AppText from '../text/Text';

const TouchableText = ({text, onPress, textstyle}) => {
  return (
    <Pressable onPress={onPress} style={style.container}>
      <AppText style={[style.text, textstyle]}>{text}</AppText>
    </Pressable>
  );
};

export default TouchableText;
