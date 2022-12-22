import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ServiceDetailsCard from './screens/components/ServiceDetails/ServiceDetailsCard';
import {COLORS} from '../utils/colors';
import GreenCard from './screens/components/ServiceDetails/GreenCard';
import {t} from 'i18next';
import Button from '../components/buttonColored/Button';
import {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CancelDialog from './screens/components/CancelDialog';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../utils/config';
import axios from 'axios';
import Indecator from '../components/Indecator/Indecator';
import Toast from '../components/Toast/Toast';
import {useTranslation} from 'react-i18next';

const AppartmentServiceDetails = () => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const {orderId, from} = useRoute().params;
  const [cancelVisible, setCancelVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [working_time, setWorkingTime] = useState('');
  const [toast, setToast] = useState({
    visible: false,
  });

  // to hide bottom tabs
  useEffect(() => {
    getData();
    navigation.setOptions({
      title: title,
    });
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [title]);

  const token = useSelector(state => state.auth.token);
  const lang = i18n.language;
  const getData = async () => {
    setLoading(true);
    await axios({
      url: `${BASE_URL}/order/${orderId}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        locale: lang,
      },
      params: {
        page: 1,
        perPage: 20,
        status: 'active',
      },
    })
      .then(res => {
        if (res.data.success) {
          const working_time = res?.data?.data?.order?.working_time;
          if (working_time == 'evening') {
            setWorkingTime(
              lang === 'ar' && working_time == 'evening'
                ? 'مساء'
                : working_time,
            );
          } else if (working_time == 'night') {
            setWorkingTime(
              lang === 'ar' && working_time == 'night' ? 'ليلا' : working_time,
            );
          } else if (working_time == 'morning') {
            setWorkingTime(
              lang === 'ar' && working_time == 'morning'
                ? 'صباحا'
                : working_time,
            );
          }

          console.log(res.data.data.order);

          setOrderData(res.data.data.order);

          setTitle(res?.data?.data?.order?.service?.name);
        }
      })
      .catch(err => {
        console.log('get order data from appartmentActive: ', err);
      });
    setLoading(false);
  };

  const address = orderData?.address;
  const chortAddree = address?.slice(0, 50);

  const rejectOrderHandler = async () => {
    try {
      await axios({
        url: `${BASE_URL}/order/${orderData?.id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          locale: lang,
        },
        body: {
          status: 'reject',
        },
      }).then(res => {
        if (res.data.success) {
          setToast({visible: true});
          setTimeout(() => {
            setToast({visible: false});
          }, 2000)();
        }
      });
    } catch (err) {
      console.log('reject order err: ', err);
    }
  };

  console.log('terget desc', orderData);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <View > */}
        {toast.visible && (
          <View
            style={{
              position: 'absolute',
              elevation: 200,
              zIndex: 100,
              alignSelf: 'center',
            }}>
            <Toast text={t('rejectedSuccefffully')} />
          </View>
        )}
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Indecator size={22} color={COLORS.primary} />
          </View>
        ) : (
          <>
            <View style={{paddingHorizontal: 10}}>
              {/* // orderData.supplier */}
              <ServiceDetailsCard
                data={orderData}
                borderBottomColor={
                  orderData.status === 'new' ? COLORS.gold : COLORS.lightGray
                }
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <GreenCard data={orderData} />
            </View>
            <View
              style={{
                marginHorizontal: 10,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: COLORS.lightGray,
                marginVertical: 5,
              }}>
              <Text
                style={[
                  styles.title,
                  {textAlign: lang !== 'en' ? 'left' : 'right'},
                ]}>
                {t('subjectService')}
              </Text>
              <Text style={{color: COLORS.black, marginTop: 5}}>
                {orderData?.subject?.name}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: COLORS.lightGray,
                marginVertical: 5,
              }}>
              <Text
                style={[
                  styles.title,
                  {textAlign: lang !== 'en' ? 'left' : 'right'},
                ]}>
                {t('details')}
              </Text>
              <Text
                style={{
                  color: COLORS.black,
                  marginVertical: 5,
                  textAlign: lang !== 'en' ? 'left' : 'right',
                }}>
                {orderData?.description}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <ScrollView horizontal>
                  {orderData?.images?.map(item => {
                    console.log('imagesxyz: ', orderData?.images);
                    return (
                      <Image
                        key={item.id}
                        style={{
                          marginHorizontal: 2,
                          width: 60,
                          height: 60,
                          borderRadius: 5,
                        }}
                        source={{uri: item}}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: COLORS.lightGray,
              }}>
              <Text
                style={[
                  styles.title,
                  {textAlign: lang !== 'en' ? 'left' : 'right'},
                ]}>
                {t('location')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={require('../../assets/location.png')} />
                  <Text
                    style={{
                      color: COLORS.black,
                      textAlign: lang !== 'en' ? 'left' : 'right',
                    }}>
                    {chortAddree}
                  </Text>
                </View>
                <View
                  style={{
                    elevation: 2,
                    padding: 5,
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowRadius: 16,
                    shadowColor: COLORS.black,
                  }}>
                  <Image source={require('../../assets/map.png')} />
                </View>
              </View>
              <View>
                <Text
                  style={[
                    {marginVertical: 5},
                    styles.title,
                    {textAlign: lang !== 'en' ? 'left' : 'right'},
                  ]}>
                  {t('detailsAddress')}
                </Text>
                <Text style={{color: COLORS.black}}>
                  {orderData?.location_description}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 15,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderBottomColor: COLORS.garay,
                marginVertical: 5,
              }}>
              {/* date */}
              <View>
                <Text style={styles.title}>{t('startWork')}</Text>
                <Text style={{color: COLORS.black, paddingTop: 10}}>
                  {orderData?.start_date}
                </Text>
              </View>
              <View style={{marginHorizontal: '5%'}}>
                <Text style={styles.title}>{t('endWork')}</Text>
                <Text style={{color: COLORS.black, paddingTop: 10}}>
                  {orderData?.end_date}
                </Text>
              </View>

              <View style={{}}>
                <Text style={styles.title}>{t('workPeriod')}</Text>
                <Text style={{color: COLORS.black, paddingTop: 10}}>
                  {working_time}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                flexDirection: 'row',
                paddingTop: 15,
                paddingBottom: 15,
                marginVertical: 5,
              }}>
              {/* date */}
              <View
                style={{
                  paddingHorizontal: 10,
                }}>
                <Text style={[{marginBottom: 10}, styles.title]}>
                  {t('additions')}
                </Text>

                <FlatList
                  data={orderData?.addons}
                  renderItem={({item}) => (
                    <View>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                      {item?.children?.map(child_item => (
                        <View
                          key={item.id}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/addionsIcon.png')}
                          />
                          <Text
                            key={child_item.id}
                            style={{
                              color: COLORS.black,
                              marginHorizontal: 8,
                            }}>
                            {child_item.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                />
              </View>
            </View>
            <CancelDialog
              onRequestSuccess={arg => {
                console.log('arg', arg);
                if (arg) {
                  setCancelVisible(false);
                }
              }}
              orderId={orderData?.id}
              onTouchOutside={() => setCancelVisible(false)}
              visible={cancelVisible}
              onPress={() => setCancelVisible(value => !value)}
            />
          </>
        )}
        {/* </View> */}
      </ScrollView>
      {/* {orderData?.status === 'waiting' ? ( */}
      {orderData.status == 'new' ? (
        loading ? (
          <Indecator size={22} color={COLORS.primary} />
        ) : (
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 77,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Button
                onPress={() => setCancelVisible(true)}
                backgroundColor={COLORS.white}
                textColor={COLORS.red}
                borderColor={COLORS.white}
                text={t('cancelOrder')}
              />
            </View>
            {/* <View style={{flex: 0.5}}></View> */}
          </View>
        )
      ) : loading ? (
        <Indecator size={22} color={COLORS.primary} />
      ) : orderData.status == 'cancelled' ? null : (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 70,
            // flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Button
            onPress={rejectOrderHandler}
            backgroundColor={COLORS.white}
            textColor={COLORS.red}
            borderColor={COLORS.red}
            text={t('rejectSupplier')}
          />
        </View>
      )}
    </View>
  );
};

export default AppartmentServiceDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: 0,
    paddingBottom: 40,
    paddingTop: 10,
    // height: '100%',
    // padding: 10,
  },
  title: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
});
