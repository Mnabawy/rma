import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import BouncyCheckBox from '../../components/checkBoxRounded/CheckBox';
import DatePicker from '../../components/DatePicker/DatePicker';
import DropdownComponent from '../../components/Dropdown/Dropdown';
import Input from '../../components/input/input';
import UploadPhoto from '../../components/UploadPhotoInput/UploadPhoto';
import * as orderActions from '../../redux/actions/order';
import {COLORS} from '../../utils/colors';
import {BASE_URL} from '../../utils/config';
import Stepper from '../StepperComponents/stepper-ui';
import {useLanguage} from '../../utils/useLanguage';
import Indecator from '../../components/Indecator/Indecator';
import {useTranslation} from 'react-i18next';

const schema = yup.object({
  location: yup.string().required(t('required')),
  location_description: yup.string().min(3),
  details: yup.string().min(3),
  subjService: yup.string(),
});

const BookService = ({navigation, route}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const {service_id, service_name, steps: steps_from_route} = route?.params;
  console.log('steps_from_route:', steps_from_route);
  const token = useSelector(state => state.auth.token);
  const steps = useSelector(state => state.order.orderSteps);
  const dispatch = useDispatch();
  // const addressState = useSelector(state => state.address);
  // console.log('address from book service', addressState);
  const [note, setNote] = useState('');
  const [evening, setEvening] = useState(false);
  const [morning, setMorning] = useState(false);
  const [night, setNight] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('night');
  //
  const [loading, setLoading] = useState(false);

  const [subServices, setSubServices] = useState([]);
  const [subService, setSubService] = useState({});
  const [ServiceSubjects, setServiceSubject] = useState([]);
  console.log('selected period: ', selectedPeriod);

  console.log('service_id from book service: ', service_id);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const addressState = useSelector(state => state.address.address);
  console.log('addressState: ', addressState);

  const [address, setAddress] = useState('');

  const [initialDetails, setInitialDetails] = useState('');
  const [initilaDetailsAddree, setinitilaDetailsAddree] = useState('');
  const [service_subject, setService_subject] = useState('');

  const onSelectImageHandler = async images => {
    console.log('got inside the upload image handler');
    var data = new FormData();
    images.forEach((item, index) => {
      data.append('images[]', {
        uri: item.path,
        name: `dalel-images-multi-${new Date() + index + 1}`,
        type: item.mime,
      });
    });
    console.log('1-uploaded images dataa:', data);

    try {
      axios({
        url: `${BASE_URL}/upload`,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
      }).then(res => {
        console.log('upload image res:', res);
        if (res.data.success) {
          // setImages(res.data.data);
          dispatch(orderActions.setOderImages(res.data.data));
        } else {
          console.log('res images error', res.data);
        }
      });
    } catch (error) {
      console.log('upload images error: ', error);
    }
  };

  const getServiceSubject = async () => {
    try {
      await axios({
        url: `${BASE_URL}/order/list_subjects?service_id=${service_id}`,
        method: 'get',
        headers: {
          // Authorization: 'Bearer ' + token,
          locale: lang,
        },
        params: {
          code: 'order_subject',
        },
      }).then(res => {
        if (res.data.success) {
          // console.log('new subjects: ', res.data.data);
          //old response: {"code": "order_subject", "id": 162, "type": "SELECT", "value": {"1": "New", "2": "Repair", "3": "Replace or Return"}, "value_array": ["New", "Repair", "Replace or Return"]}
          let valueObj = res?.data?.data;

          let data = [];

          for (const key in valueObj) {
            console.log(valueObj[key].id);
            let obj = {
              id: valueObj[key].id,
              value: valueObj[key].name,
              label: valueObj[key].name,
              name: valueObj[key].name,
            };
            console.log('obj: ', obj);
            data.push(obj);
          }

          setServiceSubject(data);
        } else {
          console.log('service subject err: ', res.data);
        }
      });
    } catch (error) {
      console.log('get sub err', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: service_name,
    });
    getServiceSubject();
  }, []);

  const onSubmit = values => {
    // if (images.length !== 0) {
    console.log('images to submit: ', images);
    console.log('serivce_subssss: ', service_subject);
    const data = {
      // images,
      ...values,
      service_subject: service_subject?.label,
      subject_id: service_subject?.id,
    };
    console.log('values with service subject: ', data);
    dispatch(orderActions.createOrder(data));
    setLoading(true);
    navigation.navigate('Additions', {
      service_id: service_id,
      steps: steps_from_route ? steps_from_route : steps,
    });
    setLoading(false);
    // }
  };

  useEffect(() => {
    setAddress(addressState?.addressName?.slice(0, 60)?.replace('38M6+3Q', ''));
  }, [addressState]);

  const onAddressSelected = address => {
    setAddress(address);
  };

  const setSubValueFunc = item => {
    // console.log('selected item: ', item.name);
    setService_subject(item);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        description: initialDetails ? initialDetails : '',
        location: address ? address : '',
        location_description: initilaDetailsAddree ? initilaDetailsAddree : '',
        start_date: startDate,
        end_date: endDate,
        working_time: selectedPeriod,
      }}
      validationSchema={schema}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldValue,
        errors,
      }) => (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollableContainer}
            showsVerticalScrollIndicator={false}>
            <View
              style={{backgroundColor: COLORS.white, flex: 1, paddingTop: 10}}>
              <DropdownComponent
                value={subServices}
                onChange={value => {
                  // setSubService(value);
                  setFieldValue('subService', value);
                  setSubValueFunc(value);
                }}
                data={ServiceSubjects}
                label={t('subjectService')}
              />
              <UploadPhoto
                onSelect={onSelectImageHandler}
                placeholder={t('placeholder')}
                label={t('label')}
                value={values.description}
                onChangeText={value => {
                  handleChange('description');
                  setInitialDetails(value);
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Map', {
                    screen: 'BookService',
                    onSelect: onAddressSelected,
                  })
                }>
                <Input
                  placeholder={t('location')}
                  error={errors.location}
                  label={t('location')}
                  value={values.location}
                  iconPosition="left"
                  icon={
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Map', {
                          screen: 'BookService',
                          onSelect: onAddressSelected,
                        })
                      }>
                      <Image
                        style={{width: 30, height: 30}}
                        source={require('../../../assets/locationInputIcon.png')}
                      />
                    </TouchableOpacity>
                  }
                  // onChangeText={handleChange('address')}
                />
              </TouchableOpacity>
              <Input
                placeholder={t('detailsaAddress')}
                error={errors.location_description}
                label={t('detailsaAddress')}
                value={values.location_description}
                onChangeText={value => {
                  handleChange('location_description');
                  setinitilaDetailsAddree(value);
                }}
              />
              <Text
                style={[
                  styles.text,
                  {textAlign: lang === 'ar' ? 'left' : 'right'},
                ]}>
                {t('timeWork')}
              </Text>
              <View style={styles.dateContainer}>
                <View style={{flex: 0.45}}>
                  <DatePicker
                    placeholder={startDate}
                    label={t('startDate')}
                    value={values.start_date}
                    onChange={date => setStartDate(date)}
                  />
                </View>
                <View style={{flex: 0.45}}>
                  <DatePicker
                    placeholder={endDate}
                    label={t('endDate')}
                    value={values.end_date}
                    onChange={date => setEndDate(date)}
                  />
                </View>
              </View>

              <Text
                style={[
                  styles.text,
                  {textAlign: lang === 'ar' ? 'left' : 'right'},
                ]}>
                {t('exPeriod')}
              </Text>

              {/* <Check */}

              <View style={styles.checkboxContainer}>
                <BouncyCheckBox
                  disabled={morning}
                  key={'1'}
                  boxType="circle"
                  textStyle={{color: COLORS.black}}
                  // value="night"
                  onValueChange={() => {
                    // console.log(item);
                    setSelectedPeriod('morning');
                    setNight(false);
                    setEvening(false);
                    setMorning(true);
                  }}
                  text={t('morning')}
                  containerStyle={{marginHorizontal: 5}}
                />
                <BouncyCheckBox
                  disabled={evening}
                  key={'2'}
                  boxType="circle"
                  textStyle={{color: COLORS.black}}
                  // value="night"
                  onValueChange={() => {
                    // console.log(item);
                    setSelectedPeriod('evening');
                    setNight(false);
                    setEvening(true);
                    setNight(false);
                    setMorning(false);
                  }}
                  text={t('evening')}
                  containerStyle={{marginHorizontal: 5}}
                />
                <BouncyCheckBox
                  disabled={night}
                  key={'3'}
                  boxType="circle"
                  textStyle={{color: COLORS.black}}
                  // value="night"
                  onValueChange={() => {
                    // console.log(item);
                    setSelectedPeriod('night');
                    setNight(true);
                    setEvening(false);
                    setMorning(false);
                  }}
                  text={t('Night')}
                  containerStyle={{marginHorizontal: 5}}
                />
              </View>
            </View>
          </ScrollView>

          <View
            style={{
              backgroundColor: COLORS.white,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              flexDirection: 'row',
              direction: lang === 'en' ? 'ltr' : 'rtl',
              height: 77,
              alignItems: 'center',
            }}>
            <View style={{flex: 0.7, marginHorizontal: 10}}>
              {/* // to change active step change the active property */}
              <Stepper
                steps={steps_from_route ? steps_from_route : steps}
                active={1}
                stepNumber={1}
              />
            </View>
            <View style={{flex: 0.3}}>
              <TouchableOpacity
                disabled={false}
                activeOpacity={1}
                style={{
                  backgroundColor: '#4B7E75',
                  padding: 15,
                  borderRadius: 50,
                  alignItems: 'center',
                  marginHorizontal: 10,
                }}
                onPress={handleSubmit}>
                {loading ? (
                  <Indecator size={22} color={COLORS.white} />
                ) : (
                  <Text style={{color: 'white'}}>{t('next')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
export default BookService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  scrollableContainer: {
    paddingBottom: 200,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  text: {
    fontSize: 18,
    fontFamily: 'poppins-regular',
    color: COLORS.textColor,
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
