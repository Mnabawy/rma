import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../../assets/splash.png')}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
