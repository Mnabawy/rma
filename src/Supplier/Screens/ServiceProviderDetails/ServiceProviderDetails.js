import {
  FlatList,
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useLayoutEffect} from 'react';
import React, {useCallback, useState} from 'react';
// import ServiceDetailsCard from './screens/components/ServiceDetails/ServiceDetailsCard';
import ServiceDetailsCard from '../../../AppartmentCycle/screens/components/ServiceDetails/ServiceDetailsCard';
// import {COLORS} from '../utils/colors';
import GreenCard from '../../../AppartmentCycle/screens/components/ServiceDetails/GreenCard';
import {t} from 'i18next';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from '../../../components/buttonColored/Button';
import {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import CancelDialog from '../../../AppartmentCycle/screens/components/CancelDialog';
import {COLORS, normalize} from '../../../utils';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import Indecator from '../../../components/Indecator/Indecator';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import DummyData from '../RecipientCycle/FinishWork/DummyData.json';
import {CheckBox} from '@rneui/base';
import * as ORDERACTIONS from '../../../redux/actions/order';
import AppText from '../../../components/text/Text';
import TextArea from '../../../components/TextArea/TextArea';
import {useTranslation} from 'react-i18next';

const imagesData = [
  {id: '2121', uri: require('../../../../assets/square.png')},
  {id: '123412', uri: require('../../../../assets/square.png')},
  {id: '2324', uri: require('../../../../assets/square.png')},
  {id: '355', uri: require('../../../../assets/square.png')},
  {id: '466', uri: require('../../../../assets/square3.png')},
];
const additionsData = [
  {id: '2121', text: 'additions 1'},
  {id: '123412', text: 'additions 2'},
  {id: '2324', text: 'additions 3'},
  {id: '355', text: 'additions 4'},
  {id: '466', text: 'additions 5'},
];

const ServiceProviderDetails = ({route}) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {order_id, status, title} = route?.params;
  console.log('ssscompany detailss titlesss: ', title);
  const [finalAddons, setSelectedAddons] = useState([]);
  const [routeName, setRouteName] = useState('');
  const [cancelVisible, setCancelVisible] = useState(false);
  const token = useSelector(state => state.auth.token);
  console.log('status', status);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [covers, setCovers] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [reason, setReason] = useState('');
  const [selected_ids, setSelectedIds] = useState([]);

  const {i18n} = useTranslation();
  const lang = i18n.language;

  const getData = useCallback(async () => {
    try {
      await axios({
        url: `${BASE_URL}/order/${order_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'get',
      }).then(res => {
        setLoading(true);
        if (res.data.success) {
          console.log('order details', res.data.data);
          setData(res.data.data);
          // console.log(
          //   'covers from api',
          //   res?.data?.data?.order?.service?.covers_en,
          // );
          console.log('imgasss: ', res?.data?.data?.order?.images);
          setCovers(res?.data?.data?.order?.images);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log('get supplier new orders err: ', err);
    }
  }, []);

  const {order} = data;

  const setAddons = async () => {
    // create a unique parent ids let addons_ids = [1, 2, 3];
    let addons_parent_ids = [];
    order?.addons?.map(item => addons_parent_ids.push(item?.parent_id));
    const unique_addons_parent_ids = [...new Set(addons_parent_ids)];
    // get all the addons
    const service_id = data?.order?.service?.id;
    try {
      await axios
        .get(`${BASE_URL}/order/service_addons`, {
          params: {
            service_id,
          },
        })
        .then(res => {
          if (res.data.success) {
            console.log('successss');
            let list = res?.data?.data;
            console.log('before');
            let selected_addons = [];
            let obj = {};
            for (let index = 0; index < list.length; index++) {
              unique_addons_parent_ids.map(par_id => {
                if (list[index].id === par_id) {
                  obj = {...obj, parent_name: list[index].name};
                }
              });

              const children = list[index].children;

              const children_ids = order?.addons?.map(item => item.id);
              console.log('ch ids', children_ids);
              for (var j = 0; j < children.length; j++) {
                let childrens = [];
                children_ids.forEach(children_ids => {
                  if (children_ids === children[j].id) {
                    console.log('abcdefs', children_ids, children[j].id);
                    childrens.push(children[j].name);
                  }
                });
                obj = {...obj, children: childrens};
                selected_addons.concat(obj);
              }
              setSelectedAddons(selected_addons);
            }
          } else {
            console.log('err', res?.data?.error);
          }
        });
    } catch (error) {
      console.log('service details error', error);
    }

    // select the only selected addons
  };
  console.log('covers: ', covers);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: order?.service?.name,
    });
  }, [data]);

  //  navigation.setOptions({title: title ? title : order?.service?.name});
  useEffect(() => {
    getData();
    console.log('titlessxyz', title);
    setAddons();
  }, []);

  console.log('addons from supplier service provider details: ', order?.addons);

  const user = useSelector(state => state.auth.userData);
  const user_id = user?.id;

  const supplier_id = order?.supplier?.id;
  console.log('user id', user_id);
  console.log('sup id, user id', supplier_id, user_id);

  return loading ? (
    <View style={{flex: 1, marginTop: '50%'}}>
      <Indecator color={COLORS.primary} size="large" />
    </View>
  ) : (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{paddingHorizontal: 10}}>
          <ServiceDetailsCard data={order} borderBottomColor={COLORS.green} />
        </View>
        <View style={{paddingHorizontal: 10}}>{/* <GreenCard /> */}</View>
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
              {textAlign: lang === 'ar' ? 'left' : 'right'},
            ]}>
            {t('subjectService')}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              marginTop: 5,
              textAlign: lang === 'ar' ? 'left' : 'right',
            }}>
            {order?.subject?.name?.slice(0, 100)}
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
              {textAlign: lang === 'ar' ? 'left' : 'right'},
            ]}>
            {t('details')}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              marginTop: 5,
              textAlign: lang === 'ar' ? 'left' : 'right',
            }}>
            {order?.description?.slice(0, 100)}
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <ScrollView horizontal>
              {covers?.map(item => (
                <Image
                  key={item.id}
                  style={{marginHorizontal: 2, width: 56, height: 56}}
                  source={{uri: item}}
                />
              ))}
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
              {textAlign: lang === 'ar' ? 'left' : 'right'},
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
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../../../assets/location.png')} />
              <AppText
                style={{
                  marginHorizontal: 5,
                  color: COLORS.black,
                  textAlign: lang === 'ar' ? 'left' : 'right',
                }}>
                {order?.address?.slice(0, 30)}
              </AppText>
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
              <Image source={require('../../../../assets/map.png')} />
            </View>
          </View>
          <View>
            <AppText
              style={[
                {
                  marginVertical: 5,
                  textAlign: lang === 'ar' ? 'left' : 'right',
                },
                styles.title,
              ]}>
              {t('detailsAddress')}
            </AppText>
            <AppText
              style={{
                color: COLORS.black,
                textAlign: lang === 'ar' ? 'left' : 'right',
              }}>
              {order?.location_description?.slice(0, 30)}
            </AppText>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
            paddingTop: 15,
            borderBottomWidth: 1,
            paddingBottom: 15,
            borderBottomColor: COLORS.garay,
            marginVertical: 5,
          }}>
          {/* date */}
          <View>
            <AppText style={styles.title}>{t('startWork')}</AppText>
            <AppText
              style={{
                color: COLORS.black,
                paddingTop: 10,
                textAlign: lang === 'ar' ? 'left' : 'right',
              }}>
              {order?.start_date}
            </AppText>
          </View>
          <View style={{marginHorizontal: '5%'}}>
            <AppText style={styles.title}>{t('endWork')}</AppText>
            <AppText style={{color: COLORS.black, paddingTop: 10}}>
              {order?.end_date}
            </AppText>
          </View>
          <View>
            <AppText style={styles.title}>{t('workPeriod')}</AppText>
            <AppText style={{color: COLORS.black, paddingTop: 10}}>
              {order?.working_time}
            </AppText>
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
          <View
            style={{
              paddingHorizontal: 10,
            }}>
            <AppText style={[{marginBottom: 10}, styles.title]}>
              {t('additions')}
            </AppText>

            <FlatList
              data={order?.addons}
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
                        style={{}}
                        source={require('../../../../assets/additionsIcon.png')}
                      />
                      {/* <Image source={require('../../assets/addionsIcon.png')} /> */}
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

            <FlatList
              data={finalAddons}
              renderItem={({item}) => {
                return (
                  <>
                    <Text>{item.parent_name}</Text>
                    {item.children.map(child => {
                      return <Text>-{child.name}</Text>;
                    })}
                  </>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>

      {order?.status === 'new' ? (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 77,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5}}>
            <Button
              onPress={() => {
                navigation.navigate('SelectRedirectRequest', {
                  reasons: order?.redirect_reason,
                  id: order?.id,
                });
                dispatch(ORDERACTIONS.setOrderData(order));
              }}
              backgroundColor={COLORS.white}
              textColor={COLORS.blue}
              borderColor={COLORS.white}
              text={t('redirect')}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Button
              onPress={() =>
                navigation.navigate('ApplyOrder', {
                  order_id: order.id,
                  status: order?.status,
                  code: order?.receipt_code,
                })
              }
              styles={{paddingHorizontal: 0, paddingVertical: 10}}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              borderColor={COLORS.primary}
              text={t('applyOrder')}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
      {/* order?.status === 'recipient' */}
      {order?.status === 'recipient' && (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 77,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.5}}>
            <Button
              onPress={() => setVisible(true)}
              backgroundColor={COLORS.white}
              textColor={COLORS.red}
              borderColor={COLORS.white}
              text={t('rejectOrder')}
            />
          </View>
          <View style={{flex: 0.5}}>
            <Button
              onPress={() =>
                navigation.navigate('DeliveryCode', {
                  order_delivery_code: order?.delivery_code,
                  order_id: order.id,
                })
              }
              styles={{paddingHorizontal: 0, paddingVertical: 10}}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              borderColor={COLORS.primary}
              text={t('finishWork')}
            />
          </View>
        </View>
      )}
      {order?.status === 'finished' && (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 77,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 0.4, alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Image source={require('../../../../assets/star.png')} />
              <Button
                styles={{marginHorizontal: 10}}
                onPress={() =>
                  navigation.navigate('UserReviews', {
                    items: order?.user_rate,
                  })
                }
                backgroundColor={COLORS.white}
                textColor={COLORS.gold}
                borderColor={COLORS.white}
                text={t('ViewRate')}
              />
            </View>
          </View>
          <View style={{flex: 0.6}}>
            <Button
              onPress={() =>
                navigation.navigate('UserEvaluation', {
                  id: order.id,
                })
              }
              styles={{paddingHorizontal: 0, paddingVertical: 10}}
              backgroundColor={COLORS.primary}
              textColor={COLORS.white}
              borderColor={COLORS.primary}
              text={t('rateUser')}
            />
          </View>
        </View>
      )}
      {order?.status === 'closed' && <></>}
      {order?.status === '' && <></>}

      <Dialog visible={visible} onTouchOutside={() => setVisible(false)}>
        <View style={{padding: 0, width: normalize(350)}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: COLORS.garay,
              width: '100%',
              padding: 10,
            }}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image source={require('../../../../assets/close.png')} />
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                color: COLORS.black,
              }}>
              {t('rejectOrder')}
            </Text>
          </View>

          {/* in case clicked reject order show this */}
          <ScrollView contentContainerStyle={{padding: 15}}>
            {/* reject reason */}
            {DummyData.map(item => (
              <View key={item.id}>
                <CheckBox
                  checked={item.checked}
                  title={item.title}
                  onIconPress={checked => (item.checked = !item.checked)}
                />
              </View>
            ))}

            <AppText style={{color: COLORS.black, marginBottom: 5}}>
              {t('reasonForReject')}
            </AppText>
            <TextArea
              value={reason}
              onChangeText={value => setReason(value)}
              placeholder={t('writeHere')}
            />
          </ScrollView>
        </View>
      </Dialog>
    </>
  );
};

export default ServiceProviderDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingBottom: 40,
    paddingTop: 10,
    flex: 1,
  },
  title: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
});
