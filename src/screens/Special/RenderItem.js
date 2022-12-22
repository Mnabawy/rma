import {Image, StyleSheet, Text, View, TouchableOpacity, I18nManager} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils';

const SpecialRenderItem = ({item, onPress}) => {
  // console.log('special item', item);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: I18nManager.isRTL ? item.image_ar : item.image_en}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.body}>{item.description.slice(0,40)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SpecialRenderItem;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.borderColor,
    padding: 5,
    flexDirection: 'row',
    margin: 10,
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.black,
  },
  imageContainer: {},
  image: {
    overflow: 'hidden',
    borderRadius: 8,
    width: 60,
    height: 60,
  },
});
