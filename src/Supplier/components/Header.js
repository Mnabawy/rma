import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {COLORS} from '../../utils';
import AppText from '../../components/text/Text';

const Header = ({navigation, title}) => {
  return (
    <View
      style={{
        padding: 15,
        flexDirection: 'row',
        backgroundColor: COLORS.white,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/backBtn.png')} />
      </TouchableOpacity>
      <AppText
        style={{fontSize: 16, color: COLORS.black, marginHorizontal: 10}}>
        {title}
      </AppText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
