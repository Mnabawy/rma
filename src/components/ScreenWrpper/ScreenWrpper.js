import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScreenWrpper = ({children, style, background}) => {
  const Wrapper =
    Platform.OS === 'ios' ? (
      <SafeAreaView style={[style, {backgroundColor: background}]}>
        {children}
      </SafeAreaView>
    ) : (
      <View style={[style, {backgroundColor: background}]}>{children}</View>
    );
  return Wrapper;
};

export default ScreenWrpper;
