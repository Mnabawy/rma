import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';

const ScreenTwo = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../../assets/screen1.png')}>
      <View style={styles.txtContainer}>
        <Text style={styles.header}>Hello</Text>
        <Text style={styles.body}>
          lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ScreenTwo;
