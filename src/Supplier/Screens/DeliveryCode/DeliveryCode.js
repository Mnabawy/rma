import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import Button from '../../../components/buttonColored/Button';
import TouchableText from '../../../components/TouchableText/TouchableText';
import InputDatePicker from '../../../components/DatePicker/DatePicker';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {useSelector} from 'react-redux';

const DeliveryCode = ({navigation, route}) => {
  const {order_id, order_delivery_code} = route.params;
  const token = useSelector(state => state.auth.token);
  console.log(token);
  console.log('we are here -------------------------------------------------');
  // const [code, setCode] = useState('');
  console.log('id', order_id);
  const submitHandler = async () => {
    try {
      axios({
        url: `${BASE_URL}/order/${order_id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          status: 'finished',
          order_delivery_code: order_delivery_code,
        },
      }).then(res => {
        if (res.data.success) {
          navigation.navigate('SuccessDeliveryCode');
        } else {
          console.log('there are some error at Delivery code');
        }
      });
    } catch (error) {
      console.log('delivery code error', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingTop: 50,
      }}>
      <AppText style={{fontSize: 18, marginBottom: 15, color: COLORS.black}}>
        {t('title')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('selectStartDateBody')}
      </AppText>

      <View>
        <Input
          placeholder={t('enterDeliveryCode')}
          label={t('deliveryCodeLabel')}
          value={order_delivery_code ? order_delivery_code : ''}
          onChangeText={text => {}}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          height: 77,
          marginTop: 40,
        }}>
        <Button
          onPress={submitHandler}
          styles={{
            paddingVertical: 15,
            paddingHorizontal: 0,
          }}
          backgroundColor={COLORS.primary}
          textColor={COLORS.white}
          borderColor={COLORS.primary}
          text={t('confirmstartday')}
        />
      </View>
    </View>
  );
};

export default DeliveryCode;
