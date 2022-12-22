import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {t} from 'i18next';
import AppText from '../../components/text/Text';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/buttonColored/Button';
import {COLORS} from '../../utils/colors';
import axios from 'axios';
import {BASE_URL} from '../../utils/config';
// import StartDate from '../../StartDate/StartDate';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import * as rateActions from '../../redux/actions/rate';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RateUser = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [rateData, setRateData] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [targetList, setTargetList] = useState([]);
  const [dataToSubmit, setDataToSubmit] = useState([]);
  const [loading, setLoading] = useState(false);
  const rateState = useSelector(state => state.rate);

  const {id} = route.params;

  useEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [navigation]);

  const getRateQuestions = () => {
    setLoading(false);
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
      setLoading(true);
    });
  };
  console.log(id);
  const submitRateHandler = async () => {
    const unique = _.uniqBy(rateState.list, function (e) {
      return e.question;
    });

    await axios({
      method: 'post',
      url: `${BASE_URL}/order/${id}/rate`,
      data: {rate: unique},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (res.data.success) {
        navigation.goBack();
        console.log('rate res: ', res.data);
        console.log('success');
      }
    });
  };

  const asyncStorageKey = '@todos';

  const storeTodosInAsync = newTodos => {
    const stringifiedTodos = JSON.stringify(newTodos);

    AsyncStorage.setItem(asyncStorageKey, stringifiedTodos).catch(err => {
      console.log('Error storing todos in Async', err);
    });
  };

  const restoreTodosFromAsync = () => {
    AsyncStorage.getItem(asyncStorageKey)
      .then(stringifiedTodos => {
        console.log('Restored Todos:');
        console.log(stringifiedTodos);

        const parsedTodos = JSON.parse(stringifiedTodos);

        if (!parsedTodos || typeof parsedTodos !== 'object') return;

        setTodos(parsedTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  };

  useEffect(() => {
    getRateQuestions();
    restoreTodosFromAsync();
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
              <TouchableOpacity onPress={() => console.log(item.id)}>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={25}
                  showRating={false}
                  onFinishRating={rate => {
                    const newItem = {...item};
                    const newObj = {question: newItem.question, rate};
                    dispatch(rateActions.addRate(newObj));
                  }}
                />
              </TouchableOpacity>
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

export default RateUser;

const styles = StyleSheet.create({});

// SupplierEvaluation;
