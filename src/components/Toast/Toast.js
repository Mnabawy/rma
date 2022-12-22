import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {COLORS} from '../../utils';

const CustomToast = ({error, text}) => {
  // console.log('text', text);
  const content = error ? (
    <View style={styles.container}>
      <ErrorToast text1={text} />
    </View>
  ) : (
    <View style={styles.container}>
      <BaseToast
        style={{borderLeftColor: COLORS.green}}
        text1Style={{color: COLORS.black, fontSize: 16}}
        text1={text}
      />
    </View>
  );
  return content;
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 30,
  },
});
