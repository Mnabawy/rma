import {
  Button,
  Dimensions,
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
import React, {useEffect, useRef, useState, useTransition} from 'react';
import Stepper from '../StepperComponents/stepper-ui';
import {COLORS} from '../../utils';
import * as authActions from '../../redux/actions/auth';
import AppText from '../../components/text/Text';

const carouselItem = require('../../../assets/HomeCarosel.json');
import ServiceDetailsTextCard from './ServiceDetailsTextCard';
import {t} from 'i18next';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {useNavigation} from '@react-navigation/native';
import Indecator from '../../components/Indecator/Indecator';
import {useDispatch, useSelector} from 'react-redux';
const dummyData = require('./dummyData/ServiceDetailsDummyData.json');
const viewConfigRef = {viewAreaCoveragePercentThreshold: 95};
import * as orderActions from '../../redux/actions/order';
import ServicesDetailsHeader from './ServicesDetailsHeader';
import HomeStackHeader from '../../screens/HomePhase/HomeStackHeader';
import Toast from '../../components/Toast/Toast';
const {width} = Dimensions.get('screen').width;
import * as ServiceActions from '../../redux/actions/service';
import RedirectPopup from '../../components/RedirectPopup/RedirectPopup';
import {useLanguage} from '../../utils/useLanguage';
import {useTranslation} from 'react-i18next';

const ServiceDetails = ({route}) => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const lang = i18n.language;
  const {id} = route.params;
  const {service_id: service_id_from_route} = route.params;
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  const [covers, setCovers] = useState([]);
  const [addedToFav, setAddedToFav] = useState(false);
  const [redirectVisible, setRedirectVisible] = useState(false);
  // console.log('setvice id: ', id);
  const [service_id, setServiceId] = useState(0);
  const [addToFavToast, setAddToFavToas] = useState({
    text: '',
    visible: false,
  });
  console.log('service_id_from_route', id, service_id_from_route);
  const [steps, setSteps] = useState(0);

  console.log('steps', steps);
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/service/details`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
          locale: lang,
        },
        params: {
          service_id: id ? id : service_id_from_route,
        },
      });

      if (res.data.success) {
        // setService(res.data.data);
        const service = res.data.data;
        setServiceId(res.data.data.id);
        dispatch(orderActions.setService(service));
        setService(res.data.data);
        dispatch(ServiceActions.setServiceId(service.id));
        dispatch(ServiceActions.setServiceTerms(service.terms_and_conditiions));
        setCovers(
          lang === 'en'
            ? res?.data?.data?.covers_en
            : res?.data?.data?.covers_ar,
        );

        if (service?.terms_and_conditiions?.length !== 0) {
          setSteps(4);
          dispatch(orderActions.showTerms());
        } else {
          setSteps(3);
        }
      }
      console.log('res data', res.data);
      setLoading(false);
    } catch (error) {
      console.log('service details error', error);
    }
  };

  useEffect(() => {
    getData();
  }, [addedToFav]);

  // curosel
  let flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  //Only needed if want to know the index
  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const renderItemCarosel = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}
        key={index}
        onPress={() => console.log('pressed')}
        activeOpacity={1}>
        {/* <View style={{flex}}> */}

        <Image
          source={{
            uri: item,
          }}
          style={styles.image}
        />
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index: index});
  };

  console.log('service_id', service_id);
  const addServiceToFavoriteHandler = async () => {
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
            locale: lang,
          },
        }).then(res => {
          if (res.data.success) {
            console.log('add to fav success');
            setAddedToFav(value => !value);
            setAddToFavToas({
              visible: true,
              text: t('addTopFavToast'),
            });
            (() =>
              setTimeout(() => {
                setAddToFavToas({
                  visible: false,
                });
              }, 3000)())();
          }
        });
      }
    } catch (error) {
      console.log('add service to favorite err:', error);
    }
  };
  const {StatusBarManager} = NativeModules;
  return (
    <View
      style={[
        styles.container,
        {marginTop: Platform.OS === 'ios' ? StatusBarManager.HEIGHT : 0},
      ]}>
      <HomeStackHeader
        isFav={service?.is_fav}
        navigation={navigation}
        dotsMenu
        title={service?.name}
        onClickAddToFav={addServiceToFavoriteHandler}
        // isFav={}
      />
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Indecator size={35} color={COLORS.primary} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={styles.scrollableContainer}
            showsVerticalScrollIndicator={false}>
            {addToFavToast.visible && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 100,
                  alignSelf: 'center',
                }}>
                <Toast text={addToFavToast.text} />
              </View>
            )}

            <View style={{height: 200}}>
              <FlatList
                contentContainerStyle={
                  {
                    // justifyContent: 'center',
                    // marginHorizontal: -10,
                    // alignItems: 'center',
                  }
                }
                data={covers}
                renderItem={renderItemCarosel}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                ref={ref => {
                  flatListRef.current = ref;
                }}
                style={styles.carosel}
                viewabilityConfig={viewConfigRef}
                onViewableItemsChanged={onViewRef.current}
                bounces={false}
              />
              <View style={styles.dotView}>
                {covers?.map(({}, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.circle,
                      {
                        backgroundColor:
                          index === currentIndex ? COLORS.yellow : COLORS.garay,
                        width: index === currentIndex ? 30 : 10,
                      },
                    ]}
                    onPress={() => {
                      scrollToIndex(index);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* </View> */}
            {/* description */}

            <AppText
              style={{
                fontSize: 16,
                marginTop: 20,
                marginHorizontal: 10,
                color: COLORS.black,
              }}>
              {service?.description}
            </AppText>
          </ScrollView>
        </View>
      )}
      {/* progress steps */}
      <View
        style={[
          styles.stepperContainer,
          {flexDirection: 'row'},
          {direction: lang === 'en' ? 'ltr' : 'rtl'},
        ]}>
        <View
          style={{
            flex: 0.7,
            paddingHorizontal: 10,

            direction: i18n.language !== 'en' ? 'ltr' : 'rtl',
          }}>
          {/* // to change active step change the active property */}
          <Stepper
            wrapperStyle={{direction: i18n.language === 'en' ? 'ltr' : 'rtl'}}
            active={0}
            steps={steps}
            stepNumber={1}
          />
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
              {
                token
                  ? navigation.navigate('BookService', {
                      service_id: id,
                      service_name: service?.name,
                    })
                  : setRedirectVisible(true);
              }
            }}>
            {loading ? (
              <Indecator size={20} color={COLORS.white} />
            ) : (
              <Text style={{color: 'white'}}>{t('book')}</Text>
            )}
          </TouchableOpacity>

          <RedirectPopup
            onPress={async () => {
              await setRedirectVisible(false);
              await dispatch(authActions.logout());
            }}
            visible={redirectVisible}
            onTouchOutside={() => setRedirectVisible(false)}
          />
        </View>
      </View>
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  scrollableContainer: {
    // width: '100%',
    // height: '100%',
    marginHorizontal: 0,
    paddingBottom: 200,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  image: {
    // alignItems: 'center',
    marginRight: -10,
    marginLeft: 1,
    width: '100%', // cuase err
    height: 200,
    resizeMode: 'cover',
    aspectRatio: 2,
  },
  carosel: {
    maxHeight: 600,

    // paddingRight: 20,
  },
  footer: {},
  footerText: {},
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  serviceFlatList: {
    // justifyContent: 'center',
  },
  servicesImage: {
    width: 100,
    height: 100,
  },
  stepperContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
