import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppText from '../components/text/Text';
import {COLORS} from '../utils';
import {useLanguage} from '../utils/useLanguage';

const DrawerItem = ({icon, title, onPress}) => {
  const {selectedLanguage, onChageLanguage} = useLanguage();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>{icon}</View>
        <AppText style={{paddingHorizontal: 10, color: COLORS.black}}>
          {title}
        </AppText>
      </View>
      {selectedLanguage === 'en' ? (
        <Image
          style={{width: 30, height: 30}}
          source={require('../../assets/Arrow.png')}
        />
      ) : (
        <Image
          style={{width: 30, height: 30}}
          source={require('../../assets/ArrowBack.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({});
