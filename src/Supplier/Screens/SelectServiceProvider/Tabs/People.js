import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PeopleCard from './PeopleCard';
import {COLORS} from '../../../../utils';
import CustomButton from '../../../../components/buttonColored/Button';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/config';
import {useSelector} from 'react-redux';
// const data = require('./PeopleDummyData.json');

const People = ({navigation}) => {
  // const {company_id} = route.params;
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [data, setData] = useState([]);
  const {id, company_id} = useSelector(state => state.order.orderId);
  const [supplier_id, setSupplierId] = useState('');
  console.log('we are here');
  console.log('order id , company_id', {id, company_id});
  const token = useSelector(state => state.auth.token);

  const getData = async () => {
    try {
      axios({
        url: `${BASE_URL}/company/suppliers?company_id=${company_id}`,
        method: 'get',
      }).then(res => {
        if (res.data.success) {
          setData(res.data.data);
          console.log('people', res.data.data);
        } else {
          console.log(res.data);
        }
      });
    } catch (error) {
      console.log('get paople data err', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const selectedItemIdHandler = item => {
    console.log('item', item);
    setSelectedItemId(item.id); // for selecting the item
  };

  const onPressHandler = supplier_id => {
    console.log(supplier_id);
    // call the server
    try {
      axios({
        url: `${BASE_URL}/order/${id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          supplier_id: supplier_id,
        },
      }).then(res => {
        if (res.data.success) {
          console.log(navigation);
          // navigate if success
          navigation.navigate('SuccessRequestSent');
        } else {
          console.log('there is supplier req err');
        }
      });
    } catch (error) {
      console.log('supplier err', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: '85%', paddingBottom: 0}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                selectedItemIdHandler(item);
                setSupplierId(item.id);
              }}>
              <PeopleCard selected={selectedItemId === item.id} item={item} />
            </TouchableOpacity>
          )}
        />
        <CustomButton
          styles={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
          backgroundColor={COLORS.primary}
          borderColor={COLORS.primary}
          textColor={COLORS.white}
          text={t('send')}
          onPress={() => onPressHandler(supplier_id)}
        />
      </View>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({});
