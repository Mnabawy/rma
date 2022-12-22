import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  FlatList,
  Linking,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SupplierHomeHeader from './Header';
import {COLORS} from '../../../utils';
import {useWindowDimensions, Animated} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AppartmentActive from '../../../AppartmentCycle/screens/AppartmentActive';
import AppartmentHistory from '../../../AppartmentCycle/screens/AppartmentHistory';
import SearchHeader from '../../../components/Header/SearchHeader';
import NewOrder from './TabsContent/NewOrder';
import Recipient from './TabsContent/Recipient';
import Finished from './TabsContent/Finished';
import Rejected from './TabsContent/Rejected';
import Closed from './TabsContent/Closed';
import CustomTabBar from '../../../components/TabBar/TabBar';

import Screen from '../../../components/ScreenWrpper/ScreenWrpper';
import TabButton from './component.js/TabButton';
import {t} from 'i18next';
import {useLanguage} from '../../../utils/useLanguage';
import {BASE_URL} from '../../../utils/config';
import axios from 'axios';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const SupplierHome = ({navigation}) => {
  const {selectedLanguage} = useLanguage();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [phone, setPhone] = useState('');

  const getPhone = async () => {
    try {
      // setLoading(true);
      await axios({
        url: `${BASE_URL}/settings`,
        method: 'get',
        headers: {
          locale: selectedLanguage,
        },
        params: {
          'code[]': 'contact_number',
        },
      }).then(res => {
        if (res.data.success) {
          // console.log(res.data);
          setPhone(res?.data?.data[0]?.value);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // tabs
  const [select, setSelect] = useState({
    new: true,
    recip: false,
    finished: false,
    rejected: false,
  });

  const route = useRoute();
  console.log('rooute name', route.name);
  // console.log('phone:', phone);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'SuppllierHome') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  useEffect(() => {
    getPhone();
  }, []);

  console.log('phone: ', phone);
  return (
    <Screen background={COLORS.white} style={{flex: 1, paddingHorizontal: 10}}>
      <SupplierHomeHeader />
      {/* tabs */}
      <View
        style={{
          height: 60,
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: COLORS.white,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TabButton
            title={t('newOrder')}
            active={select.new}
            onPress={() => {
              setSelect({new: true});
            }}
          />
          <TabButton
            active={select.recip}
            title={t('recipient')}
            onPress={() => {
              setSelect({recip: true});
            }}
          />
          <TabButton
            active={select.finished}
            title={t('finished')}
            onPress={() => {
              setSelect({finished: true});
            }}
          />
          <TabButton
            active={select.rejected}
            title={t('rejected')}
            onPress={() => {
              setSelect({rejected: true});
            }}
          />
        </ScrollView>
      </View>

      {/* tabs content */}
      <View style={{flex: 1, marginTop: 10}}>
        {select.new && <NewOrder />}
        {select.recip && <Recipient />}
        {select.finished && <Finished />}
        {select.rejected && <Rejected />}

        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'android'
              ? Linking.openURL(`whatsapp://app?send?text=''&phone=${phone}`)
              : Linking.openURL(`https://wa.me/+2${phone}`)
          }
          style={{
            alignSelf: 'flex-end',
            bottom: 0,
            position: 'absolute',
          }}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../../../assets/contactUs.png')}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});

export default SupplierHome;
