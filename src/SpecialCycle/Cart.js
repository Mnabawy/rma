import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils';

const {width} = Dimensions.get('screen').width;

const Cart = ({item, onPress}) => {
  console.log('item, ', item);
  const logo = I18nManager.isRTL ? item.logo_ar : item.logo_en;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.viewCotainer}>
        {logo ? (
          <Image style={{width: 100, height: 100}} source={{uri: logo}} />
        ) : (
          <Image source={require('../../assets/researchResults.png')} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.body}>{item?.about?.slice(0, 70)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    height: '100%',
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  // leftBtn:{
  //   width:20
  // },
  header: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    flex: 1,
  },
  contentConainer: {
    margin: 10,
    height: '100%',
    // flex:1
  },
  searchView: {
    flex: 1,
  },
  viewCotainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  textContainer: {
    // fli
    marginHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    // marginHorizontal: 10,
    fontSize: 14,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    color: COLORS.garay,
  },
  title: {
    // marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.black,
  },
  body: {
    // marginHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: COLORS.garay,
  },
});
