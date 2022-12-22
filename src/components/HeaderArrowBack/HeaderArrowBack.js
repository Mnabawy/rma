import {
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const HeaderArrowBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{flexDirection: 'row', backgroundColor: COLORS.white, padding: 20}}
      onPress={() => navigation.goBack()}>
      <Icon
        name={!I18nManager.isRTL ? 'arrowleft' : 'arrowright'}
        size={20}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

export default HeaderArrowBack;

const styles = StyleSheet.create({});
