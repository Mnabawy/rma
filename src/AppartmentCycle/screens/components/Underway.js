import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../utils';
import Indecator from '../../../components/Indecator/Indecator';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ActiveCard = ({
  id,
  status,
  supplier,
  serviceName,
  usbImgUrl,
  created_at,
  rate,
  subject,
}) => {
  const navigation = useNavigation();
  const date = created_at.slice(0, 10);
  const time = created_at.slice(11, created_at.length);
  const {i18n} = useTranslation();
  useEffect(() => {}, []);
  const lang = i18n.language;
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('navigate to service details');
        navigation.navigate('ServiceDetails', {
          orderId: id,
        });
      }}>
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
                  <Text style={{marginHorizontal: 5}}>{supplier.rate}</Text>
                </View>
                {/* <View></View> */}
              </View>
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
            <Icon
              name="clockcircleo"
              size={16}
              color={COLORS.yellow}
              style={{marginHorizontal: 5}}
            />
            <Text style={{fontSize: 12}}> {time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActiveCard;

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
