import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import AppText from '../../../components/text/Text';
import {t} from 'i18next';
import Input from '../../../components/input/input';
import Button from '../../../components/buttonColored/Button';
import TouchableText from '../../../components/TouchableText/TouchableText';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import * as ORDERACTIONS from '../../../redux/actions/order';
import {useLanguage} from '../../../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const ApplyOrder = ({navigation, route}) => {
  const {i18n} = useTranslation();
  const {code, status, order_id} = route?.params || {};
  const [codeState, setCodeState] = useState('');
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setCodeState(code || '');
  }, [route]);

  const lang = i18n.language;

  const submitHandler = async () => {
    console.log('here');
    try {
      await axios({
        url: `${BASE_URL}/order/${order_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
        method: 'post',
        data: {
          receipt_code: code,
          status: status === 'new' && 'recipient',
        },
      }).then(res => {
        if (res.data.success) {
          console.log('order succefully sent to recipient');
          navigation.navigate('SuppllierHome');
          // dispatch action to store orer
        }
      });
    } catch (error) {
      console.log('update order fialed: ', error);
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
        {t('enterReceipt')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('receiveCodeBody')}
      </AppText>
      <AppText style={{fontSize: 16, marginBottom: 15, color: COLORS.black}}>
        {t('requestCode')}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          top: -10,
        }}>
        <TouchableText text={t('message')} />
        <AppText
          style={{
            // bottom: 15,
            fontSize: 16,
            marginHorizontal: 5,
            // marginBottom: 5,
            color: COLORS.black,
          }}>
          {lang === 'en' ? 'or' : 'او'}
        </AppText>
        <TouchableText text={t('phone')} />
      </View>

      <View>
        <Input
          label={t('receiveCode')}
          placeholder={t('enterReceiveCode')}
          value={codeState}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.white,
          height: 77,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 40,
        }}>
        <View style={{flex: 0.4}}>
          <Button
            onPress={() => {}}
            styles={{paddingHorizontal: 0, paddingVertical: 15}}
            backgroundColor={COLORS.white}
            textColor={COLORS.red}
            borderColor={COLORS.red}
            text={t('redirect')}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Button
            onPress={submitHandler}
            styles={{
              paddingVertical: 15,
              paddingHorizontal: 0,
            }}
            backgroundColor={COLORS.primary}
            textColor={COLORS.white}
            borderColor={COLORS.primary}
            text={t('doneStartWork')}
          />
        </View>
      </View>
    </View>
  );
};

export default ApplyOrder;

const styles = StyleSheet.create({});
