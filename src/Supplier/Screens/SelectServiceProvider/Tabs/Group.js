import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from './GroupDummyData.json';
import GroupCard from './GroupCard';
import {COLORS} from '../../../../utils';
import CustomButton from '../../../../components/buttonColored/Button';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/config';
import {useSelector} from 'react-redux';
const Group = ({navigation}) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selected, setSelected] = useState(null);

  const [data, setData] = useState([]);
  const {id, company_id} = useSelector(state => state.order.orderId);
  const [group_id, setGroupId] = useState('');
  const token = useSelector(state => state.auth.token);

  const getData = async () => {
    try {
      axios({
        url: `${BASE_URL}/company/groups?company_id=${company_id}`,
        method: 'get',
      }).then(res => {
        if (res.data.success) {
          setData(res.data.data);
        }
      });
    } catch (error) {
      console.log('get paople data err', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onPressHandler = group_id => {
    console.log(group_id);
    // call the server
    try {
      axios({
        url: `${BASE_URL}/order/${id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          group_id: group_id,
        },
      }).then(res => {
        if (res.data.success) {
          console.log('successed');
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
  const onSelectHandler = item => {
    console.log(item);
    setSelectedItemId(item.id);
  };
  console.log('selectedItemId: ', selectedItemId);

  return (
    <View style={{flex: 1}}>
      <View style={{height: '85%', paddingBottom: 0}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                onSelectHandler(item);
                setGroupId(item.id);
              }}>
              <GroupCard selected={selectedItemId === item.id} item={item} />
            </TouchableOpacity>
          )}
        />

        <CustomButton
          styles={{
            marginTop: 10,
            marginHorizontal: 10,
            // position: 'absolute',
          }}
          backgroundColor={COLORS.primary}
          borderColor={COLORS.primary}
          textColor={COLORS.white}
          text={t('send')}
          onPress={() => onPressHandler(group_id)}
        />
      </View>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({});
