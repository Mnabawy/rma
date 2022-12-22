import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TabCard from '../component.js/TabCard';
import Underway from '../../../../AppartmentCycle/screens/components/Underway';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/config';
import {useSelector} from 'react-redux';
import Indecator from '../../../../components/Indecator/Indecator';
import {COLORS} from '../../../../utils';
import NoData from '../../../../components/NoData';
import { useTranslation } from 'react-i18next';

const Finished = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/supplier/order`,
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
        method: 'get',
        params: {
          status: 'finished',
        },
      }).then(res => {
        console.log('order finished successed');
        if (res.data.success) {
          setData(res.data.data.orders);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log('get supplier finished orders err: ', err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View style={{flex: 1, marginTop: '50%'}}>
      <Indecator color={COLORS.primary} size="large" />
    </View>
  ) : data.length === 0 ? (
    <NoData />
  ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={({item}) => (
        <TabCard
          item={item}
          onPress={() =>
            navigation.navigate('ServiceProvider', {
              order_id: item.id,
            })
          }
        />
      )}
    />
  );
};

export default Finished;

const styles = StyleSheet.create({});

// Finished;
