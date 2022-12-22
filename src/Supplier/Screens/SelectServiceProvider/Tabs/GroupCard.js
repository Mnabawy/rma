import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../utils';
import AppText from '../../../../components/text/Text';
import i18next, {t} from 'i18next';

const PeopleCard = ({item, selected}) => {
  console.log('selected', selected);
  return (
    <View
      // onPress={() => onSelect(item)}
      style={{
        backgroundColor: selected ? COLORS.lightGray : 'white',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
      }}>
      <View>
        {item.image || item.imageEn ? (
          <Image
            style={{width: 50, height: 50, borderRadius: 50}}
            source={{uri: I18nManager.isRTL ? item.image : item.imageEn}}
          />
        ) : (
          <Image source={require('../../../../../assets/groupImage.png')} />
        )}
      </View>
      <View style={{marginHorizontal: 10}}>
        <AppText
          style={{
            fontSize: 14,
            color: COLORS.black,
            textAlign: !I18nManager.isRTL ? 'left' : 'right',
            marginHorizontal: 5,
          }}>
          {item.name}
        </AppText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AppText style={{marginHorizontal: 5}}>
            {item.members_count} {}
            {t('member')}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({});
