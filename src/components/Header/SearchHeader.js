import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils';
import {t} from 'i18next';
import SearchFilterInput from '../searchInput/SearchFilterInput';

const SearchHeader = ({navigation}) => {
  // console.log(navigation);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        
      }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View>
          <Icon name="menu" size={30} color={COLORS.black} />
        </View>
      </TouchableOpacity>
      {/* <View> */}
      <View style={{width: '70%', marginHorizontal: 20}}>
        <SearchFilterInput />
      </View>
      {/* </View> */}
      <View style={{marginHorizontal: 15}}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
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

export default SearchHeader;
