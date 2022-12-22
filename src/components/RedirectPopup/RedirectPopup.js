import {t} from 'i18next';
import React from 'react';
import {Image, View} from 'react-native';
import Dialog from 'react-native-popup-dialog';
import {COLORS} from '../../utils';
import Button from '../buttonColored/Button';
import Text from '../../components/text/Text';

const RedirectPopup = ({visible, onTouchOutside, onPress}) => {
  return (
    <Dialog
      visible={visible}
      onTouchOutside={onTouchOutside}
      onSwipeOut={onTouchOutside}
      dialogStyle={{width: '90%', height: '45%'}}>
      <View
        style={{
          flex: 0.8,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../../assets/login.png')} />
      </View>
      <View
        style={{
          flex: 0.8,
          justifyContent: 'center',
          alignItems: 'center',
          // marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: COLORS.black,
            marginBottom: 10,
          }}>
          {t('loginAccount')}
        </Text>
        <Text style={{fontSize: 18}}>{t('pleaseLogInToContinue')}</Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          height: 77,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.5}}>
          <Button
            onPress={onTouchOutside}
            backgroundColor={COLORS.white}
            textColor={COLORS.red}
            borderColor={COLORS.white}
            text={t('cancel')}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Button
            onPress={onPress}
            styles={{paddingHorizontal: 0, paddingVertical: 10}}
            backgroundColor={COLORS.primary}
            textColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('loginAccount')}
          />
        </View>
      </View>
    </Dialog>
  );
};

export default RedirectPopup;
