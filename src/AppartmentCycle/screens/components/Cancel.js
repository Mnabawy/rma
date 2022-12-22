import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../utils';

const Cancel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.id}>#58966245</Text>
        <Text style={styles.status}>Cancel</Text>
      </View>
      {/* content */}
      <View style={styles.contentContainer}>
        <View style={styles.compnayContent}>
          <Image
            style={styles.image}
            source={require('../../../../assets/companyLogo.png')}
          />
          <Text style={styles.companyName}>Technical Support</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            marginHorizontal: 5,
          }}>
          <Icon name="clockcircleo" size={16} color={COLORS.yellow} />
          <Text style={{marginHorizontal: 10, fontSize: 12}}>
            April 25, 2022
          </Text>
          <Text style={{color: COLORS.yellow}}>at </Text>
          <Text style={{fontSize: 12}}> 4:25 PM</Text>
        </View>
        <Text style={{marginTop: 10}}>Reason for cancellation</Text>
        <Text style={{color: COLORS.black, marginTop: 5}}>
          This Text Is An Example That Can Be Replaced In The Same Space, Where
          You Can Create
        </Text>
        <View style={styles.personContainer}></View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderColor: COLORS.lightGray,
          paddingTop: 10,
          alignItems: 'center',
          paddingVertical: 10,
          // paddingVertical: 10,
          // justifyContent:'space-around'
        }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            borderColor: COLORS.lightGray,
            // height: '100%',

            // borderWidth:1,
          }}>
          <TouchableOpacity>
            <Text style={{color: COLORS.blue}}>Book Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cancel;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
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
  id: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  companyName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  status: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: COLORS.red,
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
