import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../../../components/text/Text';
import {COLORS} from '../../../utils';

import * as AuthActions from '../../../redux/actions/auth';
import {useDispatch} from 'react-redux';

const Success = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log('navigation.getState()', navigation.getState());
  useEffect(() => {
    setTimeout(() => {
      console.log('we are ');
      // navigation.navigate('SupplierStack');
      // console.log('success');
      dispatch(AuthActions.login());
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      <AppText style={{fontSize: 28, color: COLORS.black}}>
        {/* {t('success')} */}
      </AppText>

      <AppText style={{fontSize: 16, marginTop: 20, textAlign: 'center'}}>
        {t('successSupplierBody')}
      </AppText>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
