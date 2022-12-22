import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

const SupplierHomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color={COLORS.black} />
      </TouchableOpacity>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          {/* <Image
            style={{marginHorizontal: 30}}
            source={require('../../../../assets/search.png')}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SupplierNotifications', {role: 'supplier'})
          }>
          <IoniconsIcon
            name="md-notifications-outline"
            size={30}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SupplierHomeHeader;

const styles = StyleSheet.create({});
