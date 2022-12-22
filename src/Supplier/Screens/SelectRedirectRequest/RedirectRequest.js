import {
  Dimensions,
  FlatList,
  NativeModules,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppText from '../../../components/text/Text';
import {t} from 'i18next';
import CheckBox from '../../../components/checkBox/CheckBox';
import TextArea from '../../../components/TextArea/TextArea';
import {COLORS} from '../../../utils';
import HeaderArrowBack from '../../../components/HeaderArrowBack/HeaderArrowBack';

import Progress from '../../../components/Progress/Progress';
import CustomButton from '../../../components/buttonColored/Button';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../../utils/config';
import {useSelector} from 'react-redux';
// /Supplier/Screens/RecipientCycle/FinishWork/DummyData.json
import dummyData from '../../../Supplier/Screens/RecipientCycle/FinishWork/DummyData.json';
const _ = require('lodash');

const SelectRedirectRequest = ({navigation, route}) => {
  const {id} = route.params;
  console.log('params', route.params);
  const [reasonseArr, setReasonsArr] = useState([]);
  const [reason, setReason] = useState('');
  const [redirectReason, setRedirectReason] = useState([]);
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('reasonseArr', reasonseArr);
  const [toast, setToast] = useState({
    visible: false,
    text: '',
  });

  const token = useSelector(state => state.auth.token);

  const sendRequestHandler = async () => {
    setLoading(true);

    try {
      await axios({
        url: `${BASE_URL}/order/${id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          redirect_reason_list: redirectReason,
          reject_reason: rejectReason || '',
        },
      }).then(res => {
        console.log('res.data: ', res.data);
        if (res.data.success) {
          console.log('update successffuly');
          setToast({
            visible: true,
            text: t('oprderRedirected'),
          });
          navigation.navigate('SelectServiceProvider');
          dummyData.filter(selectedItem => {
            selectedItem.checked = false;
          });
        } else {
          console.log('there are some errors');
        }
      });
      setLoading(false);
    } catch (error) {
      console.log('update order failed: ', error);
    }
  };

  const onSelectRedirectReasonHandler = item => {
    // console.log(item);
    let arr = redirectReason;
    arr = [...arr, item.id];
    const unique = _.uniq(arr);
    // console.log('unique', unique);

    // change the selected item to be checked wewooooo
    dummyData.filter(selectedItem => {
      if (item.id === selectedItem.id) {
        selectedItem.checked = !item.checked;
      }
    });

    //
    setRedirectReason(unique);
  };

  useEffect(() => {
    setReasonsArr(route.params.reasons);
  }, [route]);

  // const renderItem = ({item}) => console.log(item);
  const renderItem = ({item}) => (
    <View style={{marginVertical: 5}}>
      <CheckBox
        containerStyle={{paddingVertical: 0, marginVertical: 0}}
        text={item.title}
        textStyle={{color: COLORS.black, marginHorizontal: 5}}
      />
    </View>
  );

  const onValueChange = id => {};

  const width = Dimensions.get('screen').width;

  const {StatusBarManager} = NativeModules;

  return (
    <View style={{flex: 1, marginTop: StatusBarManager.HEIGHT}}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Progress
        borderWidth={0}
        color={COLORS.primary}
        width={width}
        progress={0.5}
      />
      <HeaderArrowBack />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          // alignItems: 'center',
          paddingHorizontal: 20,
        }}
        style={{
          backgroundColor: COLORS.white,
          paddingTop: 20,
        }}>
        <AppText style={{fontSize: 18, color: COLORS.black}}>
          {t('selectRedirectingReason')}
        </AppText>
        <View style={{marginVertical: 20}}>
          {/* return null */}
          {typeof reasonseArr === 'object' &&
          reasonseArr?.length !== 0 &&
          reasonseArr !== null ? (
            <FlatList
              data={reasonseArr}
              renderItem={({item}) =>
                ({item}) =>
                  (
                    <View style={{marginVertical: 5}}>
                      <CheckBox
                        onValueChange={() => onValueChange(item.id)}
                        value={item.checked}
                        containerStyle={{paddingVertical: 0, marginVertical: 0}}
                        text={item.title}
                        textStyle={{color: COLORS.black, marginHorizontal: 5}}
                      />
                    </View>
                  )}
              keyExtractor={item => item.id}
            />
          ) : (
            <FlatList
              data={dummyData}
              renderItem={({item}) => (
                <View style={{marginVertical: 5}}>
                  <CheckBox
                    value={item.checked}
                    onValueChange={() => onSelectRedirectReasonHandler(item)}
                    containerStyle={{paddingVertical: 0, marginVertical: 0}}
                    text={item.title}
                    textStyle={{color: COLORS.black, marginHorizontal: 5}}
                  />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>

        <AppText style={{color: COLORS.black, marginBottom: 5}}>
          {t('reasonForReject')}
        </AppText>
        <TextArea
          value={reason}
          onChangeText={value => setReason(value)}
          placeholder={t('writeHere')}
        />
        <CustomButton
          loading={loading}
          backgroundColor={COLORS.primary}
          textColor={COLORS.white}
          borderColor={COLORS.primary}
          text={t('next')}
          styles={{marginHorizontal: 0, marginTop: 40, paddingVertical: 10}}
          onPress={sendRequestHandler}
        />
      </ScrollView>
    </View>
  );
};

export default SelectRedirectRequest;

const styles = StyleSheet.create({});
