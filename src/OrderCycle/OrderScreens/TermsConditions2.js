import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Stepper from '../StepperComponents/stepper-ui';
import {COLORS} from '../../utils/colors';

import {t} from 'i18next';
import TouchableText from '../../components/TouchableText/TouchableText';
import CustomCheckBox from '../../components/checkBox/CheckBox';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useLanguage} from '../../utils/useLanguage';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import AppText from '../../components/text/Text';
import NoData from '../../components/NoData';
const data = require('./dummyData/PrivacyTermsDummyData.json');
import * as orderActions from '../../redux/actions/order';

const schema = yup.object({
  checked: yup.bool().oneOf([true], t('required')),
});

const TermsConditions = ({navigation, route}) => {
  const {steps: steps_from_route} = route.params;
  console.log('s f r', steps_from_route);
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const [value, setValue] = useState(false);
  const orderSate = useSelector(state => state.order);
  const addressSate = useSelector(state => state.address);
  const token = useSelector(state => state.auth.token);
  const steps = useSelector(state => state.order.orderSteps);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const lang = i18n.language;
  const [nodata, setNodata] = useState(false);

  const service_details = useSelector(state => state.service);
  console.log('service_details from terms: ', service_details);

  const getData = async () => {
    setLoading(true);
    try {
      await axios({
        url: `${BASE_URL}/page`,
        method: 'get',
        headers: {
          locale: lang,
        },
        params: {
          slug: 'terms',
        },
      }).then(res => {
        if (res.data.success) {
          setContent(res.data.data);
          if (Object.keys(res?.data?.data).length === 0) {
            setNodata(true);
          }
        }
      });
    } catch (err) {
      console.log('social links api issue', err);
    }
    setLoading(false);
  };
  const {id: service_id, companies} = orderSate.service;
  console.log('service_id:ss ', orderSate.service);
  const images = useSelector(state => state.order.images);

  const inSubmitHandler = async () => {
    // console.log('orderData', orderSate);
    // console.log('addressState', addressSate);
    const {address} = addressSate;

    const {
      start_date,
      end_date,
      location_description,
      working_time,
      description,
      // images,
      service_subject,
      subject_id,
    } = orderSate.orderData;
    const {addons} = orderSate;
    // console.log('images from terms2534212: ', images);
    // const label = orderSate?.orderData?.subService?.label;
    // const id = orderSate?.orderData?.subService?.id;
    // formate date
    // console.log('label, id', service_subject, subject_id);
    const formatedStartDate = moment(start_date).format('YYYY-MM-DD');
    const formatedEndDate = moment(end_date).format('YYYY-MM-DD');

    const addons_list = addons?.service_addons;
    // console.log('service_addonsss', addons_list);
    // console.log('addons from state: ', addons);
    // images from state
    console.log('2-images from termsa: ', images);
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
      service_addons: addons_list,
      images,
      service_subject,
      subject_id,
    };
    console.log('data to submit: ', data);
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
          console.log('success order created ');
          dispatch(orderActions.createOrder({}));
          const resData = {
            order_number: res.data.data.order.id,
            receipt_code: res.data.data.order.receipt_code,
            delivery_code: res.data.data.order.delivery_code,
          };

          console.log('res data', res);
          navigation.navigate('HomeSuccess', {
            data: resData,
          });
        } else {
          console.log('err res data: ', res.data);
        }
      });
    } catch (error) {
      console.log('terms error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Formik
      initialValues={{checked: false}}
      validationSchema={schema}
      onSubmit={inSubmitHandler}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            {/* <FlatList data={content} renderItem={renderItem} /> */}
            {nodata ? (
              <View style={{marginTop: 100}}>
                <NoData />
              </View>
            ) : (
              <>
                <View style={{alignItems: 'center', marginTop: 20}}>
                  <AppText style={{fontSize: 18, color: COLORS.black}}>
                    {/* {content.title} */}
                  </AppText>

                  <AppText
                    style={{
                      textAlign: 'center',
                      marginTop: 10,
                      color: COLORS.black,
                    }}>
                    {service_details?.terms}
                  </AppText>
                </View>
                <CustomCheckBox
                  error={errors.checked}
                  onFillColor
                  value={values.checked}
                  onValueChange={value => {
                    console.log(errors.checked);
                    setFieldValue('checked', value);
                  }}
                  text={
                    <TouchableText
                      text={t('checkBoxText')}
                      onPress={() => {}}
                    />
                  }
                />
              </>
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
              backgroundColor: 'white',
              height: 77,
            }}>
            <View style={{flex: 0.7, marginHorizontal: 10}}>
              {/* // to change active step change the active property */}
              <Stepper
                steps={steps_from_route ? steps_from_route : steps}
                active={3}
                stepNumber={1}
              />
            </View>
            <View style={{flex: 0.3}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#4B7E75',
                  padding: 15,
                  borderRadius: 50,
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
                onPress={handleSubmit}>
                <Text style={{color: 'white'}}>{t('finish')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingBottom: 85,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginTop: 10,
    color: COLORS.black,
  },
  text: {
    color: COLORS.black,
  },
});
