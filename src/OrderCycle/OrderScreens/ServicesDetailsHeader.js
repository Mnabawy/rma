import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../components/text/Text';
import PopUpMenu from '../../components/PopUpMenu/PopUpMenu';

const ServicesDetailsHeader = ({title, content, optionsContainerStyle}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image />
        <AppText>{title}</AppText>
        <PopUpMenu
          content={content}
          optionsContainerStyle={optionsContainerStyle}
        />
      </View>
    </View>
  );
};

export default ServicesDetailsHeader;

const styles = StyleSheet.create({
  container: {},
});
