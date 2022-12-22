import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import AppText from '../text/Text';
import {Image} from 'react-native';

const AccountTypeCard = ({
  selected,
  type,
  name,
  title,
  onPress,
  source,
  // type,
}) => {
  console.log('account type component');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // active
        borderColor: selected ? COLORS.yellow : COLORS.garay,
        borderWidth: 1,
        width: 150,
        height: 150,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 10,
      }}>
      <View style={{}}>
        {selected ? (
          <Icon name="checkcircleo" size={20} color={COLORS.darkGold} />
        ) : (
          <Icon name="checkcircleo" size={20} color={COLORS.white} />
        )}
      </View>
      <View
        style={{
          margin: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {selected ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={source} />
          </View>
        ) : (
          // for better ui
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {type === 'user' ? (
              <Image source={require('../../../assets/userType.png')} />
            ) : (
              <Image source={require('../../../assets/tool.png')} />
            )}
          </View>
        )}
      </View>

      <View
        style={{
          alignItems: 'center',
        }}>
        {selected}
        <AppText style={{fontWeight: 'bold', marginVertical: 5}}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default AccountTypeCard;
