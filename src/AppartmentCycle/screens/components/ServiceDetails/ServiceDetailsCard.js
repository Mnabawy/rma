import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../../utils/colors';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {SUPPLIER} from '../../../../redux/actions/types';

const ServiceDetailsCard = ({borderBottomColor, data, status}) => {
  const userType = useSelector(state => state.auth.userType);
  console.log('usertyp0', userType);
  const service_subject = data?.service?.name; // name of the service
  const {i18n} = useTranslation();
  const lang = i18n.language;
  // console.log('service sub', data);
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${data?.supplier?.phone_number}`; // Error in this line
  } else {
    phoneNumber = `telprompt:${data?.supplier?.phone_number}`;
  }
  return (
    <View>
      <View
        style={[
          {
            borderBottomColor:
              status === 'recipient' ? COLORS.gold : COLORS.green,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <Text
          style={{
            marginBottom: 5,
            fontSize: 20,
            fontFamily: 'Poppins-Regular',
            color: COLORS.black,
          }}>
          {data?.id ? data?.id : '58966245'}#
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <>
            <Image
              style={{marginHorizontal: 5, width: 15, height: 15}}
              source={require('../../../../../assets/point.png')}
            />
            <Text
              style={{
                marginBottom: 0,
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                color: COLORS.green,
              }}>
              {data?.status}
            </Text>
          </>
        </View>
      </View>
      {userType === SUPPLIER && (
        <View
          style={{
            borderWidth: 1,
            borderColor: COLORS.lighterGray,
            marginVertical: 5,
            padding: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: data?.user?.picture}}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
            <View
              style={{
                // borderWidth: 1,
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 10,
              }}>
              {/* <View style={{marginHorizontal: 10}}> */}
              {/* </View> */}
              <Text>{data?.user?.name + ' ' + data?.user?.last_name}</Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`tel:${data?.user?.phone_number}`)
                }>
                <Image
                  source={require('../../../../../assets/phoneIcon.png')}
                  // style={{marginHorizontal: 200}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ServiceDetailsCard;

const styles = StyleSheet.create({
  container: {
    // elevation: 1,
    backgroundColor: COLORS.white,
    shadowOffset: 1,
    // borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderBottomWidth: 6,
    borderBottomColor: COLORS.gold,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 16,
    elevation: 2,
  },
});
