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

const NewOrder = () => {
  const navigation = useNavigation();

  const token = useSelector(state => state.auth.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/supplier/order`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
        params: {
          status: 'closed',
        },
      }).then(res => {
        console.log('order closed successed');
        if (res.data.success) {
          setData(res.data.data.orders);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log('get supplier closed orders err: ', err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <View style={{flex: 1, marginTop: '50%'}}>
      <Indecator color={COLORS.primary} size="large" />
    </View>
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

export default NewOrder;

const styles = StyleSheet.create({});

{
  /* onPress={() => {
  navigation.navigate('ServiceProvider');
}} */
}
