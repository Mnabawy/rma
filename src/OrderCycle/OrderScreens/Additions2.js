import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState, useTransition} from 'react';
import Stepper from '../StepperComponents/stepper-ui';
import CustomCheckBox from '../../components/checkBox/CheckBox';
import {COLORS} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
const Dummydata = require('./dummyData/AdditionsDummyData.json');
import * as orderActions from '../../redux/actions/order';
import {t} from 'i18next';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import Chackbox from '@react-native-community/checkbox';
import Toast from '../../components/Toast/Toast';
import AppText from '../../components/text/Text';
import _ from 'lodash';
import Indecator from '../../components/Indecator/Indecator';
import moment from 'moment';
import {useLanguage} from '../../utils/useLanguage';
import {useTranslation} from 'react-i18next';
import NoData from '../../components/NoData';
const Additions = ({navigation, route}) => {
  const {steps: steps_from_route} = route?.params;
  console.log('steps_from_route: additions', steps_from_route);
  const {i18n} = useTranslation();
  const dispatch = useDispatch();
  const steps = useSelector(state => state.order.orderSteps);
  const orderData = useSelector(state => state.order.orderData);
  const service_id = useSelector(state => state.service.service_id);
  // console.log();
  const showTerms = useSelector(state => state.order.showTerms);
  const [checked, setChecked] = useState(false);
  const [question, setQuestion] = useState('second');
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  // console.log('service_id from additions: ', service_id);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errToast, setErrToast] = useState({visible: false, text: ''});
  const [selected_addons, setAddons] = useState([]);
  // order data
  const orderSate = useSelector(state => state.order);
  const addressSate = useSelector(state => state.address);
  const token = useSelector(state => state.auth.token);
  const [list, setList] = useState([]);
  const [checks, setChecks] = useState([]);
  const [nodata, setNodata] = useState(false);

  const lang = i18n.language;
  const onSubmitHandler = async () => {
    dispatch(orderActions.setOrderAddons({service_addons: list}));
    if (steps_from_route) {
      navigation.navigate('Terms', {
        steps: steps_from_route ? steps_from_route : steps,
      });
    } else {
      const {id: service_id, companies} = orderSate.service;

      const {address} = addressSate;

      const {
        start_date,
        end_date,
        location_description,
        working_time,
        service_subject,
        description,
        images,
        subject_id,
      } = orderSate.orderData;

      const formatedStartDate = moment(start_date).format('YYYY-MM-DD');
      const formatedEndDate = moment(end_date).format('YYYY-MM-DD');

      console.log('listeeee', list);
      const data = {
        service_id,
        description,
        company_id: 1,
        address: address.addressName,
        lat: address.lat,
        lng: address.lng,
        location_description,
        start_date: formatedStartDate,
        end_date: formatedEndDate,
        working_time,
        service_addons: list,
        images,
        service_subject,
        subject_id,
      };

      console.log('submited data:', data);

      // console.log('tokeng', token);
      setSubmitLoading(true);
      try {
        await axios({
          url: `${BASE_URL}/order`,
          method: 'post',
          data: data,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            locale: lang,
          },
        }).then(res => {
          if (res.data.success) {
            const resData = {
              order_number: res?.data?.data?.order?.id,
              receipt_code: res.data.data.order.receipt_code,
              delivery_code: res.data.data.order.delivery_code,
            };
            console.log('order details: ', res?.data?.data?.order);
            // console.log('res data', res);
            navigation.navigate('HomeSuccess', {
              data: resData,
            });
            // dispatch(orderActions.setOrderAddons(list));
          } else {
            setErrToast({visible: true, text: res?.data?.error});
            setTimeout(() => {
              setErrToast({visible: false});
            }, 3000);
          }
        });
        setSubmitLoading(false);
      } catch (error) {
        console.log('terms error', error);
      }
    }
  };
  console.log('service id from adds:', service_id);
  const [isRerendred, setRerender] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${BASE_URL}/order/service_addons`, {
          params: {
            service_id, // to avoid null value to use it add addons from the admin panel
          },
        })
        .then(res => {
          if (res.data.success) {
            console.log(res.data);
            let data = [];
            const service = res?.data?.data;
            service.forEach(element => {
              let item = {
                name: element?.name,
                id: element?.id,

                //
                children: [
                  ...element['children']?.map(
                    chItem => (chItem['checked'] = true),
                  ),
                ],
              };
              let arr = [];
              setList(arr);
              data.push(item);
            });
            console.log('addons data:', data);
            setData(service);
            // setNodata(false);
            if (data.length === 0) {
              setNodata(true);
            }
          } else {
            console.log('err', res?.data?.error);
          }
          setLoading(false);
        });
    } catch (error) {
      console.log('service details error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{paddingHorizontal: 10}}>
        {loading ? (
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Indecator size={35} color={COLORS.primary} />
          </View>
        ) : (
          <>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins-Regular',
              }}>
              {item.name} ?
            </Text>
            <FlatList
              data={item.children}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 0,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      if (list.indexOf(item.id) === -1) {
                        list.push(item.id);
                      } else {
                        var index = list.indexOf(item.id);
                        list.splice(index, 1);
                      }
                      if (index !== -1) {
                      }

                      setRerender(value => !value);
                    }}>
                    {!list.includes(item.id) ? (
                      <Image
                        source={require('../../../assets/check.png')}
                        style={{width: 30, height: 30}}
                      />
                    ) : (
                      <Image
                        source={require('../../../assets/checked.png')}
                        style={{width: 30, height: 30}}
                      />
                    )}
                    <AppText
                      style={{
                        fontSize: 14,
                        color: COLORS.black,
                        marginHorizontal: 5,
                      }}>
                      {item?.name}
                    </AppText>
                  </TouchableOpacity>
                  // </View>
                );
              }}
            />
          </>
        )}
      </View>
    );
  };
  console.log('addons: ', data);
  return (
    <View style={styles.container}>
      {errToast.visible && (
        <View style={{alignSelf: 'center', position: 'absolute', zIndex: 100}}>
          <Toast error text={errToast.text} />
        </View>
      )}
      <ScrollView style={styles.content}>
        {/* content */}
        {nodata ? (
          <View
            style={{
              flex: 1,
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <NoData />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={comment => comment.id}
          />
        )}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          flexDirection: 'row',
          height: 100,
          alignItems: 'center',
        }}>
        <View style={{flex: 0.7, marginHorizontal: 10}}>
          {/* // to change active step change the active property */}
          <Stepper
            steps={steps_from_route ? steps_from_route : steps}
            active={2}
            stepNumber={1}
          />
        </View>
        <View style={{flex: 0.3}} elevation={5}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#4B7E75',
              padding: 15,
              borderRadius: 50,
              alignItems: 'center',
              marginHorizontal: 10,
            }}
            onPress={onSubmitHandler}>
            {submitLoading ? (
              <Indecator size={22} color={COLORS.white} />
            ) : (
              <Text style={{color: 'white'}}>
                {steps_from_route ? t('next') : t('finish')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Additions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  content: {},
});
