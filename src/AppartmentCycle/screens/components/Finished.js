import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';

const Finished = ({
  id,
  status,
  loading,
  supplier,
  serviceName,
  usbImgUrl,
  created_at,
  rate,
  reject_reason,
  subject,
  service_id,
  cancel_reason,
}) => {
  const navigation = useNavigation();
  const {i18n} = useTranslation();
  const date = created_at.slice(0, 10);
  const time = created_at.slice(11, created_at.length);
  const lang = i18n.language;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ServiceDetails', {
          orderId: id,
        })
      }>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.id]}>{lang == 'ar' ? `${id}#` : `#${id}`} </Text>
          <Text style={styles.id}>{serviceName}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
        {/* content */}
        <View style={styles.contentContainer}>
          <View style={styles.compnayContent}>
            <Icon
              name="checkcircle"
              size={16}
              color={COLORS.yellow}
              style={{marginTop: 5, marginHorizontal: 5}}
            />
            <Text style={styles.companyName}>{subject}</Text>
          </View>
          {supplier !== null && (
            <View style={styles.personContainer}>
              <Image
                source={{uri: supplier?.picture}}
                style={{width: 40, height: 40, borderRadius: 50}}
              />
              <View style={styles.personInfo}>
                <Text>
                  {supplier?.name} {supplier?.last_name}
                </Text>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Icon name="star" size={16} color={COLORS.lighYellow} />
                  <Text style={{marginHorizontal: 5}}>4.5/5</Text>
                </View>
                {/* <View></View> */}
              </View>
            </View>
          )}
          {reject_reason && (
            <View>
              <Text style={{marginTop: 10}}>{t('ReasonCancellation')}</Text>
              <Text style={{marginVertical: 5}}>{reject_reason}</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 5,
              marginVertical: 5,
              alignItems: 'center',
            }}>
            <Icon name="calendar" size={16} color={COLORS.yellow} />
            <Text style={{marginHorizontal: 10, fontSize: 12}}>{date}</Text>
            <Icon name="clockcircleo" size={16} color={COLORS.yellow} />
            <Text style={{fontSize: 12, marginHorizontal: 5}}>{time}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>{t('cancelReason')}: </Text>
            {cancel_reason && <Text>{cancel_reason}</Text>}
          </View>
        </View>
        {status === 'finished' ? (
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: COLORS.lightGray,
              paddingTop: 10,
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AppartmentStack', {
                  screen: 'RateUser',
                  params: {
                    id,
                  },
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flex: 1,
              }}>
              <Icon name="star" color={COLORS.gold} size={12} />
              <Text style={{color: COLORS.gold}}>{t('rate')}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: 1,
                borderColor: COLORS.lightGray,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation
                    .getParent()
                    .getParent()
                    .getParent()
                    .navigate('HomeStack', {
                      screen: 'ServiceDetails',
                      params: {
                        service_id: service_id,
                      },
                    });
                }}>
                <Text style={{color: COLORS.blue}}>{t('bookAgain')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderColor: COLORS.lightGray,
              paddingTop: 10,
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: 1,
                borderColor: COLORS.lightGray,
                // height: '100%',

                // borderWidth:1,
              }}>
              <TouchableOpacity
                onPress={
                  () =>
                    // console.log(navigation.getParent().getParent().getParent().getState().routeNames)
                    navigation
                      .getParent()
                      .getParent()
                      .getParent()
                      .navigate('HomeStack', {
                        screen: 'ServiceDetails',
                        params: {
                          service_id: service_id,
                        },
                      })
                  // )
                }>
                <Text style={{color: COLORS.blue}}>{t('bookAgain')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Finished;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
    alignItems: 'center',
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  id: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  status: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.green,
  },
  compnayContent: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    // justifyContent:"flex-start"
    // padding:15
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  personInfo: {
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  // image: {marginHorizontal: 10},
});
