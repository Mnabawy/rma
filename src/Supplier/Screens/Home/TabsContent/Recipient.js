import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import TabCard from '../component.js/TabCard';
import Underway from '../../../../AppartmentCycle/screens/components/Underway';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/config';
import {useSelector} from 'react-redux';
import Indecator from '../../../../components/Indecator/Indecator';
import {COLORS} from '../../../../utils';
import NoData from '../../../../components/NoData';
import {useTranslation} from 'react-i18next';

const Recipient = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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
          status: 'recipient',
        },
      }).then(res => {
        console.log('order recipient successed');
        if (res.data.success) {
          setData(res.data.data.orders);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log('get supplier recipient orders err: ', err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [isFocused]);

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
              status: item.status,
            })
          }
        />
      )}
    />
  );
};

export default Recipient;

const styles = StyleSheet.create({});

{
  /* onPress={() => {
  navigation.navigate('ServiceProvider');
}} */
}

// Recipient;
