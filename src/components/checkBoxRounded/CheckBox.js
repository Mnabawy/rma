import React, {useState} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import CheckBox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../utils';

const CustomBouncyCheckBox = ({
  boxType,
  text,
  onValueChange,
  disabled,
  value,
  containerStyle,
  textStyle,
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <View
        style={[
          {
            flexDirection: true ? 'row' : 'row-reverse',
            alignItems: 'center',
            marginVertical: 20,
          },
          containerStyle,
        ]}>
        <CheckBox
          disableBuiltInState
          fillColor={COLORS.darkGold}
          // unfillColor={COLORS.black}
          // boxType={boxType}
          isChecked={disabled}
          value={value}
          onPress={onValueChange}
        />
        <View
          style={{
            flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
            alignItems: 'baseline',
          }}>
          <Text style={[textStyle]}>{text}</Text>
        </View>
      </View>
    </>
  );
};

export default CustomBouncyCheckBox;

const styles = StyleSheet.create({});
