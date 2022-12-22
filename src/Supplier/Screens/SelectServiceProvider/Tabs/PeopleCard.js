import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../utils';
import AppText from '../../../../components/text/Text';

const PeopleCard = ({item, selected}) => {
  
  return (
    <View
      style={{
        backgroundColor: selected ? COLORS.lightGray : 'white',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginVertical: 10,
      }}>
      <View>
        {item.picture ? (
          <Image style={{width:50,height:50, borderRadius:50}} source={{uri: item.picture}} />
        ) : (
          // <Image source={require(item.picture)} />
          <Image source={require('../../../../../assets/peopleImage.png')} />
        )}
      </View>
      <View style={{marginHorizontal: 10}}>
        <AppText style={{fontSize: 14, color: COLORS.black}}>
          {item.name} {item.last_name}
        </AppText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={require('../../../../../assets/smallStar.png')} />
          <AppText style={{marginHorizontal: 5}}>{item.rate ? item.rate :"4" }</AppText>
        </View>
      </View>
    </View>
  );
};

export default PeopleCard;

const styles = StyleSheet.create({});
