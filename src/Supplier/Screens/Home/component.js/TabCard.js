import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../../utils';

const TabCard = ({onPress, item}) => {
  const {i18n} = useTranslation();
  const date = item?.created_at.slice(0, 10);
  const time = item?.created_at.slice(10, 16);
  const service_subject = item?.subject?.name;
  const lang = i18n.language;
  // console.log('new order tab card: ', item);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[styles.id, {marginHorizontal: 20, color: COLORS.black}]}>
            {lang == 'ar' ? `${item?.id}#` : `#${item?.id}`}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.id, {marginHorizontal: 20, color: COLORS.black}]}>
            {item?.service?.name}
          </Text>
        </View>
      </View>
      {/* content */}
      <View style={styles.contentContainer}>
        {item?.supplier ? (
          <View style={styles.personContainer}>
            <Image
              style={{width: 40, height: 40, borderRadius: 50}}
              source={{uri: item?.supplier?.picture}}
            />
            <View style={styles.personInfo}>
              <Text style={{color: COLORS.black}}>{service_subject}</Text>
              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Icon name="star" size={16} color={COLORS.lighYellow} />
                <Text style={{marginHorizontal: 10}}>
                  {item?.supplier?.rate}/5
                </Text>
              </View>
              {/* <View></View> */}
            </View>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {false ? (
              <Image
                style={{width: 40, height: 40, borderRadius: 50}}
                source={require('../../../../../assets/logo.png')}
              />
            ) : (
              <Image
                style={{width: 40, height: 40, borderRadius: 50}}
                source={{
                  uri: item?.user?.picture,
                }}
              />
            )}

            <View style={{marginHorizontal: 10}}>
              <Text>{service_subject ? service_subject : 'Test Name'}</Text>
              <Text>{item?.user?.name + ' ' + item?.user?.last_name}</Text>

              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="star" size={16} color={COLORS.gold} />
                <Text style={{marginHorizontal: 5}}>4.5/5</Text>
              </View> */}
            </View>
          </View>
        )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="calendar" size={16} color={COLORS.yellow} />
          <Text style={{marginHorizontal: 10, fontSize: 12}}>
            {date && date}
          </Text>
          <Icon
            name="clockcircleo"
            size={16}
            color={COLORS.yellow}
            style={{marginHorizontal: 5}}
          />
          <Text style={{fontSize: 12}}>{time && time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TabCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.grayBg,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: COLORS.garay,
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
    // color: COLORS.black,
  },
  status: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.gold,
  },
  compnayContent: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    // justifyContent:"flex-start"
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
