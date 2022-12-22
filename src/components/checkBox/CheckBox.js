import React, {useState} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {COLORS} from '../../utils';

const CustomCheckBox = ({
  boxType,
  text,
  onValueChange,
  disabled,
  value,
  containerStyle,
  textStyle,
  onFillColor,
  error,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      {/* <CheckBox /> */}
      {/*  */}
      <View
        style={[
          {
            flexDirection: true ? 'row' : 'row-reverse',
            alignItems: 'center',
            marginHorizontal: 5,
          },
          containerStyle,
        ]}>
        <CheckBox
          // style={{marginTop:20}}
          // onFillColor={onFillColor ? onFillColor : ''}
          tintColor={false ? COLORS.yellow : COLORS.primary}
          tintColors={true ? COLORS.yellow : COLORS.primary}
          boxType={boxType}
          disabled={disabled}
          value={value}
          onValueChange={onValueChange}
          {...props}
        />
        <View
          style={{
            flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
            alignItems: 'baseline',
          }}>
          <Text style={[{textStyle}, {paddingHorizontal: 5}]}>{text}</Text>
        </View>
      </View>

      <Text style={{color: COLORS.red, marginTop: -10, marginHorizontal: 10}}>
        {error}
      </Text>
    </>
  );
};

export default CustomCheckBox;
