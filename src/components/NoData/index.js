import {t} from 'i18next';
import React from 'react';
import {View} from 'react-native';
import {Image} from 'react-native';
import {COLORS} from '../../utils';
import AppText from '../text/Text';

const NoData = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Image
        source={require('../../../assets/no-data.png')}
        style={
          {
            // width: '90%',
            // height: '90%',
          }
        }
      />
      <AppText style={{fontSize: 24, color: COLORS.black, fontWeight: 'bold'}}>
        {t('noData')}
      </AppText>
    </View>
  );
};

export default NoData;
