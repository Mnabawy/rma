import {
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils';
import Stepper from '../OrderCycle/StepperComponents/stepper-ui';
import Button from '../components/buttonColored/Button';
import {t} from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {BASE_URL} from '../utils/config';
import Share from 'react-native-share';
import Header from './Coponents/Header/Header';
import PopUpMenu from '../components/PopUpMenu/PopUpMenu';
import {useDispatch, useSelector} from 'react-redux';
import {shareOptions} from '../App';
import {useTranslation} from 'react-i18next';
import * as authActions from '../redux/actions/auth';

import * as orderActions from '../../src/redux/actions/order';
import RedirectPopup from '../components/RedirectPopup/RedirectPopup';

const CompanyDetails = ({navigation, route}) => {
  const {i18n} = useTranslation();
  const {service_id} = route?.params;
  const [serviceDetails, setServiceDetails] = useState({});
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const [redirectVisible, setRedirectVisible] = useState(false);
  const lang = i18n.language;
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      await axios({
        url: `${BASE_URL}/service/details`,
        params: {service_id},
        method: 'get',
        headers: {
          locale: lang,
        },
      }).then(res => {
        if (res.data.success) {
          const service = res.data.data;
          setServiceDetails(service);
          // if(service.)
          dispatch(orderActions.setService(service));
          if (service?.terms_and_conditiions?.length !== 0) {
            setSteps(4);
            dispatch(orderActions.showTerms());
          } else {
            setSteps(3);
          }
        }
      });
    } catch (error) {
      console.log('spectial company details err', error);
    }
  };

  const addServiceToFavoriteHandler = async () => {
    setLoading(true);
    try {
      console.log('service_id', service_id);
      if (service_id !== 0) {
        await axios({
          url: `${BASE_URL}/service/favorite`,
          method: 'post',
          data: {
            service_id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          if (res.data.success) {
            console.log('add to fav success');
            //   setAddedToFav(value => !value);
            //   setAddToFavToas({
            //     visible: true,
            //     text: t('addTopFavToast'),
            //   });
            //   (() =>
            //     setTimeout(() => {
            //       setAddToFavToas({
            //         visible: false,
            //       });
            //     }, 3000)())();
          }
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('add service to favorite err:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const image = I18nManager.isRTL
    ? serviceDetails?.image_ar
    : serviceDetails?.image_en;

    const {StatusBarManager} = NativeModules;

  return (
    <View
      style={{
        // backfaceVisibility: COLORS.white,
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop:StatusBarManager.HEIGHT
      }}>
      <Header
        navigation={navigation}
        title={serviceDetails?.name}
        menu={
          <PopUpMenu
            optionsContainerStyle={{width: 100, marginTop: 25}}
            content={[
              {
                text: t('save'),
                uri: require('../../assets/saveIcon.png'),
                onSelect: addServiceToFavoriteHandler,
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
      <ScrollView contentContainerStyle={styles.container}>
        {image ? (
          <Image style={styles.image} source={{uri: image}} />
        ) : (
          <Image
            style={styles.image}
            source={require('../../assets/dummyCompanyImage.png')}
          />
        )}

        <View
          style={{
            marginHorizontal: 15,
            marginBottom: 10,
            alignItems: 'flex-start',
            marginVertical: 10,
            width: '100%',
          }}>
          <Text>{serviceDetails?.description}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{serviceDetails?.name}</Text>
          <Text style={styles.body}>{serviceDetails?.description}</Text>
        </View>
      </ScrollView>

      {/* -------------------------------------------------- */}

      <View
        style={[
          styles.stepperContainer,
          {
            flexDirection: 'row',
            alignItems: 'center',
            height: 80,
          },
          {direction: lang === 'en' ? 'ltr' : 'rtl'},
        ]}>
        <View style={{flex: 0.7, paddingHorizontal: 10}}>
          {/* // to change active step change the active property */}
          <Stepper active={0} steps={steps} stepNumber={1} />
        </View>
        <View style={{flex: 0.3}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#4B7E75',
              padding: 15,
              borderRadius: 50,
              alignItems: 'center',
              marginHorizontal: 10,
            }}
            onPress={() => {
              token
                ? navigation.navigate('HomeStack', {
                    screen: 'BookService',
                    params: {
                      service_id: serviceDetails.id,
                      service_name: serviceDetails?.name,
                      steps,
                    },
                  })
                : setRedirectVisible(true);
            }}>
            {loading ? (
              <Indecator size={20} color={COLORS.white} />
            ) : (
              <Text style={{color: 'white'}}>{t('book')}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <RedirectPopup
        onPress={async () => {
          await setRedirectVisible(false);
          await dispatch(authActions.logout());
        }}
        visible={redirectVisible}
        onTouchOutside={() => setRedirectVisible(false)}
      />
    </View>
  );
};

export default CompanyDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 220,
  },
  contentContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  body: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    // color: COLORS.black,
  },
  footer: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  shadowStyle: {
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowColor: COLORS.black,
    shadowOpacity: 16,
    elevation: 15,
  },
});
