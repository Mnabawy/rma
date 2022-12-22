import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = () => {
  // console.log(navigation);

  const location = useSelector(state => state.address.address);
  const navigation = useNavigation();
  console.log('location', location);
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HomeStack', {
            screen: 'Map',
            // params: {
            //   role: 'user',
            // },
          })
        }
        // navigation.navigate('Map')}
      >
        {/* <TouchableOpacity */}
        {/* onPress={() => console.log(navigation.getState().routeNames)}> */}
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../../../assets/map-home.png')}
          />
          <Text>
            {location.addressName && location?.addressName?.slice(0, 40)}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStack', {
              screen: 'Notifications',
              params: {
                role: 'user',
              },
            })
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

// console.log(navigation.getParent().getParent().getState().)
export default Header;

const styles = StyleSheet.create({});
