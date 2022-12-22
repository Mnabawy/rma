import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';

const ServiceCard = ({selected, text, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: selected ? COLORS.darkGold : COLORS.lightGray,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderColor: COLORS.garay,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={
            selected
              ? require('../../../../assets/circleGold.png')
              : require('../../../../assets/circle.png')
          }
        />
        <AppText
          style={{marginHorizontal: 10, fontSize: 14, color: COLORS.black}}>
          ServiceCard
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({});
