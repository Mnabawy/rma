import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {t} from 'i18next';
import AppText from '../../../../components/text/Text';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/buttonColored/Button';
import {COLORS} from '../../../../utils/colors';
import axios from 'axios';
import {BASE_URL} from '../../../../utils/config';
import StartDate from '../../StartDate/StartDate';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import * as rateActions from '../../../../redux/actions/rate';

const SupplierEvaluation = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const [rateData, setRateData] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [targetList, setTargetList] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState([]);
  const rateState = useSelector(state => state.rate.listSupplier);
  console.log('rate state supplier: ', rateState);

  const getRateQuestions = () => {
    axios({
      method: 'get',
      url: `${BASE_URL}/order_rate_questions`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      // console.log(res.data.data)
      if (res.data.success) {
        let resData = res?.data?.data;

        if (resData) {
          let arr = [];
          resData.map(item => {
            arr.push({id: Date.now(), question: item, rate: 0});
          });
          const unique = [...new Set(arr.map(item => item))]; // [ 'A', 'B']
          // console.log('unique: ', unique);
          setRateData(unique);
        }
      }
    });
  };

  const submitRateHandler = async () => {
    const unique = _.uniqBy(rateState, function (e) {
      return e.question;
    });
    // needs to be dynamic
    console.log('data', unique);
    await axios({
      method: 'post',
      url: `${BASE_URL}/order/${id}/rate`,
      data: {rate: unique},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (res.data.success) {
        console.log('rate supplier res', res.data);
        navigation.goBack();
      }
    });
  };

  const onRateHandler = (a, b) => {
    console.log(a, b);
  };

  useEffect(() => {
    getRateQuestions();
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: COLORS.white,
          flex: 1,
        }}>
        <AppText style={{color: COLORS.black, fontSize: 20}}>
          {t('userEvaluation')}
        </AppText>
        <AppText style={{color: COLORS.black, fontSize: 16}}>
          {t('ratetTeUser')}
        </AppText>

        {rateData?.map((item, index) => (
          <View key={index} style={{marginTop: 15}}>
            <AppText style={{color: COLORS.black, fontSize: 16}}>
              {item.question}
            </AppText>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <AirbnbRating
                count={5}
                defaultRating={0}
                size={25}
                showRating={false}
                onFinishRating={rate => {
                  const newItem = {...item};
                  const newObj = {question: newItem.question, rate};
                  dispatch(rateActions.addRateSupplier(newObj));
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{backgroundColor: COLORS.white, height: 77}}>
        <CustomButton
          onPress={submitRateHandler}
          backgroundColor={COLORS.primary}
          textColor={COLORS.white}
          borderColor={COLORS.primary}
          text={t('submit')}
        />
      </View>
    </>
  );
};

export default SupplierEvaluation;

const styles = StyleSheet.create({});
