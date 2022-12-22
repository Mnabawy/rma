import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TabBar} from 'react-native-tab-view';
import {COLORS} from '../../utils';

const CustomTabBar = ({props, scrollEnabled}) => {
  return (
    <TabBar
      scrollEnabled={scrollEnabled}
      activeColor={COLORS.black}
      labelStyle={{color: COLORS.darkGray, textTransform: 'capitalize'}}
      style={{
        backgroundColor: COLORS.white,
      }}
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.black,
        bottom: -4,
        height: 4,
      }}
      indicatorContainerStyle={{
        borderBottomWidth: 4,
        borderBottomColor: COLORS.garay,
      }}
    />
  );
};

export default CustomTabBar;
