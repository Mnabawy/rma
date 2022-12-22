import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeStackHeader from '../HomeStackHeader';
import {COLORS} from '../../../utils';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
// const dummyData = require('./data.json');
import Indecator from '../../../components/Indecator/Indecator';
import {useDispatch, useSelector} from 'react-redux';
import * as orderActions from '../../../redux/actions/order';
import {useLanguage} from '../../../utils/useLanguage';

const Categories = ({route, navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {service_id, title} = route?.params;
  const dispatch = useDispatch();
  const [selectedList, SetSelectedList] = useState([]);
  const {selectedLanguage} = useLanguage();
  // const [title, ]

  const getData = async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/service`,
        method: 'get',
        headers: {
          locale: selectedLanguage,
        },
      }).then(res => {
        if (res.data.success) {
          console.log('parent content: ', res.data.data);
          setLoading(false);
          let data = res.data.data;
          data.map(item => {
            if (item.id === service_id) {
              // console.log('selected item:', item);
              // set;
              setData(item.children);
            }
          });
          console.log('categories children res', res.data.data);
        }
      });
    } catch (error) {
      console.log('categories error', error);
    }
  };

  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    getData();
    navigation.setOptions({title});
  }, []);

  const lang = selectedLanguage;

  console.log('selected data:', data);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* <HomeStackHeader title={title} navigation={navigation} /> */}
      {loading ? (
        <Indecator size={35} color={COLORS.primary} />
      ) : (
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 10,
          }}
          data={data}
          horizontal={false}
          numColumns={3}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{margin: 10}}
                onPress={() => {
                  navigation.navigate('ServiceDetails', {
                    id: item.id,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: lang === 'en' ? item.image_en : item.image_ar,
                      }}
                      style={{width: 100, height: 100}}
                    />
                  </View>
                  <Text style={styles.text}>{item?.name?.slice(0, 20)}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
    width: 110,
    textAlign: 'center',
    marginTop: 5,
    // borderWidth: 1,
  },
});
