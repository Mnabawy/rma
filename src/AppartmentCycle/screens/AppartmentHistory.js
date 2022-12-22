import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils';
import Finished from './components/Finished';
import Cancel from './components/Cancel';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import Indecator from '../../components/Indecator/Indecator';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import {useIsFocused} from '@react-navigation/native';
import NoData from '../../components/NoData';
import {useLanguage} from '../../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const AppartmentHistory = ({navigation}) => {
  const {i18n} = useTranslation();
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const token = useSelector(state => state.auth.token);
  const lang = i18n.language;

  const getData = async () => {
    setLoading(true);
    axios({
      url: `${BASE_URL}/order`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        locale: lang,
      },
      params: {
        page: 1,
        perPage: 20,
        status: 'history',
      },
    })
      .then(res => {
        if (res.data.success) {
          setLoading(true);
          // console.log('res success: ', res.data.data);
          setOrdersData(res.data.data.orders);
          // console.log('orederData', ordersData);
          setLoading(false);
          // console.log('order data:', res.data.data.orders);
        }
      })
      .catch(err => {
        console.log('get order data from appartmentHistory: ', err);
      });
  };

  useEffect(() => {
    getData();
  }, [isFocused]);
  // let datas = [];
  return (
    <View style={styles.container}>
      {/* <Finished />
    <Cancel /> */}
      {loading ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <Indecator size="large" color={COLORS.primary} />
        </View>
      ) : ordersData.length === 0 ? (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <NoData />
        </View>
      ) : (
        <FlatList
          data={ordersData}
          renderItem={({item}) => {
            const renderItem = (
              <>
                {loading ? (
                  <Indecator size={22} color={COLORS.primary} />
                ) : (
                  <Finished
                    cancel_reason={item?.cancel_reason}
                    subject={item?.subject?.name}
                    loading={loading}
                    navigation={navigation}
                    id={item.id}
                    service_id={item?.service_id}
                    status={item.status}
                    created_at={item.created_at}
                    supplier={item?.supplier}
                    serviceName={item?.service?.name}
                    usbImgUrl={item?.supplier?.picture}
                    subFirstname={item?.supplier?.name}
                    subLastname={item?.supplier?.last_name}
                    reject_reason={item.reject_reason}
                  />
                )}
              </>
            );

            return (
              <>
                {loading ? (
                  <View style={{marginVertical: 30}}>
                    <Indecator size="large" color={COLORS.primary} />
                  </View>
                ) : (
                  renderItem
                )}
              </>
            );
          }}
        />
      )}
    </View>
  );
};

export default AppartmentHistory;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
});
