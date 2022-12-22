import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';

const Indecator = ({color, size}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: COLORS.white,
      }}>
      <ActivityIndicator color={color} size={size}  />
    </View>
  );
};

export default Indecator;

const styles = StyleSheet.create({});
