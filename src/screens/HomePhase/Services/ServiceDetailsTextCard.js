import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {COLORS} from '../../../utils';
import {COLORS} from '../../../utils/colors'

const ServiceDetailsTextCard = ({title, body}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

export default ServiceDetailsTextCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Popping-Regular',
    color: COLORS.black,
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Popping-Regular',
    // color: COLORS.garay,
  },
});
