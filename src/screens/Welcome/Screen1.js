import {
  Button,
  I18nManager,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import {initReactI18next} from 'react-i18next';
import {useSelector} from 'react-redux';

const ScreenOne = ({title, url, introduction}) => {
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={{uri: url}}>
      <ImageBackground
        source={require('../../../assets/swipperbg.png')}
        style={styles.txtContainer}
        blurRadius={50}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.body}>{introduction}</Text>
      </ImageBackground>
    </ImageBackground>
  );
};

export default ScreenOne;
