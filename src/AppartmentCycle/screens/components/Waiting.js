import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../../utils';

const Waiting = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('AppartmentStack', {
          screen: 'ServiceDetails',
          params: {from: 'waiting'},
        })
      }>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.id}>#58966245</Text>
          <Text style={styles.status}>Waiting specialist</Text>
        </View>
        {/* content */}
        <View style={styles.contentContainer}>
          <View style={styles.compnayContent}>
            <Text style={styles.companyName}>papers service</Text>
          </View>
          <View style={styles.personContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="clockcircleo" size={16} color={COLORS.yellow} />
              <Text style={{marginHorizontal: 10, fontSize: 12}}>
                April 25, 2022
              </Text>
              <Text style={{color: COLORS.yellow}}>at </Text>
              <Text style={{fontSize: 12}}> 4:25 PM</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Waiting;

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
