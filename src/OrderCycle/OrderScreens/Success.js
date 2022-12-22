import {Image, StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {t} from 'i18next';
import {COLORS} from '../../utils/colors';
import Button from '../../components/buttonColored/Button';
// import Svg, { G, Path } from 'react-native-svg';
import SvhUri from '../../../assets/success.gif';
import * as orderActions from '../../redux/actions/order';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const Success = () => {
  const route = useRoute();
  const {data} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const service_id = useSelector(state => state.service.service_id);
  const orderData = useSelector(state => state.order.orderData);
  console.log('sservice_id', service_id);

  console.log('here rooute name', route.name);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'HomeSuccess') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  useEffect(() => {
    // clearOrderState();
    dispatch(orderActions.resetData({}));
    dispatch(orderActions.createOrder({}));
    dispatch(orderActions.setOderImages([]));
  }, []);

  console.log('data', data);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/success.gif')}
          style={{width: 118, height: 118}}
        />
      </View>

      <Text style={styles.title}>{t('success')}</Text>
      <Text style={styles.body}>{t('successBody')}</Text>
      {/* {data.map(item => ( */}
      <View>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>{t('orderNumber')}</Text>
          <Text style={styles.blueText}>{data.order_number}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>{t('deliveryCode')}</Text>
          <Text style={styles.blueText}>{data.delivery_code}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.text}>{t('receiptCode')}</Text>
          <Text style={styles.blueText}>{data.receipt_code}</Text>
        </View>
      </View>
      {/* ))} */}
      <View style={styles.btnContainer}>
        <View style={{flex: 0.5}}>
          <Button
            styles={{paddingVertical: 10}}
            // onPress={() => console.log('here')}
            onPress={() => navigation.getParent().navigate('Tabs')}
            textColor={COLORS.primary}
            backgroundColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('homePage')}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Button
            styles={{paddingVertical: 10}}
            onPress={() =>
              navigation.navigate('AppartmentStack', {
                screen: 'ServiceDetails',
                params: {
                  orderId: data?.order_number,
                  title: '',
                },
              })
            }
            textColor={COLORS.white}
            backgroundColor={COLORS.primary}
            borderColor={COLORS.primary}
            text={t('orderDetails')}
          />
        </View>
      </View>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    flex: 1,
    paddingTop: '40%',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 28,
    color: COLORS.black,
    // marginTop: '60%',
  },
  body: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.black,
    marginVertical: 20,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    // flex: 1,
    marginVertical: 20,
  },
  blueText: {
    color: COLORS.blue,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
