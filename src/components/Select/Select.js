import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from '../../components/text/Text';
import {COLORS} from '../../utils';

const Select = ({label, placeholder, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: 1,
          borderColor: COLORS.garay,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 8,
        },
        style,
      ]}
      onPress={onPress}>
      <AppText
        style={{
          position: 'absolute',
          bottom: 20,
          height: 56,
          paddingHorizontal: 5,
          backgroundColor: COLORS.white,
          marginHorizontal: 10,
          fontSize: 16,
          color: COLORS.black,
        }}>
        {label}
      </AppText>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <AppText>{placeholder}</AppText>
        <Image source={require('../../../assets/downArrow.png')} />
      </View>
    </TouchableOpacity>
  );
};

export default Select;

const styles = StyleSheet.create({});
