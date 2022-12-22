import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../utils';
import {BASE_URL} from '../../../utils/config';
import AppText from '../../../components/text/Text';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Indecator from '../../../components/Indecator/Indecator';
const dummyData = require('./dummyData.json');

const Notifications = ({route}) => {
  const role = route?.params?.role;
  console.log(route.params);
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log('role: ', role);
  const [selectedId, setSelectedId] = useState('');

  const getData = () => {
    setLoading(true);
    try {
      axios({
        url: `${BASE_URL}/notifications/list`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          role: role,
        },
      }).then(res => {
        if (res.data.success) {
          setData(res.data.data);
          console.log('notifications: ', res.data.data);
        }
      });
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [selectedId]);

  const handleUpdateStatus = async id => {
    setSelectedId(id);
    try {
      await axios({
        url: `${BASE_URL}/notifications/mark_as_read`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: id,
        },
      }).then(res => {
        if (res.data.success) {
          console.log(success);
        } else {
          console.log(res.data.error);
        }
      });
    } catch (error) {
      console.log('mark as read err: ', error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 10,
        // alignItems:'center',
      }}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleUpdateStatus(item.id)}
            style={{
              backgroundColor: item.read_at ? COLORS.lightGray : COLORS.white,
              flexDirection: 'row',
              marginVertical: 5,
              alignItems: 'center',
              padding: 10,
            }}>
            <Image source={require('../../../../assets/square.png')} />
            <View style={{paddingHorizontal: 10, flex: 1}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText style={{fontSize: 16, color: COLORS.black}}>
                  {item?.data?.title}
                </AppText>
                <AppText style={{fontSize: 12}}>
                  {item?.created_at}
                </AppText>
              </View>
              <AppText>{item?.data?.body?.slice(0, 70)}</AppText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// {dummyData.map(item => (
//   <TouchableOpacity
//     onPress={() => handleUpdateStatus(item.id)}
//     style={{
//       backgroundColor:
//         selectedId === item.id ? COLORS.lightGray : COLORS.white,
//       flexDirection: 'row',
//       marginVertical: 5,
//       alignItems: 'center',
//       padding: 10,
//     }}>
//     <Image source={require('../../../../assets/square.png')} />
//     <View style={{paddingHorizontal: 10, flex: 1}}>
//       <View
//         style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//         <AppText style={{fontSize: 16, color: COLORS.black}}>
//           {item?.data?.title?.slice(0, 25)}
//         </AppText>
//         <AppText style={{fontSize: 12}}>1m ago</AppText>
//       </View>
//       <AppText>{item?.data?.body?.slice(0, 60)}</AppText>
//     </View>
//   </TouchableOpacity>
// ))}

export default Notifications;

const styles = StyleSheet.create({});
