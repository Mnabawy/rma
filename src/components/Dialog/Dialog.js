import {t} from 'i18next';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {COLORS, normalize} from '../../utils';

const content =
  'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

const CustomDialog = ({visible, onPress, onTouchoutSide}) => {
  return (
    <Dialog visible={visible} onTouchOutside={onTouchoutSide}>
      <View style={{padding: 0, width: normalize(350)}}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.garay,
            width: '100%',
            padding: 10,
          }}>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../../../assets/close.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              color: COLORS.black,
            }}>
            {t('deliveryCodeTitle')}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{padding: 15}}>
          <Text style={{color: COLORS.black}}>{content}</Text>
        </ScrollView>
      </View>
    </Dialog>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({
  container: {
    // width:"70%"
  },
});
