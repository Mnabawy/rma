import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {BASE_URL} from '../../utils/config';
import ActiveCard from './components/Underway';
import Indecator from '../../components/Indecator/Indecator';
import {useIsFocused} from '@react-navigation/native';
import NoData from '../../components/NoData';
import {useTranslation} from 'react-i18next';

const AppartmentActive = ({navigation}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const isFocused = useIsFocused();
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);

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
        // page: 1,
        perPage: 50,
        status: 'active',
      },
    })
      .then(res => {
        if (res.data.success) {
          setOrdersData(res.data.data.orders);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('get order data from appartmentActive: ', err);
      });
  };

  useEffect(() => {
    getData();
  }, [isFocused]);
  return (
    <View>
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
      ) : ordersData.length !== 0 ? (
        <FlatList
          data={ordersData}
          renderItem={({item}) => {
            const renderItem = (
              <ActiveCard
                loading={loading}
                navigation={navigation}
                id={item.id}
                status={item.status}
                created_at={item.created_at}
                supplier={item?.supplier}
                serviceName={item?.service?.name}
                usbImgUrl={item?.supplier?.picture}
                subFirstname={item?.supplier?.name}
                subLastname={item?.supplier?.last_name}
                subject={item?.subject?.name}
              />
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
      ) : (
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <NoData />
        </View>
      )}
    </View>
  );
};
// </View>

export default AppartmentActive;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
});
