import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../utils/colors';
import {useLanguage} from '../../utils/useLanguage';

const Phone = ({label, value, onChangeText, onBlur, style, error}) => {
  const phoneInput = useRef();
  const {selectedLanguage} = useLanguage();
  const rtl = selectedLanguage === 'ar';

  return (
    <>
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: COLORS.garay,
            borderRadius: 10,
            // justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            height: 60,
          },
          style,
        ]}>
        <Text
          style={{
            marginHorizontal: 15,
            color: COLORS.black,
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
          }}>
          +966
        </Text>
        <TextInput
          onBlur={onBlur}
          style={{
            flex: 1,
            paddingHorizontal: 15,
            fontSize: 18,
          }}
          textContentType="telephoneNumber"
          value={value}
          onChangeText={onChangeText}
          placeholder="000 000 000"
          keyboardType="numeric"
        />
      </View>

      <Text
        style={{
          ...styles.text,
          alignSelf: 'flex-start',
          paddingHorizontal: 5,
        }}>
        {label}
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textContainerStyle: {
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 0,
  },
  text: {
    fontSize: 16,
    backgroundColor: 'white',
    bottom: 73,
    marginHorizontal: 10,
    padding: 0,
    margin: 0,
    color: COLORS.black,
    fontFamily: 'Poppins-Regular',
    marginBottom: -25, // to delete the space at the bottom
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    width: '100%',
    height: 62,
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  countryPickerButtonStyle: {
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: -20,
  },
  error: {
    color: 'red',
    paddingTop: 4,
    fontSize: 12,
  },
});

export default Phone;
