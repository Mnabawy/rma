import {
  FlatList,
  I18nManager,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel';
import Cart from './Cart';
import {COLORS} from '../utils';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import AppText from '../components/text/Text';
import Header from './Coponents/Header/Header';
import PopUpMenu from '../components/PopUpMenu/PopUpMenu';
import {t} from 'i18next';
import Indecator from '../components/Indecator/Indecator';
import Share from 'react-native-share';
import {shareOptions} from '../App';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const data = require('./Data/ServiceProviderDetails.json');

const ServiceProviderDetails = ({navigation, route}) => {
  const {id: company_id} = route?.params;
  const [companyDetails, setCompanyDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);
  const {i18n} = useTranslation();
  const lang = i18n.language;
  console.log(company_id);
  const getData = async () => {
    try {
      setLoading(true);
      await axios({
        url: `${BASE_URL}/company/details`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          company_id,
        },
      }).then(res => {
        if (res.data.success) {
          setCompanyDetails(res.data.data);
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('spectial company details err: ', error);
    }
  };

  const addCompanyToFavHadnler = async () => {
    setLoading(true);
    await axios({
      url: `${BASE_URL}/company/favorite`,
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: {
        company_id,
      },
    }).then(res => {
      console.log('success');
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // services render item
  const renderItem = ({item}) => {
    const image = I18nManager.isRTL ? item.image_ar : item.image_en;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.serviceContainer}
        onPress={() =>
          navigation.navigate('CompanyDetails', {
            // should be service details
            service_id: item.id,
          })
        }>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Image source={require('../../assets/square.png')} />
        )}
        <Text style={{textAlign: 'left'}}></Text>
        <View style={{marginHorizontal: 10, width: 0, flexGrow: 1, flex: 1}}>
          <AppText
            style={{
              ...Platform.select({
                ios: {
                  fontFamily: 'Poppins-Medium.ttf',
                },
              }),
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              color: COLORS.black,
            }}>
            {item.name}
          </AppText>
          <Text style={{}}>{item?.description?.slice(0, 70)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const covers = I18nManager.isRTL
    ? companyDetails?.images_ar
    : companyDetails?.images_en;

  const {StatusBarManager} = NativeModules;
  //  {marginTop: StatusBarManager.HEIGHT}

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {marginTop: StatusBarManager.HEIGHT},
      ]}>
      <Header
        navigation={navigation}
        title={companyDetails?.name}
        menu={
          <PopUpMenu
            optionsContainerStyle={{width: 100, marginTop: 25}}
            content={[
              {
                text: t('about'),
                uri: require('../../assets/aboutIcon.png'),
                onSelect: () =>
                  navigation.navigate('About', {
                    company_id: companyDetails?.id,
                  }),
              },
              {
                text: t('save'),
                uri: require('../../assets/saveIcon.png'),
                onSelect: addCompanyToFavHadnler,
              },
              {
                text: t('share'),
                uri: require('../../assets/shareIcon.png'),
                onSelect: () => Share.open(shareOptions),
              },
            ]}
          />
        }
      />
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Indecator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View style={{flex: 0.4, marginVertical: 10}}>
            <ImageCarousel images={covers} />
          </View>
          <View style={{marginHorizontal: 15, marginBottom: 10}}>
            <Text>{companyDetails?.about}</Text>
          </View>
          <View style={styles.contentContainer}>
            <FlatList data={companyDetails?.services} renderItem={renderItem} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

// onPress={() => navigation.navigate('CompanyDetails')}

export default ServiceProviderDetails;

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
    // flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  serviceContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
});
