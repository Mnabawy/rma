import {t} from 'i18next';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import {Image} from 'react-native';

const SuccessDeliveryCode = ({navigation, route}) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('SuppllierHome'), 3000);
  }, [route]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <Image
          source={require('../../../../assets/success.gif')}
          style={{width: 118, height: 118}}
        />
      </View>
      <AppText
        style={{
          fontSize: 18,
          marginBottom: 15,
          color: COLORS.black,
          paddingHorizontal: 0,
          textAlign: 'center',
        }}>
        {t('messageHeader')}
      </AppText>
      <AppText
        style={{
          fontSize: 16,
          marginBottom: 15,
          color: COLORS.black,
          textAlign: 'center',
        }}>
        {t('messageBody')}
      </AppText>
    </View>
  );
};

export default SuccessDeliveryCode;
