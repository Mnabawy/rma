import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';

const LanguageButton = ({icon, title, selected, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 25,
        marginVertical: 5,
        paddingVertical: 15,
        backgroundColor: selected ? COLORS.loghtgreenLanguage : COLORS.white,
      }}>
      <View style={{flexDirection: 'row'}}>
        {icon}
        <AppText style={{marginHorizontal: 15}}>{title}</AppText>
      </View>
      {selected && (
        <Image source={require('../../../../assets/checkmark.png')} />
      )}
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({});
