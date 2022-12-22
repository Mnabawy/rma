import {
  I18nManager,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import Cart from './Cart';
import {COLORS} from '../utils';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import Indecator from '../components/Indecator/Indecator';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import PopUpMenu from '../components/PopUpMenu/PopUpMenu';
import Header from './Coponents/Header/Header';
import {t} from 'i18next';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';

const data = require('./Data/DummyData.json');

const SpecialService = ({navigation, route}) => {
  const focused = useIsFocused();
  const {service_id} = useSelector(state => state.service);
  const [serviceDetails, SetServiceDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  console.log('service_id', service_id);
  const {i18n} = useTranslation();
  const lang = i18n.language;

  const {StatusBarManager} = NativeModules;
  //  {marginTop: StatusBarManager.HEIGHT}

  const getData = async () => {
    try {
      setLoading(true);
      axios({
        url: `${BASE_URL}/service/details`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
        params: {
          service_id,
        },
      }).then(res => {
        if (res.data.success) {
          // console.log('spectial res: ', res.data.data);
          SetServiceDetails(res.data.data);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('get spectial service details err', error);
    }
  };

  const updateTitle = () =>
    navigation.setOptions({title: serviceDetails?.name});

  useEffect(() => updateTitle(), [serviceDetails]);

  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Indecator size="large" color={COLORS.primary} />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {marginTop: StatusBarManager.HEIGHT},
      ]}>
      <Header
        navigation={navigation}
        title={serviceDetails?.name}
        menu={
          <PopUpMenu
            optionsContainerStyle={{width: 120, marginTop: 25, paddingTop: 5}}
            content={[
              {
                text: t('share'),
                uri: require('../../assets/shareIcon.png'),
                onSelect: () => Share.open(shareOptions),
              },
            ]}
          />
        }
      />
      <View style={{flex: 0.5, marginVertical: 10}}>
        <ImageCarousel
          images={
            I18nManager.isRTL
              ? serviceDetails.covers_ar
              : serviceDetails.covers_en
          }
        />
      </View>
      <View style={{marginHorizontal: 15, marginBottom: 10}}>
        <Text>{serviceDetails?.description}</Text>
      </View>
      <View style={styles.contentContainer}>
        {serviceDetails?.companies?.map(item => (
          <Cart
            item={item}
            onPress={() =>
              navigation.navigate('ServiceProviderDetails', {
                id: item.id,
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default SpecialService;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: 10,
  },
});
