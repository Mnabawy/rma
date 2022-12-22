import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';

const Cart = ({title, data, borderBottom, style, headerStyle, dataStyle}) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: borderBottom ? 1 : 0,
          borderBottomColor: COLORS.lightGray,
          paddingBottom: 10,
          marginVertical: 10,
        },
        style,
      ]}>
      <AppText style={[{fontSize: 12}, headerStyle, {alignSelf: 'flex-start'}]}>
        {title}
      </AppText>
      <AppText
        style={[{fontSize: 14, color: COLORS.black, marginTop: 3}, dataStyle]}>
        {data}
      </AppText>
    </View>
  );
};

export default Cart;
